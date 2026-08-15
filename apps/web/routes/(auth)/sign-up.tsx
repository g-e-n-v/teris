import { createFileRoute } from "@tanstack/react-router";
import { get } from "lodash-es";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Text,
  Toast,
  ToastProvider,
} from "$/core/ui";
import { FormField } from "$/features/form";
import { useSignUpForm } from "$/features/form/hooks/use-sign-up-form";

const toast = Toast.createToastManager();

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  const form = useSignUpForm();

  return (
    <ToastProvider position="top-center" toastManager={toast}>
      <div className="flex min-h-dvh items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Join the club, we have coffee and bugs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  await form.handleSubmit();
                } catch (err) {
                  toast.add({
                    description: get(err, "message"),
                    title: "Couldn't create your account",
                    type: "error",
                  });
                }
              }}
            >
              <div className="flex flex-col gap-4">
                <form.Field name="name">
                  {(field) => (
                    <FormField label="Name" required meta={field.state.meta}>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        placeholder="Jane Doe"
                        type="text"
                        autoComplete="name"
                      />
                    </FormField>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <FormField label="Email" required meta={field.state.meta}>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
                      />
                    </FormField>
                  )}
                </form.Field>

                <form.Field name="password">
                  {(field) => (
                    <FormField label="Password" required meta={field.state.meta}>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        placeholder="At least 8 characters"
                        type="password"
                        autoComplete="new-password"
                      />
                    </FormField>
                  )}
                </form.Field>

                <form.Subscribe>
                  {(f) => (
                    <Button type="submit" disabled={!f.canSubmit} loading={f.isSubmitting}>
                      {f.isSubmitting ? "Creating account..." : "Create account"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </form>

            <Text variant="caption" className="text-center">
              Already have an account?{" "}
              <a href="/sign-in" className="font-medium text-brand-500 hover:underline">
                Sign in
              </a>
            </Text>
          </CardContent>
        </Card>
      </div>
    </ToastProvider>
  );
}
