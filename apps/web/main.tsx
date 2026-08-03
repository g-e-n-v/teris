import "@fontsource-variable/quicksand/wght.css";
import "$/core/styles/main.css";

import { createRoot } from "react-dom/client";

import { Button } from "./core/ui/components/button";
import { Spinner } from "./core/ui/components/spinner";

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(
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
