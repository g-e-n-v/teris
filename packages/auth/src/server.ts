import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { admin, organization, openAPI } from "better-auth/plugins";

import { ac, ADMIN, SYSTEM_ADMIN, USER } from "./permissions";

interface CreateAuthServerConfig {
  db: Parameters<typeof drizzleAdapter>[0];
  schema: NonNullable<NonNullable<Parameters<typeof drizzleAdapter>[1]>["schema"]>;
}

export const createAuthServer = ({ db, schema }: CreateAuthServerConfig) =>
  betterAuth({
    advanced: {
      database: {
        generateId: "uuid",
      },
    },
    database: drizzleAdapter(db, { provider: "pg", schema }),
    emailAndPassword: { enabled: true },
    plugins: [
      admin({
        ac,
        adminRoles: ["SYSTEM_ADMIN", "ADMIN"],
        defaultRole: "USER",
        roles: { ADMIN, SYSTEM_ADMIN, USER },
      }),
      organization({
        ac,
        allowUserToCreateOrganization: (u) => u.role === "SYSTEM_ADMIN",
        dynamicAccessControl: { enabled: true },
      }),
      openAPI({ disableDefaultReference: true }),
    ],
    trustedOrigins: ["http://localhost:*"],
  });

export type AuthInstance = ReturnType<typeof createAuthServer>;
