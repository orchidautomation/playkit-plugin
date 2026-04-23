---
doc_type: workbook
workbook: {{workbook_name}}
workbook_id: {{workbook_id}}
tables_count: {{table_count}}
total_rows: {{total_rows}}
{{standard_frontmatter}}
---

# {{workbook_name}}

**{{table_count}} tables** · {{total_rows}} rows
[Open in Clay ↗]({{workbook_url}})

## What this workbook does
<!-- SECTION: workbook_purpose -->

## Tables

{{#each tables}}
- [{{table_name}}](../tables/{{table_slug}}.md) — {{row_count}} rows, {{column_count}} cols · {{one_liner}}
{{/each}}

## Where this fits in the pipeline
<!-- SECTION: pipeline_role -->

See [`../build.md`](../build.md) for the full pipeline architecture and
[`../architecture.md`](../architecture.md) for cross-workbook edges.

<!-- KEEP: additional workbook-specific notes -->
