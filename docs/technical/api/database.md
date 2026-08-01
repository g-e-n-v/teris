# API Database

App: `@teris/api` — database layer located at `apps/api/db/`.

## Stack

- **ORM:** Drizzle ORM 0.45.x (stable)
- **Driver:** `drizzle-orm/bun-sql` (wraps Bun's built-in PostgreSQL driver, no external driver package needed)
- **Database:** PostgreSQL 15+
- **Migrations:** Drizzle Kit (`drizzle-kit`)

## File Structure

```
apps/api/db/
├── client.ts        # Drizzle client — initialized once, imported everywhere
├── schema.ts        # Table definitions (single source of truth for your database schema)
└── migrations/      # Generated SQL migration files (committed to git)
```

- `schema.ts` is the only file you edit. It defines your tables in TypeScript.
- `client.ts` creates the Drizzle instance. You import `db` from it in route handlers and services: `import { db } from "#/db/client"`.
- `migrations/` contains generated SQL files. Never edit these by hand. They are committed to git and applied in order.

## Environment

The database connection string is read from `DATABASE_URL`:

```
DATABASE_URL=postgresql://username:password@localhost:5432/teris_api
```

Set this in `apps/api/.env` (gitignored). In code, it's accessed via `Bun.env.DATABASE_URL`.

## Commands

All commands are run from `apps/api/`:

| Task | Command | Description |
| --- | --- | --- |
| Generate a migration | `bun run db:generate -- <descriptive_name>` | Compares `schema.ts` to last migration, writes SQL to `db/migrations/`. Does not touch the database. Use snake_case for the name (e.g. `add_users`, `create_posts`). |
| Apply migrations | `bun run db:migrate` | Runs all unapplied migration SQL files in order against your database. Safe for production. |
| Push schema directly | `bun run db:push` | Syncs `schema.ts` to the database without creating migration files. Prototyping only, never use in production. |
| Open Drizzle Studio | `bun run db:studio` | Web-based database browser at `https://localhost:4983`. View and edit data during development. |

The `db:generate` script has `--name` built in, so you pass the name directly after `--`:

```bash
bun run db:generate -- add_users_table
# Produces: db/migrations/0000_add_users_table.sql
```

## Schema Workflow

You only ever edit `db/schema.ts`. Migration files are generated output, never written by hand.

```
Edit schema.ts
      |
      v
bun run db:generate -- <name>   →   generates .sql file in db/migrations/
      |
      v
Review the .sql file
      |
      v
bun run db:migrate              →   applies the SQL to your database
      |
      v
Git commit (schema.ts + the .sql file)
```

### What to do

- Define tables with `pgTable` and export them
- Use `generatedAlwaysAsIdentity()` for primary keys (not the legacy `serial()`)
- Use `withTimezone: true` on all timestamp columns
- Use snake_case for database column names, camelCase for TypeScript property names (Drizzle maps between them)
- Run `db:generate -- <name>` after every schema change, then `db:migrate` to apply

### What not to do

- Do not edit generated `.sql` files. If a migration is wrong, delete it and regenerate
- Do not run `db:push` in production or any shared environment
- Do not create a new `drizzle()` instance per request. The client in `client.ts` is created once and reused everywhere

## Using the Database in Routes

```ts
import { db } from "#/db/client";
import { users } from "#/db/schema";
import { eq } from "drizzle-orm";

// Select all
const allUsers = await db.select().from(users);

// Select by id
const [user] = await db.select().from(users).where(eq(users.id, 1));

// Insert
const [newUser] = await db.insert(users).values({ email: "a@b.com" }).returning();

// Update
const [updated] = await db.update(users).set({ name: "Alice" }).where(eq(users.id, 1)).returning();

// Delete
await db.delete(users).where(eq(users.id, 1));
```

For querying related data (nested fetches without manual joins), define relations and use the relational query API (`db.query`). See the [Drizzle relations docs](https://orm.drizzle.team/docs/relations-schema-declaration) for the current version.

## Production Deployment

In production, run `bun run db:migrate` before the server starts. This applies any pending migrations in order. Drizzle tracks applied migrations in a `__drizzle_migrations` table inside your database, so it only runs what hasn't been applied yet.

```bash
# CI/CD pipeline
bun run db:migrate    # apply pending migrations
bun run start         # start the server
```

Never use `db:push` in production. It has no migration history and no rollback.
