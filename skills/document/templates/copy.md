---
doc_type: copy
audience: copywriter, ops
copy_pieces_count: {{copy_count}}
{{standard_frontmatter}}
---

# Copy

Every piece of templated, human-readable content this {{scope_type}} emits.
**If you rewrite copy, update here first**, then propagate into Clay.

{{#if copy_count_zero}}
## No templated copy in this workflow

This workflow does not currently emit any outbound copy (email, LinkedIn DM,
ad copy) or internal templated messages (Slack notifications, customer emails).

If copy gets added later, document it here using this shape:

### Template

    **Destination:** <channel/inbox>
    **Trigger:** <what fires it>
    **Template column:** <column name> (<table name>)
    **AI-synthesized section:** [prompts.md#N](prompts.md#...) (if any)

    ### Message shape
    <message body with {{placeholders}}>

    ### Tone notes
    <voice guidelines>

    ### Rewrite checklist
    - [ ] <constraint 1>
    - [ ] <constraint 2>
{{else}}

## Index

{{copy_index_table}}

---

{{#each copy_pieces}}

## {{number}}. {{name}}

**Destination:** {{destination}}
**Trigger:** {{trigger}}
**Template column:** `{{column_name}}` ({{table_name}})
{{#if ai_synth_ref}}**AI-synthesized section:** [`prompts.md#{{ai_ref}}`](prompts.md#{{ai_ref_anchor}}){{/if}}

### Message shape

{{message_shape}}

### Tone notes

<!-- SECTION: tone_notes_{{number}} -->

### Rewrite checklist

<!-- SECTION: rewrite_checklist_{{number}} -->

---

{{/each}}
{{/if}}

<!-- KEEP: additional copy context -->
