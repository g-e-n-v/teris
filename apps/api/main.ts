import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello from API").listen(3000);

console.log(`API listening on ${app.server?.url.origin}`);
