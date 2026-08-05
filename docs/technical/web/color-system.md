# Color System

App: `@teris/web`, located at `apps/web/`.

## Overview

The web app defines OKLCH color variables in `core/styles/color.css` and maps them into Tailwind CSS 4 theme tokens in `core/styles/main.css`. Components use generated utilities such as `bg-brand-500` and `text-neutral-900`.

`color.css` is the source of raw palette values. `main.css` only maps those values into the theme, alongside typography and animation tokens.

## Palettes

Every scale uses shades `25`, `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, and `950`.

| Group   | Current 500 value          | Purpose                               |
| ------- | -------------------------- | ------------------------------------- |
| Neutral | `oklch(0.52 0 0)`          | Text, surfaces, borders, and dividers |
| Brand   | `oklch(0.252 0 0)`         | Primary interactive emphasis          |
| Accent  | `oklch(0.387 0 0)`         | Secondary interactive emphasis        |
| Error   | `oklch(0.637 0.21 28.5)`   | Errors and destructive actions        |
| Warning | `oklch(0.747 0.17 62.1)`   | Warnings and attention states         |
| Success | `oklch(0.686 0.167 154.9)` | Success and confirmation states       |

Neutral, Brand, and Accent are intentionally achromatic. Their separate names encode semantic roles even when some shades overlap. Feedback scales remain chromatic.

Standalone tokens provide `white`, `black`, `snow`, and `eclipse` surfaces.

## Usage

Use semantic groups before choosing a shade:

| Role               | Typical token                                |
| ------------------ | -------------------------------------------- |
| Page surface       | `bg-neutral-25` or `bg-snow`                 |
| Default text       | `text-neutral-900`                           |
| Secondary text     | `text-neutral-500`                           |
| Subtle border      | `border-neutral-200` or `border-neutral-300` |
| Primary action     | Brand scale through the component variant    |
| Destructive action | Error scale through the component variant    |
| Positive status    | Success scale                                |
| Warning status     | Warning scale                                |

Prefer reusable component variants over repeating long color class sets. For custom UI, use Tailwind utilities rather than raw values:

```tsx
<div className="border-neutral-200 bg-snow text-neutral-900" />
```

Use CSS variables only outside Tailwind contexts:

```tsx
<div style={{ backgroundColor: "var(--brand-500)" }} />
```

## Accessibility

Target WCAG AA contrast, at least 4.5:1 for normal text. Verify actual foreground/background pairs rather than assuming a shade number passes. Avoid light midtones for body text, and use the darker feedback shades when text must sit on a light feedback surface.

## Changing A Palette

1. Update the complete 12-shade raw scale in `core/styles/color.css`.
2. Add a matching mapping in `core/styles/main.css` only when introducing a new semantic group.
3. Check affected component variants and demo routes visually.
4. Verify critical text and control contrast.
5. Run `bun run lint:check` so Tailwind classes and formatting stay canonical.

Do not add raw hex values to components, invent shade numbers outside the existing scale, or edit theme mappings when only a raw color value changes.
