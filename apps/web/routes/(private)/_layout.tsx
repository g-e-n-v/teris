import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
  beforeLoad: ({ context }) => {
    if (!context.auth?.session) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: PrivateLayout,
});

function PrivateLayout() {
  return <Outlet />;
}
