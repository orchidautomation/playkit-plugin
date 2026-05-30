# PlayKit Plugin

**Clay expertise for Claude Code, Cursor, Codex, and OpenCode.**

PlayKit helps your AI editor design Clay workflows, build tables, patch existing columns and source filters, audit workbooks, compare providers, and generate client-ready docs without leaving your workspace.

## What's inside

**6 skills · 6 slash commands · 30 MCP tools**

| Command | What it does |
|---|---|
| `/clay-doc <clay-url>` | **Document a Clay workflow.** Generates a client-ready `docs/clay/…` folder (overview, build, prompts, copy, sources, destinations, audit, cost, rebuild, reference + per-table summaries). Concern-first, regen-safe. |
| `/workflow-design` | Brainstorm plays, design workflows, generate ICPs, write outreach, craft Claygent prompts. |
| `/table-operations` | Build tables, add rows, create or patch columns/source filters, run enrichments, audit, export, inspect schemas. |
| `/provider-research` | Compare providers, find integrations, ask any Clay question. |
| `/account-and-usage` | Check pricing, credits, tool costs, usage. |
| `/setup-and-auth` | Confirm PlayKit auth and Clay connection state. |

> Codex: slash commands degrade on Codex (per the Pluxx core-four mapping). Skills ship fully and you invoke them by name; other three runners get `/commands` with argument expansion.

## Install

**Step 1 — Get your API key** from [playkit.sh → Settings → API Keys](https://playkit.sh), then add it to your editor's host secret store or set `PLAYKIT_API_KEY` in your shell outside agent-visible chat.

**Step 2 — Pick your installer.** All installers pull the latest release tarball from GitHub and wire it into your editor.

### Quick install (one-liner, all runners)

```bash
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-all.sh | bash
```

### Per-runner quick install

**Claude Code**

```bash
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-claude-code.sh | bash
# then in Claude Code: /reload-plugins
```

Installs to: `~/.claude/plugins/data/playkit-releases/plugins/playkit/`

**Cursor**

```bash
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-cursor.sh | bash
```

Installs to: `~/.cursor/plugins/local/playkit/`

**OpenCode**

```bash
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-opencode.sh | bash
```

Installs to: `~/.config/opencode/plugins/playkit.ts`

**Codex**

```bash
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-codex.sh | bash
```

Installs to: `~/.codex/plugins/playkit/`

If you want Codex plugin-bundled hooks, enable `plugin_hooks = true` under `[features]` in your Codex config, then reload Codex.

### Install from source (development)

```bash
git clone https://github.com/orchidautomation/playkit-plugin.git
cd playkit-plugin
npm install -g @orchid-labs/pluxx   # one-time, if you don't have Pluxx
pluxx install --trust --target claude-code   # or cursor / codex / opencode, or omit for all
```

`--trust` is needed because the plugin declares a `sessionStart` hook that verifies your API key is exported. Review `scripts/check-env.sh` before trusting.

## Persisting your API key

A plain `export PLAYKIT_API_KEY=...` only lives for the current shell. Prefer your editor's host secret flow, Pluxx's secret prompt, 1Password, or your operating system's environment-variable UI so the key does not appear in chat transcripts, shell history, or copied terminal logs.

If you use an environment variable, set `PLAYKIT_API_KEY` manually outside the agent context. Verify presence without printing the value:

```bash
test -n "$PLAYKIT_API_KEY" && echo "PLAYKIT_API_KEY is set"
```

On Windows PowerShell:

```powershell
if ($env:PLAYKIT_API_KEY) { "PLAYKIT_API_KEY is set" }
```

### 1Password CLI (avoid plaintext on disk)

```bash
op run --env-file=./.env.op -- pluxx install --trust
```

Your `.env.op` references 1Password items instead of raw values — nothing sensitive lands on disk.

### Confirm the editor actually sees the key

After persisting, **fully quit and relaunch** Cursor / VS Code / Claude Desktop (menu → Quit, not just close the window) so it inherits the new env. Then in the plugin's installed runner, the `sessionStart` hook (`scripts/check-env.sh`) will fail loudly if `PLAYKIT_API_KEY` is missing.

## Verify install

```bash
pluxx verify-install --target claude-code   # (or cursor / codex / opencode)
```

In the editor itself:
- Claude Code: `/clay-doc https://app.clay.com/workbooks/…` — should prompt for confirmation, then run
- Cursor: open the commands palette, type `clay-doc`
- OpenCode: invoke the skill by name
- Codex: the skill surface is available; commands degrade — use the skill directly

## `/clay-doc` deep dive

The headline skill. Hand it any Clay URL and it orchestrates `clay_list_tables` + `clay_get_schema` + `clay_document_table` + `clay_audit_table` in parallel, then writes a concern-first documentation folder:

`clay_get_schema` includes top-level AI `prompts`, up to 5 `sample_rows`, source/search config, source columns, and normalized view details by default. Large schemas may auto-compact non-essential `typeSettings`; with `compact=true` and `include_prompts=false`, prompt bindings are omitted to avoid oversized responses. Use `clay_get_columns` for complete ordered column inventory and `clay_get_column` for one selected column's full formula/action/prompt config.

`clay_add_column`, `clay_update_column`, and `clay_update_source` let the plugin modify existing Clay tables without a rebuild: new typed/formula/action columns, prompts, formulas, action input bindings, conditional runs, native waterfall formula steps, and Find People/Find Companies source filters.

```
docs/clay/<workspace>/<scope>/
├── README.md              ← navigation
├── overview.md            ← client-facing summary
├── build.md               ← architecture + WHY (editable)
├── prompts.md             ← every AI prompt centralized
├── copy.md                ← outbound copy (if any)
├── sources.md             ← data inputs
├── destinations.md        ← where data flows
├── audit.md               ← scorecard + findings
├── cost.md                ← 30-day credit burn
├── rebuild.md             ← recreate-from-scratch playbook
├── reference.md           ← column → tool cheatsheet
├── CHANGELOG.md           ← drift log across regens
├── tables/<slug>.md       ← per-table summary
└── workbooks/<slug>.md    ← per-workbook (folder/multi-URL mode)
```

**Invocation examples**

```
/clay-doc https://app.clay.com/workbooks/wb_abc123
/clay-doc https://app.clay.com/folders/f_xyz
/clay-doc <url1> <url2> --pipeline-name outbound-v2
/clay-doc <url> --for client --quick
/clay-doc <url> --commit
```

**Flags:** `--for client|engineer` · `--quick` · `--commit` · `--diff` · `--out <path>` · `--pipeline-name <slug>` · `--include-archived`

**Regen-safe:** rerun any time. Human-edited `<!-- WHY: … -->` and `<!-- KEEP: … -->` blocks survive regeneration. Drift gets logged to `CHANGELOG.md`.

## Troubleshooting

**"`PLAYKIT_API_KEY` is not set"** — the `sessionStart` hook ran and didn't find the env var. Re-check step 1 of Install, or see Persisting your API key.

**"Clay API not connected" inside `/clay-doc`** — Run `clay_connect`, open the returned browser URL, paste the Clay cookie only into that browser page, then return and run `clay_status`. Do not paste a Clay session cookie into chat.

**Claude Code doesn't see the plugin** — run `/reload-plugins` in the session.

**Codex slash commands don't appear** — expected. Codex degrades user commands; invoke the skill by name instead.

## Repo layout

```
playkit-plugin/
├── pluxx.config.ts       ← plugin manifest (MCP config, userConfig, targets, hooks)
├── INSTRUCTIONS.md       ← top-level agent briefing
├── commands/             ← slash commands (one per workflow skill + /clay-doc)
├── skills/               ← 6 workflow skills
│   ├── setup-and-auth/
│   ├── account-and-usage/
│   ├── provider-research/
│   ├── table-operations/
│   ├── workflow-design/
│   └── clay-doc/         ← the documentation skill with 14 templates
├── scripts/              ← sessionStart hook (API key check)
├── dist/                 ← per-target builds (gitignored)
└── .pluxx/               ← autopilot metadata (managed)
```

## Development

```bash
# Re-pull MCP tool metadata if PlayKit adds/removes tools
pluxx sync --from-mcp https://mcp.playkit.sh/mcp

# Validate config
pluxx doctor

# Build all targets
pluxx build

# Lint + test all targets
pluxx test

# Quick rebuild + reinstall during iteration
pluxx dev --target claude-code
```

## Built with

- [Pluxx](https://github.com/orchidautomation/pluxx) — cross-platform plugin SDK (autopilot, build, install)
- [PlayKit MCP](https://mcp.playkit.sh/mcp) — 30-tool knowledge + Clay API surface
- Author: **Orchid Labs**
- License: MIT
