import { Icon } from "@iconify/react";
import { useState } from "react";

import { useAuth, auth } from "$/core/auth";
import {
  Avatar,
  Button,
  Popover,
  PopoverPopup,
  PopoverTrigger,
  RoleBadge,
  Separator,
  Text,
} from "$/core/ui";

export function ButtonProfile() {
  const { user } = useAuth();

  const [signingOut, setSigningOut] = useState(false);

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          className="size-12"
          image={user?.image ? { alt: user.name ?? "", src: user.image } : undefined}
          fallback={{
            children: <Icon icon="solar:user-linear" className="size-5 text-neutral-500" />,
          }}
        />
      </PopoverTrigger>
      <PopoverPopup className="w-56" side="right">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Text weight="semibold">{user?.name}</Text>
              <RoleBadge role={user?.role} />
            </div>
            <Text className="text-neutral-500">{user?.email}</Text>
          </div>

          <Separator />
          <Button
            className="justify-start gap-2 text-error-500"
            onClick={async () => {
              setSigningOut(true);
              await auth.signOut();
              setSigningOut(false);
            }}
            variant="ghost"
            disabled={signingOut}
            loading={signingOut}
          >
            <Icon icon="solar:logout-2-linear" className="size-4" />
            Sign out
          </Button>
        </div>
      </PopoverPopup>
    </Popover>
  );
}
