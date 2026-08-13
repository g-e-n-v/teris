import type { ResolverFile } from "kubb/kit";

import { pluginFetch } from "@kubb/plugin-fetch";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { defineConfig } from "kubb/config";
import { kebabCase } from "lodash-es";

const baseName: ResolverFile["baseName"] = ({ extname, name }) => `${kebabCase(name)}${extname}`;

export default defineConfig({
  input: `http://localhost:4000/docs/json`,
  output: {
    clean: true,
    path: "./core/api",
    postGenerate: [{ command: "bun ./scripts/kubb-post-generate.ts", name: "Add credentials" }],
  },
  plugins: [
    pluginTs({
      output: {
        mode: "file",
        path: "types.ts",
      },
    }),
    pluginFetch({
      baseURL: process.env.VITE_API_URL ?? "http://localhost:4000",
      output: {
        mode: "directory",
        path: "clients",
      },
      resolver: {
        file: { baseName },
      },
    }),
    pluginReactQuery({
      client: "fetch",
      hooks: true,
      output: {
        mode: "directory",
        path: "hooks",
      },
      resolver: {
        file: { baseName },
      },
    }),
  ],
});
