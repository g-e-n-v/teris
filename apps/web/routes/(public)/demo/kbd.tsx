import { createFileRoute } from "@tanstack/react-router";

import { Kbd } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/kbd")({
  component: KbdDemoPage,
});

function KbdDemoPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Keyboard key</h1>
        <p className="text-neutral-600">Keyboard shortcuts and key combinations in context.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Single keys</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Kbd>A</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Space</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Backspace</Kbd>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Key combinations</h2>
        <div className="flex flex-col gap-3">
          <Kbd.Group>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </Kbd.Group>
          <Kbd.Group>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>S</Kbd>
          </Kbd.Group>
          <Kbd.Group>
            <Kbd>Alt</Kbd>
            <Kbd>F4</Kbd>
          </Kbd.Group>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Inline with text</h2>
        <p className="text-sm text-neutral-600">
          Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette, or press <Kbd>Esc</Kbd> to
          close it.
        </p>
      </section>
    </div>
  );
}
