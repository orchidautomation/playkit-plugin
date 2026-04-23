---
name: "account-and-usage"
description: "Check pricing, usage, limits, credits, and upgrade context for the current account."
---

<!-- pluxx:generated:start -->
# Account and Usage

Check pricing, usage, limits, credits, and upgrade context for the current account.

## Tools In This Skill

### `clay_get_credits`


        Get Clay credit usage report for a workspace.

        Shows credit consumption across providers and tables for a date range.
        Useful for monitoring spend and optimizing enrichment costs.

        Args:
            workspace_id: The numeric workspace ID (from clay_list_tables).
            start_date: Start date in ISO format (e.g., "2024-01-01").
            end_date: End date in ISO format (e.g., "2024-01-31").

        Returns:
            Credit usage breakdown by provider, table, and time period.
        

Inputs:
- `workspace_id` (integer, required)
- `start_date` (string, required)
- `end_date` (string, required)

### `get_pricing`

Get PlayKit pricing tiers, per-tool costs, and checkout URLs.

        Returns machine-readable pricing for all tiers including:
        - Tier names, prices, and query limits
        - Per-tool credit costs
        - Checkout URLs for each tier
        - Current auth method (license key via X-API-Key header)

        This tool does not require authentication. Use it to discover
        PlayKit pricing before subscribing.

        Returns:
            JSON with service info, tiers array, and checkout URLs
        

### `get_tool_costs`

Get per-tool credit costs for all PlayKit MCP tools.

        Returns which tools are free (JSON lookups, no LLM cost) and which
        cost credits (LLM-powered), plus the credit cost per call.

        Use this to estimate the total cost of a workflow before executing it.

        This tool does not require authentication.

        Returns:
            JSON with metered_tools (cost 1 credit each) and free_tools (cost 0)
        

### `get_usage`

Get your current PlayKit usage, remaining credits, and tier info.

        Returns:
        - Current tier (free, builder, pro, agency)
        - Credits consumed this billing period
        - Credits remaining
        - Tier limits
        - Upgrade URL

        Requires authentication via X-API-Key header.

        Returns:
            JSON with tier, consumed, credited, remaining, and upgrade info
        

## Example Requests

- "Find clay get credits using <workspace_id>."
- "Look up a pricing."
- "Look up tool costs."
- "Look up an usage."

## Usage

- Pick the most specific tool in this skill for the user request.
- Gather required inputs before calling a tool.
- Summarize the returned data clearly instead of dumping raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Add custom guidance, examples, or caveats here. This section is preserved across `pluxx sync --from-mcp`.
<!-- pluxx:custom:end -->
