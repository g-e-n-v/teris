import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "$/core/auth";

export const Route = createFileRoute("/(private)/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <div>Hello `/(private)/dashboard`!</div>
      <div>{user?.email}</div>
    </>
  );
}
