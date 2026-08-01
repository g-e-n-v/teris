import "$/core/styles/main.css";
import { createRoot } from "react-dom/client";

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(
  <h1 className="text-3xl font-bold underline">Hello from Web</h1>
);
