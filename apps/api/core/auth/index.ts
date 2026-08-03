import Elysia from "elysia";

import { auth } from "./better-auth";

export default new Elysia({ name: "better-auth" }).mount(auth.handler).macro({
  auth: {
    resolve: async ({ status, request: { headers } }) => {
      const session = await auth.api.getSession({ headers });

      if (!session) return status(401);

      return session;
    },
  },
});
