---
description: "Build, inspect, run, document, and export tables, rows, and enrichment workflows."
argument-hint: "[id] [rows-json]"
---

<!-- pluxx:generated:start -->
Use this command when the user asks to build, inspect, run, document, and export tables, rows, and enrichment workflows.

Arguments: $ARGUMENTS

Primary tools:
- `clay_add_rows`
- `clay_audit_table`
- `clay_build_table`
- `clay_build_webhook_table`
- `clay_document_table`
- `clay_export_data`
- `clay_get_schema`
- `clay_list_tables`
- `clay_run_enrichments`

Workflow:

1. Interpret `$ARGUMENTS` as the user request for this workflow.
2. Choose the most specific tool in this surface.
3. Ask for missing required inputs only if the request does not already provide them.
4. Return a concise task-focused answer instead of raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Add custom guidance, examples, or caveats here. This section is preserved across `pluxx sync --from-mcp`.
<!-- pluxx:custom:end -->
