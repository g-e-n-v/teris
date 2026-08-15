import type { VariantProps } from "tailwind-variants";

import { Separator as BaseSeparator } from "@base-ui/react";
import { tv } from "tailwind-variants";

export const variants = tv({
  base: "shrink-0 bg-neutral-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
});

type SeparatorProps = PropsWithClassName<BaseSeparator.Props> & VariantProps<typeof variants>;

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return <BaseSeparator className={variants({ className })} orientation={orientation} {...props} />;
}
