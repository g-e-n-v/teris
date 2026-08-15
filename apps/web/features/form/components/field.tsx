import type { PropsWithChildren } from "react";

import { Icon } from "@iconify/react";

import { Field, FieldError, FieldLabel } from "$/core/ui";

type FormFieldProps = PropsWithChildren<{
  label?: string;
  required?: boolean;
  meta?: { isTouched?: boolean; errors?: ({ message?: string } | undefined)[] };
}>;

export function FormField({ label, meta, required, children }: FormFieldProps) {
  const shouldShowError = meta?.isTouched && !!meta.errors?.length;
  const errorMessage = meta?.errors?.map((e) => e?.message ?? "").join(", ");

  return (
    <Field invalid={shouldShowError}>
      {label && (
        <FieldLabel className="gap-1">
          {label}
          {required && (
            <Icon icon="mingcute:asterisk-fill" className="size-2 -translate-y-1 text-error-500" />
          )}
        </FieldLabel>
      )}

      {children}

      <FieldError match={shouldShowError}>{errorMessage}</FieldError>
    </Field>
  );
}
