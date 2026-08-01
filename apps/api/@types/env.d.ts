interface TerisEnv {
  DATABASE_URL: string;
  NODE_ENV: string;
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
