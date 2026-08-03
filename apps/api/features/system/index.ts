import Elysia, { t } from "elysia";

export default new Elysia({ name: "system" }).get("/health", () => ({ status: "OK" }), {
  detail: { tags: ["System"] },
  response: t.Object({ status: t.String() }),
});
