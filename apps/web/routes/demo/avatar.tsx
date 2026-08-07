import { createFileRoute } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "$/core/ui";

export const Route = createFileRoute("/demo/avatar")({
  component: AvatarDemoPage,
});

function AvatarDemoPage() {
  return (
    <div className="max-w-2xl space-y-12">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Image</h2>
        <div className="flex flex-wrap gap-3">
          <Avatar>
            <AvatarImage alt="Alice" src="https://api.dicebear.com/9.x/notionists/svg?seed=Alice" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage alt="Bob" src="https://api.dicebear.com/9.x/notionists/svg?seed=Bob" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage alt="Carol" src="https://api.dicebear.com/9.x/notionists/svg?seed=Carol" />
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
