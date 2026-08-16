import "$/core/styles/main.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";

import { queryClient } from "$/core/api/query-client";
import { useAuth } from "$/core/auth";
import { router } from "$/core/router";
import { ScreenLoading } from "$/core/ui";

function App() {
  const auth = useAuth();

  useEffect(() => (router.invalidate(), undefined), [auth?.session?.id]);

  if (auth.isPending) {
    return (
      <ScreenLoading
        title="Checking your vibe..."
        description="The bouncer is looking for your name on the list. Hold still, this might take a while."
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(<App />);
