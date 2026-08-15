import { createFileRoute } from "@tanstack/react-router";

import { Field, FieldDescription, FieldError, FieldLabel, FieldValidity, Input } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/field")({
  component: FieldDemoPage,
});

function FieldDemoPage() {
  return (
    <div className="max-w-2xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Field</h1>
        <p className="text-neutral-600">
          Labelling, description, and validation for form controls.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Basic</h2>
        <Field>
          <FieldLabel htmlFor="basic-name">Name</FieldLabel>
          <Input id="basic-name" placeholder="Enter your name" />
          <FieldDescription>Visible on your profile</FieldDescription>
        </Field>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Required</h2>
        <Field>
          <FieldLabel htmlFor="req-email">Email</FieldLabel>
          <Input id="req-email" required placeholder="you@example.com" />
          <FieldDescription>We&apos;ll never share your email</FieldDescription>
        </Field>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With Error</h2>
        <Field>
          <FieldLabel htmlFor="err-email">Email</FieldLabel>
          <Input
            aria-invalid
            defaultValue="not-an-email"
            id="err-email"
            placeholder="you@example.com"
          />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Disabled</h2>
        <Field>
          <FieldLabel htmlFor="disabled-field">Username</FieldLabel>
          <Input disabled id="disabled-field" value="johndoe" />
          <FieldDescription>This field cannot be edited</FieldDescription>
        </Field>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With Validity</h2>
        <Field>
          <FieldLabel htmlFor="validity-email">Email</FieldLabel>
          <Input defaultValue="user@example.com" id="validity-email" required type="email" />
          <FieldValidity>
            {(state) =>
              String(state.value).length > 0 && (
                <p
                  className={
                    state.validity.valid ? "text-sm text-success-600" : "text-sm text-error-500"
                  }
                >
                  {state.validity.valid ? "Looks good!" : `Invalid: ${state.error}`}
                </p>
              )
            }
          </FieldValidity>
        </Field>
      </section>
    </div>
  );
}
