---
description: "Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments."
argument-hint: "[use-case] [task]"
---

<!-- pluxx:generated:start -->
Use this command when the user asks to work on define strategy, prompts, targeting, and workflow shape before building tables or running enrichments.

Arguments: $ARGUMENTS

Primary tools:
- `brainstorm_play`
- `claygent_prompts`
- `design_clay`
- `generate_icp`
- `get_play_catalog`
- `write_outreach`

Workflow:

1. Interpret `$ARGUMENTS` as the user request for this workflow.
2. Choose the most specific tool in this surface.
3. Ask for missing required inputs only if the request does not already provide them.
4. Return a concise task-focused answer instead of raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Add custom guidance, examples, or caveats here. This section is preserved across `pluxx sync --from-mcp`.
<!-- pluxx:custom:end -->
