---
doc_type: audit
audience: ops, engineer
overall_score: {{overall_score}}
findings_count: {{findings_count}}
{{standard_frontmatter}}
---

# Audit

## Scorecard (rolled up across {{table_count}} tables)

{{scorecard_table}}

## Findings

{{#each findings}}

### {{severity_icon}} {{dimension}} — {{title}}

**Where:** {{where}}
**What:** {{description}}
**Fix:** {{recommended_fix}}
{{#if impact}}**Impact:** {{impact}}{{/if}}

{{/each}}

## Top 3 recommendations

{{#each top_recs}}
{{number}}. **{{title}}** — {{description}}
   - Expected impact: {{expected_impact}}
{{/each}}

## Verdict
<!-- SECTION: verdict -->

## Raw audit data

Full programmatic + strategic analysis per-table saved to `_raw/<table_id>.audit.md`.

<!-- KEEP: additional audit notes -->
