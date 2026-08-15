import type { ReactNode } from "react";

import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";

import {
  Button,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  Field,
  FieldError,
  FieldLabel,
  toast,
} from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/combobox")({
  component: ComboboxDemoPage,
});

type Fruit = { label: string; value: string };
type FruitGroup = { value: string; items: Fruit[] };

const FRUITS: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Mango", value: "mango" },
  { label: "Orange", value: "orange" },
  { label: "Peach", value: "peach" },
  { label: "Pear", value: "pear" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Watermelon", value: "watermelon" },
];

const FRUIT_GROUPS: FruitGroup[] = [
  {
    items: [
      { label: "Blueberry", value: "blueberry" },
      { label: "Cherry", value: "cherry" },
      { label: "Strawberry", value: "strawberry" },
    ],
    value: "Berries",
  },
  {
    items: [
      { label: "Lemon", value: "lemon" },
      { label: "Lime", value: "lime" },
      { label: "Orange", value: "orange" },
    ],
    value: "Citrus",
  },
  {
    items: [
      { label: "Mango", value: "mango" },
      { label: "Papaya", value: "papaya" },
      { label: "Pineapple", value: "pineapple" },
    ],
    value: "Tropical",
  },
];

function FruitList() {
  return (
    <>
      <ComboboxEmpty>No results found.</ComboboxEmpty>
      <ComboboxList>
        {(fruit: Fruit) => (
          <ComboboxItem key={fruit.value} value={fruit}>
            {fruit.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </>
  );
}

function ChipsValue({ placeholder }: { placeholder: string }) {
  return (
    <ComboboxChips>
      <ComboboxValue>
        {(value: Fruit[]) => (
          <>
            {value.map((fruit) => (
              <ComboboxChip key={fruit.value} aria-label={fruit.label}>
                {fruit.label}
              </ComboboxChip>
            ))}
            <ComboboxChipsInput
              aria-label={placeholder}
              placeholder={value.length > 0 ? undefined : placeholder}
            />
          </>
        )}
      </ComboboxValue>
    </ComboboxChips>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      {children}
    </section>
  );
}

function ComboboxDemoPage() {
  const [single, setSingle] = useState<Fruit | null>(null);
  const [multi, setMulti] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selected = formData
      .getAll("fruits")
      .filter((entry): entry is string => typeof entry === "string");
    const values = selected.map(
      (label) => FRUITS.find((fruit) => fruit.label === label)?.value ?? label
    );

    setLoading(true);
    // oxlint-disable-next-line promise/avoid-new
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 800);
    });
    setLoading(false);
    toast.add({
      description: values.length > 0 ? values.join(", ") : "Nothing selected",
      title: "Submitted",
      type: "success",
    });
  };

  return (
    <div className="max-w-3xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Combobox</h1>
        <p className="text-neutral-600">
          Filterable select built on Base UI: single and multiple selection, sizes, addons, grouped
          items, and form integration.
        </p>
      </header>

      <Section title="Single">
        <Combobox items={FRUITS} value={single} onValueChange={setSingle}>
          <ComboboxInput placeholder="Select a fruit..." />
          <ComboboxPopup>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="Sizes">
        <div className="space-y-3">
          <Combobox items={FRUITS}>
            <ComboboxInput placeholder="Small" size="sm" />
            <ComboboxPopup>
              <FruitList />
            </ComboboxPopup>
          </Combobox>
          <Combobox items={FRUITS}>
            <ComboboxInput placeholder="Large" size="lg" />
            <ComboboxPopup>
              <FruitList />
            </ComboboxPopup>
          </Combobox>
        </div>
      </Section>

      <Section title="Disabled">
        <Combobox disabled items={FRUITS}>
          <ComboboxInput placeholder="Disabled" />
          <ComboboxPopup>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="With clear button and auto highlight">
        <Combobox autoHighlight items={FRUITS}>
          <ComboboxInput placeholder="Select a fruit..." showClear />
          <ComboboxPopup>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="With start addon">
        <Combobox items={FRUITS}>
          <ComboboxInput placeholder="Search fruits..." startAddon="solar:magnifer-linear" />
          <ComboboxPopup>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="With label and error">
        <Field>
          <FieldLabel>Favorite fruit</FieldLabel>
          <Combobox items={FRUITS} name="fruit" required>
            <ComboboxInput placeholder="Select a fruit..." />
            <ComboboxPopup>
              <FruitList />
            </ComboboxPopup>
          </Combobox>
          <FieldError>Please select a fruit.</FieldError>
        </Field>
      </Section>

      <Section title="Grouped">
        <Combobox items={FRUIT_GROUPS}>
          <ComboboxInput aria-label="Search fruits" placeholder="e.g. Mango" />
          <ComboboxPopup>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {(group: FruitGroup) => (
                <Fragment key={group.value}>
                  <ComboboxGroup items={group.items}>
                    <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                    <ComboboxCollection>
                      {(fruit: Fruit) => (
                        <ComboboxItem key={fruit.value} value={fruit}>
                          {fruit.label}
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                  </ComboboxGroup>
                  {group.value !== "Tropical" && <ComboboxSeparator />}
                </Fragment>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="Multiple selection">
        <Combobox items={FRUITS} multiple value={multi} onValueChange={setMulti}>
          <ChipsValue placeholder="Select fruits..." />
          <ComboboxPopup>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="Multiple selection with start addon">
        <Combobox items={FRUITS} multiple>
          <ComboboxChips startAddon="solar:magnifer-linear">
            <ComboboxValue>
              {(value: Fruit[]) => (
                <>
                  {value.map((fruit) => (
                    <ComboboxChip key={fruit.value} aria-label={fruit.label}>
                      {fruit.label}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    aria-label="Select fruits"
                    placeholder={value.length > 0 ? undefined : "Select fruits..."}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxPopup>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="Input inside popup">
        <Combobox items={FRUITS}>
          <ComboboxTrigger className="inline-flex h-9 w-full min-w-36 items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-base text-neutral-900 shadow-xs/5 outline-none sm:h-8 sm:text-sm">
            <ComboboxValue placeholder="Select a fruit..." />
            <Icon className="size-4 opacity-80" icon="ph:caret-up-down-bold" />
          </ComboboxTrigger>
          <ComboboxPopup>
            <div className="border-b border-neutral-200 p-2">
              <ComboboxInput
                placeholder="Search fruits..."
                showTrigger={false}
                size="sm"
                startAddon="solar:magnifer-linear"
              />
            </div>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
      </Section>

      <Section title="Form integration">
        <form
          className="flex w-full max-w-64 flex-col gap-4"
          onSubmit={(event) => {
            void onFormSubmit(event);
          }}
        >
          <Field>
            <FieldLabel>Favorite fruits</FieldLabel>
            <Combobox items={FRUITS} multiple name="fruits" required>
              <ChipsValue placeholder="Select fruits..." />
              <ComboboxPopup>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
            <FieldError>Please select at least one fruit.</FieldError>
          </Field>
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </form>
      </Section>
    </div>
  );
}
