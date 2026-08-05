# Web Routing

App: `@teris/web`, located at `apps/web/`.

## Router Setup

TanStack Router generates a type-safe route tree from files under `routes/`.

- `page.tsx` is the index route token.
- `_layout.tsx` creates a pathless layout route.
- `__root.tsx` owns the root application layout and global providers.
- Route modules export `Route` from `createFileRoute` or `createRootRoute`.
- Automatic code splitting creates lazy route modules during the Vite build.

The router uses intent preloading and scroll restoration. Its setup lives in `core/router/index.ts`.

## Generated Route Tree

TanStack Router writes `core/router/route-tree.gen.ts`. Never edit this file manually. Change files under `routes/` and let the Vite plugin regenerate the tree.

## Current Routes

| Route           | Purpose           |
| --------------- | ----------------- |
| `/`             | Application index |
| `/demo`         | Demo layout       |
| `/demo/button`  | Button showcase   |
| `/demo/input`   | Input showcase    |
| `/demo/spinner` | Spinner showcase  |
| `/demo/toast`   | Toast showcase    |

Demo routes are interactive component showcases, not production feature pages.

## Route Conventions

- Keep route declarations in `routes/` and reusable routing setup in `core/router/`.
- Use `_layout.tsx` for shared route layouts without adding a URL segment.
- Put application-wide providers in `routes/__root.tsx`.
- Keep route modules focused on route composition; move reusable UI and business logic into their relevant modules.
- Do not import or modify the generated route tree directly.
