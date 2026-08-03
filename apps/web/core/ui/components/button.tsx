import type { VariantProps } from "tailwind-variants";

import { Button as BaseButton } from "@base-ui/react";
import { tv, cn } from "tailwind-variants";

import { Spinner } from "./spinner";

const variants = tv({
  base: [
    "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-all",
    "active:scale-95",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  compoundVariants: [
    {
      class: "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200",
      color: "neutral",
      variant: "filled",
    },
    {
      class: "text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100",
      color: "neutral",
      variant: "ghost",
    },
    {
      class: "border-neutral-500 text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100",
      color: "neutral",
      variant: "outline",
    },
    {
      class: "bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-800",
      color: "neutral",
      variant: "solid",
    },
    {
      class: "bg-brand-50 text-brand-600 hover:bg-brand-100 active:bg-brand-200",
      color: "brand",
      variant: "filled",
    },
    {
      class: "text-brand-600 hover:bg-brand-50 active:bg-brand-100",
      color: "brand",
      variant: "ghost",
    },
    {
      class: "border-brand-500 text-brand-600 hover:bg-brand-50 active:bg-brand-100",
      color: "brand",
      variant: "outline",
    },
    {
      class: "bg-brand-600 hover:bg-brand-700 active:bg-brand-800",
      color: "brand",
      variant: "solid",
    },
    {
      class: "bg-accent-50 text-accent-600 hover:bg-accent-100 active:bg-accent-200",
      color: "accent",
      variant: "filled",
    },
    {
      class: "text-accent-600 hover:bg-accent-50 active:bg-accent-100",
      color: "accent",
      variant: "ghost",
    },
    {
      class: "border-accent-500 text-accent-600 hover:bg-accent-50 active:bg-accent-100",
      color: "accent",
      variant: "outline",
    },
    {
      class: "bg-accent-600 hover:bg-accent-700 active:bg-accent-800",
      color: "accent",
      variant: "solid",
    },
    {
      class: "bg-success-50 text-success-600 hover:bg-success-100 active:bg-success-200",
      color: "success",
      variant: "filled",
    },
    {
      class: "text-success-600 hover:bg-success-50 active:bg-success-100",
      color: "success",
      variant: "ghost",
    },
    {
      class: "border-success-500 text-success-600 hover:bg-success-50 active:bg-success-100",
      color: "success",
      variant: "outline",
    },
    {
      class: "bg-success-600 hover:bg-success-700 active:bg-success-800",
      color: "success",
      variant: "solid",
    },
    {
      class: "bg-warning-50 text-warning-600 hover:bg-warning-100 active:bg-warning-200",
      color: "warning",
      variant: "filled",
    },
    {
      class: "text-warning-600 hover:bg-warning-50 active:bg-warning-100",
      color: "warning",
      variant: "ghost",
    },
    {
      class: "border-warning-500 text-warning-600 hover:bg-warning-50 active:bg-warning-100",
      color: "warning",
      variant: "outline",
    },
    {
      class: "bg-warning-600 hover:bg-warning-700 active:bg-warning-800",
      color: "warning",
      variant: "solid",
    },
    {
      class: "bg-error-50 text-error-600 hover:bg-error-100 active:bg-error-200",
      color: "error",
      variant: "filled",
    },
    {
      class: "text-error-600 hover:bg-error-50 active:bg-error-100",
      color: "error",
      variant: "ghost",
    },
    {
      class: "border-error-500 text-error-600 hover:bg-error-50 active:bg-error-100",
      color: "error",
      variant: "outline",
    },
    {
      class: "bg-error-600 hover:bg-error-700 active:bg-error-800",
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
      lg: "h-12 px-6 text-base",
      md: "h-10 px-4 text-sm",
      sm: "h-8 px-3 text-xs",
    },
    variant: {
      filled: "",
      ghost: "bg-transparent",
      outline: "border bg-transparent",
      solid: "text-white",
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
