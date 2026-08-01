import { drizzle } from "drizzle-orm/bun-sql";

import * as schema from "./schema";

export const db = drizzle({
  connection: {
    url: Bun.env.DATABASE_URL,
  },
  logger: Bun.env.NODE_ENV === "development",
  schema,
});

export type Database = typeof db;
