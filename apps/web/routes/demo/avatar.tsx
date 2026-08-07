import { createFileRoute } from "@tanstack/react-router";

import { Avatar } from "$/core/ui";

export const Route = createFileRoute("/demo/avatar")({
  component: AvatarDemoPage,
});

const AVATARS = [
  {
    alt: "Alice",
    fallback: "A",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23dbeafe'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%2360a5fa'/%3E%3Cpath d='M12 62c2-15 10-23 20-23s18 8 20 23' fill='%233b82f6'/%3E%3C/svg%3E",
  },
  {
    alt: "Bob",
    fallback: "B",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23dcfce7'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%234ade80'/%3E%3Cpath d='M12 62c2-15 10-23 20-23s18 8 20 23' fill='%2322c55e'/%3E%3C/svg%3E",
  },
  {
    alt: "Carol",
    fallback: "C",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ffedd5'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%23fb923c'/%3E%3Cpath d='M12 62c2-15 10-23 20-23s18 8 20 23' fill='%23f97316'/%3E%3C/svg%3E",
  },
] as const;

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
          {AVATARS.map((avatar) => (
            <Avatar
              key={avatar.alt}
              fallback={{ children: avatar.fallback }}
              image={{ alt: avatar.alt, src: avatar.src }}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Fallback only</h2>
        <div className="flex flex-wrap gap-3">
          <Avatar fallback={{ children: "JD" }} />
          <Avatar fallback={{ children: "AB" }} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Different sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Avatar className="size-6 text-[10px]" fallback={{ children: "XS" }} />
          <Avatar className="size-8" fallback={{ children: "SM" }} />
          <Avatar className="size-10 text-sm" fallback={{ children: "MD" }} />
          <Avatar className="size-12 text-base" fallback={{ children: "LG" }} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Different radius</h2>
        <div className="flex flex-wrap gap-3">
          <Avatar
            className="rounded-none"
            fallback={{ children: "SQ", className: "rounded-none" }}
          />
          <Avatar className="rounded-md" fallback={{ children: "MD", className: "rounded-md" }} />
          <Avatar fallback={{ children: "FL" }} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Group avatars</h2>
        <div className="flex -space-x-2">
          {AVATARS.map((avatar) => (
            <Avatar
              key={avatar.alt}
              className="ring-2 ring-white"
              fallback={{ children: avatar.fallback }}
              image={{ alt: avatar.alt, src: avatar.src }}
            />
          ))}
          <Avatar
            className="ring-2 ring-white"
            fallback={{ children: "+3", className: "bg-neutral-200" }}
          />
        </div>
      </section>
    </div>
  );
}
