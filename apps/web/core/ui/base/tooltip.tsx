import type { ReactNode } from "react";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { tv } from "tailwind-variants";

const variants = tv({
  slots: {
    popup: [
      "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-md border border-neutral-200 bg-white bg-clip-padding px-2 py-1 text-sm text-balance text-neutral-900 shadow-md/5",
      "transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_var(--color-black)]/4",
      "data-ending-style:scale-98 data-ending-style:opacity-0 data-instant:duration-0 data-starting-style:scale-98 data-starting-style:opacity-0",
    ],
    positioner:
      "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
  },
});

type TooltipProps = {
  trigger: ReactNode;
  popup: ReactNode;
  classNames?: {
    popup?: string;
    positioner?: string;
  };
} & Pick<BaseTooltip.Positioner.Props, "align" | "side" | "sideOffset" | "anchor">;

export function Tooltip({
  trigger,
  popup,
  align = "center",
  sideOffset = 4,
  side = "top",
  anchor,
  classNames,
}: TooltipProps) {
  const v = variants();

  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger data-slot="tooltip-trigger">{trigger}</BaseTooltip.Trigger>

      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          align={align}
          anchor={anchor}
          className={v.positioner({ className: classNames?.positioner })}
          data-slot="tooltip-positioner"
          side={side}
          sideOffset={sideOffset}
        >
          <BaseTooltip.Popup
            className={v.popup({ className: classNames?.popup })}
            data-slot="tooltip-popup"
          >
            <BaseTooltip.Viewport className="" data-slot="tooltip-viewport">
              {popup}
            </BaseTooltip.Viewport>
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
