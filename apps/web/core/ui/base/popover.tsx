import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";

export const Popover = PopoverPrimitive.Root;
export const PopoverCreateHandle = PopoverPrimitive.createHandle;

type PopoverPopupProps = PopoverPrimitive.Popup.Props & {
  portalProps?: PopoverPrimitive.Portal.Props;
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  tooltipStyle?: boolean;
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
};

export function PopoverTrigger({ className, ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger className={className} data-slot="popover-trigger" {...props} />;
}

export function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  tooltipStyle = false,
  anchor,
  portalProps,
  ...props
}: PopoverPopupProps) {
  return (
    <PopoverPrimitive.Portal {...portalProps}>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none"
        data-slot="popover-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(
            "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-lg border border-neutral-200 bg-white bg-clip-padding text-neutral-900 shadow-lg/5 transition-[width,height,scale,opacity] outline-none",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_var(--color-black)]/4",
            "data-starting-style:scale-98 data-starting-style:opacity-0",
            tooltipStyle &&
              "w-fit rounded-md text-xs text-balance shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]",
            className
          )}
          data-slot="popover-popup"
          {...props}
        >
          <PopoverPrimitive.Viewport
            className={cn(
              "relative size-full max-h-(--available-height) overflow-clip py-4",
              tooltipStyle ? "px-2 py-1" : "px-4 not-data-transitioning:overflow-y-auto"
            )}
            data-slot="popover-viewport"
          >
            {children}
          </PopoverPrimitive.Viewport>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverClose(props: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      className={cn("font-heading text-lg leading-none font-semibold", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

export function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      className={cn("text-sm text-neutral-500", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}
