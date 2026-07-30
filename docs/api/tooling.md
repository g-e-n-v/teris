# API App Tooling

App: `@teris/api` — located at `apps/api/`.

## Build & Run

The API uses Bun's native build and runtime — no external bundler needed.

| Task       | Command              | Description                                           |
| ---------- | -------------------- | ----------------------------------------------------- |
| Dev        | `bun run dev`        | `bun --watch main.ts` — hot-reloading dev server      |
| Build      | `bun run build`      | `bun build main.ts --outdir dist` — production bundle |
| Start      | `bun run start`      | `bun main.ts` — run the production server             |
| Type-check | `bun run type:check` | `tsc --noEmit`                                        |

To run from the repo root with Turbo:

```bash
bun run dev --filter=@teris/api
bun run build --filter=@teris/api
```

## Linting

The API app has its own `oxlint.config.ts` that extends only the core Ultracite preset (no React rules):

```ts
extends: [core]
```

## Entry Point

`main.ts` is the single entry point. It creates the Elysia instance, defines routes, and calls `.listen(3000)`.

## Build Output

Bun outputs to `dist/` (matched by Turbo's `outputs: ["dist/**"]`).
