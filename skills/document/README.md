# /document skill

Claude Code skill that generates a client-ready documentation scaffold for
any Clay workflow. Orchestrates PlayKit MCP tools to pull live schemas,
AI prompts, HTTP payloads, and audit findings, then fills markdown templates
to produce a concern-first doc folder.

## Invocation

```
/document <clay-url>
/document <url1> <url2> ... --pipeline-name my-pipeline
/document <url> --for client
/document <url> --commit
```

## Input modes

| URL             | Scope                            |
|-----------------|----------------------------------|
| Table URL       | Single table (one `tables/*.md`) |
| Workbook URL    | One workbook, full scaffold      |
| Folder URL      | Entire Clay folder, full scaffold|
| Multiple URLs   | Ad-hoc pipeline grouping         |

## Files in this skill

- `SKILL.md` — orchestration logic Claude follows when `/document` is invoked
- `templates/*.md` — output skeletons with `{{placeholder}}` and `<!-- SECTION: -->` markers
- This `README.md` — quick orientation

## Output shape

See `docs/brainstorms/clay-document-skill.md` for the full design, including
the concern-first organizing principle, detected-pattern list, 4-phase build
plan, and MCP backend asks.

## Test workbooks

Developed and validated against:
- `wb_0tctxd0SzjqzfMq6kzC` — Monitor LinkedIn Posts (single-workbook, dual-AI consensus)
- `wb_0tcq09dwgd3ngZBpGwc` — Company + People Qualification (3 tables, hub-spoke)

Both live in Rillet workspace (477473).

## Regeneration safety

Rerun `/document <url>` any time. Human-edited `<!-- WHY: -->` and
`<!-- KEEP: -->` blocks are preserved across regenerations. Drift is logged
to `CHANGELOG.md`.
