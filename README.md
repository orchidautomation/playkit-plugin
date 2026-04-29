# PlayKit Plugin

**Use PlayKit from Claude Code, Cursor, Codex, or OpenCode.**

This plugin helps you design, build, audit, and document Clay workflows from your AI editor. It adds practical commands for common Clay work, including workflow design, table builds, provider research, and client-ready documentation.

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

A plain `export PLAYKIT_API_KEY=…` only lives for the current shell. Persist it once and every editor, terminal, and install script on your machine picks it up automatically.

### macOS (zsh — default since Catalina)

macOS Catalina and later default to zsh. `~/.zshrc` loads on every interactive shell.

```bash
# Append the export to your shell profile
echo 'export PLAYKIT_API_KEY="PK_LIVE_…"' >> ~/.zshrc

# Reload the profile in the current shell
source ~/.zshrc

# Verify it's set
echo $PLAYKIT_API_KEY
```

Not sure which shell you're on? Run `echo $SHELL`. If it says `/bin/zsh`, use `~/.zshrc`. If `/bin/bash`, use `~/.bash_profile` (macOS) or `~/.bashrc` (Linux).

> **GUI apps on macOS don't read `~/.zshrc`.** If you launch Cursor, VS Code, or Claude Desktop from Finder/Spotlight, the env var won't be visible. Two fixes:
> - **Launch the editor from the terminal** (`cursor .`, `code .`) — it inherits the shell env.
> - **Or set it machine-wide** with `launchctl` so GUI apps see it too:
>   ```bash
>   launchctl setenv PLAYKIT_API_KEY "PK_LIVE_…"
>   ```
>   Add that line to `~/.zshrc` so it re-runs every login. `launchctl setenv` persists until the next reboot unless you wire up a `LaunchAgent` plist — for most people, reloading on shell startup is enough.

### Linux (bash/zsh)

```bash
# bash (default on most distros)
echo 'export PLAYKIT_API_KEY="PK_LIVE_…"' >> ~/.bashrc
source ~/.bashrc

# zsh
echo 'export PLAYKIT_API_KEY="PK_LIVE_…"' >> ~/.zshrc
source ~/.zshrc
```

For system-wide (all users), root can write to `/etc/environment`:

```bash
echo 'PLAYKIT_API_KEY=PK_LIVE_…' | sudo tee -a /etc/environment
```

Log out and back in for `/etc/environment` to take effect.

### Windows — PowerShell (recommended)

The cleanest way. This sets a user-level env var that persists across reboots and is visible to every app (Cursor, VS Code, Claude Desktop, WSL, etc.).

```powershell
# Set it permanently for your user
[System.Environment]::SetEnvironmentVariable('PLAYKIT_API_KEY', 'PK_LIVE_…', 'User')

# Make it available in the current session too
$env:PLAYKIT_API_KEY = 'PK_LIVE_…'

# Verify
echo $env:PLAYKIT_API_KEY
```

Close and reopen your terminal (and any running editors) to pick up the new value.

To persist it across every future PowerShell session without re-setting, add this to your PowerShell profile:

```powershell
# Open your profile (creates it if it doesn't exist)
if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
notepad $PROFILE

# Add this line and save:
$env:PLAYKIT_API_KEY = [System.Environment]::GetEnvironmentVariable('PLAYKIT_API_KEY', 'User')
```

### Windows — Command Prompt (`setx`)

```cmd
setx PLAYKIT_API_KEY "PK_LIVE_…"
```

`setx` writes to the user registry. The value is available in **new** terminals only — close and reopen CMD to see it. Verify with `echo %PLAYKIT_API_KEY%`.

### Windows — GUI (for non-terminal users)

1. Start → search "Environment Variables" → "Edit environment variables for your account"
2. Under **User variables**, click **New**
3. Variable name: `PLAYKIT_API_KEY`
4. Variable value: your `PK_LIVE_…` key
5. OK → OK → restart Cursor / VS Code / Claude Desktop

### Windows — WSL (Ubuntu etc.)

WSL is Linux, so use the Linux bash instructions above inside the WSL shell. WSL does **not** inherit Windows env vars by default — set it separately in `~/.bashrc` inside WSL.

### Project-local override (`.env.local`)

For local plugin development or one-off testing, put the key in a repo-local `.env` file instead of global env:

```bash
cd playkit-plugin
echo 'PLAYKIT_API_KEY=PK_LIVE_…' > .env.local
```

`.env*` is already gitignored. Pluxx and most AI tooling will pick it up automatically.

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

`clay_get_schema` includes top-level AI `prompts` and up to 5 `sample_rows` by default. Large schemas may auto-compact non-essential `typeSettings`, but prompt bodies and row examples remain available for documentation.

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

- [Pluxx](https://github.com/orchidautomation/pluxx) — cross-platform plugin SDK (autopilot, build, install)
- [PlayKit MCP](https://mcp.playkit.sh/mcp) — 24-tool knowledge + Clay API surface
- Author: **Orchid Labs**
- License: MIT
