import { auth } from "../client";

export function useAuth() {
  const { data, ...rest } = auth.useSession();

  return {
    session: data?.session,
    user: data?.user,
    ...rest,
  };
}
