---
name: "setup-and-auth"
description: "Confirm access, auth state, and session readiness before running operational workflows."
---

<!-- pluxx:generated:start -->
# Setup and Auth

Confirm access, auth state, and session readiness before running operational workflows.

## Tools In This Skill

### `clay_connect`


Check whether Clay access is already configured and return secure provisioning guidance.

This tool no longer accepts raw Clay session cookies through MCP inputs. Do not ask the user to paste a Clay cookie into chat or a tool argument.

Returns:
    Connection guidance and the current connection state.


Inputs:
- None

### `clay_status`


Check Clay API connection status.

Shows whether you're connected, which workspaces you have access to,
and whether Clay access is configured server-side.

Returns:
    Connection status with workspace details.


## Example Requests

- "Check whether Clay is connected."
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
