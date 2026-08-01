import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
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
