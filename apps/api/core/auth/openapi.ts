// oxlint-disable typescript/no-explicit-any

import type { Path } from "better-auth/plugins";

import { auth } from "./better-auth";

type Schema = Awaited<ReturnType<typeof auth.api.generateOpenAPISchema>>;

let _schema: Schema | undefined;

const getSchema = async () => (_schema ??= await auth.api.generateOpenAPISchema());

export const BetterAuthOpenAPI = {
  components: async (): Promise<any> => {
    const { components } = await getSchema();
    return components;
  },

  getPaths: async (prefix = "/api/auth"): Promise<any> => {
    const { paths } = await getSchema();

    const reference: Record<string, Path> = {};

    for (const [path, methods] of Object.entries(paths)) {
      const key = prefix + path;
      const tagged: Path = {};
      for (const method of ["get", "post", "put", "patch", "delete"] as const) {
        const spec = methods[method];
        if (spec === undefined) continue;
        tagged[method] = { ...spec, tags: ["Better Auth"] };
      }
      reference[key] = tagged;
    }

    return reference;
  },
};
