import { Outlet, createRootRoute } from "@tanstack/react-router";

import { ToastProvider } from "$/core/ui";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}
