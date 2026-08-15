import type { ComponentProps } from "react";

import { Icon } from "@iconify/react";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

type SidebarItem = {
  icon: string;
  label: string;
  to: ComponentProps<typeof Link>["to"];
};

export const Route = createFileRoute("/(public)/demo")({
  component: DemoLayout,
});

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: "solar:user-circle-outline", label: "Avatar", to: "/demo/avatar" },
  { icon: "solar:tag-horizontal-linear", label: "Badge", to: "/demo/badge" },
  { icon: "solar:cursor-outline", label: "Button", to: "/demo/button" },
  { icon: "solar:calendar-linear", label: "Calendar", to: "/demo/calendar" },
  { icon: "solar:card-2-outline", label: "Card", to: "/demo/card" },
  { icon: "solar:check-square-linear", label: "Checkbox", to: "/demo/checkbox" },
  { icon: "solar:pen-2-linear", label: "Field", to: "/demo/field" },
  { icon: "solar:text-field-outline", label: "Input", to: "/demo/input" },
  { icon: "solar:keyboard-outline", label: "Kbd", to: "/demo/kbd" },
  { icon: "solar:dialog-2-linear", label: "Popover", to: "/demo/popover" },
  { icon: "solar:posts-carousel-vertical-linear", label: "Scroll Area", to: "/demo/scroll-area" },
  { icon: "solar:menu-dots-linear", label: "Skeleton", to: "/demo/skeleton" },
  { icon: "solar:refresh-circle-outline", label: "Spinner", to: "/demo/spinner" },
  { icon: "solar:text-linear", label: "Text", to: "/demo/text" },
  { icon: "solar:bell-outline", label: "Toast", to: "/demo/toast" },
];

function DemoLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-white md:h-dvh md:flex-row">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white md:hidden">
        <div className="flex h-14 items-center gap-2 px-4 text-lg font-semibold text-neutral-900">
          <Icon className="size-5 text-brand-500" icon="solar:box-bold-duotone" />
          Demo
        </div>
        <nav aria-label="Component demos" className="flex gap-1 overflow-x-auto px-2 pb-2">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{
                className: "bg-brand-50 text-brand-700",
              }}
              className="flex h-8 shrink-0 items-center gap-2 rounded-lg px-3 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            >
              <Icon aria-hidden="true" className="size-4" icon={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <aside className="hidden w-60 shrink-0 flex-col border-r border-neutral-200 bg-white md:flex">
        <div className="flex h-15 items-center border-b border-neutral-200 px-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
            <Icon
              aria-hidden="true"
              className="size-5 text-brand-500"
              icon="solar:box-bold-duotone"
            />
            Demo
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="mb-2 px-3 font-semibold tracking-wider text-neutral-500 uppercase">
            Components
          </div>
          <nav aria-label="Component demos" className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeProps={{
                  className:
                    "bg-brand-50 text-brand-700 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:rounded-r-full before:bg-brand-500",
                }}
                className="relative flex h-9 items-center gap-3 rounded-lg px-3 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
              >
                <Icon aria-hidden="true" className="size-4" icon={item.icon} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 md:overflow-y-auto md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
