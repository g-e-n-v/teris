import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/badge")({
  component: BadgeDemoPage,
});

const VARIANTS = [
  "default",
  "secondary",
  "outline",
  "success",
  "warning",
  "error",
  "info",
  "destructive",
] as const;
const SIZES = ["sm", "md", "lg"] as const;

function BadgeDemoPage() {
  return (
    <div className="max-w-2xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Badge</h1>
        <p className="text-neutral-600">Compact labels for status, category, and metadata.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Variants</h2>
        <div className="flex flex-wrap gap-3">
          {VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          {SIZES.map((size) => (
            <Badge key={size} size={size}>
              {size}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With icon</h2>
        <div className="flex flex-wrap gap-3">
          <Badge className="gap-1">
            <Icon icon="solar:verified-check-linear" />
            verified
          </Badge>
          <Badge className="gap-1" variant="info">
            <Icon icon="solar:info-circle-linear" />
            info
          </Badge>
          <Badge className="gap-1" variant="warning">
            <Icon icon="solar:shield-warning-linear" />
            warning
          </Badge>
        </div>
      </section>
    </div>
  );
}
