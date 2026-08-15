import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "tailwind-variants";

export function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root className={cn("flex flex-col items-start gap-2", className)} {...props} />
  );
}

export function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      className={cn(
        "inline-flex items-center gap-2 text-lg/4.5 font-medium text-neutral-900 data-disabled:opacity-50 sm:text-sm/4",
        className
      )}
      {...props}
    />
  );
}

export function FieldItem({ className, ...props }: FieldPrimitive.Item.Props) {
  return <FieldPrimitive.Item className={cn("flex", className)} {...props} />;
}

export function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description className={cn("text-sm text-neutral-500", className)} {...props} />
  );
}

export function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return <FieldPrimitive.Error className={cn("text-sm text-error-500", className)} {...props} />;
}

export const FieldControl = FieldPrimitive.Control;
export const FieldValidity = FieldPrimitive.Validity;
