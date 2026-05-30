<!-- pluxx:generated:start -->
# PlayKit

Clay expertise for your AI editor: design workflows, build tables, audit workbooks, patch live Clay tables, and generate client-ready docs with PlayKit.

PlayKit connects to its MCP over HTTP. Provide `PLAYKIT_API_KEY` through the host secret flow or an environment reference so Pluxx can send X-API-Key without writing the secret into plugin files.

## Workflow Guidance

- `setup-and-auth`: Confirm access, auth state, and session readiness before running operational workflows. Primary tools: `clay_connect`, `clay_status`.
- `workflow-design`: Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments. Primary tools: `brainstorm_play`, `claygent_prompts`, `design_clay`, `generate_icp`, `get_play_catalog`, `write_outreach`.
- `table-operations`: Build, inspect, patch, run, document, and export tables, rows, columns, sources, and enrichment workflows. Primary tools: `clay_add_rows`, `clay_add_column`, `clay_audit_table`, `clay_build_table`, `clay_build_webhook_table`, `clay_document_table`, `clay_export_data`, `clay_get_schema`, `clay_get_columns`, `clay_get_column`, `clay_get_view`, `clay_list_tables`, `clay_run_enrichments`, `clay_update_column`, `clay_update_source`.
- `provider-research`: Compare providers, integrations, and capability tradeoffs before choosing a workflow. Primary tools: `ask_clay`, `compare_providers`, `find_integrations`.
- `account-and-usage`: Check pricing, usage, limits, credits, and upgrade context for the current account. Primary tools: `clay_get_credits`, `get_pricing`, `get_tool_costs`, `get_usage`.

## Tool Routing

- `get_pricing`: Get PlayKit pricing tiers, per-tool costs, and checkout URLs.
- `get_tool_costs`: Get per-tool credit costs for all PlayKit MCP tools.
- `get_usage`: Get your current PlayKit usage, remaining credits, and tier info.
- `clay_connect`: Check whether Clay access is already configured and, when needed, return a short-lived browser connection URL. Do not ask the user to paste a Clay session cookie into chat.
- `clay_status`: Check Clay API connection status.
- `clay_list_tables`: Browse Clay tables in a workspace or workbook.
- `clay_get_schema`: Get table schema, prompts, sample rows, source/search config, source columns, and view details. In compact mode with `include_prompts=false`, prompt bindings are omitted to avoid oversized responses.
- `clay_get_columns`: List every configured table column in order without huge prompts.
- `clay_get_column`: Fetch one selected column's full formula/action/prompt configuration.
- `clay_get_view`: Inspect one view with filters/sorts resolved to column names.
- `clay_add_rows`: Add rows to a Clay table using column names or field IDs.
- `clay_add_column`: Create a new column on an existing Clay table, including typed, formula, native waterfall, and action columns.
- `clay_run_enrichments`: Run an enrichment column on records in a Clay table.
- `clay_update_column`: Update an existing Clay column's configuration.
- `clay_update_source`: Update a Clay source configuration, including Find People/Find Companies filters.
- `clay_export_data`: Export row data from a Clay table as JSON.
- `clay_get_credits`: Get Clay credit usage report for a workspace.
- `ask_clay`: Ask any question about Clay.
- `find_integrations`: Find Clay integrations — by name OR by capability filters.
- `compare_providers`: Compare Clay data providers for a specific use case.
- `get_play_catalog`: Discover plays and patterns from the PlayKit catalog.
- `brainstorm_play`: Brainstorm creative Clay plays for a GTM use case.
- `claygent_prompts`: Generate thorough, human-like AI prompts for Clay workflows.
- `design_clay`: Design a complete Clay workflow — from single tables to multi-table architectures.
- `write_outreach`: Generate personalized outreach copy using Clay enrichment data.
- `generate_icp`: Generate an Ideal Customer Profile (ICP) for a company.
- `clay_build_table`: Build one or more Clay tables from a spec, including native waterfall formula columns and action/enrichment columns.
- `clay_build_webhook_table`: Create a Clay table with a webhook source and optionally seed it through the table API.
- `clay_audit_table`: Audit a Clay table and recommend optimizations.
- `clay_document_table`: Generate beautiful, shareable documentation of a Clay table.

## Operating Notes

- Prefer the most specific tool that matches the user request.
- If the MCP exposes resources or prompt templates, use them as canonical context before improvising your own workflow.
- Confirm required inputs before calling a tool.
- Summarize returned data instead of dumping raw JSON unless the user asks for it.

## User Config

- `playkit-api-key` (Playkit Api Key; secret, required) — env: `PLAYKIT_API_KEY`: Authentication credential for the clay-knowledge MCP server.
<!-- pluxx:generated:end -->

## Custom Instructions

<!-- pluxx:custom:start -->
Add custom plugin instructions here. This section is preserved across `pluxx sync --from-mcp`.
<!-- pluxx:custom:end -->
