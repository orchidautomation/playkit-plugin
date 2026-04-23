---
doc_type: destinations
audience: integrations, engineer
{{standard_frontmatter}}
---

# Destinations

Where data exits this {{scope_type}}.

{{#each destinations}}

## {{destination_name}}

**Type:** {{destination_type}}
{{#if auth_account}}**Auth account:** `{{auth_account}}`{{/if}}
**Used by:** {{used_by_columns}}

{{#if field_map}}
### Field map

{{field_map_table}}
{{/if}}

{{#if http_method}}
### Request

- **Method:** {{http_method}}
- **URL:** `{{http_url}}`
- **Retries:** {{retries_enabled}}
- **Follow redirects:** {{follow_redirects}}
{{/if}}

{{#if http_body}}
### Request body (verbatim)

```json
{{http_body}}
```
{{/if}}

{{#if channel_info}}
### Channel info

{{channel_info}}
{{/if}}

<!-- SECTION: destination_notes_{{destination_slug}} -->

---

{{/each}}

<!-- KEEP: additional destination context -->
