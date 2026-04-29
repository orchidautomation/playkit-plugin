---
name: "table-operations"
description: "Build, inspect, run, document, and export tables, rows, and enrichment workflows."
---

<!-- pluxx:generated:start -->
# Table Operations

Build, inspect, run, document, and export tables, rows, and enrichment workflows.

## Tools In This Skill

### `clay_add_rows`


        Add rows to a Clay table.

        Automatically detects webhook-sourced tables and routes data through
        the webhook URL (using column names as keys). For non-webhook tables,
        uses the direct API (requires column field IDs from clay_get_schema).

        Args:
            table_id: The table ID (e.g., "t_abc123").
            rows_json: JSON string — either a single object or an array of objects.
                For webhook tables: use column names as keys (e.g., {"Company": "Acme"}).
                For regular tables: use field IDs as keys (e.g., {"f_abc123": "Acme"}).

        Returns:
            Confirmation with number of rows added and method used (webhook or api).
        

Inputs:
- `table_id` (string, required)
- `rows_json` (string, required)

### `clay_audit_table`


        Audit a Clay table and recommend optimizations. PlayKit-exclusive.

        Performs deep analysis of column architecture, enrichment strategy, cost
        efficiency, AI tool selection, waterfall patterns, and anti-patterns.
        Returns a scored audit with actionable recommendations.

        Uses PlayKit's full methodology: integration graph (215 providers),
        knowledge base (1,834+ docs), skills (29 vertical/horizontal), and
        building blocks catalog.

        Args:
            table_id: A table ID (t_abc123), workbook ID (wb_xyz), or full Clay URL.
            workspace_id: Optional workspace ID. If provided, includes actual credit
                usage data in the audit. Get from clay_list_tables.
            depth: "quick" — fast programmatic checks only (no LLM, <5s).
                "deep" (default) — full audit with agent analysis, strategic
                recommendations, and knowledge base cross-reference (~15-30s).
            response_format: "markdown" (default) preserves the historical tool
                contract. Use "json" to return a structured payload with the
                markdown report in `result` and parsed credit usage in
                `credit_usage`.

        Returns:
            Markdown audit report by default, or a JSON envelope when
            response_format="json".
        

Inputs:
- `table_id` (string, required)
- `workspace_id` (unknown)
- `depth` (string)
- `response_format` (string)

### `clay_build_table`


        Build a complete Clay table from a spec — including action/enrichment columns.

        This is the final step in the brainstorm → design → build loop.
        Takes a build spec JSON (from design_clay or hand-crafted) and creates
        everything in Clay via API: workbook, table, input columns, formulas,
        and action columns (enrichments, AI actions, waterfalls) with full
        input bindings and conditional run logic.

        Args:
            workspace_id: The numeric workspace ID.
            table_spec_json: JSON object with table_name and columns array. Each column:
                - name: Column name (required)
                - type: text, url, number, formula, action, etc. (required)
                - formula: Formula text using {{Column Name}} refs (for type=formula)
                - actionKey: Enrichment slug (for type=action), e.g. "enrich-company-with-mixrank-v2"
                - actionVersion: Action version, default 1 (for type=action)
                - actionPackageId: Package UUID (for type=action, optional)
                - inputsBinding: List of {"name": ..., "formulaText": ...} (for type=action)
                - conditionalRunFormulaText: When to run (for type=action, optional)

                Example:
                {
                    "table_name": "My Table",
                    "columns": [
                        {"name": "Domain", "type": "text"},
                        {"name": "Enrich", "type": "action", "actionKey": "enrich-company-with-mixrank-v2",
                         "inputsBinding": [{"name": "company_identifier", "formulaText": "{{Domain}}"}]},
                        {"name": "Industry", "type": "formula", "formula": "{{Enrich}}?.industry"}
                    ]
                }
            workbook_name: Optional workbook name. Defaults to table_name.

        Returns:
            JSON with table URL, columns created/failed, and field ID mapping.
        

Inputs:
- `workspace_id` (integer, required)
- `table_spec_json` (string, required)
- `workbook_name` (unknown)

### `clay_build_webhook_table`


        Create a Clay table with a webhook source and optionally seed it with rows.

        One call does everything: creates a workbook, table, columns (with full
        dependency resolution), attaches a webhook source, retrieves the webhook URL,
        and optionally populates initial rows. The returned webhook URL can be used
        to programmatically POST data to Clay from any external system.

        Args:
            workspace_id: The numeric workspace ID.
            table_spec_json: JSON object with table_name and columns array.
                Same format as clay_build_table — supports text, url, number,
                formula, action columns with full dependency resolution.

                Example:
                {
                    "table_name": "Inbound Leads",
                    "columns": [
                        {"name": "Company", "type": "text"},
                        {"name": "Domain", "type": "url"},
                        {"name": "Contact Email", "type": "text"},
                        {"name": "Source", "type": "text"},
                        {"name": "Enrich Company", "type": "action",
                         "actionKey": "enrich-company-with-mixrank-v2",
                         "inputsBinding": [{"name": "company_identifier", "formulaText": "{{Domain}}"}]}
                    ]
                }
            webhook_name: Display name for the webhook source (default: "Webhook").
            seed_rows_json: Optional JSON array of row objects to insert after table
                creation. Keys are column names (not field IDs — auto-translated).

                Example:
                [
                    {"Company": "Acme Corp", "Domain": "acme.com", "Contact Email": "jane@acme.com"},
                    {"Company": "Globex", "Domain": "globex.com", "Contact Email": "bob@globex.com"}
                ]
            workbook_name: Optional workbook name. Defaults to table_name.

        Returns:
            JSON with table URL, webhook URL, curl example, columns created,
            seed row status, and the 50K submission limit warning.

        Notes:
            - Webhook URLs have a 50,000 submission lifetime limit on standard plans.
            - Bursts >100 events/minute will queue.
            - Seed rows count toward the 50K limit.
            - Enterprise plans can enable auto-delete for unlimited submissions.
        

Inputs:
- `workspace_id` (integer, required)
- `table_spec_json` (string, required)
- `webhook_name` (unknown)
- `seed_rows_json` (unknown)
- `workbook_name` (unknown)

### `clay_document_table`


        Generate beautiful, shareable documentation of a Clay table.

        Creates a complete document with ASCII-art diagrams showing the table's
        column architecture, data flow, enrichment chains, waterfall patterns,
        and conditional logic. Designed for git tracking and client sharing.

        Args:
            table_id: A table ID (t_abc123), workbook ID (wb_xyz), or full Clay URL.
            output_format: "full" (default) — complete doc with all sections and diagrams.
                "compact" — shorter version with column table + flow diagram only.
            response_format: "markdown" (default) preserves the historical tool
                contract. Use "json" to return a structured payload with the
                rendered markdown in `result` and parsed documentation data in
                `data`.

        Returns:
            Markdown documentation by default, or a JSON envelope when
            response_format="json".
        

Inputs:
- `table_id` (string, required)
- `output_format` (string)
- `response_format` (string)

### `clay_export_data`


        Export row data from a Clay table as JSON.

        Fetches all (or limited) rows with human-readable column names.
        Returns a summary with sample rows and full data.

        Args:
            table_id: A table ID (t_abc123), workbook ID (wb_xyz), or full Clay URL.
                If a workbook ID or URL is passed, resolves to the first table and exports its data.
            max_rows: Maximum number of rows to export. Omit for all rows.
            columns: Optional comma-separated column names to include.
                Example: "Company Name, Email, LinkedIn URL"

        Returns:
            JSON with table info, column list, sample rows, and full data array.
        

Inputs:
- `table_id` (string, required)
- `max_rows` (unknown)
- `columns` (unknown)

### `clay_get_schema`


        Get the full schema of a Clay table (columns, types, enrichments, formulas).

        Returns complete table metadata including all fields/columns with their
        types, enrichment configurations, formula definitions, and view information.

        Args:
            table_id: A table ID (t_abc123), workbook ID (wb_xyz), or full Clay URL.
                If a workbook ID or URL is passed, resolves to table(s) inside it.
            compact: When True, removes non-essential typeSettings fields to reduce
                payload size and avoid tool output overflow on large tables.

        Returns:
            JSON table schema with columns, types, sources, and views.
        

Inputs:
- `table_id` (string, required)
- `compact` (boolean)

### `clay_list_tables`


        Browse Clay tables in a workspace or workbook. Accepts any Clay URL.

        Just paste a Clay URL and this tool figures out what to show you:
        - Folder URL → lists all workbooks/tables in that folder (recursive)
        - Workbook URL → lists all tables in the workbook
        - Table URL → returns the table's column schema
        - Workspace URL → lists all resources (tables, workbooks, folders)

        Next steps after listing tables:
        - To read a table's schema: clay_get_schema(table_id)
        - To audit a table for optimizations: clay_audit_table(table_id)
        - To document a table with ASCII diagrams: clay_document_table(table_id)
        - To export data from a table: clay_export_data(table_id)

        Args:
            workspace_id: The numeric workspace ID. Omit to list available workspaces.
            search: Optional search query to filter resources by name.
            url: Optional Clay URL. Supports:
                - Workbook URL: https://app.clay.com/workspaces/123/workbooks/wb_abc/...
                  → lists all tables in that workbook
                - Folder URL: https://app.clay.com/workspaces/123/folders/f_abc/...
                  → lists all workbooks/tables under that folder (recursive)
                - Workspace URL: https://app.clay.com/workspaces/123/...
                  → lists all resources in that workspace
                - Table URL: https://app.clay.com/workspaces/123/workbooks/wb_abc/tables/t_xyz
                  → returns that table's info directly
            include_archived: Include archived folders/workbooks/tables in results.
                Default is False (archived resources are excluded).

        Returns:
            JSON list of tables/resources.
        

Inputs:
- `workspace_id` (unknown)
- `search` (unknown)
- `url` (unknown)
- `include_archived` (boolean)

### `clay_run_enrichments`


        Run an enrichment column on records in a Clay table.

        Triggers an enrichment provider to run on records in a specific view.
        Use clay_get_schema to find field IDs and view IDs.

        Args:
            table_id: The table ID.
            view_id: The view ID (e.g., "gv_xxx"). Records in this view will be enriched.
            field_id: The enrichment column/field ID to run.
            num_records: Optional limit on number of records to enrich. Omit for all.

        Returns:
            Enrichment run confirmation.
        

Inputs:
- `table_id` (string, required)
- `view_id` (string, required)
- `field_id` (string, required)
- `num_records` (unknown)

## Example Requests

- "Find clay add rows using <table_id>."
- "Find clay audit tables using <table_id>."
- "Find clay build tables using <workspace_id>."
- "Find clay build webhook tables using <workspace_id>."
- "Find clay document tables using <table_id>."
- "Find clay export datas using <table_id>."
- "Find clay get schemas using <table_id>."
- "Find clay list tables."
- "Find clay run enrichments using <table_id>."

## Usage

- Pick the most specific tool in this skill for the user request.
- Gather required inputs before calling a tool.
- Summarize the returned data clearly instead of dumping raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
### `clay_get_schema` response handling

- For table inspection and documentation, call `clay_get_schema(table_id)` first. The tool now returns top-level `prompts` and up to 5 `sample_rows` by default, so you should use those fields before calling `clay_export_data` or asking the user for another extraction pass.
- If a table schema is large, `clay_get_schema` may return `auto_compacted: true`. That is expected: compacted `typeSettings` still preserve top-level AI prompt configs and sample rows.
- Use `compact=true` when the user wants a lighter schema overview. Use the default full mode when you need formulas, action settings, and table reconstruction detail.
- Only call `clay_export_data(max_rows=...)` when the user explicitly needs more than the included sample rows or asks for row data beyond schema inspection.
<!-- pluxx:custom:end -->
