import { createRoot } from "react-dom/client";

const root = document.querySelector("#root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(<h1>Hello from Web</h1>);
