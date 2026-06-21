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

## Architecture Notes

This project uses a **lightweight FSD-inspired structure**. The goal is not strict framework purity, but a codebase where responsibilities stay easy to explain and extend.

### Layer responsibilities

- **`app`** - application bootstrap, routing, top-level providers, app shell
- **`pages`** - route-level composition for individual screens
- **`entities`** - domain-focused models, API contracts, adapters, and entity-specific UI building blocks
- **`shared`** - cross-domain infrastructure and reusable primitives such as UI components, styling tokens, generic API helpers, and config

### API boundary

The API boundary is intentionally split into two concerns:

- **`shared/api`** contains generic infrastructure that is not tied to a specific domain, such as HTTP utilities, endpoint config, and shared error types
- **`entities/*/api`** contains domain-specific DTO schemas and adapters that translate remote payloads into app-facing domain models

This means that **Zod schemas live next to the entity they describe**, not in a global validation bucket. In this project, that is intentional: the schema is treated as part of the domain boundary, not just as a low-level utility.

To keep boundaries explicit, page code should prefer **public entity entrypoints** such as `entities/device` instead of reaching into deep internal paths. Mock fixtures may exist temporarily during development, but they should live in a dedicated mock layer rather than inside the entity API folder itself.

### Mock and test data strategy

Mock fixture payloads live in the entity mock layer and are validated with Zod **at creation/import time**, not only later inside adapters. This keeps local mock data aligned with the same DTO contract expected from the backend.

The current test strategy is intentionally small and focused:

- adapter tests run against locally stored DTO-shaped mock payloads
- a dedicated URL regression test protects endpoint URL construction
- the running application uses the hosted mock API for live integration behavior

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
- initial design foundations based on shared tokens
- shared UI primitives: `Button`, `Card`, `StatusBadge`
- prepared API boundary with Zod schemas, endpoint config, and adapters
- first focused adapter tests using Vitest
- mock fixtures runtime-validated with Zod on import
- TanStack Query provider and entity query helpers over the hosted mock API
- first real desktop `Devices List` slice with loading, error, empty, and table states
- lightweight sorting and single status filtering on the devices screen
- persisted devices list sort/filter preferences in localStorage
- dedicated mobile card representation and collapsible controls for the devices screen
- lightweight FSD-inspired folder split for `app` and `pages`

The next step is to implement the `Device Detail` page as a fuller real slice.
