import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Checkbox } from "$/core/ui";

export const Route = createFileRoute("/demo/checkbox")({
  component: CheckboxDemoPage,
});

function CheckboxDemoPage() {
  const [controlled, setControlled] = useState(false);
  const [indeterminateChecked, setIndeterminateChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <div className="max-w-2xl space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">States</h2>
        <div className="flex flex-wrap gap-6">
          <label
            className="flex items-center gap-2 text-sm text-neutral-700"
            htmlFor="state-checked"
          >
            <Checkbox defaultChecked id="state-checked" />
            Checked
          </label>
          <label
            className="flex items-center gap-2 text-sm text-neutral-700"
            htmlFor="state-unchecked"
          >
            <Checkbox id="state-unchecked" />
            Unchecked
          </label>
          <label
            className="flex items-center gap-2 text-sm text-neutral-700"
            htmlFor="state-disabled-checked"
          >
            <Checkbox defaultChecked disabled id="state-disabled-checked" />
            Disabled checked
          </label>
          <label
            className="flex items-center gap-2 text-sm text-neutral-700"
            htmlFor="state-disabled-unchecked"
          >
            <Checkbox disabled id="state-disabled-unchecked" />
            Disabled unchecked
          </label>
          <label
            className="flex items-center gap-2 text-sm text-neutral-700"
            htmlFor="state-invalid"
          >
            <Checkbox aria-invalid="true" id="state-invalid" />
            Invalid
          </label>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Controlled</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-700" htmlFor="controlled">
            <Checkbox
              checked={controlled}
              id="controlled"
              onCheckedChange={(value) => {
                setControlled(value);
              }}
            />
            {controlled ? "Checked" : "Unchecked"}
          </label>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Indeterminate</h2>
        <div className="flex items-center gap-4">
          <label
            className="flex items-center gap-2 text-sm text-neutral-700"
            htmlFor="indeterminate"
          >
            <Checkbox
              checked={indeterminateChecked}
              id="indeterminate"
              indeterminate={indeterminate}
              onCheckedChange={(value) => {
                setIndeterminate(false);
                setIndeterminateChecked(value);
              }}
            />
            {getIndeterminateLabel(indeterminate, indeterminateChecked)}
          </label>
          <button
            className="text-sm text-brand-600 hover:text-brand-700"
            onClick={() => {
              setIndeterminate((prev) => !prev);
              setIndeterminateChecked(false);
            }}
            type="button"
          >
            Toggle indeterminate
          </button>
        </div>
      </section>
    </div>
  );
}

function getIndeterminateLabel(indeterminate: boolean, checked: boolean) {
  if (indeterminate) {
    return "Indeterminate";
  }

  if (checked) {
    return "Checked";
  }

  return "Unchecked";
}
