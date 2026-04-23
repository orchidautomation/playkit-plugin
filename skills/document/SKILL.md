---
name: document
description: "Generate client-ready documentation for a Clay workflow. Invoke with /document plus a Clay URL (table, workbook, folder, or multiple). Orchestrates PlayKit MCP tools into a concern-first doc folder: prompts, copy, sources, destinations, audit, cost."
---

# /document — Clay Workflow Documentation Orchestrator

Produce a complete, client-ready documentation scaffold for a Clay workflow
in one command. Concern-first, not table-first. Always-latest folder structure.
Preserves human-edited `<!-- WHY: -->` and `<!-- KEEP: -->` blocks on regen.

## Design spec
Full design at [`docs/brainstorms/clay-document-skill.md`](../../../docs/brainstorms/clay-document-skill.md).
If anything below is ambiguous, read the spec.

## Invocation

`/document $ARGUMENTS` — $ARGUMENTS contains one or more Clay URLs and optional flags.

## Step 1 — Verify connection

Call `mcp__playkit__clay_status`.
- If `connected: false` → tell the user to run `clay_connect(session_cookie="...")` first and STOP.
- If connected, continue.

## Step 2 — Parse $ARGUMENTS

Extract:
- **URLs** — match `https://app.clay.com/...` patterns
- **Flags:**
  - `--for <client|engineer>` — audience filter
  - `--quick` — README + overview only
  - `--commit` — git add + commit after writing
  - `--diff` — skip writes, only update CHANGELOG
  - `--out <path>` — override destination folder
  - `--pipeline-name <slug>` — required when multiple URLs passed
  - `--include-archived` — include `[archive]` tables (skipped by default)

Detect **input mode** from URL shape:

| URL pattern              | Mode          |
|--------------------------|---------------|
| `/tables/t_...`          | table         |
| `/workbooks/wb_...`      | workbook      |
| `/folders/f_...`         | folder        |
| `/workspaces/...` only   | workspace     |
| Multiple URLs            | multi-workbook (require `--pipeline-name`) |

If workspace-only URL → list workbooks via `clay_list_tables` and ask the user to narrow. Do NOT try to document an entire workspace.

## Step 3 — Resolve scope

For each URL, call `mcp__playkit__clay_list_tables(url=<url>)` to resolve:
- `workspace_id`
- `workbook_id` + `workbook_name`
- `tables[]` with `{id, name, row_count}`

Union results if multiple URLs. Skip tables whose name starts with `[archive]` unless `--include-archived`.

Compute `scope_slug`:
- **table mode** → `<workbook_slug>/tables/<table_slug>`
- **workbook mode** → `<workbook_slug>`
- **folder mode** → slugify(folder_name)
- **multi-url mode** → value of `--pipeline-name`

Compute `output_path` (default `docs/clay/<workspace_slug>/<scope_slug>/`, override via `--out`).

Slugify: lowercase, replace spaces+punctuation with `-`, strip leading numbers-with-dots (e.g., `"2. Company + People Qualification"` → `company-people-qualification`).

## Step 4 — Fetch per-table data in parallel

For each table, in parallel:
- `mcp__playkit__clay_get_schema(table_id)`
- `mcp__playkit__clay_document_table(table_id, "full")`
- `mcp__playkit__clay_audit_table(table_id, workspace_id=<id>, depth="deep")`

**If `clay_get_schema` returns a file-path** (token overflow):
- Note the file path
- Use `Read` with chunked offsets to extract only what you need (AI prompts, HTTP bodies, conditional-run formulas, waterfall formulas, source-column references)
- Save the raw file copy to `<output_path>/_raw/<table_id>.schema.json`
- Mark affected sections with `<!-- TRUNCATED: see _raw/<table_id>.schema.json -->`

## Step 5 — Extract structured data per table

### Columns
From `columns[]`: `id`, `name`, `type`, `typeSettings.dataTypeSettings.type`, `typeSettings.formulaText` (full, not truncated), `typeSettings.formulaType`.

### AI action prompts
Where `type == "action"` and `typeSettings.actionKey == "use-ai"`:
- **Model:** `inputsBinding[]` entry where `name == "model"` → `formulaText` (strip quotes)
- **System prompt:** `inputsBinding[]` where `name == "prompt"` → `formulaText` (unescape JSON string literals, unwrap `Clay.formatForAIPrompt(...)` calls to show column refs)
- **Output schema:** `inputsBinding[]` where `name == "answerSchemaType"` → `formulaMap.jsonSchema`
- **runBudget:** `inputsBinding[]` where `name == "runBudget"` → `formulaText`
- **Conditional run:** top-level `conditionalRunFormulaText`
- **Auth account:** top-level `authAccountId`

### HTTP action bodies
Where `typeSettings.actionKey == "http-api-v2"`:
- **Method, URL, body** from `inputsBinding[]` entries
- Extract body JSON schema (fields being written)
- **Auth account:** top-level `authAccountId`

### Waterfall formulas
Where `typeSettings.formulaType == "waterfall"` — list the `formulaWaterfall[]` in preferred-fallback order.

### Source columns
Where `type == "source"` → `sourceIds`, `taggedSourceType`.

### Parent-joins
Formulas matching `{{f_...}}?.parent?.<field>` pattern.

## Step 6 — Detect patterns

Cross-reference the extracted data against these patterns. For each detected, compose a paragraph: (1) what it is, (2) where it shows up (columns/tables), (3) why smart or watch-out, (4) link to audit finding if relevant.

- **Waterfall consensus** — `formulaType == "waterfall"` with 2+ AI-action sources
- **Conditional AI fallback** — `conditionalRunFormulaText` references a confidence column
- **Parent-join pass-through** — cols using `parent?.<field>`
- **ICP qualification gate** — `conditionalRunFormulaText` references a "Qualified" column
- **Exclusion list hardcoded** — formula contains literal domain array
- **Unconditional expensive enrichment** — Medium+ cost action without `conditionalRunFormulaText`
- **Hub-spoke / Route Row** — `route-row` action writing to another table
- **Email/phone waterfall** — email-waterfall action present
- **Confidence threshold gating** — conditional run comparing to numeric literal
- **Round-robin** — `Evenly Distribute Rows Across Options` action
- **Dedup lookup** — `Lookup Row` immediately followed by `Create Object`
- **Native bidirectional sync** — CRM native-sync action
- **Cross-workbook handoff** (folder/multi-URL mode) — HTTP URL in one workbook matches a source in another
- **Shared destination** — 2+ tables write to same URL
- **Disconnected island** (multi-URL) — workbook has no edges to any other in scope — warn

## Step 7 — Roll up audit findings

From each `clay_audit_table` response, extract: scorecard, findings (with severity), strategic analysis, top recommendations, credit usage.

Roll up to pipeline level:
- Overall score = min across tables (worst table gates)
- Top-3 recommendations = union of per-table top 3, de-duped
- Credit usage = sum
- Findings = union, grouped by dimension

## Step 8 — Preserve human edits (regen safety)

If `output_path` already exists, for each file that will be overwritten:
- Read the existing file
- Extract all `<!-- WHY: ... -->` and `<!-- KEEP: ... -->` blocks
- When writing the new file, re-insert these blocks in the same section anchors
- Track count for CHANGELOG

If `<!-- WHY: -->` block exists in existing file but not in the new template section anchor, keep it and flag in CHANGELOG as "orphaned WHY — section may have been renamed."

## Step 9 — Write files from templates

Read each template from `.claude/skills/document/templates/<name>.md`, fill placeholders, and write:

| Template        | Output filename                        | Write when              |
|-----------------|----------------------------------------|-------------------------|
| readme.md       | README.md                              | always                  |
| overview.md     | overview.md                            | always                  |
| build.md        | build.md                               | always                  |
| prompts.md      | prompts.md                             | AI actions detected     |
| copy.md         | copy.md                                | always (empty-state if none) |
| sources.md      | sources.md                             | always                  |
| destinations.md | destinations.md                        | write actions exist     |
| audit.md        | audit.md                               | always                  |
| cost.md         | cost.md                                | workspace_id available  |
| rebuild.md      | rebuild.md                             | always                  |
| reference.md    | reference.md                           | always                  |
| changelog.md    | CHANGELOG.md                           | always (append if exists) |
| table.md        | tables/<table-slug>.md (× each table)  | always                  |
| workbook.md     | workbooks/<workbook-slug>.md (× each)  | folder / multi-URL mode only |

Create `_raw/` subdir under `output_path` for any large schema files.

## Step 10 — Apply flag modifiers

- `--for client` → only write README, overview, reference
- `--for engineer` → only write README, build, rebuild, prompts, destinations
- `--quick` → only write README + overview
- `--diff` → skip file writes, only update CHANGELOG with detected deltas vs previous run
- `--commit` → after writes, run `git add <output_path>` then commit with message:
  `docs(clay): document <scope_slug> · <date>`

## Step 11 — Report back

Summarize to the user:
1. **Scope detected** — e.g., "Folder mode · 2 workbooks · 6 tables · 10,061 rows"
2. **Output path** — absolute path
3. **Files written** — count, list anything unusual (truncated schemas, preserved WHY blocks)
4. **Patterns detected** — count + top 5 by name
5. **Top audit findings** — count, severity breakdown
6. **Total credits** — 30-day burn from audit
7. **Suggested next** — `open <output_path>/README.md` or `cat <output_path>/overview.md`

## Template placeholder conventions

| Syntax | Meaning |
|--------|---------|
| `{{var}}` | Simple variable substitution |
| `{{#each list}}...{{/each}}` | Repeat block per item |
| `{{#if cond}}...{{/if}}` | Conditional inclusion |
| `<!-- SECTION: name -->` | Claude writes free-form markdown here |
| `<!-- WHY: ... -->` | Human-fill stub, preserved across regens |
| `<!-- KEEP: ... -->` | Arbitrary human content, preserved across regens |
| `<!-- TRUNCATED: note -->` | Indicates data skipped due to size; user can check _raw/ |

## Graceful gap handling

- No AI actions → skip `prompts.md`; note in README as "No AI actions in this workflow"
- No outbound copy → write `copy.md` with empty-state template
- No write actions → skip `destinations.md`
- No `workspace_id` (table URL alone with no workbook context) → skip `cost.md`
- Audit call fails → continue; note "audit skipped" in README
- Schema overflow → best-effort extract + raw file saved + `<!-- TRUNCATED -->` markers

## Exit criteria

- All expected files exist under `output_path`
- No literal `{{` or `{{#` left in any output file
- Every concern file has working cross-reference anchors
- Frontmatter present on every file with `generated`, `workbook`, `workspace`
- If `--commit` was passed, a commit SHA is captured in the CHANGELOG entry
