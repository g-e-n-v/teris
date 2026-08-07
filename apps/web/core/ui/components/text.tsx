import * as React from "react";

import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

export const variants = tv({
  base: "text-neutral-900",
  defaultVariants: {
    variant: "body",
  },
  variants: {
    variant: {
      body: "text-base leading-6 font-medium",
      caption: "text-xs leading-4 font-medium",
      display: "text-4xl leading-10 font-bold",
      headline: "text-2xl leading-8 font-bold",
      label: "text-sm leading-5 font-semibold",
      title: "text-xl leading-7 font-semibold",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
      regular: "font-normal",
      semibold: "font-semibold",
    },
  },
});

type TextElement = "a" | "em" | "label" | "p" | "span" | "strong";

type TextProps<T extends TextElement = "span"> = React.ComponentPropsWithoutRef<T> &
  VariantProps<typeof variants> & {
    as?: T;
    className?: string;
  };

export function Text<T extends TextElement = "span">({
  as,
  variant = "body",
  weight,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? "span") as React.ElementType;

  return <Component className={variants({ className, variant, weight })} {...props} />;
}
