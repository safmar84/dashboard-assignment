# Dashboard Assignment

Small React SPA prepared as a take-home assignment for the React Developer interview process at Wultra.

## Goal

Build a small, explainable dashboard application over a REST API with:

- clear TypeScript data flow,
- maintainable project structure,
- responsive UI with strong mobile usability on key screens,
- decisions that are easy to defend during a technical interview.

## Intended Scope

The app is intentionally small and focused:

1. `Dashboard` - KPI cards and one simple chart
2. `Devices List` - sortable/filterable device overview
3. `Device Detail` - device metadata and event timeline

## Technical Direction

- **Bundler:** Vite
- **UI:** React + TypeScript
- **Routing:** React Router
- **Server state:** TanStack Query
- **API boundary:** Zod schemas + typed adapters
- **Architecture:** lightweight FSD-inspired structure
- **Styling:** custom design foundations with a small set of shared primitives

## Key Principles

- Small vertical slices instead of big-bang implementation
- One logical step = one commit
- Application stays runnable after every step
- Dependencies are added only when first used
- README and AGENTS documents evolve with the project

## Responsive Strategy

This project is **not** aiming for a fully mobile-first product. Instead, it aims for a strong responsive baseline that reflects Wultra's mobile-first context:

- `Devices List` and `Device Detail` are the highest mobile priority
- dashboard can simplify on small screens
- mobile layout re-prioritizes information instead of only shrinking it
- touch ergonomics matter as much as breakpoints

## Run Locally

### Versions

- **Node.js:** `22.15.1`
- **Package manager:** `npm`

### Commands

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Current Status

The repository now contains:

- Vite + React + TypeScript bootstrap
- initial app shell
- basic route structure for `Dashboard`, `Devices List`, and `Device Detail`
- lightweight FSD-inspired folder split for `app` and `pages`

The next step is to add the first design foundations and shared UI primitives.
