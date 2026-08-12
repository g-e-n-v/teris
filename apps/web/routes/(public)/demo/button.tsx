import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/button")({
  component: ButtonDemoPage,
});

const VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "danger-soft",
  "ghost",
  "link",
] as const;
const SIZES = ["xs", "sm", "md", "lg", "icon"] as const;

function ButtonDemoPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-2xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Button</h1>
        <p className="text-neutral-600">Actions across variants, sizes, and interaction states.</p>
      </header>

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
        <div className="space-y-4">
          {VARIANTS.slice(0, 3).map((variant) => (
            <div key={variant} className="space-y-2">
              <h3 className="text-sm font-medium text-neutral-500 capitalize">{variant}</h3>
              <div className="flex flex-wrap items-center gap-3">
                {SIZES.map((size) => (
                  <Button
                    key={size}
                    aria-label={size === "icon" ? `${variant} settings` : undefined}
                    size={size}
                    variant={variant}
                  >
                    {size === "icon" ? (
                      <Icon icon="solar:settings-linear" className="size-4" />
                    ) : (
                      size
                    )}
                  </Button>
                ))}
              </div>
            </div>
          ))}
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

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-500">Loading x Disabled</h3>
            <div className="flex flex-wrap gap-3">
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} loading disabled>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With icon</h2>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Icon icon="solar:settings-linear" className="size-4" />
            Settings
          </Button>
          <Button variant="secondary">
            <Icon icon="solar:download-minimalistic-bold" className="size-4" />
            Download
          </Button>
          <Button variant="danger">
            <Icon icon="solar:trash-bin-trash-bold" className="size-4" />
            Delete
          </Button>
          <Button variant="tertiary">
            <Icon icon="solar:add-circle-linear" className="size-4" />
            New item
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Toggle loading</h2>
        <Button
          onClick={() => {
            setLoading((prev) => !prev);
          }}
          loading={loading}
        >
          <Icon icon="solar:download-minimalistic-bold" className="size-5" />
          Download
        </Button>
      </section>
    </div>
  );
}
