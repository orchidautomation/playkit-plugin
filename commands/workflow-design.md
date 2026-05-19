---
description: "Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments."
when_to_use: "Use this command when the user asks to work on define strategy, prompts, targeting, and workflow shape before building tables or running enrichments."
argument-hint: [use-case] [task]
arguments: ["use-case","task"]
skill: "workflow-design"
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
For build-ready designs, ask `design_clay` for `output_format="build_spec"` and pass its `tables` wrapper directly to `clay_build_table`. Use native Clay waterfall formula columns for fallback output merges instead of modeling the final waterfall as an action column.
<!-- pluxx:custom:end -->
