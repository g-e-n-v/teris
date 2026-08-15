import ultracite from "ultracite/oxfmt";

import { defineConfig } from "oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [...(ultracite.ignorePatterns ?? []), "apps/web/core/api/**"],
  printWidth: 100,
  sortImports: {
    customGroups: [
      {
        groupName: "named-external",
        modifiers: ["named"],
        selector: "external",
      },
      {
        groupName: "namespace",
        modifiers: ["wildcard"],
        selector: "import",
      },
    ],
    groups: [
      ["side_effect", "side_effect_style"],
      "namespace",
      "type",
      "external",
      "named-external",
      "internal",
      ["parent", "sibling", "index"],
      "unknown",
    ],
    ignoreCase: true,
    internalPattern: ["$/", "#"],
    newlinesBetween: true,
    order: "asc",
  },
  sortTailwindcss: {
    functions: ["cn"],
    preserveWhitespace: true,
    stylesheet: "./apps/web/core/styles/main.css",
  },
});
