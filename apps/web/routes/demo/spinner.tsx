import { createFileRoute } from "@tanstack/react-router";

import { Spinner } from "$/core/ui";

export const Route = createFileRoute("/demo/spinner")({
  component: SpinnerDemoPage,
});

function SpinnerDemoPage() {
  return (
    <div className="space-y-12">
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
    </div>
  );
}
