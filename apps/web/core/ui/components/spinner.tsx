import type { IconProps } from "@iconify/react";

import { Icon } from "@iconify/react";
import { cn } from "tailwind-variants";

type SpinnerProps = Omit<IconProps, "icon">;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Icon
      icon="uil:spin"
      aria-label="Loading"
      className={cn("size-5 animate-spin", className)}
      {...props}
    />
  );
}
