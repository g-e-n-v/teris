import * as schema from "#/core/db/schema";

import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { admin, organization, openAPI } from "better-auth/plugins";

import { ac, SUPER_ADMIN, ADMIN, USER } from "#/core/auth/permissions";
import { db } from "#/core/db/client";

export const auth = betterAuth({
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
      adminRoles: ["SUPER_ADMIN", "ADMIN"],
      defaultRole: "USER",
      roles: { ADMIN, SUPER_ADMIN, USER },
    }),
    organization({
      ac,
      allowUserToCreateOrganization: (u) => u.role === "SUPER_ADMIN",
      dynamicAccessControl: { enabled: true },
    }),
    openAPI({ disableDefaultReference: true }),
  ],
  trustedOrigins: ["http://localhost:*"],
});
