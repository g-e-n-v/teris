import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  dialect: "postgresql",
  out: "./core/db/migrations",
  schema: "./core/db/schema",
  strict: true,
  verbose: true,
});
