import { createFileRoute } from "@tanstack/react-router";

import { Skeleton } from "$/core/ui";

export const Route = createFileRoute("/demo/skeleton")({
  component: SkeletonDemoPage,
});

function SkeletonDemoPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Skeleton</h1>
        <p className="text-neutral-600">
          Placeholder shapes for loading states and content skeletons.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="size-4" />
          <Skeleton className="size-6" />
          <Skeleton className="size-8" />
          <Skeleton className="size-12" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Shapes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-16 w-24 rounded-xl" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Card</h2>
        <div className="max-w-sm space-y-3">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
