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
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
              <form.Field name="email">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Text as="label" variant="label" htmlFor={field.name}>
                      Email
                    </Text>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      placeholder="you@example.com"
                      type="email"
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Text variant="caption" className="text-error-500">
                        {field.state.meta.errors.map(String).join(", ")}
                      </Text>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Text as="label" variant="label" htmlFor={field.name}>
                      Password
                    </Text>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      placeholder="Enter your password"
                      type="password"
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                      <Text variant="caption" className="text-error-500">
                        {field.state.meta.errors.map(String).join(", ")}
                      </Text>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Subscribe
                selector={(state) => ({
                  canSubmit: state.canSubmit,
                  isSubmitting: state.isSubmitting,
                })}
              >
                {({ canSubmit, isSubmitting }) => (
                  <Button type="submit" disabled={!canSubmit} loading={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
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
