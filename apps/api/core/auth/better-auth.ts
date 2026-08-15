import * as schema from "#/core/db/schema";

import { createAuthServer } from "@teris/auth";
import { count } from "drizzle-orm";

import { db } from "#/core/db/client";

export const auth = createAuthServer({
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const [result] = await db.select({ count: count() }).from(schema.user);
          return { data: { ...user, role: result.count ? user.role : "ROOT" } };
        },
      },
    },
  },
  db,
  schema,
});
