import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "$/core/ui";

export const Route = createFileRoute("/demo/button")({
  component: ButtonDemoPage,
});

const VARIANTS = ["primary", "secondary", "tertiary", "danger", "danger-soft", "link"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function ButtonDemoPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Variants</h2>
        <div className="flex flex-wrap gap-3">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-500 capitalize">primary</h3>
          <div className="flex flex-wrap items-center gap-3">
            {SIZES.map((size) => (
              <Button key={size} size={size}>
                {size}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">States</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-500">Disabled</h3>
            <div className="flex flex-wrap gap-3">
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} disabled>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-500">Loading</h3>
            <div className="flex flex-wrap gap-3">
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} loading>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>

      <Button
        onClick={() => {
          setLoading((prev) => !prev);
        }}
        loading={loading}
        variant="tertiary"
      >
        <Icon icon="solar:augmented-reality-linear" className="size-5" />
        Test button with loading
      </Button>
    </div>
  );
}
