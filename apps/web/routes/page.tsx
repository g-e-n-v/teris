import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "$/core/ui";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <Link to="/demo">
        <Button variant="link">/demo</Button>
      </Link>
    </div>
  );
}
