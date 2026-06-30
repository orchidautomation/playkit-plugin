---
name: "setup-and-auth"
description: "Confirm access, auth state, and session readiness before running operational workflows."
---

<!-- pluxx:generated:start -->
# Setup and Auth

Confirm access, auth state, and session readiness before running operational workflows.

## Tools In This Skill

### `clay_connect`


        Start or inspect the browser-based Clay connection flow.

        This tool never accepts raw Clay session cookies through MCP inputs. If
        Clay is not connected, it returns a short-lived browser URL where the
        human can submit the cookie directly to PlayKit outside model-visible
        chat. Local development can still use the CLAY_SESSION_COOKIE
        environment variable on the server before PlayKit starts.

        Returns:
            Current connection state, and a connect_url when browser connection
            is needed.


### `clay_status`


        Check Clay API connection status.

        Shows whether you're connected, which workspaces you have access to,
        and whether the session was provisioned server-side or via a local-dev
        environment variable.

        Returns:
            Connection status with workspace details.


## Example Requests

- "Find clay connects."
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
