---
name: "table-operations"
description: "Build, inspect, patch, run, document, and export tables, rows, columns, sources, and enrichment workflows."
---

<!-- pluxx:generated:start -->
# Table Operations

Build, inspect, patch, run, document, and export tables, rows, columns, sources, and enrichment workflows.

## Tools In This Skill

### `clay_add_rows`


        Add rows to a Clay table.

        Accepts either column names or Clay field IDs as keys. Webhook-sourced
        tables still return their webhook URL for external systems, but this
        tool writes through Clay's records API so the table columns populate.

        Args:
            table_id: The table ID (e.g., "t_abc123").
            rows_json: JSON string — either a single object or an array of objects.
                Use column names (e.g., {"Company": "Acme"}) or field IDs
                (e.g., {"f_abc123": "Acme"}).

        Returns:
            Confirmation with number of rows added and method used.


Inputs:
- `table_id` (string, required)
- `rows_json` (string, required)
- `dry_run` (boolean)
- `scope` (string)
- `idempotency_key` (unknown)
- `allow_replay` (boolean)
- `include_webhook_url` (boolean)

### `clay_add_column`


        Create a new column on an existing Clay table.

        Supports basic typed columns, formula columns, and action/enrichment
        columns. Formula-bearing inputs can use human-readable
        {{Column Name}} references; PlayKit resolves them to Clay field IDs
        before sending the Clay API payload.

        If you do not know the exact action_key, action_package_id, or input
        params, call clay_find_actions first and then run this tool with
        dry_run=True before mutating the table.

        Args:
            table_id: A table ID (t_abc123), workbook/table URL, or other
                value accepted by clay_get_schema. Must resolve to one table.
            name: New column name.
            type: One of: text, number, date, url, checkbox, formula, action.
            data_type: Optional Clay data type override (for example "email"
                for formula outputs).
            insert_after: Optional field ID or exact column name to place the
                new column after.
            formula_text: Formula text for normal formula columns.
            formula_type: Formula mode, typically "text" or "waterfall".
            formula_waterfall: Native Clay waterfall step objects.
            waterfall_type: Clay waterfall category, for example
                "person/workEmail".
            truncate_value: Native Clay waterfall truncate flag.
            action_key: Action/enrichment slug such as "use-ai".
            action_version: Action version. Defaults to 1.
            action_package_id: Package UUID for action columns. If omitted,
                PlayKit will try to infer it from the bundled action catalog.
            auth_account_id: Optional connected-account ID for BYOA actions.
            inputs_binding: Clay action inputsBinding array.
            conditional_run_formula_text: Optional action conditional-run formula.
            run_as_button: When set on action columns, preserve Clay's
                runAsButton behavior in the created field config.
            resolve_references: When true, resolve known {{Column Name}}
                references in formulas and bindings.
            dry_run: When true, validate and preview the Clay payload without
                mutating the table.

        Returns:
            JSON summary of the new column or a dry-run payload preview.


Inputs:
- `table_id` (string, required)
- `name` (string, required)
- `type` (string, required)
- `data_type` (unknown)
- `insert_after` (unknown)
- `formula_text` (unknown)
- `formula_type` (unknown)
- `formula_waterfall` (unknown)
- `waterfall_type` (unknown)
- `truncate_value` (unknown)
- `action_key` (unknown)
- `action_version` (integer)
- `action_package_id` (unknown)
- `auth_account_id` (unknown)
- `inputs_binding` (unknown)
- `conditional_run_formula_text` (unknown)
- `run_as_button` (unknown)
- `resolve_references` (boolean)
- `dry_run` (boolean)
- `scope` (string)
- `idempotency_key` (unknown)
- `allow_replay` (boolean)

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
            table_spec_json: JSON object with either a direct table_name +
                columns array, or design_clay's {"tables": [...]} wrapper.
                Each column:
                - name: Column name (required)
                - type: text, url, number, formula, action, etc. (required)
                - formula: Formula text using {{Column Name}} refs (for type=formula)
                - formulaType: "waterfall" plus formulaWaterfall for native
                  Clay waterfall formula columns. Example:
                  {"name": "Work Email", "type": "formula", "formulaType": "waterfall",
                   "waterfallType": "person/workEmail", "dataType": "email",
                   "truncateValue": true,
                   "formulaWaterfall": [{"formula": "{{Find Work Email}}?.email"},
                                        {"formula": "{{Find Work Email (2)}}?.email"}]}
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
- `dry_run` (boolean)
- `scope` (string)
- `idempotency_key` (unknown)
- `allow_replay` (boolean)

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
                formula, native formula waterfall, and action columns with full
                dependency resolution.

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
            - External webhook submissions count toward the 50K limit.
            - Enterprise plans can enable auto-delete for unlimited submissions.


Inputs:
- `workspace_id` (integer, required)
- `table_spec_json` (string, required)
- `webhook_name` (unknown)
- `seed_rows_json` (unknown)
- `workbook_name` (unknown)
- `dry_run` (boolean)
- `scope` (string)
- `include_webhook_url` (boolean)
- `idempotency_key` (unknown)
- `allow_replay` (boolean)

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
            columns: Optional column names to include, either as a comma-separated
                string or a list of strings.
                Examples: "Company Name, Email, LinkedIn URL" or
                ["Company Name", "Email", "LinkedIn URL"]
            view_id: Optional view ID or exact view name. When provided,
                export rows from that specific view instead of auto-picking
                the first view with data.

        Returns:
            JSON with table info, column list, sample rows, and full data array.


Inputs:
- `table_id` (string, required)
- `max_rows` (unknown)
- `columns` (unknown)
- `view_id` (unknown)

### `clay_get_schema`


        Get the full schema of a Clay table (columns, types, enrichments, formulas).

        Returns complete table metadata including all fields/columns with their
        types, enrichment configurations, formula definitions, source/search
        configurations, and view information.

        Args:
            table_id: A table ID (t_abc123), workbook ID (wb_xyz), or full Clay URL.
                If a workbook ID or URL is passed, resolves to table(s) inside it.
            compact: When True, removes non-essential typeSettings fields to reduce
                payload size and avoid tool output overflow on large tables.
                When the default full response auto-compacts, PlayKit also
                includes a complete `columns_summary` inventory.
            include_prompts: When True, extracts AI action prompts into a top-level
                `prompts` array so prompt bodies are easy to access. When False,
                compact schema mode also omits prompt input bindings from
                per-column typeSettings; use clay_get_column for a selected
                column's full prompt/config.
            include_sample_rows: When True, includes up to sample_row_limit rows from
                the first view with data.
            include_sources: When True, fetches source metadata separately from
                Clay's source endpoint so Find Companies/Find People filters and
                source search config are visible when Clay exposes them.
            sample_row_limit: Number of sample rows to include when enabled. Capped at 5.

        Returns:
            JSON table schema with columns, types, sources, views, prompts, and sample rows.


Inputs:
- `table_id` (string, required)
- `compact` (boolean)
- `include_prompts` (boolean)
- `include_sample_rows` (unknown)
- `include_sources` (boolean)
- `sample_row_limit` (integer)

### `clay_get_columns`


        List every configured column in a Clay table without returning huge prompts.

        This is the safest inventory tool for large tables: it returns the
        complete table-level column list (including columns hidden in views by
        default) with order, IDs, names, types, and lightweight config signals.
        Use clay_get_column for one column's complete formula/action settings.

        Args:
            table_id: A table ID (t_abc123), table URL, or other value accepted
                by clay_get_schema. Must resolve to one table.
            include_hidden: When True (default), returns all configured table
                fields. When False, filters by the first view's visible/hidden
                field metadata if Clay exposes it.
            compact: When True, returns only order, id, name, type, and
                view-visibility metadata. When False, also includes formula text
                and action/source summary fields, but not full action prompts.

        Returns:
            JSON with table metadata, view IDs/names, and the complete column inventory.


Inputs:
- `table_id` (string, required)
- `include_hidden` (boolean)
- `compact` (boolean)

### `clay_get_column`


        Fetch one Clay column's complete configuration by name or field ID.

        Use this when a table is too large for clay_get_schema, or when you need
        the full untruncated formula/action configuration for a selected column:
        formulaText, formula waterfalls, action prompts, input bindings,
        conditional runs, and answer schemas.

        Args:
            table_id: A table ID (t_abc123), table URL, or other value accepted
                by clay_get_schema. Must resolve to one table.
            column: Exact column name (case-insensitive fallback) or field ID.

        Returns:
            JSON with table metadata and the selected column's full configuration.


Inputs:
- `table_id` (string, required)
- `column` (string, required)

### `clay_get_view`


        Fetch one Clay view with filters/sorts resolved to column names.

        Use this to inspect QA/filtering logic without opening the Clay UI.
        The response preserves Clay's original filter/sort structures and adds
        human-readable fieldName/columnName values next to field IDs whenever
        the referenced column exists in the table schema.

        Args:
            table_id: A table ID (t_abc123), table URL, or other value accepted
                by clay_get_schema. Must resolve to one table.
            view_id: View ID (gv_...) or exact view name.

        Returns:
            JSON with resolved filters, sorts, hidden/visible columns, and view metadata.


Inputs:
- `table_id` (string, required)
- `view_id` (string, required)

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
- `dry_run` (boolean)
- `scope` (string)
- `run_all_records` (boolean)
- `idempotency_key` (unknown)
- `allow_replay` (boolean)

### `clay_update_column`


        Update an existing Clay column's configuration.

        Use this to edit formulas, action input bindings, conditional runs,
        names, descriptions, and other field settings without rebuilding the
        table. Formula-bearing update values can use human-readable
        {{Column Name}} references; PlayKit resolves them to Clay field IDs.

        Args:
            table_id: A table ID (t_abc123), workbook/table URL, or other
                value accepted by clay_get_schema. Must resolve to one table.
            column: Column field ID (f_abc123) or exact column name.
            updates_json: JSON object with top-level field updates. You can
                provide either {"typeSettings": {...}} or ergonomic top-level
                type settings like {"inputsBinding": [...],
                "conditionalRunFormulaText": "..."}.
            resolve_references: When true, replace known {{Column Name}}
                references in formulaText, formula,
                formulaWaterfall[].formula, and conditionalRunFormulaText
                values with {{field_id}} refs.
            replace_inputs_binding: When false (default), merge action
                inputsBinding entries by binding name so updating one binding
                does not wipe the rest. Set true to replace the full
                inputsBinding array exactly as provided.

        Returns:
            JSON summary of the updated column and any Clay settings errors.


Inputs:
- `table_id` (string, required)
- `column` (string, required)
- `updates_json` (string, required)
- `resolve_references` (boolean)
- `replace_inputs_binding` (boolean)
- `dry_run` (boolean)
- `scope` (string)
- `idempotency_key` (unknown)
- `allow_replay` (boolean)

### `clay_update_source`


        Update a Clay source configuration, including Find People/Find Companies filters.

        Use clay_get_schema(table_id, include_sources=True) first, then pass the
        source ID, source name, source column ID, or source column name. If the
        table has exactly one source, `source` may be omitted.

        Args:
            table_id: A table ID (t_abc123), workbook/table URL, or other
                value accepted by clay_get_schema. Must resolve to one table.
            updates_json: JSON object with source updates. Mirror the nested
                source config returned by clay_get_schema, for example:
                {"state": {"filters": {"country": ["United States"]}}}
                or {"typeSettings": {"filters": {...}}}.
            source: Source ID/name or source column ID/name. Optional only when
                the table has exactly one source.
            merge_existing: When true, deep-merge nested dicts with the current
                source before PATCHing so partial filter updates preserve other
                source settings.

        Returns:
            JSON summary of the updated source and Clay's response.


Inputs:
- `table_id` (string, required)
- `updates_json` (string, required)
- `source` (unknown)
- `merge_existing` (boolean)
- `dry_run` (boolean)
- `scope` (string)
- `idempotency_key` (unknown)
- `allow_replay` (boolean)

## Example Requests

- "Find clay add rows using <table_id>."
- "Find clay add columns using <table_id>."
- "Find clay audit tables using <table_id>."
- "Find clay build tables using <workspace_id>."
- "Find clay build webhook tables using <workspace_id>."
- "Find clay document tables using <table_id>."
- "Find clay export datas using <table_id>."
- "Find clay get schemas using <table_id>."
- "Find clay get columns using <table_id>."
- "Find clay get views using <table_id>."
- "Find clay list tables."
- "Find clay run enrichments using <table_id>."
- "Find clay update columns using <table_id>."
- "Find clay update sources using <table_id>."

## Usage

- Pick the most specific tool in this skill for the user request.
- Gather required inputs before calling a tool.
- Summarize the returned data clearly instead of dumping raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
### `clay_get_schema` response handling

- For table inspection and documentation, call `clay_get_schema(table_id)` first. The tool returns top-level `prompts`, up to 5 `sample_rows`, `source_columns`, source/search config, and normalized view details by default, so use those fields before calling `clay_export_data` or asking the user for another extraction pass.
- If a table schema is large, `clay_get_schema` may return `auto_compacted: true`. That is expected: compacted `typeSettings` still preserve top-level AI prompt configs, source metadata, sample rows, and a complete `columns_summary` inventory.
- Use `compact=true` when the user wants a lighter schema overview. Add `include_prompts=false` to omit prompt bindings from compact per-column `typeSettings` and prevent huge AI prompts from crowding out later columns.
- Use `clay_get_columns(table_id)` for a complete ordered column inventory without huge prompts, `clay_get_column(table_id, column)` for one selected column's full formula/action/prompt config, and `clay_get_view(table_id, view_id)` for filter/sort QA. Use the default full schema mode when you need broad table reconstruction detail.
- Only call `clay_export_data(max_rows=...)` when the user explicitly needs more than the included sample rows or asks for row data beyond schema inspection.

### Patching existing tables

- Before changing table structure, inspect with `clay_get_schema(table_id)` or, for large tables/specific columns, `clay_get_columns(table_id)` plus `clay_get_column(table_id, column)`.
- For action columns with unknown or uncertain metadata, call `clay_find_actions` first to resolve the exact `action_key`, `action_package_id`, version, data type, and input parameter names. Do not brute-force `clay_get_schema` or `find_integrations` just to discover action IDs.
- Use `clay_add_column` when the requested column does not exist yet. Prefer `dry_run=true` first for action columns, AI columns, Instantly columns, native waterfall formula columns, or any column that depends on multiple existing fields. The action workflow is `clay_find_actions` -> `clay_add_column(..., dry_run=true)` -> review the preview -> mutation.
- Before `clay_update_column`, inspect the target column and use the exact column name or field ID. Prefer small `updates_json` patches over rebuilding a table when the user asks to change a prompt, formula, input binding, conditional run, description, or native waterfall config.
- If `clay_update_column` changes an action binding and the package/action metadata is incomplete, use `clay_find_actions` before patching. Do not invent `actionKey` or `actionPackageId` values on low confidence.
- `clay_update_column` resolves `{{Column Name}}` references in `formulaText`, `formula`, `formulaWaterfall[].formula`, and `conditionalRunFormulaText` by default. Keep `resolve_references=true` unless the user intentionally provides Clay field IDs.
- Before `clay_update_source`, inspect with `clay_get_schema(table_id, include_sources=true)`. Patch the returned nested source shape and leave `merge_existing=true` for partial filter/config edits so existing source settings are not dropped.

### Build and row semantics

- `clay_build_table` accepts both a direct single-table spec and `design_clay`'s `{"tables": [...]}` wrapper. Use native Clay waterfalls as formula columns with `formulaType="waterfall"`, `waterfallType`, optional `truncateValue`, and `formulaWaterfall`.
- `clay_add_rows` now accepts either human column names or field IDs. Webhook-sourced tables return their webhook URL for external systems, but inserted rows go through Clay's records API so created columns populate.
<!-- pluxx:custom:end -->
