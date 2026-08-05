import { adminClient, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, SUPER_ADMIN, ADMIN, USER } from "./permissions";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [
    adminClient({
      ac,
      roles: { ADMIN, SUPER_ADMIN, USER },
    }),
    organizationClient({
      ac,
      dynamicAccessControl: { enabled: true },
    }),
  ],
});
