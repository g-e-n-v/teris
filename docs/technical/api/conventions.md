# API App Conventions

App: `@teris/api` — located at `apps/api/`.

## Stack

- **Framework:** Elysia 1.3+
- **Runtime:** Bun (native, not Node)
- **Language:** TypeScript (strict)
- **Database:** Drizzle ORM + PostgreSQL (see [database.md](database.md))

## Elysia Patterns

- Define the app instance with `new Elysia()` and chain routes.
- Use Elysia's built-in type inference for request/response types — avoid manual `any` casts.
- Leverage Elysia plugins and hooks (`onRequest`, `onError`, `.derive()`, `.state()`) for cross-cutting concerns.
- Keep route handlers focused. Extract business logic into separate modules when handlers grow.
- Use Elysia's error system (`error()` helper) instead of throwing raw errors.

## Path Aliases

The `#` alias maps to the app root (`apps/api/`):

```ts
import { foo } from "#/modules/auth-service";
```

Configured in `tsconfig.json` (`paths`).

## TypeScript Config

The API app extends the root `tsconfig.json` and adds:

- `lib`: `ESNext` (no DOM — server-only)
- `types`: `["bun"]` (Bun global types)
- `paths`: `#/*` -> `./*`

Type-checking is done via `tsc --noEmit`.

## Bun Runtime Notes

- The API runs on the Bun runtime, not Node. Use Bun-native APIs when available (`Bun.serve`, `Bun.file`, etc.).
- Elysia is designed for the Bun runtime and leverages Bun's performance characteristics.
- Environment variables are available via `Bun.env` or standard `process.env`.
