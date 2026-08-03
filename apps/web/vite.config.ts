import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tanstackRouter({
        autoCodeSplitting: true,
        generatedRouteTree: "./core/router/route-tree.gen.ts",
        indexToken: "page",
        routeToken: "_layout",
        routesDirectory: "./routes",
      }),
      react(),
      tailwindcss(),
      babel({
        presets: [reactCompilerPreset()],
      }),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: Number(env.PORT),
      strictPort: true,
    },
  };
});
