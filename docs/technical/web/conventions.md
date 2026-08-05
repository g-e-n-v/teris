# Web App Conventions

App: `@teris/web`, located at `apps/web/`.

## Stack

- React 19 with the automatic JSX runtime
- Vite 8 with React Fast Refresh and the React Compiler
- TypeScript in strict, no-emit mode
- TanStack Router with file-based, automatically code-split routes
- Tailwind CSS 4, Base UI primitives, Tailwind Variants, and Iconify

## React

- Use function declarations for named components. The web lint configuration enforces this pattern.
- Pass refs as regular props when needed; React 19 does not require `forwardRef` for new components.
- Let the React Compiler handle routine memoization. Add `useMemo`, `useCallback`, or `memo` only when behavior or a measured integration requires it.
- Keep hooks at the top level, avoid nested component definitions, and use semantic HTML.
- Prefer type aliases over interfaces.

## App Structure

Cross-cutting implementation lives in `core/`:

- `core/router/` creates the application router and contains its generated route tree.
- `core/styles/` owns global CSS, color, font, and animation tokens.
- `core/ui/` contains reusable UI primitives and its public barrel export.

Route modules live in `routes/`. Import reusable UI components from `$/core/ui` rather than their implementation files.

## Path Alias

The `$/*` alias maps to the app root:

```ts
import { Button } from "$/core/ui";
```

`tsconfig.json` is the source of the alias, and Vite enables `resolve.tsconfigPaths` so it uses the same mapping.

## TypeScript

The web app adds DOM libraries, the automatic JSX runtime, unused symbol checks, switch fallthrough checks, and the `$/*` path mapping to the root configuration. Run `bun run type:check --filter=@teris/web` from the repository root.
