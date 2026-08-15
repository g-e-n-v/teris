import { Icon } from "@iconify/react";

import { Badge } from "../base/badge";

const ROLE_META: Record<string, { icon: string; label: string; variant: "info" | "warning" }> = {
  ADMIN: { icon: "solar:shield-check-linear", label: "Admin", variant: "info" },
  ROOT: { icon: "solar:crown-linear", label: "Root", variant: "warning" },
};

type RoleBadgeProps = {
  role?: string | null;
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const meta = role ? ROLE_META[role] : undefined;

  if (!meta) return null;

  return (
    <Badge className="gap-1" size="sm" variant={meta.variant}>
      <Icon icon={meta.icon} />
      {meta.label}
    </Badge>
  );
}
