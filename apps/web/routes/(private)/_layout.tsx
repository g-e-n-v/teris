import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { ButtonProfile } from "$/features/layout";

export const Route = createFileRoute("/(private)")({
  beforeLoad: ({ context }) => {
    if (!context.auth?.session) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: PrivateLayout,
});

function PrivateLayout() {
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full w-72 overflow-y-auto border-r border-neutral-200">Left sidebar</div>

      <div className="h-full flex-1 rounded-md bg-white">
        <Outlet />
      </div>

      <div className="flex h-full w-16 flex-col items-center justify-between overflow-y-auto border-l border-neutral-200 py-2">
        <div>Top</div>

        <div>
          <ButtonProfile />
        </div>
      </div>
    </div>
  );
}
