import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";

import { ScrollArea } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/scroll-area")({
  component: ScrollAreaDemoPage,
});

const ACTIVITY = [
  { icon: "solar:document-add-linear", label: "Project brief created", time: "2 min" },
  { icon: "solar:user-plus-linear", label: "Maya joined the workspace", time: "18 min" },
  { icon: "solar:pallete-2-linear", label: "Design tokens updated", time: "43 min" },
  { icon: "solar:check-circle-linear", label: "Homepage review completed", time: "1 hr" },
  { icon: "solar:chat-round-dots-linear", label: "New feedback on navigation", time: "2 hr" },
  { icon: "solar:folder-with-files-linear", label: "Assets moved to Archive", time: "3 hr" },
  { icon: "solar:calendar-linear", label: "Launch review scheduled", time: "Yesterday" },
  { icon: "solar:link-linear", label: "Research notes shared", time: "Yesterday" },
] as const;

const BOARD_COLUMNS = ["Backlog", "In progress", "Review", "Ready to ship"] as const;

function ScrollAreaDemoPage() {
  return (
    <div className="max-w-5xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Scroll area</h1>
        <p className="text-neutral-600">
          Custom overflow for compact vertical and horizontal surfaces.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Vertical</h2>
        <ScrollArea className="h-72 w-full max-w-lg rounded-xl border border-neutral-200 bg-white shadow-xs/5">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Recent activity
            </div>
            {ACTIVITY.map((activity) => (
              <div
                key={activity.label}
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-25"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-50 text-neutral-600">
                  <Icon className="size-4" icon={activity.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {activity.label}
                  </p>
                  <p className="text-xs text-neutral-400">Northstar workspace</p>
                </div>
                <span className="shrink-0 text-xs text-neutral-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Horizontal</h2>
        <ScrollArea
          className="h-52 max-w-3xl rounded-xl border border-neutral-200 bg-neutral-25 shadow-xs/5"
          clampContentMinWidth={false}
          scrollbarGutter
        >
          <div className="flex w-max gap-3 p-4">
            {BOARD_COLUMNS.map((column, index) => (
              <article
                key={column}
                className="w-56 shrink-0 rounded-lg border border-neutral-200 bg-white p-3"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-neutral-900">{column}</h3>
                  <span className="rounded-full bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500">
                    {index + 2}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="rounded-md border border-neutral-100 p-2.5 text-sm text-neutral-700">
                    Refine onboarding flow
                  </div>
                  <div className="rounded-md border border-neutral-100 p-2.5 text-sm text-neutral-700">
                    Prepare release notes
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollArea>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Scroll Fade</h2>
        <ScrollArea
          className="h-56 w-full max-w-lg rounded-xl border border-neutral-200 bg-white"
          overscrollContain
          scrollFade
        >
          <div className="space-y-4 px-5 py-4 text-sm leading-6 text-neutral-600">
            <p>
              Good interfaces reveal complexity gradually. The first view should answer the
              immediate question, while the details remain close enough to discover without
              interrupting the task.
            </p>
            <p>
              Scroll fades make hidden content feel intentional. As each edge is reached, the fade
              clears to confirm that the reader has seen the complete section.
            </p>
            <p>
              This treatment works especially well for compact panels, menus, activity feeds, and
              any surface where native overflow needs a subtle visual cue.
            </p>
            <p>
              Keyboard focus receives the same clear brand ring as the other controls in the design
              system.
            </p>
          </div>
        </ScrollArea>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Fill</h2>
        <ScrollArea
          className="h-48 w-full max-w-lg rounded-xl border border-neutral-200 bg-neutral-25"
          fill
          scrollbarGutter
        >
          <div className="grid size-full place-items-center p-6 text-center">
            <div>
              <Icon className="mx-auto mb-3 size-7 text-neutral-400" icon="solar:widget-5-linear" />
              <p className="font-semibold text-neutral-900">Content fills the scroll area</p>
              <p className="mt-1 text-sm text-neutral-500">
                Useful for centered empty states and full-height layouts.
              </p>
            </div>
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}
