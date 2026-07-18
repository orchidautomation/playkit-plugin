import assert from "node:assert/strict"
import { access, mkdir, mkdtemp, readFile, realpath, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { spawnSync } from "node:child_process"
import test from "node:test"
import { fileURLToPath, pathToFileURL } from "node:url"

const PLUXX_VERSION = "0.1.36"
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const readCommandEnv = (name, fallback, errorMessage) => {
  const raw = process.env[name] ?? fallback
  const parsed = JSON.parse(raw)
  assert.ok(Array.isArray(parsed) && parsed.length > 0, errorMessage)
  return parsed.map(String)
}

const pluxxCommand = readCommandEnv(
  "PLUXX_COMMAND_JSON",
  '["pluxx"]',
  "PLUXX_COMMAND_JSON must be a non-empty JSON array",
)
const typescriptRunner = readCommandEnv(
  "OPENCODE_TYPESCRIPT_RUNNER_JSON",
  '["bun"]',
  "OpenCode TypeScript runner must be a non-empty JSON array",
)

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    env: { ...process.env, ...(options.env ?? {}) },
    encoding: "utf8",
  })

  assert.equal(
    result.status,
    0,
    [
      `${command} ${args.join(" ")} failed with status ${result.status}`,
      result.stdout,
      result.stderr,
    ].filter(Boolean).join("\n"),
  )

  return result
}

const runPluxx = (args, options) => run(pluxxCommand[0], [...pluxxCommand.slice(1), ...args], options)

const runInstalledProbe = async ({ sandboxRoot, wrapperPath, selectedWorkspace, launchParent }) => {
  const probeResultPath = path.join(sandboxRoot, "probe-result.json")
  const probePath = path.join(repoRoot, "tests", "fixtures", "opencode-wrapper-probe.mts")

  run(typescriptRunner[0], [
    ...typescriptRunner.slice(1),
    probePath,
    pathToFileURL(wrapperPath).href,
    selectedWorkspace,
    probeResultPath,
  ], {
    cwd: launchParent,
    env: {
      PLAYKIT_API_KEY: "ambient-value-must-not-win",
    },
  })

  return JSON.parse(await readFile(probeResultPath, "utf8"))
}

const assertInstalledProof = ({ proof, launchCwd, pluginRuntimeRoot, selectedWorkspace, expectedHeaderValue }) => {
  assert.equal(proof.cwd, launchCwd)
  const expectedCommandNames = [
    "account-and-usage",
    "clay-doc",
    "provider-research",
    "setup-and-auth",
    "table-operations",
    "workflow-design",
  ]
  assert.deepEqual(Object.keys(proof.commands).sort(), expectedCommandNames)
  for (const commandName of expectedCommandNames) {
    const command = proof.commands[commandName]
    assert.equal(typeof command.template, "string")
    assert.ok(command.template.trim(), `${commandName} must have a usable prompt template`)
    assert.equal(command.skill, commandName)
    assert.deepEqual(command.skills, [commandName])
  }
  assert.equal(proof.mcp.type, "remote")
  assert.equal(proof.mcp.url, "https://mcp.playkit.sh/mcp")
  assert.deepEqual(proof.mcp.headers, { "X-API-Key": expectedHeaderValue })
  assert.equal(proof.shellCommands.length, 1, "readiness hook must execute once")

  const hookCommand = proof.shellCommands[0]
  assert.ok(hookCommand.includes(path.join(pluginRuntimeRoot, "scripts", "check-env.sh")))
  assert.ok(hookCommand.includes(`PLUXX_PLUGIN_ROOT='${pluginRuntimeRoot}'`))
  assert.ok(hookCommand.includes(`PLUGIN_ROOT='${pluginRuntimeRoot}'`))
  assert.ok(hookCommand.includes(`PLUXX_WORKSPACE_ROOT='${selectedWorkspace}'`))
  assert.ok(hookCommand.includes(`PLUXX_HOOK_WORKSPACE_ROOT='${selectedWorkspace}'`))
  assert.ok(!hookCommand.includes(path.join(selectedWorkspace, "playkit")))
  assert.deepEqual(proof.logs, [])
}

test("installed OpenCode wrapper preserves the selected workspace and plugin-owned runtime", async (t) => {
  const version = runPluxx(["--version"]).stdout.trim()
  assert.equal(version, PLUXX_VERSION, "behavioral proof must use the exact release-pinned Pluxx version")

  runPluxx(["build"])
  await Promise.all(
    ["claude-code", "opencode", "codex", "cursor"].map((target) =>
      access(path.join(repoRoot, "dist", target)),
    ),
  )

  const sandboxRoot = await mkdtemp(path.join(tmpdir(), "playkit-opencode-wrapper-"))
  t.after(() => rm(sandboxRoot, { recursive: true, force: true }))
  const sandboxHome = path.join(sandboxRoot, "sandbox-home")
  const launchParent = path.join(sandboxRoot, "parent launch directory")
  const selectedWorkspace = path.join(sandboxRoot, "selected workspace with spaces")
  await Promise.all([
    mkdir(sandboxHome, { recursive: true }),
    mkdir(launchParent, { recursive: true }),
    mkdir(selectedWorkspace, { recursive: true }),
  ])

  runPluxx(["install", "--trust", "--target", "opencode"], {
    env: {
      HOME: sandboxHome,
      PLAYKIT_API_KEY: "playkit-wrapper-test-value",
    },
  })

  const pluginRoot = path.join(sandboxHome, ".config", "opencode", "plugins", "playkit")
  const wrapperPath = path.join(sandboxHome, ".config", "opencode", "plugins", "playkit.ts")
  const userConfigPath = path.join(pluginRoot, ".pluxx-user.json")
  const hookScriptPath = path.join(pluginRoot, "scripts", "check-env.sh")

  await Promise.all([access(wrapperPath), access(userConfigPath), access(hookScriptPath)])
  await assert.rejects(
    access(path.join(selectedWorkspace, "playkit")),
    "the synthetic nested workspace path must not exist during the proof",
  )

  const wrapper = await readFile(wrapperPath, "utf8")
  assert.match(wrapper, /pluginFactory\(context\)/)
  assert.doesNotMatch(wrapper, /import \{ join \} from ["']path["']/)
  assert.doesNotMatch(wrapper, /directory:\s*join\(context\.directory/)

  const userConfig = JSON.parse(await readFile(userConfigPath, "utf8"))
  assert.equal(userConfig.env.PLAYKIT_API_KEY, "playkit-wrapper-test-value")
  assert.equal(userConfig.secretStorage, "materialized")

  const proof = await runInstalledProbe({ sandboxRoot, wrapperPath, selectedWorkspace, launchParent })
  assertInstalledProof({
    proof,
    launchCwd: await realpath(launchParent),
    pluginRuntimeRoot: await realpath(pluginRoot),
    selectedWorkspace,
    expectedHeaderValue: userConfig.env.PLAYKIT_API_KEY,
  })
})
