import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

export const variants = tv({
  base: "text-neutral-900",
  defaultVariants: {
    variant: "body",
  },
  variants: {
    variant: {
      body: "text-lg leading-6 font-medium tracking-[-0.01em]",
      caption: "text-sm leading-5 font-medium tracking-[0.01em] text-neutral-500",
      display: "text-5xl leading-10 font-bold tracking-[-0.03em]",
      headline: "text-4xl leading-8 font-bold tracking-tight",
      label: "text-base leading-5 font-semibold tracking-[0.01em] uppercase",
      title: "text-2xl leading-7 font-semibold tracking-[-0.02em]",
    },
  },
});

const ELEMENT_MAP = {
  body: "p",
  caption: "span",
  display: "h1",
  headline: "h2",
  label: "label",
  title: "h3",
} as const;

type TextProps<T extends keyof React.JSX.IntrinsicElements = "p"> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "className"
> &
  VariantProps<typeof variants> & {
    as?: T;
    className?: string;
  };

export function Text<T extends keyof React.JSX.IntrinsicElements>({
  as,
  className,
  variant,
  ...props
}: TextProps<T>) {
  const Element = (as ?? ELEMENT_MAP[variant ?? "body"]) as React.ElementType;

  return <Element className={variants({ className, variant })} {...props} />;
}
