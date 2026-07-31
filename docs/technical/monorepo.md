# Monorepo & Workspaces

## Workspaces

This is a Bun-managed monorepo. Workspaces are defined in the root `package.json` under `apps/*` and `packages/*`. Each app/package has its own `package.json`, `tsconfig.json`, and `oxlint.config.ts`.

- Root `package.json` holds shared dev dependencies (Oxlint, Oxfmt, Ultracite, Turbo).
- App-level `package.json` files hold app-specific runtime and dev dependencies.
- There is no `packages/*` directory yet, but the workspace pattern is ready for shared libraries.

## Turborepo

Task pipeline is defined in `turbo.json`:

| Task         | Depends on    | Cached | Notes                              |
| ------------ | ------------- | ------ | ---------------------------------- |
| `build`      | `^build`      | Yes    | Outputs `dist/**`                  |
| `dev`        | `^dev`        | No     | Persistent, long-running           |
| `start`      | `build`       | No     | Persistent, runs production server |
| `lint:check` | —             | Yes    | No outputs                         |
| `lint:fix`   | —             | No     | No outputs                         |
| `type:check` | `^type:check` | Yes    | No outputs                         |

The `^` prefix means "run the task in upstream workspace dependencies first." Since no shared packages exist yet, this is a no-op but ready for future use.

Run tasks for a single app with Turbo's `--filter` flag:

```bash
bun run dev --filter=@teris/web
bun run build --filter=@teris/api
```

## Shared TypeScript Config

Root `tsconfig.json` provides the base configuration extended by all apps:

- `target`/`module`: `ESNext`
- `moduleResolution`: `bundler`
- `strict`: `true`
- `noEmit`: `true` (type-checking only; builds are handled by Vite/Bun)
- `verbatimModuleSyntax`: `true` (requires `import type` for type-only imports)
- `resolveJsonModule`: `true`

Each app extends this and adds its own `lib`, `paths`, and app-specific flags.

## Linting & Formatting

This project uses [Ultracite](https://ultracite.ai) with the Oxlint + Oxfmt backend. Type-aware linting is enabled via `oxlint-tsgolint`.

### Commands

| Task                  | Command              |
| --------------------- | -------------------- |
| Check all packages    | `bun run lint:check` |
| Auto-fix all packages | `bun run lint:fix`   |

Target a single app:

```bash
cd apps/web && bun run lint:check
cd apps/api && bun run lint:fix
```

### Config Files

| File                        | Purpose                                                         |
| --------------------------- | --------------------------------------------------------------- |
| `oxlint.config.ts` (root)   | Base oxlint config with the `ultracite/oxlint/core` preset      |
| `oxfmt.config.ts` (root)    | Formatter config extending `ultracite/oxfmt`, `printWidth: 100` |
| `apps/web/oxlint.config.ts` | Web-specific: core + React preset                               |
| `apps/api/oxlint.config.ts` | API-specific: core preset only                                  |

### Editor Integration

The `.zed/settings.json` file configures:

- Format on save via `oxfmt` language server
- Lint on type via `oxlint` with type-aware mode and `unusedDisableDirectives: "deny"`
- Auto-fix and import organization on save for JS/TS/TSX
