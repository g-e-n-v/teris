import { createFileRoute } from "@tanstack/react-router";

import { Input } from "$/core/ui";

export const Route = createFileRoute("/demo/input")({
  component: InputDemoPage,
});

const SIZES = ["sm", "md", "lg"] as const;

function InputDemoPage() {
  return (
    <div className="max-w-2xl space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="space-y-3">
          {SIZES.map((size) => (
            <div key={size} className="grid grid-cols-[3rem_1fr] items-center gap-3">
              <span className="text-sm font-medium text-neutral-500 uppercase">{size}</span>
              <Input size={size} placeholder={`${size.toUpperCase()} input`} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Icons</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input prefix="solar:magnifer-linear" placeholder="Search projects" />
          <Input suffix="solar:calendar-linear" placeholder="Pick a date" />
          <Input
            prefix="solar:letter-linear"
            suffix={<span className="text-sm text-neutral-500">@teris.dev</span>}
            placeholder="username"
          />
          <Input
            prefix="solar:verified-check-linear"
            suffix="solar:alt-arrow-down-linear"
            defaultValue="Verified account"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">States</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="Default" />
          <Input defaultValue="Filled value" />
          <Input disabled placeholder="Disabled" />
          <Input readOnly defaultValue="Read only" />
          <Input aria-invalid placeholder="Invalid value" defaultValue="not-an-email" />
          <Input type="password" defaultValue="password" prefix="solar:lock-password-linear" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Input Types</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input type="email" prefix="solar:letter-linear" placeholder="you@example.com" />
          <Input type="number" min={0} placeholder="Quantity" />
          <Input type="date" />
          <Input type="file" accept="image/*" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Unstyled</h2>
        <div className="rounded-xl bg-neutral-100 p-3">
          <Input unstyled prefix="solar:link-linear" placeholder="Paste a link" />
        </div>
      </section>
    </div>
  );
}
