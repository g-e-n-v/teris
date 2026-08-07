import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

export const variants = tv({
  base: [
    "relative inline-flex shrink-0 items-center justify-center gap-1 rounded-sm font-medium whitespace-nowrap transition-shadow outline-none",
    "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-25",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3.5 sm:[&_svg:not([class*='size-'])]:size-3",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[button&,a&]:cursor-pointer",
  ],
  defaultVariants: {
    size: "default",
    variant: "default",
  },
  variants: {
    size: {
      default:
        "h-5.5 min-w-5.5 px-[calc(var(--spacing)*1-1px)] text-sm sm:h-4.5 sm:min-w-4.5 sm:text-xs",
      lg: "h-6.5 min-w-6.5 px-[calc(var(--spacing)*1.5-1px)] text-base sm:h-5.5 sm:min-w-5.5 sm:text-sm",
      sm: "h-5 min-w-5 rounded-sm px-[calc(var(--spacing)*1-1px)] text-xs sm:h-4 sm:min-w-4 sm:text-[.625rem]",
    },
    variant: {
      default: "bg-brand-500 text-white [button&,a&]:hover:bg-brand-600",
      destructive: "bg-error-500 text-white [button&,a&]:hover:bg-error-600",
      error: "bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-200",
      info: "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-200",
      outline:
        "border border-neutral-200 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 [button&,a&]:hover:bg-neutral-50",
      secondary:
        "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 [button&,a&]:hover:bg-neutral-200",
      success: "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-200",
      warning: "bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-200",
    },
  },
});

export type BadgeProps = ComponentPropsWithoutRef<"span"> & VariantProps<typeof variants>;

export function Badge({ className, children, size, variant, ...props }: BadgeProps) {
  return (
    <span className={variants({ className, size, variant })} data-slot="badge" {...props}>
      {children}
    </span>
  );
}
