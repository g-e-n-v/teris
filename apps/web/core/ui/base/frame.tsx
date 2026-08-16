import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export function Frame({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl bg-neutral-100/72 p-1",
        "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-1",
        className
      )}
      data-slot="frame"
      {...props}
    />
  );
}

export function FramePanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-neutral-200 bg-white bg-clip-padding p-5 shadow-xs/5",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_oklch(0%_0_0/0.04)]",
        className
      )}
      data-slot="frame-panel"
      {...props}
    />
  );
}

export function FrameHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn("flex flex-col px-5 py-4", className)}
      data-slot="frame-panel-header"
      {...props}
    />
  );
}

export function FrameTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm font-semibold", className)}
      data-slot="frame-panel-title"
      {...props}
    />
  );
}

export function FrameDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-neutral-500", className)}
      data-slot="frame-panel-description"
      {...props}
    />
  );
}

export function FrameFooter({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={cn("px-5 py-4", className)} data-slot="frame-panel-footer" {...props} />
  );
}
