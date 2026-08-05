# Web App Tooling

App: `@teris/web`, located at `apps/web/`.

## Vite

`vite.config.ts` combines:

- TanStack Router generation with routes in `routes/`, `page` as the index token, `_layout` as the layout token, and automatic code splitting
- React Fast Refresh and JSX transforms
- The React Compiler through `@rolldown/plugin-babel`
- Tailwind CSS 4 through `@tailwindcss/vite`
- TypeScript path mappings through `resolve.tsconfigPaths`

The development server reads `PORT` from `apps/web/.env`. This variable configures Vite itself and is not exposed to browser code.

## Scripts

Run app scripts from `apps/web/`, or append `--filter=@teris/web` to a delegated root command.

| Task        | Command              | Behavior                                   |
| ----------- | -------------------- | ------------------------------------------ |
| Development | `bun run dev`        | Vite server with HMR                       |
| Build       | `bun run build`      | Production bundle in `dist/`               |
| Preview     | `bun run preview`    | Preview an existing build                  |
| Start       | `bun run start`      | Alias for Vite preview; Turbo builds first |
| Type-check  | `bun run type:check` | `tsc --noEmit`                             |

## Entry And Styling

`index.html` loads `main.tsx`. The TypeScript entry imports `$/core/styles/main.css`, creates the React root, and renders the router provider.

`core/styles/main.css` loads CSS in this order:

1. Tailwind CSS
2. Raw color variables
3. Font faces
4. Animation keyframes
5. Tailwind theme mappings and base styles

Tailwind uses CSS-first configuration, so there is no `tailwind.config.js` or PostCSS configuration.

## Linting

The web Oxlint configuration extends Ultracite's core and React presets. It also enforces function declarations for components, type aliases, and a relaxed declaration order for generated-style route modules.

The Tailwind plugin reads `core/styles/main.css`. It warns about sorting, canonical classes, variant order, important placement, and unknown classes; it reports duplicate, conflicting, deprecated, unnecessary arbitrary, and whitespace issues as errors. `bun run lint:fix` applies supported fixes and Oxfmt sorts Tailwind classes through the same stylesheet.

Run lint commands from the repository root because app packages do not define local lint scripts.

## Generated Output

Vite writes `dist/`, which Turborepo caches. TanStack Router writes `core/router/route-tree.gen.ts`; do not edit that generated file.
