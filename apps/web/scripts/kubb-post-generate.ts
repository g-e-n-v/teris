import { readFileSync, appendFileSync } from "node:fs";

const path = "./core/api/.kubb/client.ts";
const content = readFileSync(path, "utf-8");

if (!content.includes('credentials: "include"')) {
  appendFileSync(
    path,
    `
client.interceptors.request.use((request) => {
  request.credentials = "include"
  return request
})`
  );
}
