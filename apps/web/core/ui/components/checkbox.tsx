import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";

import { Checkbox as BaseCheckbox } from "@base-ui/react";
import { tv } from "tailwind-variants";

export const variants = tv({
  slots: {
    indicator:
      "absolute -inset-px flex items-center justify-center rounded-[calc(var(--radius-lg)-3px)] text-white data-checked:bg-brand-500 data-indeterminate:text-neutral-900 data-unchecked:hidden",
    root: [
      "relative inline-flex size-4.5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-neutral-300 bg-white transition-shadow outline-none",
      "shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-3px)]",
      "not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_var(--color-black)]/4",
      "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-25",
      "aria-invalid:border-error-500/36 focus-visible:aria-invalid:border-error-500/64 focus-visible:aria-invalid:ring-error-500/48",
      "data-checked:border-brand-500 data-disabled:cursor-not-allowed data-disabled:opacity-50",
    ],
  },
});

type CheckboxProps = Omit<BaseCheckbox.Root.Props, "className"> &
  VariantProps<typeof variants> & { className?: string };

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.252 12h13.496" />
    </svg>
  );
}

function renderIndicator(props: ComponentProps<"span">, state: BaseCheckbox.Indicator.State) {
  return <span {...props}>{state.indeterminate ? <MinusIcon /> : <CheckIcon />}</span>;
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  const v = variants();

  return (
    <BaseCheckbox.Root className={v.root({ className })} {...props}>
      <BaseCheckbox.Indicator className={v.indicator()} render={renderIndicator} />
    </BaseCheckbox.Root>
  );
}
