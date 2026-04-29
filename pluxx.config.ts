import { definePlugin } from 'pluxx'

const PLAYKIT_ICON = "./assets/playkit-icon.svg"
const PLAYKIT_LOGO = "./assets/playkit-logo.svg"
const PLAYKIT_SCREENSHOT = "./assets/playkit-plugin-card.svg"

export default definePlugin({
  name: "playkit",
  version: '0.1.2',
  description: "Clay expertise for your AI editor: design workflows, build tables, audit workbooks, and generate client-ready docs with PlayKit.",
  author: {
    name: "Orchid Labs",
    url: "https://orchidautomation.com",
  },
  license: 'MIT',
  repository: "https://github.com/orchidautomation/playkit-plugin",
  keywords: [
    "clay",
    "gtm",
    "mcp",
    "playkit",
    "sales-automation",
    "workflow-automation"
  ],

  skills: './skills/',
  commands: "./commands/",

  instructions: './INSTRUCTIONS.md',
  assets: "./assets/",

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
    shortDescription: "Clay expertise for your AI editor.",
    longDescription: "PlayKit turns AI editors into Clay workflow partners: brainstorm GTM plays, compare providers, design credit-aware architectures, build tables, audit workbooks, and generate client-ready docs.",
    category: "Productivity",
    color: "#FF6B35",
    icon: PLAYKIT_ICON,
    logo: PLAYKIT_LOGO,
    screenshots: [PLAYKIT_SCREENSHOT],
    defaultPrompts: [
      "Design a Clay workflow for a high-volume outbound campaign.",
      "Audit this Clay workbook and find credit, provider, and schema risks.",
      "Generate client-ready documentation for this Clay table."
    ],
    websiteURL: "https://playkit.sh"
  },

  targets: ["claude-code", "opencode", "codex", "cursor"],
})
