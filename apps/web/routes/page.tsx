import { createFileRoute } from "@tanstack/react-router";

import { Button, Spinner } from "$/core/ui";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello from Web</h1>

      <div className="flex gap-4">
        <Button>Hello</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading...</Button>
      </div>

      <Spinner />
    </>
  );
}
