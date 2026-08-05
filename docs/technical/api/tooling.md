# API App Tooling

App: `@teris/api`, located at `apps/api/`.

## Build And Run

The API uses Bun for development, bundling, and execution.

| Task        | Command              | Behavior                                              |
| ----------- | -------------------- | ----------------------------------------------------- |
| Development | `bun run dev`        | Watches and runs `main.ts`                            |
| Build       | `bun run build`      | Bundles `main.ts` into `dist/`                        |
| Start       | `bun run start`      | Runs source `main.ts`; Turbo builds first at the root |
| Type-check  | `bun run type:check` | `tsc --noEmit`                                        |

The current start script does not execute the bundle in `dist/`. Treat `dist/` as the cached build artifact, not the runtime entry.

From the repository root, filter delegated tasks with `--filter=@teris/api`. Run repository-wide lint commands from the root because the app has no local lint script.

## Application Entry

`main.ts` composes:

1. OpenAPI with Scalar at `/docs`
2. Better Auth's generated OpenAPI schema and handler at `/api/auth/*`
3. Credentialed CORS for `http://localhost:*`
4. Feature plugins, currently the system health endpoint

The public health check is `GET /api/health` and returns `{ "status": "OK" }`. The server listens on `Bun.env.PORT` rather than a fixed port.

## Environment

The API expects these typed variables in `apps/api/.env` or its deployment environment:

| Variable             | Purpose                                                           |
| -------------------- | ----------------------------------------------------------------- |
| `DATABASE_URL`       | PostgreSQL connection string                                      |
| `BETTER_AUTH_SECRET` | Better Auth signing/encryption secret                             |
| `BETTER_AUTH_URL`    | Public base URL for Better Auth                                   |
| `PORT`               | Elysia listen port                                                |
| `NODE_ENV`           | Enables production behavior; database logging is development-only |

Keep `apps/api/.env` untracked. Never put real credentials in documentation or committed examples.

## Database Commands

Run these from `apps/api/`:

| Task                        | Command                                     |
| --------------------------- | ------------------------------------------- |
| Generate a named migration  | `bun run db:generate -- <descriptive_name>` |
| Apply pending migrations    | `bun run db:migrate`                        |
| Push schema for prototyping | `bun run db:push`                           |
| Open Drizzle Studio         | `bun run db:studio`                         |

See [database.md](database.md) for the schema and migration workflow.
