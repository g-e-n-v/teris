import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { admin, organization, openAPI } from "better-auth/plugins";

import { ac, ADMIN, ROOT, USER } from "./permissions";

type CreateAuthServerConfig = {
  db: Parameters<typeof drizzleAdapter>[0];
  schema: NonNullable<NonNullable<Parameters<typeof drizzleAdapter>[1]>["schema"]>;
  databaseHooks?: Parameters<typeof betterAuth>[0]["databaseHooks"];
};

export const createAuthServer = ({ db, schema, databaseHooks }: CreateAuthServerConfig) =>
  betterAuth({
    advanced: {
      database: {
        generateId: "uuid",
      },
    },
    database: drizzleAdapter(db, { provider: "pg", schema }),
    databaseHooks,
    emailAndPassword: { enabled: true },
    plugins: [
      admin({
        ac,
        adminRoles: ["ROOT", "ADMIN"],
        defaultRole: "USER",
        roles: { ADMIN, ROOT, USER },
      }),
      organization({
        ac,
        allowUserToCreateOrganization: true,
        dynamicAccessControl: { enabled: true },
      }),
      openAPI(),
    ],
    trustedOrigins: ["http://localhost:*"],
  });

export type AuthInstance = ReturnType<typeof createAuthServer>;
