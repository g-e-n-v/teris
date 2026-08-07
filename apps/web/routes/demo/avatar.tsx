import { createFileRoute } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "$/core/ui";

export const Route = createFileRoute("/demo/avatar")({
  component: AvatarDemoPage,
});

function AvatarDemoPage() {
  return (
    <div className="max-w-2xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Avatar</h1>
        <p className="text-neutral-600">Profile images and resilient initials fallbacks.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Image</h2>
        <div className="flex flex-wrap gap-3">
          <Avatar>
            <AvatarImage
              alt="Alice"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23dbeafe'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%2360a5fa'/%3E%3Cpath d='M12 62c2-15 10-23 20-23s18 8 20 23' fill='%233b82f6'/%3E%3C/svg%3E"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              alt="Bob"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23dcfce7'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%234ade80'/%3E%3Cpath d='M12 62c2-15 10-23 20-23s18 8 20 23' fill='%2322c55e'/%3E%3C/svg%3E"
            />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              alt="Carol"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ffedd5'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%23fb923c'/%3E%3Cpath d='M12 62c2-15 10-23 20-23s18 8 20 23' fill='%23f97316'/%3E%3C/svg%3E"
            />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Fallback</h2>
        <div className="flex flex-wrap gap-3">
          <Avatar>
            <AvatarImage alt="Missing" src="" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage alt="Missing" src="invalid" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </div>
  );
}
