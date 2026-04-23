---
doc_type: table
table: {{table_name}}
table_id: {{table_id}}
workbook: {{workbook_name}}
workbook_id: {{workbook_id}}
rows: {{row_count}}
columns: {{column_count}}
{{standard_frontmatter}}
---

# {{table_name}}

**{{column_count}} columns** · {{row_count}} rows · Source: {{source_description}}
[Open in Clay ↗]({{table_url}})

## Purpose

<!-- SECTION: purpose -->

## Shape (phases)

{{#each phases}}
{{phase_number}}. **{{phase_name}}** (cols {{column_range}}) — {{phase_description}}
{{/each}}

## Where things live

- **AI prompts** → [`../prompts.md`](../prompts.md){{#if prompt_anchors}} · anchors: {{prompt_anchors}}{{/if}}
- **HTTP payloads** → [`../destinations.md`](../destinations.md){{#if destination_anchors}} · anchors: {{destination_anchors}}{{/if}}
- **Audit findings** → [`../audit.md`](../audit.md){{#if audit_anchors}} · anchors: {{audit_anchors}}{{/if}}
- **Copy templates** → [`../copy.md`](../copy.md){{#if copy_anchors}} · anchors: {{copy_anchors}}{{/if}}
- **Column IDs** → [`../reference.md#{{reference_anchor}}`](../reference.md#{{reference_anchor}})

## Column registry

Thin registry — full IDs in `reference.md`. Phase / purpose of each column:

{{column_registry_table}}

## Views

{{#if views}}
{{views_list}}
{{else}}
Only default view.
{{/if}}

<!-- KEEP: additional table-specific notes -->
