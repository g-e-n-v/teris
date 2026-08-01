import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  banExpires: timestamp("ban_expires", { withTimezone: true }),
  banReason: varchar("ban_reason", { length: 255 }),
  banned: boolean("banned").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  id: uuid().defaultRandom().primaryKey(),
  image: varchar("image", { length: 255 }),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 255 }).notNull().default("user"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const session = pgTable("session", {
  activeOrganizationId: uuid("active_organization_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  id: uuid().defaultRandom().primaryKey(),
  impersonatedBy: uuid("impersonated_by"),
  ipAddress: varchar("ip_address", { length: 255 }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  userAgent: varchar("user_agent", { length: 255 }),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  accessToken: varchar("access_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  id: uuid().defaultRandom().primaryKey(),
  idToken: varchar("id_token"),
  password: varchar("password", { length: 255 }),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  refreshToken: varchar("refresh_token"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: varchar("scope", { length: 255 }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const verification = pgTable("verification", {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  id: uuid().defaultRandom().primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  value: varchar("value", { length: 255 }).notNull(),
});
