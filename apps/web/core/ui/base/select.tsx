import type { VariantProps } from "tailwind-variants";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Icon } from "@iconify/react";
import { cn, tv } from "tailwind-variants";

export const variants = tv({
  slots: {
    icon: "-me-1 size-4.5 opacity-80 sm:size-4",
    trigger: [
      "relative inline-flex min-h-9 w-full min-w-36 cursor-default items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white bg-clip-padding px-[calc(--spacing(3)-1px)] text-left text-base text-neutral-900 shadow-xs/5 transition-shadow outline-none select-none",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_var(--color-black)]/4",
      "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11",
      "focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-500/24",
      "aria-invalid:border-error-400 focus-visible:aria-invalid:border-error-500 focus-visible:aria-invalid:ring-error-500/16",
      "data-disabled:pointer-events-none data-disabled:opacity-64",
      "sm:min-h-8 sm:text-sm",
      "[&_svg:not([class*='opacity-'])]:opacity-80",
    ],
  },
  variants: {
    size: {
      lg: { trigger: "min-h-10 sm:min-h-9" },
      sm: { trigger: "min-h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:min-h-7" },
    },
  },
});

export const Select: typeof SelectPrimitive.Root = SelectPrimitive.Root;

export function SelectTrigger({
  className,
  size,
  children,
  ...props
}: PropsWithClassName<SelectPrimitive.Trigger.Props> & VariantProps<typeof variants>) {
  const v = variants({ size });

  return (
    <SelectPrimitive.Trigger
      className={v.trigger({ className })}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-slot="select-icon">
        <Icon aria-hidden="true" className={v.icon()} icon="ph:caret-up-down-bold" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectValue({
  className,
  ...props
}: PropsWithClassName<SelectPrimitive.Value.Props>) {
  return (
    <SelectPrimitive.Value
      className={cn("flex-1 truncate data-placeholder:text-neutral-400", className)}
      data-slot="select-value"
      {...props}
    />
  );
}

type SelectPopupProps = SelectPrimitive.Popup.Props & {
  side?: SelectPrimitive.Positioner.Props["side"];
  align?: SelectPrimitive.Positioner.Props["align"];
  sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: SelectPrimitive.Positioner.Props["alignOffset"];
  alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
};

export function SelectPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPopupProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        className="z-50 select-none"
        data-slot="select-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className="origin-(--transform-origin) text-neutral-900 outline-none"
          data-slot="select-popup"
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow
            className="top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-white before:from-50%"
            data-slot="select-scroll-up-arrow"
          >
            <Icon
              aria-hidden="true"
              className="relative size-4.5 sm:size-4"
              icon="solar:alt-arrow-up-linear"
            />
          </SelectPrimitive.ScrollUpArrow>
          <div className="relative h-full min-w-(--anchor-width) rounded-lg border border-neutral-200 bg-white bg-clip-padding shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_var(--color-black)]/4">
            <SelectPrimitive.List
              className={cn("max-h-(--available-height) overflow-y-auto p-1", className)}
              data-slot="select-list"
            >
              {children}
            </SelectPrimitive.List>
          </div>
          <SelectPrimitive.ScrollDownArrow
            className="bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-white before:from-50%"
            data-slot="select-scroll-down-arrow"
          >
            <Icon
              aria-hidden="true"
              className="relative size-4.5 sm:size-4"
              icon="solar:alt-arrow-down-linear"
            />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: PropsWithClassName<SelectPrimitive.Item.Props>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] data-disabled:pointer-events-none data-disabled:opacity-64 data-highlighted:bg-neutral-100 data-highlighted:text-neutral-900 sm:min-h-7 sm:text-sm",
        className
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="col-start-1">
        <Icon aria-hidden="true" icon="mingcute:check-line" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="col-start-2 min-w-0">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  className,
  ...props
}: PropsWithClassName<SelectPrimitive.Separator.Props>) {
  return (
    <SelectPrimitive.Separator
      className={cn("mx-2 my-1 h-px bg-neutral-200", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

export function SelectGroup(props: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectLabel({
  className,
  ...props
}: PropsWithClassName<SelectPrimitive.Label.Props>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "mb-2 inline-flex cursor-default items-center gap-2 text-base/4.5 font-medium text-neutral-900 sm:text-sm/4",
        className
      )}
      data-slot="select-label"
      {...props}
    />
  );
}

export function SelectGroupLabel({
  className,
  ...props
}: PropsWithClassName<SelectPrimitive.GroupLabel.Props>) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-medium text-neutral-500", className)}
      data-slot="select-group-label"
      {...props}
    />
  );
}
