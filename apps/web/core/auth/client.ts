import { createAuthClient } from "@teris/auth";

export const auth = createAuthClient(import.meta.env.VITE_API_URL);
