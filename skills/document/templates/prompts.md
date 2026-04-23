---
doc_type: prompts
audience: engineer, qa
ai_actions_count: {{ai_action_count}}
{{standard_frontmatter}}
---

# AI Prompts

Every AI Action in this {{scope_type}} with full prompts, models, input bindings,
output schemas, and cost parameters. **Source of truth — other docs link here.**

## Index

{{prompt_index_table}}

---

{{#each prompts}}

## {{number}}. {{name}}

**Column:** `{{column_name}}` (col {{column_index}} in [{{table_name}}](tables/{{table_slug}}.md))
**Column ID:** `{{column_id}}`
**Model:** `{{model}}`
**runBudget:** {{run_budget}} · **JSON mode:** {{json_mode}}
{{#if conditional_run}}**Conditional run:** `{{conditional_run}}`{{/if}}
{{#if auth_account}}**Auth account:** `{{auth_account}}`{{/if}}

### Why it exists
<!-- SECTION: prompt_purpose_{{number}} -->

### System prompt

> {{system_prompt_blockquoted}}

### Input bindings

{{#each inputs}}
- `{{input_name}}` ← `{{source_reference}}`{{#if col_index}} (col {{col_index}}){{/if}}
{{/each}}

### Output schema

```json
{{output_schema}}
```

### Used by

{{#each downstream}}
- `{{downstream_name}}` ({{downstream_location}})
{{/each}}

---

{{/each}}

## Prompt health

Automated checks across all {{ai_action_count}} prompts:

<!-- SECTION: prompt_health -->

## Change log
(Populated by /document across regenerations.)

<!-- SECTION: prompt_changelog -->

<!-- KEEP: additional prompt notes -->
