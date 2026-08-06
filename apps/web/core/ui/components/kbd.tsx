import type { ComponentProps } from "react";

import { tv } from "tailwind-variants";

export const kbdVariants = tv({
  base: [
    "pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded bg-neutral-100 px-1 font-sans text-xs font-medium text-neutral-600 select-none",
    "[&_svg:not([class*='size-'])]:size-3",
  ],
});

type KbdProps = ComponentProps<"kbd">;

export function Kbd({ className, ...props }: KbdProps) {
  return <kbd className={kbdVariants({ className })} data-slot="kbd" {...props} />;
}

export const kbdGroupVariants = tv({
  base: "inline-flex items-center gap-1",
});

type KbdGroupProps = ComponentProps<"kbd">;

export function KbdGroup({ className, ...props }: KbdGroupProps) {
  return <kbd className={kbdGroupVariants({ className })} data-slot="kbd-group" {...props} />;
}
