# AGENTS.md

## Stack

- **Runtime & package manager:** Bun 1.3+ (`bun`)
- **Language:** TypeScript (strict, `module: ESNext`, `moduleResolution: bundler`)
- **Monorepo:** Turborepo with Bun workspaces (`apps/*`, `packages/*`)
- **Web app:** React 19 + Vite 8, React Compiler, TanStack Router, Tailwind CSS 4, Base UI
- **API app:** Elysia + Bun runtime, Better Auth, OpenAPI
- **Database:** Drizzle ORM 0.45.x + PostgreSQL via Bun SQL
- **Linting/formatting:** Ultracite (Oxlint + Oxfmt), type-aware

## Commands

| Task                  | Command              |
| --------------------- | -------------------- |
| Dev (all apps)        | `bun run dev`        |
| Build (all apps)      | `bun run build`      |
| Start (all apps)      | `bun run start`      |
| Type-check (all apps) | `bun run type:check` |
| Lint check (all apps) | `bun run lint:check` |
| Lint fix (all apps)   | `bun run lint:fix`   |

Run `bun run lint:check` before considering a task complete. No test runner or test script is configured yet.

## API Database Commands

Run from `apps/api/`:

| Task                 | Command                                     |
| -------------------- | ------------------------------------------- |
| Generate a migration | `bun run db:generate -- <descriptive_name>` |
| Apply migrations     | `bun run db:migrate`                        |
| Push schema directly | `bun run db:push` (prototyping only)        |
| Open Drizzle Studio  | `bun run db:studio`                         |

Edit schemas in `apps/api/core/db/schema/`, then generate and migrate. Never hand-edit generated files in `apps/api/core/db/migrations/`.

## Naming

Use **kebab-case** for file and folder names. Well-known config and generated file names are exceptions.

## Technical Docs

Read these only when working in the relevant area:

| Area | File |
| --- | --- |
| Monorepo and tooling | [docs/technical/monorepo.md](docs/technical/monorepo.md) |
| Web conventions and tooling | [docs/technical/web/conventions.md](docs/technical/web/conventions.md), [docs/technical/web/tooling.md](docs/technical/web/tooling.md) |
| Web routing | [docs/technical/web/routing.md](docs/technical/web/routing.md) |
| Web color system | [docs/technical/web/color-system.md](docs/technical/web/color-system.md) |
| API conventions and tooling | [docs/technical/api/conventions.md](docs/technical/api/conventions.md), [docs/technical/api/tooling.md](docs/technical/api/tooling.md) |
| API auth and database | [docs/technical/api/authentication.md](docs/technical/api/authentication.md), [docs/technical/api/database.md](docs/technical/api/database.md) |
| Multi-tenant architecture | [docs/rfc/001-multi-tenant-architecture.md](docs/rfc/001-multi-tenant-architecture.md) |
