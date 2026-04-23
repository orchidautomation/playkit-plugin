---
description: "Generate client-ready, agent-parseable documentation for any Clay workflow (tables, workbooks, folders, or multi-URL pipelines)."
argument-hint: "<clay-url> [<url2> ...] [--for client|engineer] [--quick] [--commit] [--pipeline-name <slug>] [--out <path>]"
---

Use the `clay-doc` skill.

Arguments: $ARGUMENTS

## What To Do

1. Invoke the `clay-doc` skill and follow its 11-step orchestration exactly.
2. Treat `$ARGUMENTS` as one or more Clay URLs plus optional flags.
3. Before calling any Clay API tool, verify the MCP connection with `clay_status`. If not connected, tell the user to run `clay_connect(session_cookie="...")` first and STOP.
4. Parallelize per-table fetches (`clay_get_schema` + `clay_document_table` + `clay_audit_table`).
5. Preserve any existing `<!-- WHY: -->` and `<!-- KEEP: -->` blocks on regen.
6. Report scope detected, output path, files written, patterns detected, top audit findings, and 30-day credit burn.
