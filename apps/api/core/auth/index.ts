import Elysia from "elysia";

import { betterAuth } from "./better-auth";

export const auth = new Elysia({ name: "better-auth" }).mount(betterAuth.handler).macro({
  auth: {
    resolve: async ({ status, request: { headers } }) => {
      const session = await betterAuth.api.getSession({ headers });

      if (!session) return status(401);

      return session;
    },
  },
});
