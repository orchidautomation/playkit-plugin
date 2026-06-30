---
name: "provider-research"
description: "Compare providers, integrations, action metadata, and capability tradeoffs before choosing a workflow."
---

<!-- pluxx:generated:start -->
# Provider Research

Compare providers, integrations, action metadata, and capability tradeoffs before choosing a workflow.

## Tools In This Skill

### `ask_clay`


        Ask any question about Clay. Uses intent routing for fast factual answers.

        Routes queries to the fastest available path:
        - Integration facts (BYOA, inputs/outputs) → JSON lookup (<10ms)
        - Capability queries ("which providers...") → JSON filter (<50ms)
        - Waterfall paths ("from domain to phone") → Graph traversal (<100ms)
        - Conceptual questions → Semantic search + LLM (2-5 sec)

        Args:
            question: Your Clay question. Preferred input name.
            query: Backward-compatible alias for `question`.
                Fast path examples (instant answers):
                - "Does Apollo require BYOA?"
                - "What outputs does Hunter provide?"
                - "Which providers output phone without BYOA?"
                Conceptual examples (semantic search):
                - "How does waterfall enrichment work?"
                - "When should I use Claygent vs AI Node?"
                - "What are best practices for job change signals?"

        Returns:
            Grounded answer based ONLY on Clay knowledge base, with confidence
            indicator (HIGH/MEDIUM/LOW) and source attribution.


Inputs:
- `question` (unknown)
- `query` (unknown)

### `compare_providers`


        Compare Clay data providers for a specific use case.

        Uses structured graph data for instant BYOA/inputs/outputs comparison,
        enriched with RAG documentation for qualitative insights on coverage,
        accuracy, and best-fit scenarios.

        Args:
            use_case: The data enrichment goal you're comparing providers for.
                Examples: "email enrichment", "phone number lookup",
                "tech stack detection", "intent signals", "job change tracking",
                "VP Sales, Director Sales Development at B2B companies"
            providers: Optional list of providers to compare, as either a
                comma-separated string or a list of strings.
                Examples: "Apollo, ZoomInfo, Hunter" or
                ["BuiltWith", "Wappalyzer", "Datanyze"]
                If not provided, auto-discovers relevant providers based on use_case/category.
            category: Optional category to filter providers by output type.
                Examples: "find_people", "find_email", "find_phone", "tech_stack", "intent"
                Maps to output types: find_people→contact_data, find_email→email, etc.
            max_providers: Maximum providers to compare (default 6). Increase for broader comparison.

        Returns:
            Comparison table with coverage quality, cost tier, BYOA status,
            best-fit scenarios, limitations, and waterfall sequence recommendation.


Inputs:
- `use_case` (string, required)
- `providers` (unknown)
- `category` (unknown)
- `max_providers` (integer)

### `clay_find_actions`


        Find observed Clay action metadata before building action columns.

        Use this read-only lookup when you need to map human-readable Clay
        action or provider language to the exact actionKey, actionPackageId,
        version, data type, and input parameters needed by clay_add_column or
        clay_build_table.

        Args:
            query: Fuzzy action phrase, e.g. "Mixrank find people" or
                "Companies, People, and Jobs".
            action_key: Exact action key, e.g. "find-lists-of-people-with-mixrank".
            provider: Provider filter, e.g. "mixrank" or "prospeo".
            limit: Maximum actions to return, from 1 to 25.
            include_examples: When true, include bounded example binding shapes.
                Example values are schematic and do not include raw observed
                formula strings from the catalog.

        Returns:
            JSON with verified observed action metadata and a catalog caveat.


Inputs:
- `query` (unknown)
- `action_key` (unknown)
- `provider` (unknown)
- `limit` (integer)
- `include_examples` (boolean)

### `find_integrations`


        Find Clay integrations — by name OR by capability filters.

        Two modes:
        1. Name lookup: find_integrations(name="apollo") → detailed info for one provider
        2. Capability filter: find_integrations(outputs="email", inputs="domain") → matching providers

        Args:
            name: Integration name for direct lookup (e.g., "apollo", "hubspot", "builtwith").
                  When provided, returns detailed info for that specific provider.
            outputs: Output types to filter by (comma-separated).
                     Options: phone, email, tech_stack, intent_signals, job_changes,
                     company_data, contact_data, linkedin_url
            inputs: Input types to filter by (comma-separated).
                    Options: domain, email, linkedin_url, company_name, name_company, ip_address
            byoa: Filter by BYOA requirement (True = requires own API key, False = uses Clay credits)
            limit: Maximum results for capability filter (default 20)

        Returns:
            Detailed provider info (name mode) or filtered list (capability mode).

        Examples:
            find_integrations(name="prospeo")
            find_integrations(outputs="email", inputs="domain")
            find_integrations(outputs="phone", byoa=False)


Inputs:
- `name` (unknown)
- `outputs` (unknown)
- `inputs` (unknown)
- `byoa` (unknown)
- `limit` (integer)

## Example Requests

- "Find ask clays."
- "Find Clay action metadata for Mixrank Companies, People, and Jobs."
- "Find compare providers with <use_case>."
- "Find integrations."

## Usage

- Pick the most specific tool in this skill for the user request.
- Gather required inputs before calling a tool.
- Summarize the returned data clearly instead of dumping raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Use `clay_find_actions` for action/package ID lookup. It is the lookup surface for exact action keys, actionPackageIds, versions, data types, and input parameters needed by `clay_add_column` and `clay_build_table`.

Use `find_integrations` for provider capability research, BYOA requirements, and input/output fit. If a provider or capability lookup returns empty or does not include action metadata, pivot to `clay_find_actions(provider=...)` or a fuzzy `clay_find_actions(query=...)` instead of treating `find_integrations` as the only catalog surface.

For Mixrank / "Companies, People, and Jobs" requests, search `clay_find_actions(query="Companies, People, and Jobs", limit=3)` or `clay_find_actions(provider="mixrank", query="find people")` before recommending an action column. Do not invent action IDs; if confidence is low, report the uncertainty and ask for confirmation before mutation.
<!-- pluxx:custom:end -->
