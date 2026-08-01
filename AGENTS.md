# AGENTS.md

## Stack

- **Runtime & package manager:** Bun 1.3+ (`bun`)
- **Language:** TypeScript (strict, `module: ESNext`, `moduleResolution: bundler`)
- **Monorepo:** Turborepo with Bun workspaces (`apps/*`, `packages/*`)
- **Web app:** React 19 + Vite 8 (with React Compiler)
- **API app:** Elysia + Bun runtime
- **Database:** Drizzle ORM + PostgreSQL (via Bun's built-in SQL driver)
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

## API Database Commands

Run from `apps/api/`:

| Task                 | Command                                     |
| -------------------- | ------------------------------------------- |
| Generate a migration | `bun run db:generate -- <descriptive_name>` |
| Apply migrations     | `bun run db:migrate`                        |
| Push schema directly | `bun run db:push` (prototyping only)        |
| Open Drizzle Studio  | `bun run db:studio`                         |

Edit `apps/api/db/schema.ts`, then generate and migrate. Never hand-edit the `.sql` files in `db/migrations/`.

## Naming

All file and folder names use **kebab-case** (e.g. `user-profile.tsx`, `auth-service.ts`, `api-client/`). Exceptions are well-known config files (`package.json`, `tsconfig.json`, `vite.config.ts`, `oxlint.config.ts`, `oxfmt.config.ts`, `index.html`, etc.).

## Technical Docs

Read these only when working in the relevant area:

| Area | File | Covers |
| --- | --- | --- |
| Monorepo | [docs/technical/monorepo.md](docs/technical/monorepo.md) | Workspaces, Turborepo pipeline, shared TS config, linting |
| Web app conventions | [docs/technical/web/conventions.md](docs/technical/web/conventions.md) | React 19 patterns, React Compiler, path aliases, TS config |
| Web app tooling | [docs/technical/web/tooling.md](docs/technical/web/tooling.md) | Vite config, scripts, entry point, build output |
| API app conventions | [docs/technical/api/conventions.md](docs/technical/api/conventions.md) | Elysia patterns, Bun runtime, path aliases, TS config |
| API app tooling | [docs/technical/api/tooling.md](docs/technical/api/tooling.md) | Build/run scripts, entry point, build output |
| API database | [docs/technical/api/database.md](docs/technical/api/database.md) | Drizzle ORM, schema workflow, migrations, production deployment |
