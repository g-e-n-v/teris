// oxlint-disable typescript/no-unsafe-assignment

import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

import auth from "#/core/auth";
import system from "#/features/system";

import { BetterAuthOpenAPI } from "./core/auth/openapi";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        components: await BetterAuthOpenAPI.components(),
        info: {
          title: "Teris API",
          version: "0.0.0",
        },
        openapi: "3.0.0",
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
  .group("/api", (group) => group.use(system))
  .listen(Bun.env.PORT);

console.log(`API listening on ${app.server?.url.origin}`);
