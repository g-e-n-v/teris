# Web App Tooling

App: `@teris/web` — located at `apps/web/`.

## Vite Configuration

`vite.config.ts` configures:

- **React plugin** (`@vitejs/plugin-react`) for JSX transform and Fast Refresh.
- **React Compiler** via `@rolldown/plugin-babel` with `reactCompilerPreset()`.
- **Tailwind CSS** via `@tailwindcss/vite` (Tailwind v4 first-class Vite plugin).
- **Path alias** `$` resolving to the app root (`apps/web/`).

## Scripts

| Task       | Command              | Description                          |
| ---------- | -------------------- | ------------------------------------ |
| Dev server | `bun run dev`        | Starts Vite dev server with HMR      |
| Build      | `bun run build`      | Production build to `dist/`          |
| Preview    | `bun run preview`    | Preview the production build locally |
| Start      | `bun run start`      | Alias for `vite preview`             |
| Type-check | `bun run type:check` | `tsc --noEmit`                       |

To run any of these from the repo root with Turbo:

```bash
bun run dev --filter=@teris/web
bun run build --filter=@teris/web
```

## Linting

The web app has its own `oxlint.config.ts` that extends both the core and React Ultracite presets:

```ts
extends: [core, react]
```

This enables React-specific lint rules on top of the shared core rules.

### Tailwind CSS class sorting

The web app also loads the [`oxlint-tailwindcss`](https://github.com/sergioazoc/oxlint-tailwindcss) JS plugin, which provides Tailwind CSS v4 linting. The `entryPoint` setting must point at the app's Tailwind CSS entry file (`apps/web/styles.css`) so the plugin can load the design system. It is resolved to an absolute path via `import.meta.dirname` so oxlint finds it regardless of its working directory.

Enabled rules:

| Rule | Severity | Purpose |
| --- | --- | --- |
| `tailwindcss/enforce-sort-order` | `warn` | Sorts classes to Tailwind's official order (autofix via `lint:fix`) |
| `tailwindcss/enforce-canonical` | `warn` | Enforces canonical class names (autofix) |
| `tailwindcss/no-unknown-classes` | `error` | Catches typos with suggestions |
| `tailwindcss/no-duplicate-classes` | `error` | Removes repeated classes (autofix) |
| `tailwindcss/no-unnecessary-whitespace` | `error` | Trims/collapses whitespace in class strings (autofix) |

Class sorting runs through the existing `bun run lint:check` / `bun run lint:fix` workflow and the lefthook pre-commit/pre-push hooks — no separate formatter command needed.

## Styling

The web app uses **Tailwind CSS v4** installed as a first-class Vite plugin (no `tailwind.config.js`, no PostCSS config).

- **Entry CSS file:** `apps/web/styles.css` — contains `@import "tailwindcss";` and is imported once from `apps/web/main.tsx`.
- **Vite plugin:** `@tailwindcss/vite` registered in `vite.config.ts`.
- Custom theme tokens are configured in `styles.css` with the `@theme { ... }` directive (Tailwind v4 CSS-first config).

## Entry Point

- `index.html` is the Vite HTML entry. It loads `/main.tsx` as a module.
- `main.tsx` imports `./styles.css` (Tailwind) and mounts the React app into `#root`.

## Build Output

Vite outputs to `dist/` (matched by Turbo's `outputs: ["dist/**"]`).
