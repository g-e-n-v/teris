import type { VariantProps } from "tailwind-variants";

import { Button as BaseButton } from "@base-ui/react";
import { tv, cn } from "tailwind-variants";

import { Spinner } from "./spinner";

const variants = tv({
  base: [
    // Local variables
    "[--btn-edge:0_1px_oklch(0_0_0/4%)]",
    "[--btn-highlight:0_1px_oklch(1_0_0/16%)]",
    "[--btn-press:0_1px_oklch(0_0_0/8%)]",

    "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border font-medium transition-all",
    "active:scale-95",
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:content-['']",
    "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-25 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  compoundVariants: [
    {
      class:
        "border-transparent bg-neutral-50 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200",
      color: "neutral",
      variant: "filled",
    },
    {
      class: "text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100",
      color: "neutral",
      variant: "ghost",
    },
    {
      class:
        "border-neutral-200 text-neutral-900 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-neutral-50 active:bg-neutral-100 active:shadow-none",
      color: "neutral",
      variant: "outline",
    },
    {
      class:
        "border-neutral-500 bg-neutral-500 text-white shadow-xs shadow-neutral-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-neutral-500 active:bg-neutral-700 active:shadow-none active:inset-shadow-(--btn-press)",
      color: "neutral",
      variant: "solid",
    },
    {
      class: "border-transparent bg-brand-50 text-brand-500 hover:bg-brand-100 active:bg-brand-200",
      color: "brand",
      variant: "filled",
    },
    {
      class: "text-brand-500 hover:bg-brand-50 active:bg-brand-100",
      color: "brand",
      variant: "ghost",
    },
    {
      class:
        "border-brand-400 text-brand-500 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-brand-50 active:bg-brand-100 active:shadow-none",
      color: "brand",
      variant: "outline",
    },
    {
      class:
        "border-brand-500 bg-brand-500 text-white shadow-xs shadow-brand-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-brand-500 active:bg-brand-700 active:shadow-none active:inset-shadow-(--btn-press)",
      color: "brand",
      variant: "solid",
    },
    {
      class:
        "border-transparent bg-accent-50 text-accent-500 hover:bg-accent-100 active:bg-accent-200",
      color: "accent",
      variant: "filled",
    },
    {
      class: "text-accent-500 hover:bg-accent-50 active:bg-accent-100",
      color: "accent",
      variant: "ghost",
    },
    {
      class:
        "border-accent-400 text-accent-500 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-accent-50 active:bg-accent-100 active:shadow-none",
      color: "accent",
      variant: "outline",
    },
    {
      class:
        "border-accent-500 bg-accent-500 text-white shadow-xs shadow-accent-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-accent-500 active:bg-accent-700 active:shadow-none active:inset-shadow-(--btn-press)",
      color: "accent",
      variant: "solid",
    },
    {
      class:
        "border-transparent bg-success-50 text-success-500 hover:bg-success-100 active:bg-success-200",
      color: "success",
      variant: "filled",
    },
    {
      class: "text-success-500 hover:bg-success-50 active:bg-success-100",
      color: "success",
      variant: "ghost",
    },
    {
      class:
        "border-success-400 text-success-500 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-success-50 active:bg-success-100 active:shadow-none",
      color: "success",
      variant: "outline",
    },
    {
      class:
        "border-success-500 bg-success-500 text-white shadow-xs shadow-success-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-success-500 active:bg-success-700 active:shadow-none active:inset-shadow-(--btn-press)",
      color: "success",
      variant: "solid",
    },
    {
      class:
        "border-transparent bg-warning-50 text-warning-500 hover:bg-warning-100 active:bg-warning-200",
      color: "warning",
      variant: "filled",
    },
    {
      class: "text-warning-500 hover:bg-warning-50 active:bg-warning-100",
      color: "warning",
      variant: "ghost",
    },
    {
      class:
        "border-warning-400 text-warning-500 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-warning-50 active:bg-warning-100 active:shadow-none",
      color: "warning",
      variant: "outline",
    },
    {
      class:
        "border-warning-500 bg-warning-500 text-white shadow-xs shadow-warning-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-warning-500 active:bg-warning-700 active:shadow-none active:inset-shadow-(--btn-press)",
      color: "warning",
      variant: "solid",
    },
    {
      class: "border-transparent bg-error-50 text-error-500 hover:bg-error-100 active:bg-error-200",
      color: "error",
      variant: "filled",
    },
    {
      class: "text-error-500 hover:bg-error-50 active:bg-error-100",
      color: "error",
      variant: "ghost",
    },
    {
      class:
        "border-error-400 text-error-500 shadow-xs/5 not-active:before:shadow-(--btn-edge) hover:bg-error-50 active:bg-error-100 active:shadow-none",
      color: "error",
      variant: "outline",
    },
    {
      class:
        "border-error-500 bg-error-500 text-white shadow-xs shadow-error-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-error-500 active:bg-error-700 active:shadow-none active:inset-shadow-(--btn-press)",
      color: "error",
      variant: "solid",
    },
  ],
  defaultVariants: {
    color: "brand",
    size: "md",
    variant: "solid",
  },
  variants: {
    color: {
      accent: "",
      brand: "",
      error: "",
      neutral: "",
      success: "",
      warning: "",
    },
    size: {
      lg: "h-10 px-3.5 sm:h-9",
      md: "h-9 px-3 sm:h-8",
      sm: "h-8 gap-1.5 px-2.5 sm:h-7",
    },
    variant: {
      filled: "",
      ghost: "border-transparent bg-transparent",
      outline: "border bg-transparent",
      solid: "",
    },
  },
});

type ButtonProps = Omit<BaseButton.Props, "className"> &
  VariantProps<typeof variants> & { loading?: boolean; className?: string };

export function Button({
  className,
  children,
  color,
  loading = false,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <BaseButton className={variants({ className, color, size, variant })} {...props}>
      <div className={cn("contents", loading && "invisible")}>{children}</div>

      {loading && <Spinner className={cn("size-5", loading && "absolute inset-0 m-auto")} />}
    </BaseButton>
  );
}
