# PlayKit Plugin

**A Clay GTM engineering co-pilot for Claude Code, Cursor, Codex, and OpenCode — powered by the [PlayKit](https://playkit.sh) MCP.**

PlayKit is a knowledge base + tool surface for designing, building, and documenting Clay workflows. This plugin wraps the PlayKit MCP as a set of workflow-driven slash commands so your AI editor can brainstorm plays, design multi-table architectures, build tables end-to-end, audit production workbooks, and hand clients a polished documentation folder — all without leaving your terminal.

## What's inside

**6 skills · 6 slash commands · 24 MCP tools**

| Command | What it does |
|---|---|
| `/clay-doc <clay-url>` | **Document a Clay workflow.** Generates a client-ready `docs/clay/…` folder (overview, build, prompts, copy, sources, destinations, audit, cost, rebuild, reference + per-table summaries). Concern-first, regen-safe. |
| `/workflow-design` | Brainstorm plays, design workflows, generate ICPs, write outreach, craft Claygent prompts. |
| `/table-operations` | Build tables, add rows, run enrichments, audit, export, inspect schemas. |
| `/provider-research` | Compare providers, find integrations, ask any Clay question. |
| `/account-and-usage` | Check pricing, credits, tool costs, usage. |
| `/setup-and-auth` | Connect your Clay session cookie + confirm connection. |

> Codex: slash commands degrade on Codex (per the Pluxx core-four mapping). Skills ship fully and you invoke them by name; other three runners get `/commands` with argument expansion.

## Install

**Step 1 — Get your API key** from [playkit.sh → Settings → API Keys](https://playkit.sh) and export it:

```bash
export PLAYKIT_API_KEY="PK_LIVE_…"
```

**Step 2 — Pick your installer.** All installers pull the latest release tarball from GitHub and wire it into your editor.

### Quick install (one-liner, all runners)

```bash
export PLAYKIT_API_KEY="PK_LIVE_…"
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-all.sh | bash
```

### Per-runner quick install

**Claude Code**

```bash
export PLAYKIT_API_KEY="PK_LIVE_…"
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-claude-code.sh | bash
# then in Claude Code: /reload-plugins
```

Installs to: `~/.claude/plugins/data/playkit-releases/plugins/playkit/`

**Cursor**

```bash
export PLAYKIT_API_KEY="PK_LIVE_…"
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-cursor.sh | bash
```

Installs to: `~/.cursor/plugins/local/playkit/`

**OpenCode**

```bash
export PLAYKIT_API_KEY="PK_LIVE_…"
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-opencode.sh | bash
```

Installs to: `~/.config/opencode/plugins/playkit.ts`

**Codex**

```bash
export PLAYKIT_API_KEY="PK_LIVE_…"
curl -fsSL https://github.com/orchidautomation/playkit-plugin/releases/latest/download/install-codex.sh | bash
```

Installs to: `~/.codex/plugins/playkit/`

If you want Codex hooks, grab the `.codex/hooks.generated.json` emitted at install time, copy it into `~/.codex/hooks.json`, and enable `codex_hooks = true` in your Codex config.

### Install from source (development)

```bash
export PLAYKIT_API_KEY="PK_LIVE_…"
git clone https://github.com/orchidautomation/playkit-plugin.git
cd playkit-plugin
npm install -g @orchid-labs/pluxx   # one-time, if you don't have Pluxx
pluxx install --trust --target claude-code   # or cursor / codex / opencode, or omit for all
```

`--trust` is needed because the plugin declares a `sessionStart` hook that verifies your API key is exported. Review `scripts/check-env.sh` before trusting.

## Persisting your API key

The export-in-shell approach works but gets lost across sessions. Three durable options:

**1. `~/.zshrc` / `~/.bashrc`**

```bash
echo 'export PLAYKIT_API_KEY="PK_LIVE_…"' >> ~/.zshrc
source ~/.zshrc
```

**2. `.env.local` at repo root (for local dev / testing this plugin itself)**

```bash
cd playkit-plugin
echo 'PLAYKIT_API_KEY=PK_LIVE_…' > .env.local
```

`.env*` is already gitignored.

**3. 1Password CLI / `op run`**

```bash
op run --env-file=./.env.op -- pluxx install --trust
```

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

**"Clay API not connected" inside `/clay-doc`** — PlayKit also needs your Clay session cookie. Run `clay_connect(session_cookie="…")` once per session; see the [PlayKit docs](https://playkit.sh/docs) for how to grab the cookie.

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

- [Pluxx](https://github.com/orchid-labs/pluxx) — cross-platform plugin SDK (autopilot, build, install)
- [PlayKit MCP](https://mcp.playkit.sh/mcp) — 24-tool knowledge + Clay API surface
- Author: **Orchid Labs**
- License: MIT
