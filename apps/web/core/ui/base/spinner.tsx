import type { IconProps } from "@iconify/react";

import { Icon } from "@iconify/react";
import { cn } from "tailwind-variants";

type SpinnerProps = Omit<IconProps, "icon">;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <output aria-label="Loading">
      <Icon
        aria-hidden="true"
        className={cn("size-5 animate-spin motion-reduce:animate-none", className)}
        icon="uil:spin"
        {...props}
      />
    </output>
  );
}
