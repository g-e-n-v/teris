import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth as createBetterAuth } from "better-auth";
import { admin, organization } from "better-auth/plugins";

import { ac, superAdmin, admin as adminRole, user } from "#/core/auth/permissions";
import { db } from "#/core/db/client";
import * as schema from "#/core/db/schema";

export const betterAuth = createBetterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    admin({
      ac,
      adminRoles: ["superAdmin", "admin"],
      defaultRole: "user",
      roles: { admin: adminRole, superAdmin, user },
    }),
    organization({
      ac,
      allowUserToCreateOrganization: (u) => u.role === "superAdmin",
      dynamicAccessControl: { enabled: true },
    }),
  ],
  trustedOrigins: ["http://localhost:5173"],
});
