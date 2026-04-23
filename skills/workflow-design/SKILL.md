---
name: "workflow-design"
description: "Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments."
---

<!-- pluxx:generated:start -->
# Workflow Design

Define strategy, prompts, targeting, and workflow shape before building tables or running enrichments.

## Tools In This Skill

### `brainstorm_play`


        Brainstorm creative Clay plays for a GTM use case.

        Uses Skills (methodology), RAG (integration data from 1,834 docs), and
        Catalog (play landscape awareness) to suggest plays using NATIVE Clay
        capabilities. No bulk compendium loading — progressive context only.

        Args:
            use_case: Describe the company/industry AND the angle you want to explore.
                Examples:
                - "B2B gifting platform (like Sendoso) - job change signals"
                - "AI coding assistant - competitor displacement plays"
                - "Enterprise security - intent signals and tech stack changes"
                - "Healthcare SaaS - timing triggers like fiscal year and budget cycles"

        Returns:
            3-5 creative plays with specific integrations, workflows, Claygent prompts,
            and cost/BYOA considerations. Each play follows the FETC framework:
            Source → Filter → Enrich → AI Process → Destination.
        

Inputs:
- `use_case` (string, required)

### `claygent_prompts`


        Generate thorough, human-like AI prompts for Clay workflows.

        Thinks through the task like a human researcher would - breaking down
        the goal, identifying where to find the data, considering edge cases,
        and providing step-by-step instructions with fallback logic.

        Args:
            task: The data enrichment or analysis task you need to accomplish.
                Web research tasks (use Claygent):
                - "find conference attendance for contacts"
                - "scrape LinkedIn post text"
                - "research company news and recent announcements"
                - "find podcast appearances"
                - "extract pricing from competitor websites"
                Table data tasks (use AI Node):
                - "classify leads by ICP fit"
                - "score accounts based on tech stack"
                - "generate personalized first lines"
                - "summarize company descriptions"

        Returns:
            1-3 production-ready prompts with:
            - Human reasoning for why this approach works
            - Step-by-step instructions inside the prompt
            - Fallback logic for when primary approach fails
            - Edge case handling
            - Expected JSON output schema
            - Parsing tips and common gotchas
        

Inputs:
- `task` (string, required)

### `design_clay`


        Design a complete Clay workflow — from single tables to multi-table architectures.

        The agent decides the right architecture based on your use case. Most GTM
        plays are hub-spoke (Company → People → Outreach). Simple enrichment-only
        workflows may get a single table.

        Args:
            use_case: What you want to build in Clay.
                Examples:
                - "Waterfall email enrichment for outbound SDR team"
                - "ABM multi-threading for 500 target accounts with Salesforce sync"
                - "Champion job change tracking for 10K customers"
                - "Tech stack detection for competitor displacement"
                - "Inbound lead enrichment from website forms to Outreach sequences"

            volume: Expected data volume. Affects architecture recommendations.
                Options: "low" (<1K records), "medium" (1K-10K), "high" (10K-100K),
                        "very_high" (100K+). Default: "medium"

            output_format: Output format.
                - "markdown" (default): Human-readable workflow design with explanations.
                - "build_spec": JSON spec ready for clay_build_table(). Returns a
                  tables array with connections, status columns, and credit estimates.
                  Pass the output directly to clay_build_table(table_spec_json=...).

        Returns:
            Markdown design (default) or JSON build spec for clay_build_table.
        

Inputs:
- `use_case` (string, required)
- `volume` (string)
- `output_format` (string)

### `generate_icp`


        Generate an Ideal Customer Profile (ICP) for a company.

        Scrapes the company's website to understand their product, then generates
        a complete ICP with target segments, buyer personas, pain points, and
        signal triggers for Clay workflows.

        Args:
            company_url: The company's website URL (e.g., "sendoso.com" or "https://sendoso.com").
                Will be scraped to extract product info, use cases, and target market.
            context: Optional additional context about the company or focus areas.
                Examples: "B2B gifting platform", "focus on enterprise segment",
                "we sell to marketing leaders"

        Returns:
            Complete ICP report with:
            - Company summary and value proposition
            - 3-5 target segments with firmographic criteria
            - Buyer personas with titles, pain points, and triggers
            - Signal triggers for Clay workflows (job changes, funding, hiring, etc.)
            - Recommended Clay plays for each segment
        

Inputs:
- `company_url` (string, required)
- `context` (unknown)

### `get_play_catalog`


        Discover plays and patterns from the PlayKit catalog.

        This tool enables DISCOVERY-FIRST brainstorming by letting you see
        ALL available plays before doing targeted searches. Instead of searching
        for what you already know, you can browse what's possible.

        Args:
            query: Optional search query to filter plays/patterns by keyword
            category: Filter by category: outbound-prospecting, lead-generation,
                      contact-enrichment, company-intelligence, signal-detection,
                      account-based, data-quality, crm-automation, web-scraping,
                      inbound-enrichment, customer-lifecycle, workflow-integration
            full_catalog: Return the entire catalog (for comprehensive context)
            summary_only: Return just a text summary of available plays

        Returns:
            JSON catalog of plays and patterns, or text summary

        Use Cases:
            - "What plays exist for outbound?" → get_play_catalog(category="outbound")
            - "Show me everything about waterfalls" → get_play_catalog(query="waterfall")
            - "What can I do with job change signals?" → get_play_catalog(query="job change")
            - "Give me the full picture" → get_play_catalog(full_catalog=True)

        This is the FIRST tool to call when brainstorming - it shows you the landscape
        before you do targeted deep-dives with ask_clay or brainstorm_play.
        

Inputs:
- `query` (unknown)
- `category` (unknown)
- `full_catalog` (boolean)
- `summary_only` (boolean)

### `write_outreach`


        Generate personalized outreach copy using Clay enrichment data.

        Creates cold email sequences and LinkedIn messages that leverage your
        Clay enrichments for maximum personalization. Completes the GTM loop:
        Find → Enrich → Personalize → SEND.

        Args:
            context: Full campaign context including target audience, available enrichments,
                and outreach goal. Describe everything in one parameter.
                Examples:
                - "Competitor displacement targeting VP Sales at Outreach users. We have
                   tech stack, Claygent research, company news. Goal: book discovery calls
                   for Sendoso, an AI gifting platform."
                - "Job change campaign for champion tracking. Enrichments: previous company,
                   new role, mutual connections. Goal: re-engage churned contacts at new company."
                - "ABM multi-threading into enterprise accounts. Have org chart, tech stack,
                   funding data. Goal: get intro to procurement from existing champion."

            tone: Writing style for the copy. Default: "professional"
                Options: "professional", "casual", "provocative", "consultative"

            num_emails: Number of emails in the sequence. Default: 3

        Returns:
            Complete outreach package:
            - Email sequence with subject lines (default 3 emails)
            - LinkedIn connection request + follow-up message
            - Which enrichments to use in each touchpoint (and why)
            - Clay variable syntax: {{field_name}}
            - Personalization hooks and talk tracks
        

Inputs:
- `context` (string, required)
- `tone` (string)
- `num_emails` (integer)

## Example Requests

- "Find brainstorm plays with <use_case>."
- "Find claygent prompts with <task>."
- "Find design clays with <use_case>."
- "Find generate icps for <company_url>."
- "Look up a play catalog."
- "Find write outreaches with <context>."

## Usage

- Pick the most specific tool in this skill for the user request.
- Gather required inputs before calling a tool.
- Summarize the returned data clearly instead of dumping raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Add custom guidance, examples, or caveats here. This section is preserved across `pluxx sync --from-mcp`.
<!-- pluxx:custom:end -->
