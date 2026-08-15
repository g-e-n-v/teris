import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border border-neutral-200 bg-white bg-clip-padding text-neutral-900 shadow-xs/5",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_oklch(0%_0_0/0.04)]",
        className
      )}
      data-slot="card"
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-5 in-[[data-slot=card]:has(>[data-slot=card-panel])]:pb-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      data-slot="card-header"
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("font-heading text-lg leading-none font-semibold", className)}
      data-slot="card-title"
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-neutral-500", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 inline-flex self-start justify-self-end",
        className
      )}
      data-slot="card-action"
      {...props}
    />
  );
}

export function CardPanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex-1 p-5 in-[[data-slot=card]:has(>[data-slot=card-footer]:not(.border-t))]:pb-0 in-[[data-slot=card]:has(>[data-slot=card-header]:not(.border-b))]:pt-0",
        className
      )}
      data-slot="card-panel"
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center p-5 in-[[data-slot=card]:has(>[data-slot=card-panel])]:pt-4",
        className
      )}
      data-slot="card-footer"
      {...props}
    />
  );
}

export function CardFrame({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border border-neutral-200 bg-white bg-clip-padding text-neutral-900 shadow-xs/5 [--clip-bottom:-1rem] [--clip-top:-1rem]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-neutral-100/72 before:shadow-[0_1px_oklch(0%_0_0/0.04)]",
        "has-data-[slot=table-container]:overflow-hidden",
        "*:data-[slot=card]:-m-px *:data-[slot=card]:bg-clip-padding *:data-[slot=card]:shadow-none *:data-[slot=card]:before:hidden",
        "*:data-[slot=card]:[clip-path:inset(var(--clip-top)_1px_var(--clip-bottom)_1px_round_calc(var(--radius-2xl)-1px))]",
        "*:first:data-[slot=card]:[--clip-top:1px] *:last:data-[slot=card]:[--clip-bottom:1px]",
        "*:not-first:data-[slot=card]:rounded-t-xl *:not-last:data-[slot=card]:rounded-b-xl",
        "*:not-first:data-[slot=card]:before:rounded-t-[calc(var(--radius-xl)-1px)] *:not-last:data-[slot=card]:before:rounded-b-[calc(var(--radius-xl)-1px)]",
        className
      )}
      data-slot="card-frame"
      {...props}
    />
  );
}

export function CardFrameHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative grid auto-rows-min grid-rows-[auto_auto] items-start gap-x-4 px-6 py-4 has-data-[slot=card-frame-action]:grid-cols-[1fr_auto]",
        className
      )}
      data-slot="card-frame-header"
      {...props}
    />
  );
}

export function CardFrameTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("self-center text-sm font-semibold", className)}
      data-slot="card-frame-title"
      {...props}
    />
  );
}

export function CardFrameDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("self-center text-sm text-neutral-500", className)}
      data-slot="card-frame-description"
      {...props}
    />
  );
}

export function CardFrameAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 inline-flex self-center justify-self-end nth-[3]:row-span-2 nth-[3]:row-start-1",
        className
      )}
      data-slot="card-frame-action"
      {...props}
    />
  );
}

export function CardFrameFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-6 py-4", className)} data-slot="card-frame-footer" {...props} />;
}

export { CardPanel as CardContent };
