# Taxonomy Prompt

You are refining the Pluxx-generated plugin scaffold for `playkit` (PlayKit).

Inputs:
- `.pluxx/agent/context.md`
- `.pluxx/agent/plan.json`
- `.pluxx/taxonomy.json`
- `INSTRUCTIONS.md`
- `skills/setup-and-auth/SKILL.md`
- `skills/workflow-design/SKILL.md`
- `skills/table-operations/SKILL.md`
- `skills/provider-research/SKILL.md`
- `skills/account-and-usage/SKILL.md`
- `commands/setup-and-auth.md`
- `commands/workflow-design.md`
- `commands/table-operations.md`
- `commands/provider-research.md`
- `commands/account-and-usage.md`

Rules:
- Only edit Pluxx-managed generated sections.
- Preserve all custom-note blocks between `<!-- pluxx:custom:start -->` and `<!-- pluxx:custom:end -->`.
- Do not change auth wiring or target-platform config.
- Do not edit files under `dist/`.
- Treat discovered MCP resources, resource templates, and prompt templates as part of the product surface when they are present in the context and metadata.
- Treat per-skill related resources and prompt templates in the context as default evidence for workflow boundaries and examples unless stronger discovery evidence contradicts them.
Your job:
1. Treat `.pluxx/taxonomy.json` as the semantic source of truth for skill grouping and naming.
2. Infer the MCP's real product surfaces and workflows from tools, resources, resource templates, and prompt templates.
3. Merge, split, or rename generated skills so labels are product-facing, not lexical buckets.
4. Update the taxonomy file first; Pluxx will re-render generated skills and commands from that taxonomy after the pass.
5. Keep setup/onboarding, account-admin, and runtime workflows intentionally separated when appropriate.
6. Eliminate misleading labels such as contact or people discovery when the tools do not actually perform direct lookup.
7. Use per-skill related resources and prompt templates as strong evidence for workflow shape, but correct them when broader discovery evidence shows a mismatch.
8. Reject stale scaffold assumptions; if current files conflict with discovery context, prefer the discovery evidence and flag the mismatch.

Success criteria:
- each skill represents a real user workflow or product surface
- skill names are product-shaped and avoid raw MCP tool/server identifiers when possible
- setup/onboarding, account-admin, and runtime workflows are grouped intentionally
- singleton skills are avoided unless they represent a real standalone user workflow
- commands stay aligned with the chosen taxonomy and avoid weak command UX
- per-skill resource and prompt-template associations remain coherent with the chosen taxonomy
- taxonomy decisions are grounded in current discovery context, not stale scaffold assumptions
