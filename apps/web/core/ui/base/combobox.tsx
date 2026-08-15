import type { ReactNode, Ref, RefObject } from "react";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Icon } from "@iconify/react";
import { isString } from "lodash-es";
import { createContext, useContext, useRef } from "react";
import { cn, tv } from "tailwind-variants";

import { ScrollArea } from "./scroll-area";

type ComboboxSize = "sm" | "default" | "lg";

const ComboboxContext = createContext<RefObject<HTMLDivElement | null>>({
  current: null,
});

export const variants = tv({
  compoundSlots: [
    { class: "ps-7", size: "sm", slots: ["input"], startAddon: true },
    { class: "pe-7", endAction: true, size: "sm", slots: ["input"] },
  ],
  defaultVariants: { size: "default" },
  slots: {
    actionButton: [
      "absolute top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 transition-opacity outline-none hover:opacity-100",
      "has-[+[data-slot=combobox-clear]]:hidden",
      "pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
      "sm:size-7",
    ],
    chipsInput:
      "min-w-12 flex-1 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-sm [[data-slot=combobox-chip]+&]:ps-0.5",
    icon: "size-4.5 sm:size-4",
    input: [
      "w-full rounded-lg border border-neutral-200 bg-white bg-clip-padding text-base text-neutral-900 shadow-xs/5 transition-all outline-none",
      "placeholder:text-neutral-400",
      "focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-500/24",
      "aria-invalid:border-error-400 focus-visible:aria-invalid:border-error-500 focus-visible:aria-invalid:ring-error-500/16",
      "disabled:pointer-events-none disabled:bg-neutral-50",
      "sm:text-sm",
    ],
    inputStartAddon:
      "pointer-events-none absolute inset-y-0 inset-s-0 z-10 flex items-center opacity-80",
  },
  variants: {
    endAction: { true: { input: "pe-8" } },
    size: {
      default: {
        actionButton: "inset-e-0.5",
        chipsInput: "ps-2",
        input: "h-9 ps-3 sm:h-8",
        inputStartAddon: "ps-2.5",
      },
      lg: {
        actionButton: "inset-e-0.5",
        chipsInput: "ps-2",
        input: "h-10 ps-3 sm:h-9",
        inputStartAddon: "ps-2.5",
      },
      sm: {
        actionButton: "inset-e-0",
        chipsInput: "ps-1.5",
        input: "h-8 ps-2.5 sm:h-7",
        inputStartAddon: "ps-2",
      },
    },
    startAddon: { true: { input: "ps-9" } },
  },
});

export function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxPrimitive.Root.Props<Value, Multiple>
) {
  const chipsRef = useRef<HTMLDivElement | null>(null);

  return (
    <ComboboxContext.Provider value={chipsRef}>
      <ComboboxPrimitive.Root {...props} />
    </ComboboxContext.Provider>
  );
}

type ComboboxChipsInputProps = PropsWithClassName<Omit<ComboboxPrimitive.Input.Props, "size">> & {
  size?: ComboboxSize | number;
  ref?: Ref<HTMLInputElement>;
};

export function ComboboxChipsInput({ className, size, ...props }: ComboboxChipsInputProps) {
  const v = variants({ size: isString(size) ? size : undefined });

  return (
    <ComboboxPrimitive.Input
      className={v.chipsInput({ className })}
      data-size={isString(size) ? size : undefined}
      data-slot="combobox-chips-input"
      size={typeof size === "number" ? size : undefined}
      {...props}
    />
  );
}

export function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger className={className} data-slot="combobox-trigger" {...props}>
      {children}
    </ComboboxPrimitive.Trigger>
  );
}

export function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return <ComboboxPrimitive.Clear className={className} data-slot="combobox-clear" {...props} />;
}

type ComboboxInputProps = PropsWithClassName<Omit<ComboboxPrimitive.Input.Props, "size">> & {
  showTrigger?: boolean;
  showClear?: boolean;
  startAddon?: ReactNode;
  size?: ComboboxSize | number;
  ref?: Ref<HTMLInputElement>;
  triggerProps?: ComboboxPrimitive.Trigger.Props;
  clearProps?: ComboboxPrimitive.Clear.Props;
};

export function ComboboxInput({
  className,
  showTrigger = true,
  showClear = false,
  startAddon,
  size,
  triggerProps,
  clearProps,
  ...props
}: ComboboxInputProps) {
  const v = variants({
    endAction: showTrigger || showClear,
    size: isString(size) ? size : undefined,
    startAddon: Boolean(startAddon),
  });

  return (
    <ComboboxPrimitive.InputGroup
      className="relative w-full text-neutral-900 has-disabled:opacity-64"
      data-slot="combobox-input-group"
    >
      {startAddon && (
        <div aria-hidden="true" className={v.inputStartAddon()} data-slot="combobox-start-addon">
          {isString(startAddon) ? <Icon className={v.icon()} icon={startAddon} /> : startAddon}
        </div>
      )}
      <ComboboxPrimitive.Input
        className={v.input({ className })}
        data-size={isString(size) ? size : undefined}
        data-slot="combobox-input"
        size={typeof size === "number" ? size : undefined}
        {...props}
      />
      {showTrigger && (
        <ComboboxTrigger
          {...triggerProps}
          className={v.actionButton({
            className: isString(triggerProps?.className) ? triggerProps.className : undefined,
          })}
        >
          <ComboboxPrimitive.Icon data-slot="combobox-icon">
            <Icon aria-hidden="true" className={v.icon()} icon="ph:caret-up-down-bold" />
          </ComboboxPrimitive.Icon>
        </ComboboxTrigger>
      )}
      {showClear && (
        <ComboboxClear
          {...clearProps}
          className={v.actionButton({
            className: isString(clearProps?.className) ? clearProps.className : undefined,
          })}
        >
          <Icon aria-hidden="true" className={v.icon()} icon="mingcute:close-line" />
        </ComboboxClear>
      )}
    </ComboboxPrimitive.InputGroup>
  );
}

type ComboboxPopupProps = PropsWithClassName<ComboboxPrimitive.Popup.Props> & {
  side?: ComboboxPrimitive.Positioner.Props["side"];
  align?: ComboboxPrimitive.Positioner.Props["align"];
  sideOffset?: ComboboxPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ComboboxPrimitive.Positioner.Props["alignOffset"];
  anchor?: ComboboxPrimitive.Positioner.Props["anchor"];
  portalProps?: ComboboxPrimitive.Portal.Props;
};

export function ComboboxPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset,
  anchor: anchorProp,
  portalProps,
  ...props
}: ComboboxPopupProps) {
  const chipsRef = useContext(ComboboxContext);
  const anchor = anchorProp ?? chipsRef;

  return (
    <ComboboxPrimitive.Portal {...portalProps}>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50 select-none"
        data-slot="combobox-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <span
          className={cn(
            "relative flex max-h-full max-w-(--available-width) min-w-(--anchor-width) origin-(--transform-origin) rounded-lg border border-neutral-200 bg-white bg-clip-padding shadow-lg/5 transition-[scale,opacity]",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_var(--color-black)]/4",
            className
          )}
        >
          <ComboboxPrimitive.Popup
            className="flex max-h-[min(var(--available-height),23rem)] flex-1 flex-col text-neutral-900 outline-none"
            data-slot="combobox-popup"
            {...props}
          >
            {children}
          </ComboboxPrimitive.Popup>
        </span>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxItem({
  className,
  children,
  ...props
}: PropsWithClassName<ComboboxPrimitive.Item.Props>) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none",
        "in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)]",
        "data-disabled:pointer-events-none data-disabled:opacity-64 data-highlighted:bg-neutral-100 data-highlighted:text-neutral-900",
        "sm:min-h-7 sm:text-sm",
        className
      )}
      data-slot="combobox-item"
      {...props}
    >
      <ComboboxPrimitive.ItemIndicator className="col-start-1">
        <Icon aria-hidden="true" icon="mingcute:check-line" />
      </ComboboxPrimitive.ItemIndicator>
      <div className="col-start-2 min-w-0">{children}</div>
    </ComboboxPrimitive.Item>
  );
}

export function ComboboxSeparator({
  className,
  ...props
}: PropsWithClassName<ComboboxPrimitive.Separator.Props>) {
  return (
    <ComboboxPrimitive.Separator
      className={cn("mx-2 my-1 h-px bg-neutral-200 last:hidden", className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
}

export function ComboboxGroup({
  className,
  ...props
}: PropsWithClassName<ComboboxPrimitive.Group.Props>) {
  return (
    <ComboboxPrimitive.Group
      className={cn("[[role=group]+&]:mt-1.5", className)}
      data-slot="combobox-group"
      {...props}
    />
  );
}

export function ComboboxGroupLabel({
  className,
  ...props
}: PropsWithClassName<ComboboxPrimitive.GroupLabel.Props>) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-medium text-neutral-500", className)}
      data-slot="combobox-group-label"
      {...props}
    />
  );
}

export function ComboboxEmpty({
  className,
  ...props
}: PropsWithClassName<ComboboxPrimitive.Empty.Props>) {
  return (
    <ComboboxPrimitive.Empty
      className={cn("text-center text-base text-neutral-500 not-empty:p-2 sm:text-sm", className)}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

export function ComboboxRow({ className, ...props }: ComboboxPrimitive.Row.Props) {
  return <ComboboxPrimitive.Row className={className} data-slot="combobox-row" {...props} />;
}

export function ComboboxStatus({
  className,
  ...props
}: PropsWithClassName<ComboboxPrimitive.Status.Props>) {
  return (
    <ComboboxPrimitive.Status
      className={cn(
        "px-3 py-2 text-xs font-medium text-neutral-500 empty:m-0 empty:p-0",
        className
      )}
      data-slot="combobox-status"
      {...props}
    />
  );
}

export function ComboboxList({
  className,
  ...props
}: PropsWithClassName<ComboboxPrimitive.List.Props>) {
  return (
    <ScrollArea overscrollContain scrollFade scrollbarGutter>
      <ComboboxPrimitive.List
        className={cn(
          "not-empty:scroll-py-1 not-empty:px-1 not-empty:py-1 in-data-has-overflow-y:pe-3",
          className
        )}
        data-slot="combobox-list"
        {...props}
      />
    </ScrollArea>
  );
}

export function ComboboxChipRemove({ className, ...props }: ComboboxPrimitive.ChipRemove.Props) {
  return (
    <ComboboxPrimitive.ChipRemove
      aria-label="Remove"
      className={cn(
        "h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100",
        className
      )}
      data-slot="combobox-chip-remove"
      {...props}
    >
      <Icon aria-hidden="true" className="size-4" icon="mingcute:close-line" />
    </ComboboxPrimitive.ChipRemove>
  );
}

type ComboboxChipProps = PropsWithClassName<ComboboxPrimitive.Chip.Props> & {
  removeProps?: ComboboxPrimitive.ChipRemove.Props;
};

export function ComboboxChip({ children, removeProps, ...props }: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      className="flex items-center rounded-[calc(var(--radius-md)-1px)] bg-neutral-100 ps-2 text-sm font-medium text-neutral-900 outline-none"
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      <ComboboxChipRemove {...removeProps} />
    </ComboboxPrimitive.Chip>
  );
}

type ComboboxChipsProps = PropsWithClassName<ComboboxPrimitive.Chips.Props> & {
  startAddon?: ReactNode;
};

export function ComboboxChips({ className, children, startAddon, ...props }: ComboboxChipsProps) {
  const chipsRef = useContext(ComboboxContext);
  const v = variants();

  return (
    <ComboboxPrimitive.Chips
      className={cn(
        "relative inline-flex min-h-9 w-full flex-wrap gap-1 rounded-lg border border-neutral-200 bg-white bg-clip-padding p-[calc(--spacing(1)-1px)] text-base text-neutral-900 shadow-xs/5 transition-shadow outline-none *:min-h-7",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_var(--color-black)]/4",
        "focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/24",
        "has-aria-invalid:border-error-400 focus-within:has-aria-invalid:border-error-500 focus-within:has-aria-invalid:ring-error-500/16",
        "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:bg-neutral-50 has-disabled:opacity-64",
        "has-data-[size=lg]:min-h-10 has-data-[size=lg]:*:min-h-8 has-data-[size=sm]:min-h-8 has-data-[size=sm]:*:min-h-6",
        "sm:min-h-8 sm:text-sm sm:*:min-h-6 sm:has-data-[size=lg]:min-h-9 sm:has-data-[size=lg]:*:min-h-7 sm:has-data-[size=sm]:min-h-7 sm:has-data-[size=sm]:*:min-h-5",
        className
      )}
      data-slot="combobox-chips"
      ref={chipsRef}
      {...props}
    >
      {startAddon && (
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center ps-2 opacity-80 has-[+[data-slot=combobox-chip]]:pe-2 has-[~[data-size=sm]]:ps-1.5"
          data-slot="combobox-start-addon"
        >
          {isString(startAddon) ? <Icon className={v.icon()} icon={startAddon} /> : startAddon}
        </div>
      )}
      {children}
    </ComboboxPrimitive.Chips>
  );
}

export const ComboboxValue: typeof ComboboxPrimitive.Value = ComboboxPrimitive.Value;
export const ComboboxCollection: typeof ComboboxPrimitive.Collection = ComboboxPrimitive.Collection;
export const useComboboxFilter: typeof ComboboxPrimitive.useFilter = ComboboxPrimitive.useFilter;
