import * as schema from "#/core/db/schema";

import { createAuthServer } from "@teris/auth";

import { db } from "#/core/db/client";

export const auth = createAuthServer({ db, schema });
