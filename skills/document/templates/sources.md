---
doc_type: sources
audience: integrations, engineer
{{standard_frontmatter}}
---

# Sources

Where data enters this {{scope_type}}.

{{#each sources}}

## {{number}}. {{name}}

**Type:** {{type}} ({{source_kind}})
**Column:** `{{column_name}}` (col {{column_index}} in [{{table_name}}](tables/{{table_slug}}.md))
**Source ID:** `{{source_id}}`
{{#if cadence}}**Cadence:** {{cadence}}{{/if}}
{{#if upstream_tool}}**Upstream tool:** {{upstream_tool}}{{/if}}

{{#if schema_fields}}
### Schema fields

{{schema_fields_list}}
{{/if}}

{{#if notes}}
<!-- SECTION: source_notes_{{number}} -->
{{/if}}

---

{{/each}}

<!-- KEEP: additional source context -->
