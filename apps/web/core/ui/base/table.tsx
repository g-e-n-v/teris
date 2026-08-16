import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export type TableVariant = "default" | "card";

export type TableProps = ComponentProps<"table"> & {
  variant?: TableVariant;
};

export function Table({ className, variant = "default", ...props }: TableProps) {
  return (
    <div
      className="relative w-full overflow-x-auto"
      data-slot="table-container"
      data-variant={variant}
    >
      <table
        className={cn(
          "w-full caption-bottom text-sm in-data-[variant=card]:border-separate in-data-[variant=card]:border-spacing-0",
          className
        )}
        data-slot="table"
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      className={cn("[&_tr]:border-b [&_tr]:border-neutral-200", className)}
      data-slot="table-header"
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn(
        "relative before:pointer-events-none before:absolute before:inset-px before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_var(--color-black)]/4 not-in-data-[variant=card]:before:hidden in-data-[variant=card]:rounded-xl in-data-[variant=card]:shadow-xs/5 [&_tr:last-child]:border-0 in-data-[variant=card]:*:[tr]:border-0 in-data-[variant=card]:*:[tr]:*:[td]:border-b in-data-[variant=card]:*:[tr]:*:[td]:border-neutral-200 in-data-[variant=card]:*:[tr]:*:[td]:bg-white in-data-[variant=card]:*:[tr]:first:*:[td]:first:rounded-ss-xl in-data-[variant=card]:*:[tr]:*:[td]:first:border-s in-data-[variant=card]:*:[tr]:first:*:[td]:border-t in-data-[variant=card]:*:[tr]:last:*:[td]:last:rounded-ee-xl in-data-[variant=card]:*:[tr]:*:[td]:last:border-e in-data-[variant=card]:*:[tr]:first:*:[td]:last:rounded-se-xl in-data-[variant=card]:*:[tr]:last:*:[td]:first:rounded-es-xl in-data-[variant=card]:*:[tr]:hover:*:[td]:bg-neutral-50 in-data-[variant=card]:*:[tr]:data-[state=selected]:*:[td]:bg-neutral-100",
        className
      )}
      data-slot="table-body"
      {...props}
    />
  );
}

export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-t border-neutral-200 bg-transparent font-medium not-in-data-[variant=card]:bg-black/2 in-data-[variant=card]:border-none [&>tr]:last:border-b-0",
        className
      )}
      data-slot="table-footer"
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "relative border-b border-neutral-200 hover:not-in-data-[variant=card]:bg-black/2 not-in-data-[variant=card]:data-[state=selected]:bg-black/4",
        className
      )}
      data-slot="table-row"
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-10 px-2.5 text-left align-middle leading-none font-medium whitespace-nowrap text-neutral-500 has-[[role=checkbox]]:w-px first:has-[[role=checkbox]]:pe-0 last:has-[[role=checkbox]]:ps-0",
        className
      )}
      data-slot="table-head"
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "bg-clip-padding p-2.5 align-middle leading-none whitespace-nowrap in-data-[slot=table-footer]:py-3.5 first:in-data-[variant=card]:ps-[calc(--spacing(2.5)-1px)] last:in-data-[variant=card]:pe-[calc(--spacing(2.5)-1px)] has-[[role=checkbox]]:w-px first:has-[[role=checkbox]]:pe-0 last:has-[[role=checkbox]]:ps-0",
        className
      )}
      data-slot="table-cell"
      {...props}
    />
  );
}

export function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption
      className={cn("mt-4 text-sm text-neutral-500 in-data-[variant=card]:my-4", className)}
      data-slot="table-caption"
      {...props}
    />
  );
}
