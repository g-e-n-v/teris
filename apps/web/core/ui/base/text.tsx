import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

export const variants = tv({
  defaultVariants: {
    variant: "body",
  },
  variants: {
    variant: {
      body: "font-sans text-base leading-6 font-normal text-neutral-800",
      caption: "font-sans text-sm leading-4 font-normal text-neutral-500",
      display:
        "font-display text-4xl leading-10 font-bold text-neutral-800 [font-variation-settings:'GEOM'_50]",
      headline:
        "font-heading text-2xl leading-8 font-semibold text-neutral-800 [font-variation-settings:'GEOM'_50]",
      label: "font-sans text-sm leading-5 font-medium text-neutral-700",
      title:
        "font-heading text-xl leading-7 font-semibold text-neutral-800 [font-variation-settings:'GEOM'_35]",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
      regular: "font-normal",
      semibold: "font-semibold",
    },
  },
});

type TextElement =
  | "a"
  | "button"
  | "em"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "p"
  | "span"
  | "strong";

type TextProps<T extends TextElement = "span"> = PropsWithClassName<ComponentPropsWithoutRef<T>> &
  VariantProps<typeof variants> & {
    as?: T;
  };

export function Text<T extends TextElement = "span">({
  as,
  variant = "body",
  weight,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? "span") as ElementType;

  return <Component className={variants({ className, variant, weight })} {...props} />;
}
