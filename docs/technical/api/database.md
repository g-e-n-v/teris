# API Database

App: `@teris/api`, with database infrastructure under `apps/api/core/db/`.

## Stack

- Drizzle ORM 0.45.x
- `drizzle-orm/bun-sql` over Bun's PostgreSQL driver
- PostgreSQL
- Drizzle Kit for migration generation and execution

`core/db/client.ts` creates one shared Drizzle instance from `DATABASE_URL`. Query logging is enabled outside production. Import this client rather than constructing a connection per request.

## Structure

```text
apps/api/core/db/
├── client.ts
├── migrations/          # Generated SQL, snapshots, and journal
└── schema/
    ├── auth.ts          # user, session, account, verification
    ├── organization.ts  # organization, member, invitation, organizationRole
    ├── domain.ts        # Reserved for tenant-owned application tables
    └── index.ts         # Explicit schema exports passed to Drizzle and Better Auth
```

`drizzle.config.ts` reads schema files from `core/db/schema/` and writes generated migrations to `core/db/migrations/`.

## Current Schema

Eight persisted tables support Better Auth and its organization/admin plugins:

| Group        | Tables                                                     |
| ------------ | ---------------------------------------------------------- |
| Auth         | `user`, `session`, `account`, `verification`               |
| Organization | `organization`, `member`, `invitation`, `organizationRole` |

All primary keys are PostgreSQL-generated UUIDs. Better Auth uses `advanced.database.generateId: "uuid"` to match. Foreign-key IDs are UUIDs, timestamps use time zones, and database names remain compatible with Better Auth's generated schema.

`domain.ts` is currently a placeholder and is not exported by the schema barrel. No application domain tables, Drizzle relation declarations, or tenant query helpers exist yet.

## Workflow

Run commands from `apps/api/`:

```bash
bun run db:generate -- add_project
bun run db:migrate
```

1. Edit the relevant file in `core/db/schema/`.
2. Export new persisted tables from `core/db/schema/index.ts`.
3. Generate a descriptively named migration.
4. Review the generated SQL for destructive or unintended changes.
5. Apply the migration and commit the schema plus all generated migration artifacts.

Never hand-edit SQL, snapshots, or the migration journal. If a new, unapplied migration is wrong, remove its generated artifacts through the supported Drizzle workflow and regenerate it. Do not rewrite migration history that another environment may have applied.

Use `bun run db:push` only for disposable prototyping. Production and shared environments use generated migrations.

## Querying

Import the shared client and exported schema through the `#/core` alias:

```ts
import { eq } from "drizzle-orm";

import { db } from "#/core/db/client";
import { user } from "#/core/db/schema";

const userId = "0f0d58c6-167c-4a1b-a5fa-8fe874dc8435";
const [record] = await db.select().from(user).where(eq(user.id, userId));
```

The project uses Drizzle 0.45.x. Match its legacy relations API if relations are introduced; do not use Drizzle v1-only `defineRelations` syntax without upgrading the dependencies.

## Tenant Isolation

The accepted architecture requires every future tenant-owned domain table to include an `organizationId` UUID foreign key. Every read and mutation must scope by organization membership and `organizationId`; this enforcement is not implemented yet. Treat missing tenant filters as a security bug once domain tables are introduced.
