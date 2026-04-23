---
name: "provider-research"
description: "Compare providers, integrations, and capability tradeoffs before choosing a workflow."
---

<!-- pluxx:generated:start -->
# Provider Research

Compare providers, integrations, and capability tradeoffs before choosing a workflow.

## Tools In This Skill

### `ask_clay`


        Ask any question about Clay. Uses intent routing for fast factual answers.

        Routes queries to the fastest available path:
        - Integration facts (BYOA, inputs/outputs) → JSON lookup (<10ms)
        - Capability queries ("which providers...") → JSON filter (<50ms)
        - Waterfall paths ("from domain to phone") → Graph traversal (<100ms)
        - Conceptual questions → Semantic search + LLM (2-5 sec)

        Args:
            question: Your Clay question. Works best with specific queries.
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
- `question` (string, required)

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
            providers: Optional comma-separated list of providers to compare.
                Examples: "Apollo, ZoomInfo, Hunter" or "BuiltWith, Wappalyzer, Datanyze"
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

- "Find ask clays with <question>."
- "Find compare providers with <use_case>."
- "Find integrations."

## Usage

- Pick the most specific tool in this skill for the user request.
- Gather required inputs before calling a tool.
- Summarize the returned data clearly instead of dumping raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Add custom guidance, examples, or caveats here. This section is preserved across `pluxx sync --from-mcp`.
<!-- pluxx:custom:end -->
