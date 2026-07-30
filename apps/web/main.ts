const server = Bun.serve({
  port: 3001,
  fetch(req) {
    return new Response("Hello from Web");
  },
});

console.log(`Web listening on http://localhost:${server.port}`);
