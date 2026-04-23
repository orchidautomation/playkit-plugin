# Review Prompt

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
1. Review the current scaffold critically.
2. Call out weak skill groupings, missing setup guidance, vague examples, product/category mismatches, raw documentation dumps, lexical skill names, stale scaffold assumptions, weak command UX, incoherent per-skill resource/prompt associations, or weak MCP metadata signals.
3. Separate scaffold quality findings from runtime-correctness findings.
4. Propose only the highest-value changes needed to make the scaffold useful.

Success criteria:
- findings are concrete and tied to files
- scaffold quality gaps are distinguished from runtime correctness
- stale assumptions, incoherent per-skill discovery associations, and command-UX weaknesses are identified explicitly when present
- suggested changes improve user-facing plugin quality
- recommendations stay inside Pluxx-managed boundaries
