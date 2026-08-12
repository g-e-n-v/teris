# API Authentication

App: `@teris/api`, with authentication infrastructure shared via the `@teris/auth` package and app-level wiring under `apps/api/core/auth/`.

## Better Auth Configuration

`better-auth.ts` instantiates the Better Auth server via the shared `createAuthServer` factory from `@teris/auth`, passing the app's Drizzle client and schema. The factory (and the plugin configuration it applies) lives in `packages/auth/src/server.ts` and enables:

- Email and password authentication
- UUID generation
- Admin plugin for global user administration
- Organization plugin with dynamic access control
- OpenAPI plugin without Better Auth's separate reference page
- Trusted development origins matching `http://localhost:*`

The Elysia plugin in `index.ts` mounts Better Auth at its default `/api/auth/*` path. It also exposes an `auth` macro that resolves the session from request headers and returns 401 when no session exists.

## Roles

Global role values are uppercase and persisted on `user.role`:

| Role           | Scope                                                |
| -------------- | ---------------------------------------------------- |
| `SYSTEM_ADMIN` | Full global administration and organization creation |
| `ADMIN`        | Full Better Auth admin statement set                 |
| `USER`         | Default role with no global admin statements         |

`permissions.ts` (in the shared `@teris/auth` package) combines Better Auth's admin and organization statements into one access-control definition. Both global admin roles currently receive the complete admin statement set. Organization roles remain separate on `member.role`; Better Auth supplies `owner`, `admin`, and `member`, and dynamic roles can be stored in `organizationRole`.

Only `SYSTEM_ADMIN` passes `allowUserToCreateOrganization`. Domain resources have not been added to the access-control statement yet.

## OpenAPI

`openapi.ts` obtains Better Auth's generated schema once, prefixes its paths with `/api/auth`, and tags operations as `Better Auth`. The main application merges this schema into Elysia OpenAPI and serves Scalar at `/docs`.

Application routes should declare their own request and response schemas. Use the auth macro for protected Elysia routes instead of calling session APIs repeatedly.

## Environment

Authentication requires `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. Keep the secret at least 32 characters and store both values in `apps/api/.env` or the deployment secret manager. CORS and trusted origins currently allow localhost ports for development; production origins must be configured before deployment.

## Current Gaps

The current implementation has no client auth UI, social providers, email verification delivery, password-reset delivery, explicit rate-limit policy, session tuning, audit logging, or documented super-admin bootstrap automation. No feature route currently uses the auth macro.

Treat these as implementation gaps, not supported behavior. In particular, do not assume that `adminUserIds` bootstraps a super-admin; that option is not configured. Promote the first global administrator through an explicit, audited operational process before exposing organization management.
