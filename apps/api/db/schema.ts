import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";

export const temp = pgTable("users", {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 256 }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
