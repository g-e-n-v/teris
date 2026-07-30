# AGENTS.md

## Stack

- **Runtime & package manager:** Bun 1.3+ (`bun`)
- **Language:** TypeScript (strict, `module: ESNext`, `moduleResolution: bundler`)
- **Monorepo:** Turborepo with Bun workspaces (`apps/*`, `packages/*`)
- **Web app:** React 19 + Vite 8 (with React Compiler)
- **API app:** Elysia + Bun runtime
- **Linting/formatting:** Ultracite (Oxlint + Oxfmt), type-aware

## Commands

| Task                  | Command              |
| --------------------- | -------------------- |
| Dev (all apps)        | `bun run dev`        |
| Build (all apps)      | `bun run build`      |
| Type-check (all apps) | `bun run type:check` |
| Lint check (all apps) | `bun run lint:check` |
| Lint fix (all apps)   | `bun run lint:fix`   |

Run `bun run lint:check` before considering a task complete.

## Domain Guidance

Read these only when working in the relevant area:

| Area | File | Covers |
| --- | --- | --- |
| Monorepo & shared tooling | [docs/monorepo.md](docs/monorepo.md) | Workspaces, Turborepo task pipeline, shared configs, Ultracite standards |
| Web app conventions | [docs/web/conventions.md](docs/web/conventions.md) | React 19 patterns, React Compiler, path aliases, TS config |
| Web app tooling | [docs/web/tooling.md](docs/web/tooling.md) | Vite config, build/dev scripts, app-specific oxlint |
| API app conventions | [docs/api/conventions.md](docs/api/conventions.md) | Elysia patterns, Bun runtime, path aliases, TS config |
| API app tooling | [docs/api/tooling.md](docs/api/tooling.md) | Bun build/dev scripts, app-specific oxlint |
