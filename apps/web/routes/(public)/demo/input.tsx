import type { ComponentProps } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { Input } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/input")({
  component: InputDemoPage,
});

const SIZES = ["sm", "md", "lg"] as const;

type InputFieldProps = ComponentProps<typeof Input> & {
  label: string;
  error?: string;
};

function InputField({ label, error, id, ...props }: InputFieldProps) {
  const inputId = id ?? `input-${label.toLowerCase().replaceAll(" ", "-")}`;
  const hasError = error !== undefined;
  const errorId = hasError ? `${inputId}-error` : undefined;

  return (
    <div className="min-w-0 space-y-1.5">
      <label className="block font-medium text-neutral-700" htmlFor={inputId}>
        {label}
      </label>
      <Input
        aria-describedby={errorId}
        aria-invalid={hasError ? true : props["aria-invalid"]}
        id={inputId}
        {...props}
      />
      {hasError && (
        <p className="text-error-500" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

function InputDemoPage() {
  return (
    <div className="max-w-2xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Input</h1>
        <p className="text-neutral-600">
          Text entry patterns, adornments, states, and native types.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="space-y-3">
          {SIZES.map((size) => (
            <InputField
              key={size}
              label={`${size.toUpperCase()} input`}
              size={size}
              placeholder={`${size} input`}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Icons</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <InputField
            label="Search projects"
            prefix="solar:magnifer-linear"
            placeholder="Search projects"
          />
          <InputField label="Start date" suffix="solar:calendar-linear" placeholder="Pick a date" />
          <InputField
            label="Username"
            prefix="solar:letter-linear"
            suffix={<span className="text-sm text-neutral-500">@teris.dev</span>}
            placeholder="username"
          />
          <InputField
            label="Account"
            prefix="solar:verified-check-linear"
            suffix="solar:alt-arrow-down-linear"
            defaultValue="Verified account"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">States</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <InputField label="Default" placeholder="Default" />
          <InputField label="Filled" defaultValue="Filled value" />
          <InputField label="Disabled" disabled placeholder="Disabled" />
          <InputField label="Read only" readOnly defaultValue="Read only" />
          <InputField
            label="Email address"
            error="Enter a valid email address."
            defaultValue="not-an-email"
          />
          <InputField
            label="Password"
            type="password"
            defaultValue="password"
            prefix="solar:lock-password-linear"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Input Types</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <InputField
            label="Email"
            type="email"
            prefix="solar:letter-linear"
            placeholder="you@example.com"
          />
          <InputField label="Quantity" type="number" min={0} placeholder="Quantity" />
          <InputField label="Delivery date" type="date" />
          <InputField label="Profile image" type="file" accept="image/*" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Unstyled</h2>
        <InputField
          label="Website"
          unstyled
          prefix="solar:link-linear"
          placeholder="Paste a link"
        />
      </section>
    </div>
  );
}
