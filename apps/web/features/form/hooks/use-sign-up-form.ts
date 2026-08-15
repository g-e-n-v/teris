import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { auth } from "$/core/auth";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function useSignUpForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    } satisfies FormSignUpValues,
    onSubmit: async ({ value }) => {
      const { error } = await auth.signUp.email(value);

      if (error) {
        throw error;
      }

      await navigate({ to: "/dashboard" });
    },
    validators: {
      onChange: signUpSchema,
    },
  });

  return form;
}

export type FormSignUpValues = z.infer<typeof signUpSchema>;
export type FormSignUp = ReturnType<typeof useSignUpForm>;
