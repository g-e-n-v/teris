import type { ReactElement } from "react";
import type { VariantProps } from "tailwind-variants";

import { Input as BaseInput } from "@base-ui/react";
import { Icon } from "@iconify/react";
import { isString } from "lodash-es";
import { cn, tv } from "tailwind-variants";

export const variants = tv({
  defaultVariants: {
    size: "md",
    unstyled: false,
  },
  slots: {
    icon: "size-4 shrink-0 text-neutral-400",
    input: [
      "h-full min-w-0 flex-1 rounded-[calc(var(--radius-lg)-1px)] bg-transparent outline-none placeholder:text-neutral-400",
      // Overwrite Chrome's native autofill color so it matches the root background
      "autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_var(--input-autofill-bg)]",
      "file:me-2 file:h-full file:border-0 file:bg-transparent file:font-medium file:text-neutral-900",
    ],
    root: [
      "[--input-autofill-bg:var(--color-neutral-50)]",

      "relative flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2 text-neutral-900 transition-all",
      "shadow-xs/5",

      // Autofill: fill the entire root with a soft neutral background
      "has-autofill:bg-(--input-autofill-bg)",

      // Focus: colored border + soft ring
      "has-focus-visible:border-brand-400 has-focus-visible:ring-2 has-focus-visible:ring-brand-500/24",

      // Invalid: solid error border, error ring on focus
      "has-aria-invalid:border-error-400",
      "has-aria-invalid:has-focus-visible:border-error-500 has-aria-invalid:has-focus-visible:ring-error-500/16",

      "has-disabled:cursor-not-allowed has-disabled:bg-neutral-50 has-disabled:opacity-50",
    ],
  },
  variants: {
    size: {
      lg: { root: "h-9 text-base" },
      md: { root: "h-8 text-base" },
      sm: { root: "h-7 text-sm" },
    },
    unstyled: {
      false: {},
      true: {
        root: "border-transparent bg-transparent shadow-none has-focus-visible:border-brand-400 has-focus-visible:ring-2 has-focus-visible:ring-brand-500/24 has-aria-invalid:border-error-400 has-aria-invalid:has-focus-visible:border-error-500",
      },
    },
  },
});

type InputProps = Omit<BaseInput.Props, "className" | "size"> &
  VariantProps<typeof variants> & {
    className?: string;
    prefix?: string | ReactElement;
    suffix?: string | ReactElement;
  };

export function Input({ className, size, unstyled, prefix, suffix, type, ...props }: InputProps) {
  const v = variants({ size, unstyled });

  return (
    <div
      className={v.root({ className: cn(className, type === "file" && "text-neutral-500") })}
      data-size={size}
    >
      {isString(prefix) ? <Icon className={v.icon()} icon={prefix} /> : prefix}
      <BaseInput className={v.input()} type={type} {...props} />
      {isString(suffix) ? <Icon className={v.icon()} icon={suffix} /> : suffix}
    </div>
  );
}
