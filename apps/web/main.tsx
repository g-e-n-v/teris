import "@fontsource-variable/quicksand/wght.css";
import "$/core/styles/main.css";

import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import { router } from "$/core/router";

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(<RouterProvider router={router} />);
