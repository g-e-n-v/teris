import type { ToastPosition } from "$/core/ui";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button, Toast, ToastProvider, toast } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/toast")({
  component: ToastDemoPage,
});

const TEXTS = [
  "Short message.",
  "A bit longer message that spans two lines.",
  "This is a longer description that intentionally takes more vertical space to demonstrate stacking with varying heights.",
  "An even longer description that should span multiple lines so we can verify the clamped collapsed height and smooth expansion animation when hovering or focusing the viewport.",
];

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

async function fakePromise(): Promise<string> {
  // oxlint-disable-next-line promise/avoid-new
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  });

  const shouldSucceed = Math.random() > 0.3;
  if (shouldSucceed) {
    return "Data loaded successfully";
  }
  throw new Error("Failed to load data");
}

const positionToast = Toast.createToastManager();

function ToastDemoPage() {
  const [varyingCount, setVaryingCount] = useState(0);
  const [position, setPosition] = useState<ToastPosition>("bottom-right");

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Toast</h1>
        <p className="text-neutral-600">
          Transient feedback with statuses, actions, and async updates.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Default</h2>
        <Button
          onClick={() => {
            toast.add({
              description: "Monday, January 3rd at 6:00pm",
              title: "Event has been created",
            });
          }}
          variant="secondary"
        >
          Default Toast
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Deduplicated</h2>
        <Button
          onClick={() => {
            toast.add({
              description: "Repeated clicks update this toast instead of stacking another.",
              id: "demo-dedup-toast",
              title: "Saved",
              type: "success",
            });
          }}
          variant="secondary"
        >
          One Success Toast
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With Status</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              toast.add({
                description: "Your changes have been saved.",
                title: "Success!",
                type: "success",
              });
            }}
            variant="secondary"
          >
            Success Toast
          </Button>
          <Button
            onClick={() => {
              toast.add({
                description: "There was a problem with your request.",
                title: "Uh oh! Something went wrong.",
                type: "error",
              });
            }}
            variant="secondary"
          >
            Error Toast
          </Button>
          <Button
            onClick={() => {
              toast.add({
                description: "You can add components to your app using the cli.",
                title: "Heads up!",
                type: "info",
              });
            }}
            variant="secondary"
          >
            Info Toast
          </Button>
          <Button
            onClick={() => {
              toast.add({
                description: "Your session is about to expire.",
                title: "Warning!",
                type: "warning",
              });
            }}
            variant="secondary"
          >
            Warning Toast
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Loading</h2>
        <Button
          onClick={() => {
            toast.add({
              description: "Please wait while we process your request.",
              title: "Loading…",
              type: "loading",
            });
          }}
          variant="secondary"
        >
          Loading Toast
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With Action</h2>
        <Button
          onClick={() => {
            const id = toast.add({
              actionProps: {
                children: "Undo",
                onClick: () => {
                  toast.close(id);
                  toast.add({
                    description: "The action has been reverted.",
                    title: "Action undone",
                    type: "info",
                  });
                },
              },
              description: "You can undo this action.",
              timeout: 10_000,
              title: "Action performed",
              type: "success",
            });
          }}
          variant="secondary"
        >
          Perform Action
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Promise</h2>
        <Button
          onClick={() => {
            void toast.promise(fakePromise(), {
              error: () => ({
                description: "Please try again.",
                title: "Something went wrong",
              }),
              loading: {
                description: "The promise is loading.",
                title: "Loading…",
              },
              success: (data: string) => ({
                description: `Success: ${data}`,
                title: "This is a success toast!",
              }),
            });
          }}
          variant="secondary"
        >
          Run Promise
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">With Varying Heights</h2>
        <Button
          onClick={() => {
            setVaryingCount((prev) => prev + 1);
            const description = TEXTS[Math.floor(Math.random() * TEXTS.length)];
            toast.add({
              description,
              title: `Toast ${varyingCount + 1} created`,
            });
          }}
          variant="secondary"
        >
          With Varying Heights
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Position</h2>
        <p className="mb-4 text-sm text-neutral-600">
          Uses a separate toast manager so it does not interfere with the demos above.
        </p>

        <ToastProvider position={position} toastManager={positionToast}>
          <div className="flex flex-wrap gap-2">
            {POSITIONS.map((p) => (
              <Button
                key={p}
                onClick={() => {
                  setPosition(p);
                }}
                size="sm"
                variant={position === p ? "primary" : "secondary"}
              >
                {p}
              </Button>
            ))}
            <Button
              onClick={() => {
                positionToast.add({
                  description: `This toast appeared at ${position}.`,
                  title: "Positioned toast",
                  type: "info",
                });
              }}
              variant="secondary"
            >
              Show toast
            </Button>
          </div>
        </ToastProvider>
      </section>
    </div>
  );
}
