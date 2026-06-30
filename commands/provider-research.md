---
description: "Compare providers, integrations, action metadata, and capability tradeoffs before choosing a workflow."
when_to_use: "Use this command when the user asks to compare providers, integrations, action metadata, and capability tradeoffs before choosing a workflow."
argument-hint: [question|action-query] [use-case]
arguments: ["question","action-query","use-case"]
skill: "provider-research"
---

<!-- pluxx:generated:start -->
Use this command when the user asks to compare providers, integrations, action metadata, and capability tradeoffs before choosing a workflow.

Arguments: $ARGUMENTS

Primary tools:
- `ask_clay`
- `clay_find_actions`
- `compare_providers`
- `find_integrations`

Workflow:

1. Interpret `$ARGUMENTS` as the user request for this workflow.
2. Choose the most specific tool in this surface.
3. Ask for missing required inputs only if the request does not already provide them.
4. Return a concise task-focused answer instead of raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Use `clay_find_actions` for exact Clay action metadata: action keys, actionPackageIds, versions, data types, and input parameter names. Use `find_integrations` for provider capabilities and BYOA/input-output research. If provider lookup is empty or lacks actions, pivot to `clay_find_actions(provider=...)` before concluding the action is unavailable.

For Mixrank / "Companies, People, and Jobs", prefer `clay_find_actions(query="Companies, People, and Jobs", limit=3)` and carry the returned metadata into a dry-run action column workflow before mutation.
<!-- pluxx:custom:end -->
