import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Checkbox, CheckboxGroup } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/checkbox")({
  component: CheckboxDemoPage,
});

function CheckboxDemoPage() {
  const [controlled, setControlled] = useState(false);
  const [controlledGroup, setControlledGroup] = useState(["email"]);
  const [indeterminateChecked, setIndeterminateChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [projectAccess, setProjectAccess] = useState(["issues", "pull-requests"]);

  return (
    <div className="max-w-2xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Checkbox</h1>
        <p className="text-neutral-600">Single and grouped selections with controlled states.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">States</h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-neutral-700" htmlFor="state-checked">
            <Checkbox defaultChecked id="state-checked" />
            Checked
          </label>
          <label className="flex items-center gap-2 text-neutral-700" htmlFor="state-unchecked">
            <Checkbox id="state-unchecked" />
            Unchecked
          </label>
          <label
            className="flex items-center gap-2 text-neutral-700"
            htmlFor="state-disabled-checked"
          >
            <Checkbox defaultChecked disabled id="state-disabled-checked" />
            Disabled checked
          </label>
          <label
            className="flex items-center gap-2 text-neutral-700"
            htmlFor="state-disabled-unchecked"
          >
            <Checkbox disabled id="state-disabled-unchecked" />
            Disabled unchecked
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-neutral-700" htmlFor="state-invalid">
              <Checkbox
                aria-describedby="state-invalid-error"
                aria-invalid="true"
                id="state-invalid"
              />
              Invalid
            </label>
            <p className="text-error-500" id="state-invalid-error">
              Accept the terms before continuing.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Controlled</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-neutral-700" htmlFor="controlled">
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
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-neutral-700" htmlFor="indeterminate">
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
            className="text-brand-600 hover:text-brand-700"
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

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900" id="group-uncontrolled">
          Checkbox group
        </h2>
        <CheckboxGroup
          aria-labelledby="group-uncontrolled"
          defaultValue={["design", "engineering"]}
        >
          <CheckboxOption id="discipline-design" label="Design" value="design" />
          <CheckboxOption id="discipline-engineering" label="Engineering" value="engineering" />
          <CheckboxOption id="discipline-marketing" label="Marketing" value="marketing" />
        </CheckboxGroup>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900" id="group-controlled">
          Controlled group
        </h2>
        <CheckboxGroup
          aria-labelledby="group-controlled"
          onValueChange={(value) => {
            setControlledGroup(value);
          }}
          value={controlledGroup}
        >
          <CheckboxOption id="notification-email" label="Email" value="email" />
          <CheckboxOption id="notification-push" label="Push notifications" value="push" />
          <CheckboxOption id="notification-sms" label="SMS" value="sms" />
        </CheckboxGroup>
        <p className="mt-3 text-neutral-500">
          Selected: {controlledGroup.length > 0 ? controlledGroup.join(", ") : "none"}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900" id="group-parent">
          Parent checkbox
        </h2>
        <CheckboxGroup
          allValues={["issues", "pull-requests", "releases"]}
          aria-labelledby="group-parent"
          onValueChange={(value) => {
            setProjectAccess(value);
          }}
          value={projectAccess}
        >
          <CheckboxOption id="project-all" label="All project activity" parent />
          <div className="ml-6 flex flex-col items-start gap-3 border-l border-neutral-200 pl-4">
            <CheckboxOption id="project-issues" label="Issues" value="issues" />
            <CheckboxOption
              id="project-pull-requests"
              label="Pull requests"
              value="pull-requests"
            />
            <CheckboxOption id="project-releases" label="Releases" value="releases" />
          </div>
        </CheckboxGroup>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900" id="group-disabled">
          Disabled group
        </h2>
        <CheckboxGroup aria-labelledby="group-disabled" defaultValue={["analytics"]} disabled>
          <CheckboxOption id="disabled-analytics" label="Analytics" value="analytics" />
          <CheckboxOption id="disabled-reports" label="Weekly reports" value="reports" />
        </CheckboxGroup>
      </section>
    </div>
  );
}

type CheckboxOptionProps = {
  id: string;
  label: string;
  parent?: boolean;
  value?: string;
};

function CheckboxOption({ id, label, parent, value }: CheckboxOptionProps) {
  return (
    <label className="flex items-center gap-2 text-neutral-700" htmlFor={id}>
      <Checkbox id={id} parent={parent} value={value} />
      {label}
    </label>
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
