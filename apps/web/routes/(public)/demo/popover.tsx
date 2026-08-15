import { createFileRoute } from "@tanstack/react-router";

import {
  Button,
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/popover")({
  component: PopoverDemoPage,
});

const SIDES = ["top", "bottom", "left", "right"] as const;

function PopoverDemoPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Popover</h1>
        <p className="text-neutral-600">
          Floating panels anchored to a trigger, with title, description, and close actions.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Default</h2>
        <Popover>
          <PopoverTrigger render={<Button variant="secondary" />}>Open popover</PopoverTrigger>
          <PopoverPopup className="w-72">
            <div className="space-y-2">
              <PopoverTitle>Notifications</PopoverTitle>
              <PopoverDescription>
                Stay notified about mentions, replies, and project updates.
              </PopoverDescription>
              <PopoverClose render={<Button className="w-full" size="sm" />}>Close</PopoverClose>
            </div>
          </PopoverPopup>
        </Popover>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sides</h2>
        <div className="flex flex-wrap gap-2">
          {SIDES.map((side) => (
            <Popover key={side}>
              <PopoverTrigger render={<Button variant="secondary" />}>{side}</PopoverTrigger>
              <PopoverPopup side={side}>
                <p className="text-sm text-neutral-700">Anchored to the {side} side.</p>
              </PopoverPopup>
            </Popover>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Tooltip Style</h2>
        <Popover>
          <PopoverTrigger render={<Button variant="secondary" />}>Tooltip style</PopoverTrigger>
          <PopoverPopup tooltipStyle>Compact, tooltip-like popover.</PopoverPopup>
        </Popover>
      </section>
    </div>
  );
}
