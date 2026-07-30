const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello from API");
  },
});

console.log(`API listening on http://localhost:${server.port}`);
