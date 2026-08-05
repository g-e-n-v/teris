# RFC-001: Multi-Tenant Architecture

**Status:** Accepted, partially implemented  
**Decision date:** 2026-01-08  
**Last implementation review:** 2026-08-05

## TL;DR

Teris uses a shared PostgreSQL schema for multi-tenant data. A user has one global Better Auth role and may belong to many organizations with a separate role in each organization. Future tenant-owned tables must carry an `organizationId` UUID and every query must enforce that tenant boundary.

Better Auth provides identity, global administration, organizations, and dynamic organization roles. The authentication and organization schema exists; domain tables and tenant query enforcement do not.

## Goals

- Support users who belong to multiple organizations.
- Keep global administration separate from organization membership.
- Use one typed schema and one migration sequence for every tenant.
- Support custom organization roles without redesigning the auth schema.
- Make tenant isolation explicit in every future domain query.

Client auth UI, social providers, the super-admin dashboard, and domain-specific permissions remain outside this RFC.

## Permission Model

Permissions have two independent layers:

| Layer        | Storage       | Current roles                             | Scope              |
| ------------ | ------------- | ----------------------------------------- | ------------------ |
| Global       | `user.role`   | `SUPER_ADMIN`, `ADMIN`, `USER`            | Entire application |
| Organization | `member.role` | `owner`, `admin`, `member`, dynamic roles | One organization   |

`SUPER_ADMIN` and `ADMIN` currently receive Better Auth's full admin statement set. `USER` is the default and receives no global admin statements. Only `SUPER_ADMIN` may create organizations through the configured organization callback.

Organization membership is not required for global administration. Server-side Better Auth APIs may perform approved global operations without adding administrative users to every organization's member list.

Dynamic organization access control is enabled. `organizationRole` stores custom role permissions, but no application domain resources are present in the access-control statement yet.

## Data Model

All tables share one PostgreSQL schema and use PostgreSQL-generated UUID primary keys. Better Auth is configured with `advanced.database.generateId: "uuid"`.

| Group          | Current tables                                             |
| -------------- | ---------------------------------------------------------- |
| Authentication | `user`, `session`, `account`, `verification`               |
| Organizations  | `organization`, `member`, `invitation`, `organizationRole` |
| Domain         | None yet                                                   |

Organization, member, invitation, and organization-role references use UUID foreign keys. `session.activeOrganizationId` and `session.impersonatedBy` are nullable UUID values without database foreign-key constraints, matching the generated Better Auth schema.

Every future tenant-owned domain table must include an `organizationId` UUID foreign key. A resource ID alone is never sufficient authorization; reads and mutations must also verify membership and scope by `organizationId`.

## Repository Layout

```text
apps/api/
├── core/
│   ├── auth/
│   │   ├── better-auth.ts   # Better Auth server configuration
│   │   ├── index.ts         # Elysia handler and session macro
│   │   ├── openapi.ts       # Generated auth OpenAPI integration
│   │   └── permissions.ts   # Shared statements and global roles
│   └── db/
│       ├── client.ts
│       ├── migrations/      # Generated Drizzle artifacts
│       └── schema/
│           ├── auth.ts
│           ├── organization.ts
│           ├── domain.ts    # Placeholder for tenant-owned tables
│           └── index.ts
├── features/                # Elysia feature plugins
├── drizzle.config.ts
└── main.ts
```

Cross-cutting authentication and persistence stay in `core/`. Application HTTP routes belong in `features/`. Import through `#/core/...` from the API root.

## Decisions

### Shared Schema

Use one schema with `organizationId` on tenant-owned data. This preserves one migration sequence, Drizzle type safety, and simple global reporting. It provides logical rather than physical isolation, so application query discipline is security-critical.

Schema-per-tenant and database-per-tenant approaches add connection, migration, and typing complexity that the current product does not need. Physical isolation can be reconsidered for compliance or data-residency requirements.

### Organization Terminology

Use `organization` in code and persistence to match Better Auth. Product copy may present a different label, but it must not introduce a second technical model.

### UUID Identifiers

Use UUIDs for all current auth and organization tables and for future domain tables. This matches Better Auth's configured ID generation and avoids exposing sequential identifiers. UUIDs do not replace tenant authorization checks.

### Dynamic Roles

Keep dynamic organization access control enabled from the initial schema. Add domain resources to the shared permission statement before dynamic roles may grant them.

### Bun SQL And Drizzle

Use `drizzle-orm/bun-sql` with the Better Auth Drizzle adapter's PostgreSQL provider. The adapter works at the Drizzle layer while Bun owns the connection driver.

## Implemented

- Better Auth email/password configuration
- Admin, organization, dynamic access-control, and OpenAPI plugins
- Uppercase global roles and UUID ID generation
- Eight auth and organization tables with generated migrations
- Better Auth handler at `/api/auth/*`
- Session-resolving Elysia auth macro
- Scalar/OpenAPI documentation at `/docs`
- Public health endpoint at `/api/health`
- Credentialed localhost CORS and trusted auth origins

## Remaining Work

- Define tenant-owned domain tables and export them from the schema barrel.
- Add domain resources and actions to the shared access-control statement.
- Centralize organization membership checks and tenant-scoped query helpers.
- Apply those checks to every domain read and mutation.
- Add automated tests for cross-tenant access denial and role boundaries.
- Define an audited super-admin bootstrap and recovery process.
- Replace localhost origin patterns with deployment-specific origins.
- Add production auth hardening, including rate limiting and audit logging.

## Risks

| Risk | Mitigation |
| --- | --- |
| A query omits `organizationId` | Central tenant-scoped data access and cross-tenant tests before domain launch |
| Global and organization roles are confused | Keep uppercase global roles separate from organization member roles |
| Dynamic roles grant undeclared resources | Add resources to the shared statement before exposing role management |
| Production accepts development origins | Configure explicit deployment origins before release |
| First global admin is promoted informally | Use an explicit, logged operational bootstrap procedure |

## Success Criteria

- Email/password sign-up and sessions work through `/api/auth/*`.
- A `SUPER_ADMIN` can create and administer organizations.
- Organization roles limit actions to their organization.
- Every tenant-owned query scopes by membership and `organizationId`.
- Cross-tenant access tests fail closed.
- Generated migrations, type checks, and lint checks pass.

See [API authentication](../technical/api/authentication.md) and [API database](../technical/api/database.md) for current implementation details.
