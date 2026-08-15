import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

import { defineConfig } from "oxlint";

import path from "node:path";

export default defineConfig({
  extends: [core, react],
  ignorePatterns: [...(core.ignorePatterns ?? []), "apps/web/core/api/**"],
  overrides: [
    {
      files: ["apps/web/**"],
      jsPlugins: ["oxlint-tailwindcss"],
      rules: {
        "func-style": "allow",
        "react/function-component-definition": [
          "error",
          { namedComponents: "function-declaration" },
        ],
        "tailwindcss/consistent-variant-order": "warn",
        "tailwindcss/enforce-canonical": "warn",
        "tailwindcss/enforce-consistent-important-position": "warn",
        "tailwindcss/enforce-sort-order": "warn",
        "tailwindcss/no-conflicting-classes": "error",
        "tailwindcss/no-deprecated-classes": "error",
        "tailwindcss/no-duplicate-classes": "error",
        "tailwindcss/no-unknown-classes": "warn",
        "tailwindcss/no-unnecessary-arbitrary-value": "warn",
        "tailwindcss/no-unnecessary-whitespace": "error",
        "typescript/no-floating-promises": "allow",
        "typescript/only-throw-error": "allow",
      },
    },
    {
      files: ["apps/web/routes/**"],
      rules: {
        "no-use-before-define": "off",
      },
    },
  ],
  rules: {
    curly: "allow",
    "typescript/consistent-return": "allow",
    "typescript/consistent-type-definitions": ["error", "type"],
    "typescript/no-confusing-void-expression": "allow",
    "typescript/no-misused-promises": "allow",
    "typescript/promise-function-async": "allow",
    "typescript/strict-boolean-expressions": "allow",
    "typescript/strict-void-return": "allow",
    "unicorn/catch-error-name": "allow",
  },
  settings: {
    tailwindcss: {
      entryPoint: path.resolve(import.meta.dirname, "apps/web/core/styles/main.css"),
    },
  },
});
