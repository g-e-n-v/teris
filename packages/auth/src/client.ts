import type { AuthInstance } from "./server";

import { adminClient, inferAdditionalFields, organizationClient } from "better-auth/client/plugins";
import { createAuthClient as createClient } from "better-auth/react";

import { ac, ADMIN, ROOT, USER } from "./permissions";

export const createAuthClient = (baseURL: string) =>
  createClient({
    baseURL,
    plugins: [
      inferAdditionalFields<AuthInstance>(),
      adminClient({
        ac,
        roles: { ADMIN, ROOT, USER },
      }),
      organizationClient({
        ac,
        dynamicAccessControl: { enabled: true },
      }),
    ],
  });
