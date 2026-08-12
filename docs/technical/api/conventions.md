# API App Conventions

App: `@teris/api`, located at `apps/api/`.

## Stack

- Elysia on the Bun runtime
- TypeScript in strict, no-emit mode
- Better Auth with admin, organization, and OpenAPI plugins
- Drizzle ORM 0.45.x with Bun SQL and PostgreSQL
- Elysia CORS and OpenAPI/Scalar documentation

## Structure

Cross-cutting infrastructure lives under `core/`:

- `core/auth/` instantiates the Better Auth server (via the shared `@teris/auth` package) and provides the Elysia integration and OpenAPI generation. Access-control statements, roles, and the server factory are shared from `@teris/auth`.
- `core/db/` owns the shared Drizzle client, schemas, and generated migrations.

Application routes live under `features/`. Each feature exports an Elysia plugin, and `main.ts` composes plugins and server-level middleware. Keep route handlers focused and move reusable business logic out of the entry point.

## Elysia

- Build named plugin instances and compose them with `.use()`.
- Chain configuration and routes so Elysia preserves inferred context types.
- Register hooks, macros, and models before routes that consume them.
- Use Elysia's status helper for expected HTTP failures rather than throwing raw errors.
- Declare request and response schemas for application endpoints so OpenAPI remains accurate.
- Use the auth macro from `core/auth/index.ts` for endpoints that require a Better Auth session.

## Path Alias

The `#/*` alias maps to the API app root:

```ts
import { db } from "#/core/db/client";
```

The alias is defined in `tsconfig.json`. The API adds Bun types and the ESNext library without DOM types.

## Runtime

Use Bun-native APIs where they fit the existing stack. Environment variables are typed in `@types/env.d.ts` and available through `Bun.env` or `process.env`. Do not log secrets or connection strings.

See [authentication.md](authentication.md), [database.md](database.md), and [tooling.md](tooling.md) before changing API infrastructure.
