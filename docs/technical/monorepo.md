# Monorepo And Workspaces

## Workspaces

Bun manages workspaces under `apps/*` and `packages/*`. The repository contains `@teris/web`, `@teris/api`, and the shared `@teris/auth` library under `packages/auth/`.

- Keep repository tooling in the root `package.json`.
- Keep app runtime and build dependencies in each app's `package.json`.
- Import another workspace through its package export, never by reaching into its files.

## Turborepo

The root scripts delegate app work to Turborepo. `turbo.json` defines this pipeline:

| Task         | Dependency    | Cache | Output or behavior               |
| ------------ | ------------- | ----- | -------------------------------- |
| `build`      | `^build`      | Yes   | `dist/**`                        |
| `dev`        | `^dev`        | No    | Persistent development servers   |
| `start`      | Local `build` | No    | Persistent preview/API processes |
| `type:check` | `^type:check` | Yes   | No file output                   |

Linting is repository-wide rather than an app task. Run `bun run lint:check` or `bun run lint:fix` from the root. The app packages do not define local lint scripts.

Filter delegated tasks from the root:

```bash
bun run dev --filter=@teris/web
bun run build --filter=@teris/api
bun run type:check --filter=@teris/web
```

## TypeScript

The root `tsconfig.json` enables strict, no-emit TypeScript with ESNext modules, bundler resolution, JSON modules, and verbatim module syntax. Each app extends it with runtime libraries and a local path alias.

Use `import type` for type-only imports. Vite and Bun perform builds; TypeScript only checks types.

## Linting And Formatting

Ultracite runs on the Oxlint and Oxfmt backends with type-aware linting.

| File | Responsibility |
| --- | --- |
| `oxlint.config.ts` | Single Ultracite config: core + React rules, per-app `overrides`, Tailwind plugin |
| `oxfmt.config.ts` | 100-column formatting, import grouping, Tailwind class sorting |

Oxfmt groups side-effect, type, external, internal, and relative imports with blank lines between groups. Tailwind sorting uses `apps/web/core/styles/main.css` as its stylesheet and recognizes classes passed through `cn`.

Lefthook runs `bun run lint:check` and `bun run type:check` in parallel before commits and pushes. No automated test runner is configured yet.
