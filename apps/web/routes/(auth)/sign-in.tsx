import { createFileRoute } from "@tanstack/react-router";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Text,
} from "$/core/ui";
import { FormField } from "$/features/form";
import { useSignInForm } from "$/features/form/hooks/use-sign-in-form";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const form = useSignInForm();

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
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
                      placeholder="Enter your password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormField>
                )}
              </form.Field>

              <form.Subscribe>
                {(f) => (
                  <Button type="submit" disabled={!f.canSubmit} loading={f.isSubmitting}>
                    {f.isSubmitting ? "Signing in..." : "Sign in"}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>

          <Text variant="caption" className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="font-medium text-brand-500 hover:underline">
              Sign up
            </a>
          </Text>
        </CardContent>
      </Card>
    </div>
  );
}
