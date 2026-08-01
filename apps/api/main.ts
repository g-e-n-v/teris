import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia, t } from "elysia";

import { auth } from "#/core/auth";

import { BetterAuthOpenAPI } from "./core/auth/openapi";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        // @ts-expect-error can't type this yet
        components: await BetterAuthOpenAPI.components(),
        info: {
          title: "Teris API",
          version: "0.0.0",
        },
        openapi: "3.0.0",
        // @ts-expect-error can't type this yet
        paths: await BetterAuthOpenAPI.getPaths(),
      },
      path: "/docs",
      scalar: { theme: "elysiajs" },
    })
  )
  .use(
    cors({
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      origin: "http://localhost:*",
    })
  )
  .use(auth)
  .group("/api", (group) =>
    group
      .get("/health", () => ({ status: "OK" }), {
        detail: { summary: "Health check", tags: ["System"] },
        response: t.Object({ status: t.String() }),
      })
      .get("/me", ({ user }) => user, {
        auth: true,
        detail: {
          description: "Returns the authenticated user's profile.",
          summary: "Get current user",
          tags: ["System"],
        },
        response: t.Object({
          email: t.String(),
          id: t.String(),
          name: t.Nullable(t.String()),
          role: t.Optional(t.Nullable(t.String())),
        }),
      })
  )
  .listen(Bun.env.PORT);

console.log(`API listening on ${app.server?.url.origin}`);
