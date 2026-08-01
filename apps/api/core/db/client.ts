import * as schema from "./schema";

import { drizzle } from "drizzle-orm/bun-sql";

export const db = drizzle({
  connection: {
    url: Bun.env.DATABASE_URL,
  },
  logger: Bun.env.NODE_ENV === "development",
  schema,
});

export type Database = typeof db;
