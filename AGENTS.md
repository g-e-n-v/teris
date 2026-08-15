# AGENTS.md

## Stack

- **Runtime & package manager:** Bun 1.3+ (`bun`)
- **Language:** TypeScript (strict, `module: ESNext`, `moduleResolution: bundler`)
- **Monorepo:** Turborepo with Bun workspaces (`apps/*`, `packages/*`)
- **Web app:** React 19 + Vite 8, React Compiler, TanStack Router, Tailwind CSS 4
- **API app:** Elysia + Bun runtime, Better Auth, OpenAPI
- **Database:** Drizzle ORM 0.45.x + PostgreSQL via Bun SQL
- **Linting/formatting:** Ultracite (Oxlint + Oxfmt), type-aware

Run `bun run lint:fix` before considering a task complete. No test runner or test script is configured yet.

## API Database Commands

Run from `apps/api/`:

| Task                 | Command                                     |
| -------------------- | ------------------------------------------- |
| Generate a migration | `bun run db:generate -- <descriptive_name>` |
| Apply migrations     | `bun run db:migrate`                        |
| Push schema directly | `bun run db:push` (prototyping only)        |
| Open Drizzle Studio  | `bun run db:studio`                         |

Edit schemas in `apps/api/core/db/schema/`, then generate and migrate. Never hand-edit generated files in `apps/api/core/db/migrations/`.

## Conventions (**STRICT**)

- Use **kebab-case** for file and folder names. Well-known config and generated file names are exceptions.

## Rules (**STRICT**)

- When installing dependencies, carefully check existing package.json files and decide whether to put them at the root (shared across apps/packages or common tools) or in individual apps/packages.
- Only edit code in the `**/*/core` directory when explicitly instructed; otherwise, ask first.
- Try to use existing packages, components, and utilities before adding new ones.
- If it can be created via CLI or scripts, automate it. Don't do it manually.
- Run `bun run lint:fix` and `bun run type:check` before considering a task complete. No test runner or test script is configured yet.

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
