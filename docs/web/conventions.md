# Web App Conventions

App: `@teris/web` — located at `apps/web/`.

## Stack

- **Framework:** React 19
- **Build tool:** Vite 8
- **Compiler:** React Compiler (via `@rolldown/plugin-babel` with `reactCompilerPreset`)
- **Language:** TypeScript (strict)

## React 19 Patterns

- Use function components only. No class components.
- React 19 allows ref as a prop and forwardRef is no longer needed. Prefer passing `ref` directly as a prop.
- The React Compiler is enabled, so manual `useMemo`/`useCallback`/`useMemo` optimizations are generally unnecessary. Write idiomatic, direct code and let the compiler handle memoization.
- Keep hooks at the top level of the component — no nested component definitions inside other components.
- Use semantic HTML elements.

## Naming Conventions

All file and folder names must be **kebab-case** (e.g. `user-profile.tsx`, `auth-service.ts`, `components/`), including components, hooks, utilities, assets, and test files. The only exceptions are well-known config files that tools expect at fixed names (`package.json`, `tsconfig.json`, `vite.config.ts`, `oxlint.config.ts`, `index.html`, `main.tsx`, etc.).

## Path Aliases

The `$` alias maps to the app root (`apps/web/`):

```ts
import { foo } from "$/components/user-profile";
```

Configured in both `vite.config.ts` (Vite resolve alias) and `tsconfig.json` (`paths`).

## TypeScript Config

The web app extends the root `tsconfig.json` and adds:

- `lib`: `ESNext`, `DOM`, `DOM.Iterable`
- `jsx`: `react-jsx` (automatic JSX runtime — no need to import React)
- `noUnusedLocals`: `true`
- `noUnusedParameters`: `true`
- `noFallthroughCasesInSwitch`: `true`
- `paths`: `$/*` -> `./*`

Type-checking is done via `tsc --noEmit` (no emit — Vite handles bundling).

## React Compiler Notes

The React Compiler runs as a Babel preset through Vite. This means:

- You do not need to manually memoize with `useMemo`, `useCallback`, or `React.memo`.
- The compiler optimizes render and re-render behavior automatically.
- Follow the Rules of Hooks strictly — the compiler enforces them more aggressively.
- Avoid patterns that break compiler assumptions (mutating state objects, conditional hook calls).
