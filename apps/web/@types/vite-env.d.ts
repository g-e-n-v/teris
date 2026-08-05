/// <reference types="vite/client" />

// oxlint-disable typescript/consistent-type-definitions
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
