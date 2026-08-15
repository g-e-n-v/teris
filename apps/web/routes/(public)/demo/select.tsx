import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/select")({
  component: SelectDemoPage,
});

const FRAMEWORKS = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

const FRONTEND = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

const BACKEND = [
  { label: "Express", value: "express" },
  { label: "NestJS", value: "nestjs" },
  { label: "Fastify", value: "fastify" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Rails", value: "rails" },
];

const LANGUAGES = {
  cpp: "C++",
  csharp: "C#",
  go: "Go",
  java: "Java",
  javascript: "JavaScript",
  php: "PHP",
  python: "Python",
  rust: "Rust",
  swift: "Swift",
  typescript: "TypeScript",
};

type Language = keyof typeof LANGUAGES;

const LANGUAGE_VALUES = Object.keys(LANGUAGES).filter((key): key is Language => key in LANGUAGES);

function renderLanguageValue(value: Language[]) {
  if (value.length === 0) {
    return "Select languages…";
  }

  const first = value[0] ? LANGUAGES[value[0]] : "";
  const more = value.length > 1 ? ` (+${value.length - 1} more)` : "";
  return first + more;
}

type Option = { label: string; description?: string; icon?: string; value: string };

const CATEGORIES: Option[] = [
  { icon: "solar:layers-minimalistic-linear", label: "Components", value: "components" },
  { icon: "solar:bolt-linear", label: "Performance", value: "performance" },
  { icon: "solar:planet-3-linear", label: "Network", value: "network" },
  { icon: "solar:code-square-linear", label: "Development", value: "development" },
];

const COMMAND_OPTIONS: Option[] = [
  { description: "npx create-next-app", label: "Next.js", value: "next" },
  { description: "npm create vite@latest", label: "Vite", value: "vite" },
  { description: "npm create astro@latest", label: "Astro", value: "astro" },
  { description: "npx create-remix", label: "Remix", value: "remix" },
];

function OptionLabel({ option }: { option: Option }) {
  return (
    <span className="flex flex-col">
      <span className="truncate">{option.label}</span>
      <span className="truncate text-xs text-neutral-500">{option.description}</span>
    </span>
  );
}

function SelectDemoPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    // oxlint-disable-next-line promise/avoid-new
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 800);
    });
    setLoading(false);
    const framework = formData.get("framework");
    setCode(typeof framework === "string" ? framework : "");
  };

  return (
    <div className="max-w-2xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Select</h1>
        <p className="text-neutral-600">Choose a predefined value from a dropdown menu.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Basic</h2>
        <div className="max-w-64">
          <Select aria-label="Select framework" defaultValue="next" items={FRAMEWORKS}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Sizes</h2>
        <div className="flex max-w-64 flex-col gap-4">
          <Select aria-label="Small select" items={FRAMEWORKS}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>

          <Select aria-label="Default select" items={FRAMEWORKS}>
            <SelectTrigger>
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>

          <Select aria-label="Large select" items={FRAMEWORKS}>
            <SelectTrigger size="lg">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Disabled</h2>
        <div className="max-w-64">
          <Select aria-label="Select framework" items={FRAMEWORKS}>
            <SelectTrigger disabled>
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Without item alignment</h2>
        <div className="max-w-64">
          <Select aria-label="Select framework" items={FRAMEWORKS}>
            <SelectTrigger>
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup alignItemWithTrigger={false}>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With groups</h2>
        <div className="max-w-64">
          <Select aria-label="Select framework" items={[...FRONTEND, ...BACKEND]}>
            <SelectTrigger>
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              <SelectGroup>
                <SelectGroupLabel>Frontend</SelectGroupLabel>
                {FRONTEND.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectGroupLabel>Backend</SelectGroupLabel>
                {BACKEND.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With label</h2>
        <div className="max-w-64">
          <Select aria-label="Select fruit" defaultValue={FRAMEWORKS[0]} items={FRAMEWORKS}>
            <SelectLabel>Frameworks</SelectLabel>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map((item) => (
                <SelectItem key={item.value} value={item}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Multiple selection</h2>
        <div className="max-w-64">
          <Select
            aria-label="Select languages"
            defaultValue={["javascript", "typescript"]}
            multiple
          >
            <SelectTrigger>
              <SelectValue>{renderLanguageValue}</SelectValue>
            </SelectTrigger>
            <SelectPopup alignItemWithTrigger={false}>
              {LANGUAGE_VALUES.map((value) => (
                <SelectItem key={value} value={value}>
                  {LANGUAGES[value]}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With icon</h2>
        <div className="max-w-64">
          <Select aria-label="Select framework with icon" defaultValue="next" items={FRAMEWORKS}>
            <SelectTrigger>
              <Icon aria-hidden="true" icon="solar:cpu-bolt-linear" />
              <SelectValue />
            </SelectTrigger>
            <SelectPopup alignItemWithTrigger={false}>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Options with icon</h2>
        <div className="max-w-64">
          <Select
            aria-label="Select category"
            defaultValue={CATEGORIES[0]}
            itemToStringValue={(item) => item.value}
          >
            <SelectTrigger>
              <SelectValue>
                {(item: Option) => (
                  <span className="flex items-center gap-2">
                    <Icon icon={item.icon ?? ""} />
                    <span className="truncate">{item.label}</span>
                  </span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectPopup>
              {CATEGORIES.map((item) => (
                <SelectItem key={item.value} value={item}>
                  <span className="flex items-center gap-2">
                    <Icon icon={item.icon ?? ""} />
                    <span className="truncate">{item.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With object values</h2>
        <div className="max-w-64">
          <Select
            aria-label="Select framework with command"
            defaultValue={COMMAND_OPTIONS[0]}
            itemToStringValue={(item) => item.value}
          >
            <SelectTrigger className="py-1">
              <SelectValue>{(item: Option) => <OptionLabel option={item} />}</SelectValue>
            </SelectTrigger>
            <SelectPopup>
              {COMMAND_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item}>
                  <OptionLabel option={item} />
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Form integration</h2>
        <form
          className="flex w-full max-w-64 flex-col gap-4"
          onSubmit={(event) => {
            void onSubmit(event);
          }}
        >
          <Field>
            <FieldLabel>Framework</FieldLabel>
            <Select aria-label="Select framework" items={FRAMEWORKS} name="framework" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectPopup>
                {FRAMEWORKS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
            <FieldDescription>Pick your favorite.</FieldDescription>
            <FieldError>Please select a value.</FieldError>
          </Field>

          <Button loading={loading} type="submit">
            Submit
          </Button>
        </form>
        {code && (
          <p className="mt-2 text-sm text-neutral-500">
            Selected framework: <span className="font-medium text-neutral-900">{code}</span>
          </p>
        )}
      </section>
    </div>
  );
}
