---
name: "setup-and-auth"
description: "Confirm access, auth state, and session readiness before running operational workflows."
---

<!-- pluxx:generated:start -->
# Setup and Auth

Confirm access, auth state, and session readiness before running operational workflows.

## Tools In This Skill

### `clay_connect`


        Connect to Clay by providing your session cookie.

        Each user must call this once per session to enable Clay API tools.
        The cookie is stored in memory for your account only.

        How to get your cookie:
        1. Open Clay in Chrome
        2. DevTools (Cmd+Shift+I) > Network tab
        3. Click any request to api.clay.com
        4. Copy the full Cookie header value

        Args:
            session_cookie: The full cookie string from your Clay browser session.

        Returns:
            Connection status with workspace info if successful.
        

Inputs:
- `session_cookie` (string, required)

### `clay_status`


        Check Clay API connection status.

        Shows whether you're connected, which workspaces you have access to,
        and how the session cookie was provided (clay_connect vs env var).

        Returns:
            Connection status with workspace details.
        

## Example Requests

- "Find clay connects with <session_cookie>."
- "Find clay status."

## Usage

- Pick the most specific tool in this skill for the user request.
- Gather required inputs before calling a tool.
- Summarize the returned data clearly instead of dumping raw JSON unless the user asks for it.
<!-- pluxx:generated:end -->

## Custom Notes

<!-- pluxx:custom:start -->
Add custom guidance, examples, or caveats here. This section is preserved across `pluxx sync --from-mcp`.
<!-- pluxx:custom:end -->
