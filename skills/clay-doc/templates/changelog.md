# Changelog

Tracks what `/document` detected as changed between regenerations.
Complements `git diff` with semantic rollups ("3 prompts changed" beats
"17 lines changed").

## {{generated_date}} · v{{version}}

{{#if first_run}}
### Initial documentation

- {{table_count}} tables documented
- {{ai_action_count}} AI prompts catalogued
- {{copy_count}} copy pieces inventoried
- {{destination_count}} destinations mapped
- Health score: {{overall_score}}/10
- {{findings_count}} findings flagged for owner attention
- 30-day credit burn: {{total_credits}}

{{else}}
### Deltas since last run ({{previous_run_date}})

{{#each deltas}}
- **{{delta_type}}:** {{description}}
{{/each}}

### Preserved

- {{why_preserved_count}} `<!-- WHY: -->` blocks carried over
- {{keep_preserved_count}} `<!-- KEEP: -->` blocks carried over
{{#if orphaned_blocks}}
- ⚠️  {{orphaned_blocks}} orphaned blocks (section may have been renamed — review)
{{/if}}

{{#if commit_sha}}
### Commit
`{{commit_sha}}` — `docs(clay): document {{scope_slug}} · {{generated_date}}`
{{/if}}
{{/if}}
