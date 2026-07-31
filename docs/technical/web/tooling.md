# Web App Tooling

App: `@teris/web` — located at `apps/web/`.

## Vite Configuration

`vite.config.ts` configures:

- **React plugin** (`@vitejs/plugin-react`) for JSX transform and Fast Refresh.
- **React Compiler** via `@rolldown/plugin-babel` with `reactCompilerPreset()`.
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

## Entry Point

- `index.html` is the Vite HTML entry. It loads `/main.tsx` as a module.
- `main.tsx` mounts the React app into `#root`.

## Build Output

Vite outputs to `dist/` (matched by Turbo's `outputs: ["dist/**"]`).
