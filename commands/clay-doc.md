---
description: "Generate client-ready, agent-parseable documentation for any Clay workflow (tables, workbooks, folders, or multi-URL pipelines)."
argument-hint: "<clay-url> [<url2> ...] [--for client|engineer] [--quick] [--commit] [--pipeline-name <slug>] [--out <path>]"
---

Use the `clay-doc` skill.

Arguments: $ARGUMENTS

## What To Do

1. Invoke the `clay-doc` skill and follow its 11-step orchestration exactly.
2. Treat `$ARGUMENTS` as one or more Clay URLs plus optional flags.
3. Before calling any Clay API tool, verify the MCP connection with `clay_status`. If not connected, run `clay_connect`, give the user the returned `connect_url`, tell them to paste the Clay cookie only into that browser page, and STOP until `clay_status` reports connected. Do not ask for a Clay session cookie in chat.
4. Parallelize per-table fetches (`clay_get_schema` + `clay_document_table` + `clay_audit_table`).
5. Use `clay_get_schema` top-level `prompts`, up to 5 `sample_rows`, source/search config, source columns, and view details before falling back to raw schema traversal or export calls. For large/truncated tables, use `clay_get_columns` for full ordered inventory and `clay_get_column` for the full config/formula/prompt of selected columns.
6. Preserve any existing `<!-- WHY: -->` and `<!-- KEEP: -->` blocks on regen.
7. Report scope detected, output path, files written, patterns detected, top audit findings, and 30-day credit burn.
