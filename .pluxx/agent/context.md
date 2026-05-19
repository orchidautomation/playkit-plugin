# Pluxx Agent Context

## Plugin

- Name: `playkit`
- Display name: PlayKit
- Targets: claude-code, opencode, codex, cursor

## MCP

- Metadata source: `.pluxx/mcp.json`
- Semantic taxonomy: `.pluxx/taxonomy.json`
- Server name: `clay-knowledge`
- Transport: http
- Auth: header via X-API-Key from PLAYKIT_API_KEY
- Tool count: 26
- Resource count: 0
- Prompt template count: 0

## Generated Skills

### `setup-and-auth`

- Title: Setup and Auth
- Tools: clay_connect, clay_status
- Description: Confirm access, auth state, and session readiness before running operational workflows.

### `workflow-design`

- Title: Workflow Design
- Tools: brainstorm_play, claygent_prompts, design_clay, generate_icp, get_play_catalog, write_outreach
- Description: Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments.

### `table-operations`

- Title: Table Operations
- Tools: clay_add_rows, clay_audit_table, clay_build_table, clay_build_webhook_table, clay_document_table, clay_export_data, clay_get_schema, clay_list_tables, clay_run_enrichments, clay_update_column, clay_update_source
- Description: Build, inspect, patch, run, document, and export tables, rows, columns, sources, and enrichment workflows.

### `provider-research`

- Title: Provider Research
- Tools: ask_clay, compare_providers, find_integrations
- Description: Compare providers, integrations, and capability tradeoffs before choosing a workflow.

### `account-and-usage`

- Title: Account and Usage
- Tools: clay_get_credits, get_pricing, get_tool_costs, get_usage
- Description: Check pricing, usage, limits, credits, and upgrade context for the current account.

## Commands

- `commands/setup-and-auth.md`: Confirm access, auth state, and session readiness before running operational workflows.
- `commands/workflow-design.md`: Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments.
- `commands/table-operations.md`: Build, inspect, patch, run, document, and export tables, rows, columns, sources, and enrichment workflows.
- `commands/provider-research.md`: Compare providers, integrations, and capability tradeoffs before choosing a workflow.
- `commands/account-and-usage.md`: Check pricing, usage, limits, credits, and upgrade context for the current account.

## Lint Snapshot

- Errors: 0
- Warnings: 8

### Current Issues

- [warning] codex-command-translation: Command fields "when_to_use", "argument-hint", "arguments", "skill", "skills" are not native Codex plugin slash-command fields today. Codex does not currently document plugin-packaged slash-command parity. Pluxx keeps canonical command intent through AGENTS.md routing guidance and `.codex/commands.generated.json`.
- [warning] codex-command-translation: Command fields "argument-hint", "skill", "skills" are not native Codex plugin slash-command fields today. Codex does not currently document plugin-packaged slash-command parity. Pluxx keeps canonical command intent through AGENTS.md routing guidance and `.codex/commands.generated.json`.
- [warning] codex-command-translation: Command fields "when_to_use", "argument-hint", "arguments", "skill", "skills" are not native Codex plugin slash-command fields today. Codex does not currently document plugin-packaged slash-command parity. Pluxx keeps canonical command intent through AGENTS.md routing guidance and `.codex/commands.generated.json`.
- [warning] codex-command-translation: Command fields "when_to_use", "argument-hint", "arguments", "skill", "skills" are not native Codex plugin slash-command fields today. Codex does not currently document plugin-packaged slash-command parity. Pluxx keeps canonical command intent through AGENTS.md routing guidance and `.codex/commands.generated.json`.
- [warning] codex-command-translation: Command fields "when_to_use", "argument-hint", "arguments", "skill", "skills" are not native Codex plugin slash-command fields today. Codex does not currently document plugin-packaged slash-command parity. Pluxx keeps canonical command intent through AGENTS.md routing guidance and `.codex/commands.generated.json`.
- [warning] codex-command-translation: Command fields "when_to_use", "argument-hint", "arguments", "skill", "skills" are not native Codex plugin slash-command fields today. Codex does not currently document plugin-packaged slash-command parity. Pluxx keeps canonical command intent through AGENTS.md routing guidance and `.codex/commands.generated.json`.
- [warning] codex-commands-routing-guidance: Codex does not currently document plugin-packaged slash-command parity. Pluxx keeps canonical command intent through AGENTS.md routing guidance and `.codex/commands.generated.json`. Pluxx will degrade commands into skills plus those routing surfaces today.
- [warning] codex-hooks-external-config: Pluxx now bundles Codex hooks at `hooks/hooks.json`, and Codex plugin-bundled hook loading requires `plugin_hooks = true` under `[features]`. The general `hooks` flag covers non-plugin hook config and defaults on; `codex_hooks` is deprecated and should not be treated as a plugin-bundled hook fallback. If bundled hooks do not activate, enable `plugin_hooks = true`, reload Codex, and retest in a trusted interactive session.
- [warning] primitive-degrade-summary: On codex, these active compiler buckets will compile to weaker native equivalents: commands.
- [warning] primitive-translate-summary: On opencode, these active compiler buckets will be re-expressed through different native surfaces: hooks.
- [warning] primitive-translate-summary: On codex, these active compiler buckets will be re-expressed through different native surfaces: hooks.

## Write Contract

- Edit only Pluxx-managed generated sections.
- Preserve custom sections marked by `<!-- pluxx:custom:start -->` and `<!-- pluxx:custom:end -->`.
- Do not change auth wiring or target-platform config unless explicitly requested.
- Do not edit generated platform bundles in `dist/`.

## Quality Bar

- Each skill should represent a real user workflow or product surface.
- Setup, admin, account, and runtime workflows should be grouped intentionally.
- Prefer branded product language in user-facing content; avoid exposing raw MCP server identifiers unless they are operationally required.
- Avoid tiny singleton skills unless the surface is genuinely standalone.
- Examples should be concrete and specific, not generic placeholders.
- Weak MCP metadata (missing/generic tool descriptions) should be called out explicitly before publishing.
- The wording should match the MCP product narrative, not just raw tool names.
- Use discovered MCP resources and prompt templates when they clarify the real product surface.
- Respect the per-skill resource and prompt-template associations in the metadata/context unless stronger discovery evidence shows they are wrong.
- Keep INSTRUCTIONS.md as concise routing guidance; do not dump raw vendor documentation into generated sections.

