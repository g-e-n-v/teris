import type { ComponentProps } from "react";

import { tv } from "tailwind-variants";

export const variants = tv({
  slots: {
    group: "inline-flex items-center gap-1",
    kbd: [
      "pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm bg-neutral-100 px-1 font-sans text-xs font-medium text-neutral-600 select-none",
      "[&_svg:not([class*='size-'])]:size-3",
    ],
  },
});

type KbdProps = ComponentProps<"kbd">;

export function Kbd({ className, ...props }: KbdProps) {
  const v = variants();

  return <kbd className={v.kbd({ className })} data-slot="kbd" {...props} />;
}

type KbdGroupProps = ComponentProps<"span">;

function KbdGroup({ className, ...props }: KbdGroupProps) {
  const v = variants();

  return <span className={v.group({ className })} data-slot="kbd-group" {...props} />;
}

Kbd.Group = KbdGroup;
