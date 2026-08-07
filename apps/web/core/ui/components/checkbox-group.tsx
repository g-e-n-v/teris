import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react";
import { cn } from "tailwind-variants";

export { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react";

type CheckboxGroupProps = Omit<BaseCheckboxGroup.Props, "className"> & {
  className?: string;
};

export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup className={cn("flex flex-col items-start gap-3", className)} {...props} />
  );
}
