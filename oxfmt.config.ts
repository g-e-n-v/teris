import ultracite from "ultracite/oxfmt";

import { defineConfig } from "oxfmt";

export default defineConfig({
  ...ultracite,
  printWidth: 100,
  sortImports: {
    customGroups: [
      {
        groupName: "named-external",
        modifiers: ["named"],
        selector: "external",
      },
    ],
    groups: [
      ["side_effect", "side_effect_style"],
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
