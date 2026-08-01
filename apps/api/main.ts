import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { auth } from "#/core/auth";

const app = new Elysia()
  .use(
    cors({
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      origin: "http://localhost:5173",
    })
  )
  .use(auth)
  .get("/", () => "Hello from API")
  .get("/me", ({ user }) => user, { auth: true })
  .listen(3000);

console.log(`API listening on ${app.server?.url.origin}`);
