import { createFileRoute } from "@tanstack/react-router";

import { Text } from "$/core/ui";

export const Route = createFileRoute("/demo/text")({
  component: TextDemoPage,
});

const VARIANTS = [
  {
    description: "Hero numbers, onboarding highlights, empty-state emphasis",
    variant: "display" as const,
  },
  { description: "Main page titles, large modal titles", variant: "headline" as const },
  {
    description: "Section titles, card titles, grouped content headers",
    variant: "title" as const,
  },
  { description: "Default reading text, descriptions, list content", variant: "body" as const },
  { description: "Buttons, tabs, chips, input labels", variant: "label" as const },
  { description: "Helper text, timestamps, supporting metadata", variant: "caption" as const },
];

function TextDemoPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Text</h1>
        <p className="text-neutral-600">The typographic hierarchy and semantic element options.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Variants</h2>
        <div className="flex flex-col gap-6">
          {VARIANTS.map(({ variant, description }) => (
            <div key={variant} className="flex flex-col gap-1 border-b border-neutral-100 pb-4">
              <Text variant={variant}>The quick brown fox jumps over the lazy dog.</Text>

              <Text variant="caption" className="text-neutral-400">
                {variant} - {description}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Polymorphic usage</h2>
        <div className="flex flex-col gap-3">
          <Text
            as="button"
            type="button"
            variant="label"
            className="w-fit cursor-pointer text-brand-500 hover:underline"
          >
            Rendered as a button
          </Text>
          <Text as="span" variant="body">
            Rendered as a span inside a paragraph of{" "}
            <Text as="strong" variant="body" className="font-bold">
              emphasized
            </Text>{" "}
            content.
          </Text>
        </div>
      </section>
    </div>
  );
}
