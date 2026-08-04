# Color System

App: `@teris/web` — located at `apps/web/`.

## Overview

The web app uses a 12-shade color scale system (25 → 950) following the Tailwind CSS / Material Design naming convention. Colors are defined as CSS custom properties in OKLCH format and registered with Tailwind v4 `@theme` for automatic utility class generation.

## How it works

1. **`color.css` (`:root`)** defines the raw palette as CSS custom properties: `--brand-500: oklch(0.66 0.169 246);`
2. **`main.css` (`@theme`)** maps those variables to Tailwind theme tokens: `--color-brand-500: var(--brand-500);`
3. Tailwind v4 reads `@theme` and generates utilities: `bg-brand-500`, `text-brand-500`, `border-brand-500`, etc.

`color.css` is the single source of truth for the raw palette. `main.css` only references those variables, so changing a color means editing one place (`color.css`).

## Palette groups

| Group | CSS prefix | Tailwind prefix | 500 value | Purpose |
| --- | --- | --- | --- | --- |
| Neutral | `--neutral-*` | `neutral-*` | `oklch(0.544 0.035 265.1)` | Text, backgrounds, borders, dividers. The most-used scale. Cool gray aligned to the brand hue. |
| Brand | `--brand-*` | `brand-*` | `oklch(0.66 0.169 246)` | Primary interactive elements: buttons, links, inputs. Bright ocean blue. |
| Accent | `--accent-*` | `accent-*` | `oklch(0.729 0.126 210.8)` | Secondary/supporting: badges, labels, highlights. Cyan, complementary to brand. |
| Error | `--error-*` | `error-*` | `oklch(0.637 0.21 28.5)` | Destructive actions and error states. |
| Warning | `--warning-*` | `warning-*` | `oklch(0.747 0.17 62.1)` | Potentially destructive or "on-hold" states. |
| Success | `--success-*` | `success-*` | `oklch(0.686 0.167 154.9)` | Positive actions, confirmations, trends. |

## Named color tokens

In addition to the 12-shade scales, four standalone tokens are defined:

| Token | Value | Tailwind utility | Purpose |
| --- | --- | --- | --- |
| `--white` | `oklch(100% 0 0)` | `bg-white`, `text-white`, ... | Pure white |
| `--black` | `oklch(0% 0 0)` | `bg-black`, `text-black`, ... | Pure black |
| `--snow` | `oklch(0.9911 0 0)` | `bg-snow`, `text-snow`, ... | Near-white surface |
| `--eclipse` | `oklch(0.2103 0.0059 285.89)` | `bg-eclipse`, `text-eclipse`, ... | Near-black surface |

## The 12-shade scale

Every color has 12 shades:

```
25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
```

- **25 is lightest**, **950 is darkest**.
- **500 is the base/brand color** — the "true" color.
- Lighter shades (25–400) are derived by increasing lightness.
- Darker shades (600–950) are derived by decreasing lightness.

## Shade usage guide

Use shades consistently and intentionally. Pick a shade for a role and stick to it across the app.

| Shade range | Typical use                                      |
| ----------- | ------------------------------------------------ |
| 25–100      | Backgrounds, subtle fills, page-level surfaces   |
| 200–300     | Borders, dividers, disabled states               |
| 400         | Hover states for light backgrounds               |
| 500         | Primary actions (buttons, links, brand elements) |
| 600–700     | Hover/active states for primary actions          |
| 800–950     | High-contrast text, dark backgrounds             |

### Common pairings

| Element                        | Token pattern                                    |
| ------------------------------ | ------------------------------------------------ |
| Page background                | `bg-neutral-25`                                  |
| Card surface                   | `bg-neutral-50`                                  |
| Default text                   | `text-neutral-900`                               |
| Secondary text                 | `text-neutral-500`                               |
| Input border                   | `border-neutral-300`                             |
| Divider                        | `bg-neutral-200`                                 |
| Primary button                 | `bg-brand-500 text-white hover:bg-brand-600`     |
| Primary button text (on brand) | `text-white` (shades 500–950 support white text) |
| Destructive button             | `bg-error-500 text-white hover:bg-error-600`     |
| Success badge                  | `bg-success-100 text-success-700`                |
| Warning badge                  | `bg-warning-100 text-warning-700`                |

## Accessibility (WCAG 2.1)

Aim for **AA (≥ 4.5:1 contrast)** for all text and crucial UI elements.

| Level | Ratio   | Use                              |
| ----- | ------- | -------------------------------- |
| A     | < 4.5:1 | Decorative elements only         |
| AA    | ≥ 4.5:1 | Minimum for text, buttons, forms |
| AAA   | ≥ 7:1   | Nice-to-have where possible      |

Rules of thumb:

- Dark text (`neutral-900`/`950`) on shades 25–200 usually passes.
- White text on shades 600–950 usually passes.
- Always verify critical pairs with a contrast checker.
- Never use `neutral-400` or lighter for body text.

## Using colors in components

In TypeScript/JSX, use Tailwind utility classes directly — no need to import CSS variables:

```tsx
<button className="bg-brand-500 text-white hover:bg-brand-600">Click me</button>
```

For inline styles or non-Tailwind contexts, reference the raw CSS variable:

```tsx
<div style={{ backgroundColor: "var(--brand-500)" }} />
```

## Adding a new color

1. Generate a 12-shade scale from a base hex color using the palette generator skill.
2. Add the raw OKLCH values to `:root` in `core/styles/color.css` (e.g. `--newcolor-500: oklch(...);`).
3. Map them to Tailwind tokens in `@theme` in `core/styles/main.css` (e.g. `--color-newcolor-500: var(--newcolor-500);`).
4. Verify the scale by eye. HSL math doesn't account for perceptual differences between hues. Pay attention to 400/600 and the dark end (700–950).

## Do not

- Do not use raw hex codes in components. Always use Tailwind tokens or CSS variables.
- Do not invent new shade numbers. Use the existing 25–950 scale.
- Do not use the same shade for different roles inconsistently (e.g. `neutral-300` for borders in one component, `neutral-200` in another). Pick one and stick to it.
