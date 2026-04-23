<!-- pluxx:generated:start -->
# PlayKit

PlayKit plugin scaffold for setup and auth and workflow design workflows.

PlayKit connects to its MCP over HTTP. Export `PLAYKIT_API_KEY` so Pluxx can send X-API-Key.

## Workflow Guidance

- `setup-and-auth`: Confirm access, auth state, and session readiness before running operational workflows. Primary tools: `clay_connect`, `clay_status`.
- `workflow-design`: Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments. Primary tools: `brainstorm_play`, `claygent_prompts`, `design_clay`, `generate_icp`, `get_play_catalog`, `write_outreach`.
- `table-operations`: Build, inspect, run, document, and export tables, rows, and enrichment workflows. Primary tools: `clay_add_rows`, `clay_audit_table`, `clay_build_table`, `clay_build_webhook_table`, `clay_document_table`, `clay_export_data`, `clay_get_schema`, `clay_list_tables`, `clay_run_enrichments`.
- `provider-research`: Compare providers, integrations, and capability tradeoffs before choosing a workflow. Primary tools: `ask_clay`, `compare_providers`, `find_integrations`.
- `account-and-usage`: Check pricing, usage, limits, credits, and upgrade context for the current account. Primary tools: `clay_get_credits`, `get_pricing`, `get_tool_costs`, `get_usage`.

## Tool Routing

- `get_pricing`: Get PlayKit pricing tiers, per-tool costs, and checkout URLs.
- `get_tool_costs`: Get per-tool credit costs for all PlayKit MCP tools.
- `get_usage`: Get your current PlayKit usage, remaining credits, and tier info.
- `clay_connect`: Connect to Clay by providing your session cookie.
- `clay_status`: Check Clay API connection status.
- `clay_list_tables`: Browse Clay tables in a workspace or workbook.
- `clay_get_schema`: Get the full schema of a Clay table (columns, types, enrichments, formulas).
- `clay_add_rows`: Add rows to a Clay table.
- `clay_run_enrichments`: Run an enrichment column on records in a Clay table.
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
- `clay_build_table`: Build a complete Clay table from a spec — including action/enrichment columns.
- `clay_build_webhook_table`: Create a Clay table with a webhook source and optionally seed it with rows.
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
