import { definePlugin } from 'pluxx'

export default definePlugin({
  name: "playkit",
  version: '0.1.0',
  description: "PlayKit plugin scaffold for setup and auth and workflow design workflows.",
  author: {
    name: "Orchid Labs",
  },
  license: 'MIT',

  skills: './skills/',
  commands: "./commands/",

  instructions: './INSTRUCTIONS.md',

  userConfig: [
    {
      key: "playkit-api-key",
      title: "Playkit Api Key",
      description: "Authentication credential for the clay-knowledge MCP server.",
      type: "secret",
      required: true,
      envVar: "PLAYKIT_API_KEY",
      targets: ["claude-code","opencode","codex","cursor"]
    }
  ],

  scripts: "./scripts/",


  mcp: {
    "clay-knowledge": {
      url: "https://mcp.playkit.sh/mcp",
      auth: {
        type: "header",
        envVar: "PLAYKIT_API_KEY",
        headerName: "X-API-Key",
        headerTemplate: "${value}"
      }
    },
  },

  hooks: {
    sessionStart: [
      {
        command: "bash \"${PLUGIN_ROOT}/scripts/check-env.sh\""
      }
    ]
  },




  brand: {
    displayName: "PlayKit",
    shortDescription: "PlayKit plugin scaffold for setup and auth and workflow design workflows."
  },

  targets: ["claude-code", "opencode", "codex", "cursor"],
})
