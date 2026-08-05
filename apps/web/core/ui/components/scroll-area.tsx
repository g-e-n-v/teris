import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "tailwind-variants";

export function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: BaseScrollArea.Scrollbar.Props) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </BaseScrollArea.Scrollbar>
  );
}

export function ScrollArea({ className, children, ...props }: BaseScrollArea.Root.Props) {
  return (
    <BaseScrollArea.Root data-slot="scroll-area" className={cn("relative", className)} {...props}>
      <BaseScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </BaseScrollArea.Viewport>
      <ScrollBar />
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}
