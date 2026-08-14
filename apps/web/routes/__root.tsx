import type { auth } from "$/core/auth";

import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { ToastProvider } from "$/core/ui";

type AuthContext = {
  session?: (typeof auth.$Infer.Session)["session"];
  user?: (typeof auth.$Infer.Session)["user"];
  isPending: boolean;
  refetch: () => Promise<void>;
};

export type RouteContext = {
  auth?: AuthContext;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}
