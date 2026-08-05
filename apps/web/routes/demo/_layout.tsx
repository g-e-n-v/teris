import type { ComponentProps } from "react";

import { Icon } from "@iconify/react";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

type SidebarItem = {
  icon: string;
  label: string;
  to: ComponentProps<typeof Link>["to"];
};

export const Route = createFileRoute("/demo")({
  component: DemoLayout,
});

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: "solar:cursor-outline", label: "Button", to: "/demo/button" },
  { icon: "solar:text-field-outline", label: "Input", to: "/demo/input" },
  { icon: "solar:refresh-circle-outline", label: "Spinner", to: "/demo/spinner" },
  { icon: "solar:bell-outline", label: "Toast", to: "/demo/toast" },
];

function DemoLayout() {
  return (
    <div className="flex h-screen bg-white">
      <aside className="flex w-60 flex-col border-r border-neutral-200 bg-white">
        <div className="flex h-15 items-center border-b border-neutral-200 px-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
            <Icon className="size-5 text-brand-500" icon="solar:box-bold-duotone" />
            Demo
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="mb-2 px-3 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
            Components
          </div>
          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeProps={{
                  className:
                    "bg-brand-50 text-brand-700 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-r-full before:bg-brand-500",
                }}
                className="relative flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-50 hover:text-neutral-900"
              >
                <Icon className="size-4" icon={item.icon} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
