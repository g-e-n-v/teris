import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "$/core/ui";

export const Route = createFileRoute("/demo/button")({
  component: ButtonDemoPage,
});

const COLORS = ["brand", "accent", "neutral", "success", "warning", "error"] as const;
const VARIANTS = ["solid", "filled", "outline", "ghost"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function ButtonDemoPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Colors & Variants</h2>
        <div className="space-y-4">
          {VARIANTS.map((variant) => (
            <div key={variant} className="space-y-2">
              <h3 className="text-sm font-medium text-neutral-500 capitalize">{variant}</h3>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((color) => (
                  <Button key={`${color}-${variant}`} color={color} variant={variant}>
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-500 capitalize">solid / brand</h3>
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
                <Button key={variant} color="brand" variant={variant} disabled>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-500">Loading</h3>
            <div className="flex flex-wrap gap-3">
              {VARIANTS.map((variant) => (
                <Button key={variant} color="brand" variant={variant} loading>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-4">
        <Button>Primary</Button>
        <Button variant="outline" color="neutral">
          Secondary
        </Button>
        <Button variant="filled" color="neutral">
          Tertiary
        </Button>
      </div>

      <Button
        onClick={() => {
          setLoading((prev) => !prev);
        }}
        loading={loading}
        variant="filled"
      >
        <Icon icon="solar:augmented-reality-linear" className="size-5" />
        Test button with loading
      </Button>
    </div>
  );
}
