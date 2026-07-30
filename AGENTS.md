# AGENTS.md

## Linting and Formatting

This project uses [Ultracite](https://ultracite.ai) with the Oxlint + Oxfmt backend.

### Commands

- `bun run lint:check` — Check all packages for lint/format issues (read-only)
- `bun run lint:fix` — Auto-fix lint and formatting issues across all packages

To target a single app:

```bash
cd apps/web && bun run lint:check
cd apps/api && bun run lint:fix
```

### Config Files

| File                        | Purpose                                                    |
| --------------------------- | ---------------------------------------------------------- |
| `oxlint.config.ts` (root)   | Base oxlint config with the `ultracite/oxlint/core` preset |
| `oxfmt.config.ts` (root)    | Formatter config extending `ultracite/oxfmt`               |
| `apps/web/oxlint.config.ts` | Web-specific config: core + React preset                   |
| `apps/api/oxlint.config.ts` | API-specific config: core preset only                      |

Type-aware linting is enabled via `oxlint-tsgolint`.

### Standards

When writing code, follow the Ultracite code standards:

- **Types:** Use explicit types when they improve clarity. Prefer `unknown` over `any`. Use `as const` for immutable values.
- **Modern JS/TS:** Prefer `const`, destructuring, optional chaining, nullish coalescing, template literals, `for...of`, and concise arrow functions.
- **Async:** Always `await` promises in async functions. Prefer `async/await` over promise chains. Remove `console.log`, `debugger`, and `alert` from production code.
- **React:** Use function components, keep hooks top-level with correct deps, avoid nested component definitions, and use semantic HTML.
- **Organization:** Keep functions focused, prefer early returns, avoid `dangerouslySetInnerHTML` and `eval()`, prefer specific imports.

Always run `bun run lint:check` before considering a task complete.
