import { Icon } from "@iconify/react";

import { Avatar } from "$/core/ui";

export function ButtonProfile() {
  return (
    <Avatar
      className="size-12"
      fallback={{ children: <Icon icon="solar:user-linear" className="size-5 text-neutral-500" /> }}
    />
  );
}
