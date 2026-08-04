import { createFileRoute } from "@tanstack/react-router";

import { Button, toast } from "$/core/ui";

export const Route = createFileRoute("/demo/toast")({
  component: ToastDemoPage,
});

const TYPES = ["success", "info", "warning", "error", "loading"] as const;

async function fakeSave(): Promise<void> {
  // oxlint-disable-next-line promise/avoid-new
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

function ToastDemoPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Types</h2>
        <div className="flex flex-wrap gap-3">
          {TYPES.map((type) => (
            <Button
              key={type}
              onClick={() => {
                toast.add({
                  description: "This is a description for the toast.",
                  title: `${type.charAt(0).toUpperCase()}${type.slice(1)} toast`,
                  type,
                });
              }}
              variant="secondary"
            >
              {type}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With action</h2>
        <Button
          onClick={() => {
            toast.add({
              actionProps: {
                children: "Undo",
                onClick: () => {
                  toast.add({ title: "Undone", type: "success" });
                },
              },
              description: "You can undo this action.",
              title: "Item deleted",
              type: "warning",
            });
          }}
          variant="secondary"
        >
          Show with action
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Promise</h2>
        <Button
          onClick={() => {
            void toast.promise(fakeSave(), {
              error: { title: "Something went wrong", type: "error" },
              loading: { title: "Saving...", type: "loading" },
              success: { title: "Saved successfully", type: "success" },
            });
          }}
          variant="secondary"
        >
          Run promise
        </Button>
      </section>
    </div>
  );
}
