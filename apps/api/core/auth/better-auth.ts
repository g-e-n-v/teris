import * as schema from "#/core/db/schema";

import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth as createBetterAuth } from "better-auth";
import { admin as adminPlugin, organization, openAPI } from "better-auth/plugins";

import { ac, superAdmin, admin, user } from "#/core/auth/permissions";
import { db } from "#/core/db/client";

export const betterAuth = createBetterAuth({
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  database: drizzleAdapter(db, { provider: "pg", schema }),
  plugins: [
    adminPlugin({
      ac,
      adminRoles: ["superAdmin", "admin"],
      defaultRole: "user",
      roles: { admin, superAdmin, user },
    }),
    organization({
      ac,
      allowUserToCreateOrganization: (u) => u.role === "superAdmin",
      dynamicAccessControl: { enabled: true },
    }),
    openAPI({ disableDefaultReference: true }),
  ],
  trustedOrigins: ["http://localhost:*"],
});
