import { createAuthClient } from "@teris/auth";

export const auth = createAuthClient(import.meta.env.VITE_API_URL);

export function useAuth() {
  const { data, ...rest } = auth.useSession();

  return {
    session: data?.session,
    user: data?.user,
    ...rest,
  };
}
