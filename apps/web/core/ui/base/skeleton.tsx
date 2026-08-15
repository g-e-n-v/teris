import { cn } from "tailwind-variants";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[--skeleton-highlight:--alpha(var(--color-white)/64%)]",
        "[background:linear-gradient(120deg,transparent_40%,var(--skeleton-highlight),transparent_60%)_var(--color-muted)_0_0/200%_100%_fixed]",
        "animate-skeleton rounded-sm",
        className
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}
