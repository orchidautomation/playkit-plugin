---
doc_type: build
audience: engineer
{{standard_frontmatter}}
---

# Build — how this {{scope_type}} is architected

## The pipeline in one diagram

```
{{ascii_dag}}
```

## Flow narrative
<!-- SECTION: flow_narrative -->

## Patterns detected

The skill detected these patterns in the schema. Each gets a paragraph: what
it is, where it shows up, why it's smart or a watch-out.

<!-- SECTION: patterns -->

## Design rationale

### Auto-detected
<!-- SECTION: auto_rationale -->

### Human-override
The items below are judgments the schema can't tell us. Fill in below and
they'll be preserved on regen.

<!-- WHY: [e.g., "why MixRank over Apollo" — a sourcing decision, not derivable from schema] -->

<!-- WHY: [e.g., "why Supabase alongside Salesforce" — typically audit-log pattern] -->

## Open architectural questions
<!-- SECTION: open_questions -->

## Next reads
- [`prompts.md`](prompts.md) — every AI prompt powering the logic above
- [`destinations.md`](destinations.md) — exact CRM/HTTP/channel specs
- [`rebuild.md`](rebuild.md) — reconstruct this from scratch

<!-- KEEP: additional architectural notes -->
