import { createAuthClient } from "@teris/auth";

export const authClient = createAuthClient(import.meta.env.VITE_API_URL);
