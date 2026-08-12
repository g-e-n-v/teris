import type { AuthInstance } from "@teris/auth";

import { ac, ADMIN, SYSTEM_ADMIN, USER } from "@teris/auth";
import { adminClient, inferAdditionalFields, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [
    inferAdditionalFields<AuthInstance>(),
    adminClient({
      ac,
      roles: { ADMIN, SYSTEM_ADMIN, USER },
    }),
    organizationClient({
      ac,
      dynamicAccessControl: { enabled: true },
    }),
  ],
});
