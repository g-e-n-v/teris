// oxlint-disable typescript/consistent-type-definitions
//
interface TerisEnv {
  DATABASE_URL: string;
  NODE_ENV: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  PORT: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends TerisEnv {
    __type: "ProcessEnv";
  }
}

declare module "bun" {
  namespace Bun {
    interface Env extends TerisEnv {
      __type: "BunEnv";
    }
  }
}
