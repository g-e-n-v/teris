# RFC-001: Multi-Tenant Architecture

**Status:** Accepted **Date:** 2026-01-08 **Author:** Teris Team

## TL;DR

We're building Teris as a multi-tenant SaaS where one user can belong to multiple organizations. Each organization has its own members, roles, and permissions. A super-admin role manages everything globally. We use Better Auth's organization plugin for tenant isolation, the admin plugin for global user management, and dynamic access control for future per-organization custom roles. All data lives in a single PostgreSQL schema with an `organizationId` column on every domain table.

## Problem & Context

Teris needs to support:

1. **Multiple organizations** (workspaces) with similar data schemas
2. **One user in many organizations** - a single identity across tenants
3. **Super-admin role** - manages all organizations and users from the top
4. **Per-organization permission system** - flexible, customizable roles within each org (implemented later)

We need to pick a multi-tenant database strategy and an auth/permission framework before building any domain features. The decisions are hard to reverse later, so getting them right now saves significant rework.

## Goals & Non-Goals

### Goals

- Choose a multi-tenant data isolation strategy
- Define the database schema layout for auth, organization, and domain tables
- Define the permission model (global + per-organization)
- Map every requirement to a concrete Better Auth feature or plugin
- Leave the door open for per-organization custom roles without designing that system now

### Non-Goals

- Implementing the client-side auth UI (covered in a future RFC)
- Designing the per-organization permission system itself (deferred - we're just making sure the architecture supports it)
- Implementing OAuth/social login providers (can be added incrementally later)
- Building the super-admin dashboard UI

## Architecture

### Auth Framework: Better Auth

Better Auth is a framework-agnostic TypeScript auth library with a plugin system. It has first-class Elysia support and a Drizzle ORM adapter. Three components map directly to our requirements:

| Requirement                   | Better Auth Component                                   |
| ----------------------------- | ------------------------------------------------------- |
| Multi-tenant organizations    | `organization` plugin                                   |
| Super-admin user management   | `admin` plugin                                          |
| Per-org custom roles (future) | `dynamicAccessControl` addon on the organization plugin |
| Elysia integration            | `auth.handler` mount + macro pattern                    |
| Drizzle ORM + PostgreSQL      | `drizzleAdapter(db, { provider: "pg" })`                |

### Two-Layer Permission Model

The permission system has two independent layers that compose cleanly:

```
Layer 1: Global (Admin Plugin)          Layer 2: Per-Organization (Org Plugin)
┌─────────────────────────────┐         ┌─────────────────────────────────┐
│ Stored on: user.role        │         │ Stored on: member.role           │
│ Scope: entire application   │         │ Scope: single organization       │
│                             │         │                                  │
│ Roles:                      │         │ Roles:                           │
│   super-admin  (manages all)│         │   owner   (full org control)     │
│   admin        (manages users)│       │   admin   (member mgmt, no delete)│
│   user         (default)    │         │   member  (basic access)         │
│                             │         │   <custom> (runtime-created)     │
│ Permissions:                │         │                                  │
│   user:create, list, ban,  │         │ Permissions:                     │
│   impersonate, delete,      │         │   organization:update, delete    │
│   set-role, set-password    │         │   member:create, update, delete  │
│   session:list, revoke      │         │   invitation:create, cancel      │
└─────────────────────────────┘         └─────────────────────────────────┘
```

**How they interact:**

A user has one global role (`super-admin`, `admin`, or `user`) that determines what they can do at the application level. Separately, for each organization they belong to, they have a member role (`owner`, `admin`, `member`, or a custom role) that determines what they can do within that organization.

A super-admin who needs to manage organizations without joining them uses server-side API calls (`auth.api.createOrganization`, `auth.api.addMember`) which can operate without session headers for admin operations.

### Database Strategy: Shared Schema

All tables live in a single PostgreSQL schema. Every domain table carries an `organizationId` foreign key column for tenant isolation. This is the standard SaaS multi-tenant pattern used by Linear, Vercel, Notion, and others.

```mermaid
erDiagram
    user {
        integer id PK
        varchar name
        varchar email UK
        boolean emailVerified
        varchar image
        varchar role "super-admin | admin | user"
        boolean banned
        varchar banReason
        timestamp banExpires
        timestamp createdAt
        timestamp updatedAt
    }

    session {
        integer id PK
        integer userId FK
        varchar token UK
        timestamp expiresAt
        integer activeOrganizationId FK
        integer impersonatedBy FK
        timestamp createdAt
        timestamp updatedAt
    }

    account {
        integer id PK
        integer userId FK
        varchar accountId
        varchar providerId
        varchar password
        timestamp createdAt
        timestamp updatedAt
    }

    verification {
        integer id PK
        varchar identifier
        varchar value
        timestamp expiresAt
        timestamp createdAt
    }

    organization {
        integer id PK
        varchar name
        varchar slug UK
        varchar logo
        jsonb metadata
        timestamp createdAt
    }

    member {
        integer id PK
        integer userId FK
        integer organizationId FK
        varchar role "owner | admin | member | custom"
        timestamp createdAt
    }

    invitation {
        integer id PK
        varchar email
        integer inviterId FK
        integer organizationId FK
        varchar role
        varchar status
        timestamp createdAt
        timestamp expiresAt
    }

    organization_role {
        integer id PK
        integer organizationId FK
        varchar role "runtime-created role name"
        jsonb permission "resource -> actions mapping"
        timestamp createdAt
        timestamp updatedAt
    }

    domain_table {
        integer id PK
        integer organizationId FK "tenant isolation column"
        varchar data
        timestamp createdAt
        timestamp updatedAt
    }

    user ||--o{ session : "has"
    user ||--o{ account : "has"
    user ||--o{ member : "joins"
    organization ||--o{ member : "has members"
    organization ||--o{ invitation : "sends"
    organization ||--o{ organization_role : "defines custom roles"
    user ||--o{ invitation : "invites"
    organization ||--o{ domain_table : "owns"
```

### Table Groups

The database has three logical groups of tables, all in one schema:

| Group | Tables | Source |
| --- | --- | --- |
| **Auth core** | `user`, `session`, `account`, `verification` | Better Auth core |
| **Organization + Admin** | `organization`, `member`, `invitation`, `organizationRole` | Organization plugin + Admin plugin (adds fields to `user`) |
| **Domain** | `project`, `task`, etc. | Your application tables (all carry `organizationId`) |

### ID Strategy

All tables use `integer` primary keys with `generatedAlwaysAsIdentity()`. Better Auth is configured with `advanced.database.generateId: "serial"` so it generates numeric IDs consistently with the existing schema. Better Auth will infer these as strings in TypeScript, which is normal behavior with the serial ID mode.

### File Structure

```
apps/api/
├── core/
│   ├── db/
│   │   ├── client.ts          # Drizzle client (bun-sql)
│   │   ├── migrations/        # Generated SQL files (never hand-edited)
│   │   └── schema/
│   │       ├── index.ts       # Barrel export: export * from "./auth" | "./organization" | "./domain"
│   │       ├── auth.ts        # Better Auth core tables (user, session, account, verification)
│   │       ├── organization.ts # Org plugin tables (organization, member, invitation, organizationRole)
│   │       └── domain.ts      # Application-specific tables (all carry organizationId)
│   └── auth/
│       ├── auth.ts            # Better Auth server config
│       └── permissions.ts     # Shared access control + role definitions
├── main.ts                    # Elysia app + auth handler mount
└── drizzle.config.ts
```

All cross-cutting concerns (database, auth, permissions) live under `core/`. The `#` path alias maps to `apps/api/`, so imports look like `import { auth } from "#/core/auth/auth"` and `import { db } from "#/core/db/client"`. Schema imports use `import * as schema from "#/core/db/schema"` (resolves to `core/db/schema/index.ts`). The Better Auth CLI (`bun x auth generate`) outputs a single `auth-schema.ts` file. You split its contents into `core/db/schema/auth.ts` and `core/db/schema/organization.ts`, then add domain tables in `core/db/schema/domain.ts`.

## Key Decisions

### 1. Shared Schema vs. Schema-per-Tenant

| Approach | Pros | Cons | Decision |
| --- | --- | --- | --- |
| **Shared schema + `organizationId`** | One migration per change. Full Drizzle type safety. Cross-tenant queries are trivial. Standard SaaS pattern. | Logical isolation only (app must filter by org). All tenants share one schema. | **Yes** |
| **Schema per tenant** | Physical data isolation. Per-tenant backup possible. | N migrations per change. Drizzle can't handle dynamic schemas (loses type safety). Cross-schema FKs are fragile. No real benefit for "similar schemas." | No |
| **Database per tenant** | Full isolation. Per-tenant backup and scaling. | Connection management overhead. Per-DB migrations. Overkill for similar schemas. | No |

**Decision: Shared schema with `organizationId` column.**

We chose this because our organizations have similar schemas (not different table structures), so per-tenant schemas would add massive complexity for zero benefit. The shared schema keeps one migration per change, full Drizzle type safety, and straightforward cross-tenant queries for the super-admin dashboard. If we ever need physical isolation for compliance or data residency, we can migrate from shared to per-tenant later by writing a data copy script. The reverse is much harder.

### 2. Terminology: "organization" (not "workspace")

We use the term **organization** throughout the codebase to stay consistent with Better Auth's naming. The organization plugin's tables, API methods, and types all use `organization`. Renaming to `workspace` would require mapping every table name, field, and API call, creating a maintenance burden and making it harder to follow Better Auth docs. The database table stays `organization`, the TypeScript types use `organization`, and the user-facing UI can display whatever label we want ("Workspace" in the UI, `organization` in the code).

### 3. Super-Admin Does Not Join Every Organization

Instead of making the super-admin a `member` of every organization, they manage organizations through server-side API calls that don't require session membership. This keeps the `member` table clean (no phantom admin memberships polluting org rosters) and avoids triggering member lifecycle hooks for admin actions.

The super-admin uses `auth.api.createOrganization({ body: { name, slug, userId } })` (server-side, no session headers) to create organizations, `auth.api.addMember()` to add users to orgs, and `auth.api.listUsers()` / `auth.api.banUser()` for global user management.

### 4. Dynamic Access Control Enabled from Day One

We enable `dynamicAccessControl: { enabled: true }` on the organization plugin even though the per-org permission system comes later. This creates the `organizationRole` table upfront, avoiding a migration when we build that feature. The access control statement (the `ac` object) is shared between the admin and organization plugins, and all domain resources must be defined in it from the start because dynamic roles can only grant permissions that already exist in the statement.

### 5. Drizzle Adapter with bun-sql Driver

The project uses `drizzle-orm/bun-sql` (Bun's built-in PostgreSQL driver). Better Auth's Drizzle adapter operates at the ORM layer, so `provider: "pg"` works regardless of the underlying driver. The `db` instance from `apps/api/core/db/client.ts` is passed directly to `drizzleAdapter(db, { provider: "pg", schema })`.

## Implementation Plan

### Phase 1: Dependencies and Config

1. **Install in `apps/api`:**
   - `better-auth` (core auth library)
   - `@better-auth/drizzle-adapter` (Drizzle adapter for Better Auth)
   - `@elysiajs/cors` (CORS for the web app)

2. **Environment variables** (in `apps/api/.env`):

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/teris_api
   BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
   BETTER_AUTH_URL=http://localhost:3000
   ```

3. **Create `apps/api/core/auth/permissions.ts`:**

   Define the shared access control. The `ac` object is the single source of truth for all permission statements. Both the admin and organization plugins receive it.

   ```ts
   import { createAccessControl } from "better-auth/plugins/access";
   import { defaultStatements as adminStatements, adminAc } from "better-auth/plugins/admin/access";
   import { defaultStatements as orgStatements } from "better-auth/plugins/organization/access";

   const statement = {
     ...adminStatements,
     ...orgStatements,
     // Domain resources added here as features are built:
     // project: ["create", "read", "update", "delete"],
   } as const;

   export const ac = createAccessControl(statement);

   export const superAdmin = ac.newRole({
     ...adminAc.statements,
     // super-admin gets all admin permissions
   });

   export const admin = ac.newRole({
     ...adminAc.statements,
   });

   export const user = ac.newRole({});
   ```

4. **Create `apps/api/core/auth/auth.ts`:**

   ```ts
   import { betterAuth } from "better-auth";
   import { drizzleAdapter } from "@better-auth/drizzle-adapter";
   import { organization } from "better-auth/plugins";
   import { admin } from "better-auth/plugins";
   import { db } from "#/core/db/client";
   import * as schema from "#/core/db/schema"; // resolves to core/db/schema/index.ts
   import { ac, superAdmin, admin as adminRole, user } from "#/core/auth/permissions";

   export const auth = betterAuth({
     database: drizzleAdapter(db, {
       provider: "pg",
       schema,
     }),
     advanced: {
       database: { generateId: "serial" },
     },
     trustedOrigins: ["http://localhost:5173"],
     emailAndPassword: { enabled: true },
     plugins: [
       admin({
         ac,
         roles: { superAdmin, admin: adminRole, user },
         adminRoles: ["superAdmin", "admin"],
         defaultRole: "user",
       }),
       organization({
         allowUserToCreateOrganization: async (user) => user.role === "superAdmin",
         ac,
         dynamicAccessControl: { enabled: true },
       }),
     ],
   });

   export type Session = typeof auth.$Infer.Session;
   ```

5. **Update `apps/api/@types/env.d.ts`:**

   ```ts
   interface TerisEnv {
     DATABASE_URL: string;
     NODE_ENV: string;
     BETTER_AUTH_SECRET: string;
     BETTER_AUTH_URL: string;
   }
   // ... rest stays the same
   ```

### Phase 2: Database Schema

6. **Generate Better Auth schema:**

   ```bash
   cd apps/api
   bun x auth generate --output core/db/auth-schema.ts
   ```

   This produces Drizzle table definitions for: `user`, `session`, `account`, `verification`, `organization`, `member`, `invitation`, `organizationRole`, plus admin plugin fields on `user` (`role`, `banned`, `banReason`, `banExpires`) and organization fields on `session` (`activeOrganizationId`).

7. **Split into schema files:**

   - Move auth core tables (`user`, `session`, `account`, `verification`) into `core/db/schema/auth.ts`
   - Move organization tables (`organization`, `member`, `invitation`, `organizationRole`) into `core/db/schema/organization.ts`
   - Create `core/db/schema/domain.ts` for application tables (all with `organizationId` FK)
   - Update `core/db/schema/index.ts` to barrel export from all three files

8. **Generate and apply migration:**

   ```bash
   bun run db:generate -- init_auth
   bun run db:migrate
   ```

### Phase 3: Elysia Integration

9. **Update `apps/api/main.ts`:**

   ```ts
   import { Elysia } from "elysia";
   import { cors } from "@elysiajs/cors";
   import { auth } from "#/core/auth/auth";

   const betterAuth = new Elysia({ name: "better-auth" }).mount(auth.handler).macro({
     auth: {
       async resolve({ status, request: { headers } }) {
         const session = await auth.api.getSession({ headers });
         if (!session) return status(401);
         return {
           user: session.user,
           session: session.session,
         };
       },
     },
   });

   const app = new Elysia()
     .use(
       cors({
         origin: "http://localhost:5173",
         credentials: true,
         allowedHeaders: ["Content-Type", "Authorization"],
       })
     )
     .use(betterAuth)
     .get("/", () => "Hello from API")
     .get("/me", ({ user }) => user, { auth: true })
     .listen(3000);

   console.log(`API listening on ${app.server?.url.origin}`);
   ```

### Phase 4: Super-Admin Bootstrap

10. **Bootstrap the first super-admin:**

    Add the user's ID to `adminUserIds` in the admin plugin config to grant admin access via ID rather than role. This avoids hardcoding credentials in a seed script. Sign up normally via the API, then add the returned user ID to the config.

## Tradeoffs & Risks

| Tradeoff | What We Gain | What We Accept |
| --- | --- | --- |
| Shared schema (no per-tenant schemas) | Simple migrations, full type safety, cross-tenant queries | App must filter by `organizationId`. No physical data isolation. |
| "organization" terminology (not "workspace") | Zero mapping layer with Better Auth docs and APIs | User-facing UI must map "organization" to whatever label we choose |
| Dynamic AC enabled now (no per-org roles yet) | `organizationRole` table exists upfront, no future migration | Extra table that's unused initially |
| Super-admin not a member of orgs | Clean member table, no phantom memberships | Super-admin uses server-side API calls for org management (no client-side org switching) |
| Serial integer IDs (not UUIDs) | Consistent with existing schema, compact, fast | IDs are sequential (no obfuscation). Cross-tenant ID guessing mitigated by `organizationId` filtering. |
| bun-sql driver with Drizzle adapter | No extra driver package, Bun-native | The adapter is tested against `pg` and `postgres.js`. If issues arise, fallback is `pg.Pool` (minor change in `client.ts`). |

### Risk: bun-sql + Drizzle Adapter Compatibility

Better Auth's Drizzle adapter is documented with `pg.Pool` and `postgres.js`. The `bun-sql` driver (`drizzle-orm/bun-sql`) is a PostgreSQL driver that speaks the Postgres wire protocol. Since the Drizzle adapter operates at the ORM layer (not the driver layer), `provider: "pg"` should work. If we hit issues, the fallback is swapping `drizzle-orm/bun-sql` for `drizzle-orm/node-postgres` in `core/db/client.ts` and installing `pg`. This is a one-file change.

### Risk: Serial IDs and Cross-Tenant Enumeration

With sequential integer IDs, an attacker who knows resource ID `42` exists might guess that `43` exists in another organization. This is mitigated because every domain query filters by `organizationId`, and a user can only access resources in organizations they're a member of. For additional defense, we can add PostgreSQL Row-Level Security (RLS) policies later without changing application code:

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON projects
  USING (
    organization_id IN (
      SELECT organization_id FROM member
      WHERE user_id = current_setting('app.current_user_id')::int
    )
  );
```

## Success Metrics

- [ ] Better Auth endpoints respond at `/api/auth/*` (verify with `GET /api/auth/ok` returning `{ status: "ok" }`)
- [ ] User can sign up with email/password and receive a session
- [ ] Super-admin can create an organization via server-side API
- [ ] Super-admin can add a member to an organization
- [ ] User can switch active organization (sets `activeOrganizationId` on session)
- [ ] Domain tables filter correctly by `organizationId` (no cross-tenant data leaks)
- [ ] `organizationRole` table exists and is ready for dynamic role creation
- [ ] `bun run lint:check` and `bun run type:check` pass
