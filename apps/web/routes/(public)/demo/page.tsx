import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/demo/")({
  beforeLoad: () => {
    throw redirect({ to: "/demo/button" });
  },
  component: DemoIndexPage,
});

function DemoIndexPage() {
  return null;
}
