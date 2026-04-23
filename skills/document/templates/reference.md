---
doc_type: reference
audience: anyone
{{standard_frontmatter}}
---

# Reference

The appendix. IDs, URLs, auth accounts, column ID lookup. Grep this when
debugging.

## Workspace

- **Name:** {{workspace_name}}
- **ID:** `{{workspace_id}}`
- **Plan:** {{workspace_plan}}
- **URL:** {{workspace_url}}

## Workbooks

{{#each workbooks}}

### {{workbook_name}}

- **ID:** `{{workbook_id}}`
- **URL:** {{workbook_url}}
- **Tables:** {{table_count}}

{{/each}}

## Tables

{{tables_reference_table}}

## Auth accounts referenced

{{auth_accounts_table}}

## Column ID lookup

{{#each tables}}

### {{table_name}}

```
{{columns_id_name_list}}
```

{{/each}}

<!-- KEEP: additional reference material -->
