import type { VariantProps } from "tailwind-variants";

import { Button as BaseButton } from "@base-ui/react";
import { cn, tv } from "tailwind-variants";

import { Spinner } from "./spinner";

export const variants = tv({
  base: [
    // Local variables
    "[--btn-edge:0_1px_oklch(0_0_0/4%)]",
    "[--btn-highlight:0_1px_oklch(1_0_0/16%)]",
    "[--btn-press:0_1px_oklch(0_0_0/8%)]",

    "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border transition-all",
    "active:scale-98",
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:content-['']",
    "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-25 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
  variants: {
    size: {
      icon: "size-8 p-1.5",
      lg: "h-9 px-3.5",
      md: "h-8 px-3",
      sm: "h-7 gap-1.5 px-2.5",
      xs: "h-6 gap-1.5 px-2 text-sm",
    },
    variant: {
      danger:
        "border-error-500 bg-error-500 text-white shadow-xs shadow-error-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-error-500 active:bg-error-700 active:shadow-none active:inset-shadow-(--btn-press)",
      "danger-soft":
        "border-neutral-200 bg-transparent text-error-500 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-neutral-50 active:bg-neutral-100 active:shadow-none",
      ghost:
        "border-transparent bg-transparent text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100",
      link: "border-transparent bg-transparent text-neutral-900 hover:underline",
      primary:
        "border-brand-500 bg-brand-500 text-white shadow-xs shadow-brand-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-brand-500 active:bg-brand-700 active:shadow-none active:inset-shadow-(--btn-press)",
      secondary:
        "border-neutral-200 bg-white text-neutral-900 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-neutral-25 active:bg-neutral-50 active:shadow-none",
      tertiary:
        "border-transparent bg-neutral-50 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200",
    },
  },
});

type ButtonProps = Omit<BaseButton.Props, "className"> &
  VariantProps<typeof variants> & { loading?: boolean; className?: string };

export function Button({
  className,
  children,
  disabled = false,
  loading = false,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      aria-busy={loading || undefined}
      className={variants({ className, size, variant })}
      disabled={disabled}
      {...props}
    >
      <div className={cn("contents", loading && "invisible")}>{children}</div>

      {loading && <Spinner aria-hidden="true" className="absolute inset-0 m-auto size-5" />}
    </BaseButton>
  );
}
