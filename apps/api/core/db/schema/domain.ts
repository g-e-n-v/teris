// Application-specific domain tables.
// All domain tables carry an `organizationId` FK for tenant isolation.
// Example:
//
//   import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
//   import { organization } from "./organization";
//
//   export const project = pgTable("project", {
//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     name: varchar("name", { length: 255 }).notNull(),
//     organizationId: integer("organization_id")
//       .notNull()
//       .references(() => organization.id, { onDelete: "cascade" }),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
//   });

export const _domainPlaceholder = null;
