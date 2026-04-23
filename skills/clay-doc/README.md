# /clay-doc skill

Claude Code skill that generates a client-ready documentation scaffold for
any Clay workflow. Orchestrates PlayKit MCP tools to pull live schemas,
AI prompts, HTTP payloads, and audit findings, then fills markdown templates
to produce a concern-first doc folder.

## Invocation

```
/clay-doc <clay-url>
/clay-doc <url1> <url2> ... --pipeline-name my-pipeline
/clay-doc <url> --for client
/clay-doc <url> --commit
```

## Input modes

| URL             | Scope                            |
|-----------------|----------------------------------|
| Table URL       | Single table (one `tables/*.md`) |
| Workbook URL    | One workbook, full scaffold      |
| Folder URL      | Entire Clay folder, full scaffold|
| Multiple URLs   | Ad-hoc pipeline grouping         |

## Files in this skill

- `SKILL.md` — orchestration logic Claude follows when `/clay-doc` is invoked
- `templates/*.md` — output skeletons with `{{placeholder}}` and `<!-- SECTION: -->` markers
- This `README.md` — quick orientation

## Output shape

Concern-first folder (not table-first). One file per concern — README,
overview (client-facing), build (architecture + WHY), prompts (every AI
prompt centralized), copy (templated outbound text), sources, destinations,
audit, cost, rebuild, reference, CHANGELOG — plus per-table summaries under
`tables/` and per-workbook summaries under `workbooks/` (folder/multi-URL
mode only). Full orchestration logic lives in `SKILL.md`.

## Test workbooks

Developed and validated against:
- `wb_0tctxd0SzjqzfMq6kzC` — Monitor LinkedIn Posts (single-workbook, dual-AI consensus)
- `wb_0tcq09dwgd3ngZBpGwc` — Company + People Qualification (3 tables, hub-spoke)

Both live in Rillet workspace (477473).

## Regeneration safety

Rerun `/clay-doc <url>` any time. Human-edited `<!-- WHY: -->` and
`<!-- KEEP: -->` blocks are preserved across regenerations. Drift is logged
to `CHANGELOG.md`.
