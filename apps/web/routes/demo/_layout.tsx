import type { ComponentProps } from "react";

import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

type SidebarItem = {
  label: string;
  to: ComponentProps<typeof Link>["to"];
};

export const Route = createFileRoute("/demo")({
  component: DemoLayout,
});

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Button", to: "/demo/button" },
  { label: "Spinner", to: "/demo/spinner" },
];

function DemoLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-neutral-200 bg-neutral-25 p-4">
        <div className="mb-8 text-xl font-bold text-brand-600">Demo</div>
        <nav className="space-y-2 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{
                className: "bg-brand-50 text-brand-700",
              }}
              className="block rounded-md px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
