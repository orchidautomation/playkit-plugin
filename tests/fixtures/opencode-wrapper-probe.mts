import { spawn } from "node:child_process"
import { writeFile } from "node:fs/promises"

const [wrapperUrl, selectedWorkspace, probeResultPath] = process.argv.slice(2)
if (!wrapperUrl || !selectedWorkspace || !probeResultPath) {
  throw new Error("Expected wrapper URL, selected workspace, and probe result path")
}

const wrapperModule = await import(wrapperUrl)
const pluginFactory = Object.values(wrapperModule).find((value) => typeof value === "function")
if (!pluginFactory) throw new Error("Installed top-level wrapper did not export a plugin factory")

const shellCommands: string[] = []
const logs: unknown[] = []
const shell = (_strings: TemplateStringsArray, ...values: unknown[]) => {
  const command = String(values[0] ?? "")
  shellCommands.push(command)
  const child = spawn("bash", ["-lc", command], {
    cwd: selectedWorkspace,
    env: process.env,
  })
  let stderr = ""
  child.stderr.on("data", (chunk) => { stderr += chunk })
  return new Promise<void>((resolve, reject) => {
    child.on("error", reject)
    child.on("exit", (status) => {
      if (status === 0) resolve()
      else reject(new Error("Hook command failed: " + stderr))
    })
  })
}

const hooks = await pluginFactory({
  project: selectedWorkspace,
  directory: selectedWorkspace,
  worktree: selectedWorkspace,
  client: { app: { log: async (entry: unknown) => logs.push(entry) } },
  $: shell,
})

type ProbeConfig = {
  command?: Record<string, {
    template?: unknown
    skill?: unknown
    skills?: unknown
  }>
  mcp?: Record<string, unknown>
}

const config: ProbeConfig = {}
await hooks.config(config)
await hooks.event({ event: { type: "session.created" } })

await writeFile(probeResultPath, JSON.stringify({
  cwd: process.cwd(),
  commands: config.command ?? {},
  mcp: config.mcp?.["clay-knowledge"],
  shellCommands,
  logs,
}, null, 2))
