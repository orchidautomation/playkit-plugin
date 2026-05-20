---
description: "Build, inspect, patch, run, document, and export Clay tables, rows, columns, sources, and enrichment workflows."
when_to_use: "Use this command when the user asks to build, inspect, patch, run, document, or export Clay tables, rows, columns, sources, and enrichment workflows."
argument-hint: [id] [rows-json|updates-json]
arguments: ["id","rows-json|updates-json"]
skill: "table-operations"
---

<!-- pluxx:generated:start -->
Use this command when the user asks to build, inspect, patch, run, document, and export Clay tables, rows, columns, sources, and enrichment workflows.

Arguments: $ARGUMENTS

Primary tools:
- `clay_add_rows`
- `clay_audit_table`
- `clay_build_table`
- `clay_build_webhook_table`
- `clay_document_table`
- `clay_export_data`
- `clay_get_schema`
- `clay_get_columns`
- `clay_get_column`
- `clay_get_view`
- `clay_list_tables`
- `clay_run_enrichments`
- `clay_update_column`
- `clay_update_source`

Workflow:

1. Interpret `$ARGUMENTS` as the user request for this workflow.
2. Choose the most specific tool in this surface.
3. Ask for missing required inputs only if the request does not already provide them.
4. Return a concise task-focused answer instead of raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
When inspecting a table, start with `clay_get_schema(table_id)`. It includes top-level `prompts`, up to 5 `sample_rows`, source/search config, source columns, and normalized view details by default. For large tables, use `clay_get_columns` for the complete ordered inventory; use `clay_get_column` when you need the full formula/action/prompt config for one selected column; use `clay_get_view` for filter/sort QA. Use `clay_update_column` for prompt/formula/action binding/conditional-run edits and `clay_update_source` for Find People/Find Companies source filter changes; call `clay_export_data` only when the user needs additional rows.
<!-- pluxx:custom:end -->
