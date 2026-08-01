import { integer, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const organization = pgTable("organization", {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  logo: varchar("logo", { length: 255 }),
  metadata: jsonb("metadata"),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
});

export const member = pgTable("member", {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 255 }).notNull().default("member"),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const invitation = pgTable("invitation", {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  email: varchar("email", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  inviterId: integer("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 255 }),
  status: varchar("status", { length: 255 }).notNull(),
});

export const organizationRole = pgTable("organizationRole", {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  permission: jsonb("permission").notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
