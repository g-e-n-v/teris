import { createFileRoute } from "@tanstack/react-router";

import { Spinner, Tooltip } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/spinner")({
  component: SpinnerDemoPage,
});

function SpinnerDemoPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Spinner</h1>
        <p className="text-neutral-600">Progress indicators across sizes and semantic colors.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Spinner className="size-4" />
          <Spinner className="size-5" />
          <Spinner className="size-8" />
          <Spinner className="size-12" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Colors</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Spinner className="size-8 text-brand-600" />
          <Spinner className="size-8 text-success-600" />
          <Spinner className="size-8 text-warning-600" />
          <Spinner className="size-8 text-error-600" />
          <Spinner className="size-8 text-neutral-900" />
        </div>
      </section>

      <Tooltip trigger={<span>Hihi</span>} popup={<span>Loading...</span>} />
    </div>
  );
}
