import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { auth } from "$/core/auth";

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export function useSignInForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies FormSignInValues,
    onSubmit: async ({ value }) => {
      const { error } = await auth.signIn.email({
        ...value,
        rememberMe: true,
      });

      if (error) {
        return { fields: { email: error.message } };
      }

      await navigate({ to: "/dashboard" });
    },
    validators: {
      onChange: signInSchema,
    },
  });

  return form;
}

export type FormSignInValues = z.infer<typeof signInSchema>;
export type FormSignIn = ReturnType<typeof useSignInForm>;
