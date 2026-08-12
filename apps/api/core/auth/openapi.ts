import { createAuthOpenAPI } from "@teris/auth/openapi";

import { auth } from "./better-auth";

export const BetterAuthOpenAPI = createAuthOpenAPI(auth);
