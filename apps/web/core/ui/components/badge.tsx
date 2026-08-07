import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

export const variants = tv({
  base: [
    "relative inline-flex shrink-0 items-center justify-center gap-1 rounded-sm border border-transparent font-medium whitespace-nowrap transition-shadow outline-none",
    "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-25 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3.5",
    "[button&,a&]:cursor-pointer",
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      lg: "h-6.5 min-w-6.5 px-[calc(--spacing(1.5)-1px)] text-base",
      md: "h-5.5 min-w-5.5 px-[calc(--spacing(1)-1px)] text-sm",
      sm: "h-5 min-w-5 rounded-sm px-[calc(--spacing(1)-1px)] text-xs",
    },
    variant: {
      default: "bg-brand-500 text-white [button&,a&]:hover:bg-brand-600",
      destructive: "bg-error-500 text-white [button&,a&]:hover:bg-error-600",
      error: "bg-error-500/8 text-error-700",
      info: "bg-info-500/8 text-info-700",
      outline: "border-neutral-300 bg-white text-neutral-900 [button&,a&]:hover:bg-neutral-50",
      secondary: "bg-neutral-100 text-neutral-900 [button&,a&]:hover:bg-neutral-200",
      success: "bg-success-500/8 text-success-700",
      warning: "bg-warning-500/8 text-warning-700",
    },
  },
});

export type BadgeProps = {
  variant?: VariantProps<typeof variants>["variant"];
  size?: VariantProps<typeof variants>["size"];
} & ComponentProps<"span">;

export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={variants({ className, size, variant })} data-slot="badge" {...props}>
      {children}
    </span>
  );
}
