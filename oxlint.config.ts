import core from "ultracite/oxlint/core";

import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [core],
  ignorePatterns: core.ignorePatterns,
  rules: {
    curly: "allow",
    "typescript/consistent-type-definitions": ["error", "type"],
  },
});
