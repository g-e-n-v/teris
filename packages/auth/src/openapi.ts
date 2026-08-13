// oxlint-disable typescript/no-explicit-any

import type { AuthInstance } from "./server";
import type { Path } from "better-auth/plugins";

export const createAuthOpenAPI = (auth: AuthInstance) => {
  type Schema = Awaited<ReturnType<typeof auth.api.generateOpenAPISchema>>;

  let _schema: Schema | undefined;

  const getSchema = async () => (_schema ??= await auth.api.generateOpenAPISchema());

  return {
    components: async (): Promise<any> => {
      const { components } = await getSchema();

      const securitySchemes = {
        ...components.securitySchemes,
        apiKeyCookie: {
          description: "Better Auth session cookie",
          in: "cookie",
          name: "better-auth.session_token",
          type: "apiKey",
        },
      };

      return Object.assign(components, { securitySchemes });
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
};
