import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react";
import { cn } from "tailwind-variants";

type CheckboxGroupProps = PropsWithClassName<BaseCheckboxGroup.Props>;

export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup className={cn("flex flex-col items-start gap-3", className)} {...props} />
  );
}
