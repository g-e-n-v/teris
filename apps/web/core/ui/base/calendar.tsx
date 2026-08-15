import type {
  ChevronProps,
  ClassNames,
  CustomComponents,
  DayPickerProps,
  RootProps,
} from "@daypicker/react";

import dayjs from "dayjs";

import { DayFlag, DayPicker, SelectionState, UI } from "@daypicker/react";
import { Icon } from "@iconify/react";
import { cn } from "tailwind-variants";

const buttonClassNames =
  "relative flex size-(--cell-size) items-center justify-center rounded-lg text-base text-neutral-900 sm:text-sm not-in-data-selected:hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 sm:[&_svg:not([class*='size-'])]:size-4";

const dayButtonClassNames = [
  buttonClassNames,
  "in-data-disabled:pointer-events-none",
  "in-data-disabled:line-through",
  "in-data-disabled:text-neutral-500/72",
  "in-data-outside:text-neutral-500/72",
  "in-data-selected:bg-brand-500",
  "in-data-selected:text-white",
  "in-data-selected:in-data-outside:text-white",
  "in-[.range-end:not(.range-start)]:rounded-s-none",
  "in-[.range-middle]:rounded-none",
  "in-[.range-middle]:in-data-selected:bg-neutral-100",
  "in-[.range-middle]:in-data-selected:text-neutral-900",
  "in-[.range-start:not(.range-end)]:rounded-e-none",
  "outline-none",
  "focus-visible:z-1",
  "focus-visible:ring-[3px]",
  "focus-visible:ring-brand-500/50",
  "in-[[data-selected]:not(.range-middle)]:transition-[border-radius,box-shadow]",
].join(" ");

const DEFAULT_CLASS_NAMES = [
  [UI.NextMonthButton, buttonClassNames],
  [UI.PreviousMonthButton, buttonClassNames],
  [UI.CaptionLabel, "flex h-full items-center gap-2 text-base font-medium sm:text-sm"],
  [UI.Day, "size-(--cell-size) py-px text-sm"],
  [UI.DayButton, dayButtonClassNames],
  [UI.Dropdown, "absolute inset-0 bg-white opacity-0"],
  [
    UI.DropdownRoot,
    "relative h-9 rounded-lg border border-neutral-200 px-[calc(--spacing(3)-1px)] shadow-xs/5 has-focus:border-brand-500 has-focus:ring-[3px] has-focus:ring-brand-500/50 sm:h-8 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 [&_svg]:pointer-events-none [&_svg]:-me-1 sm:[&_svg:not([class*='size-'])]:size-4",
  ],
  [
    UI.Dropdowns,
    "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-base sm:text-sm *:[span]:font-medium",
  ],
  [DayFlag.hidden, "invisible"],
  [UI.Month, "w-full"],
  [
    UI.MonthCaption,
    "relative z-2 mx-(--cell-size) mb-1 flex h-(--cell-size) items-center justify-center px-1",
  ],
  [UI.MonthGrid, "w-full border-collapse"],
  [UI.Months, "relative flex flex-col gap-2 sm:flex-row"],
  [UI.Nav, "absolute top-0 z-1 flex w-full justify-between"],
  [
    DayFlag.outside,
    "text-neutral-500 data-selected:bg-neutral-100/50 data-selected:text-neutral-500",
  ],
  [SelectionState.range_end, "range-end"],
  [SelectionState.range_middle, "range-middle"],
  [SelectionState.range_start, "range-start"],
  [
    DayFlag.today,
    "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-1 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-brand-500 [&[data-selected]:not(.range-middle)>*]:after:bg-white [&[data-disabled]>*]:after:bg-neutral-900/30",
  ],
  [UI.WeekNumber, "size-(--cell-size) p-0 text-xs font-medium text-neutral-500/72"],
  [UI.Weekday, "size-(--cell-size) p-0 text-xs font-medium text-neutral-500/72"],
] satisfies readonly (readonly [keyof ClassNames, string])[];

function Chevron({ className, orientation, style }: ChevronProps) {
  let icon = "solar:alt-arrow-down-linear";

  if (orientation === "left") {
    icon = "solar:alt-arrow-left-linear";
  } else if (orientation === "right") {
    icon = "solar:alt-arrow-right-linear";
  }

  return (
    <Icon
      aria-hidden="true"
      className={cn(
        className,
        (orientation === "left" || orientation === "right") && "rtl:rotate-180"
      )}
      icon={icon}
      style={style}
    />
  );
}

function CalendarRoot({ rootRef, ...props }: RootProps) {
  return <div data-slot="calendar" ref={rootRef} {...props} />;
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: DayPickerProps) {
  const mergedClassNames: Partial<ClassNames> = { ...classNames };

  for (const [slot, base] of DEFAULT_CLASS_NAMES) {
    mergedClassNames[slot] = cn(base, classNames?.[slot]) ?? base;
  }

  const mergedComponents: Partial<CustomComponents> = {
    Chevron,
    Root: CalendarRoot,
    ...userComponents,
  };

  return (
    <DayPicker
      className={cn("w-fit [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)]", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      formatters={{
        formatMonthDropdown: (date: Date) => dayjs(date).format("MMM"),
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}
