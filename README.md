# Dashboard Assignment

Small React SPA prepared as a take-home assignment for the React Developer interview process at Wultra.

## Goal

Build a small, explainable dashboard application over a REST API with:

- clear TypeScript data flow,
- maintainable project structure,
- responsive UI with strong mobile usability on key screens,
- decisions that are easy to defend during a technical interview.

## Requirement Check

Compared with the assignment PDF, the current implementation covers the requested core scope:

- **Basic React app:** Vite + React + TypeScript
- **Routing:** 3 pages connected with React Router (`Dashboard`, `Devices`, `Device Detail`)
- **Charts + KPIs:** dashboard KPI cards plus a hand-rolled status distribution chart
- **Table:** devices list table with multiple rows of data
- **Networking over HTTP:** hosted Wultra mock API via real fetch requests
- **Loading and error states:** implemented for all main routes
- **Local storage:** persisted devices list sorting and filtering
- **Visual identity:** dark baseline with blue `#09f` accent inspired by Wultra

The assignment also mentions a possible 4th page (`Users` or `Settings`) as an example rather than a strict requirement, so this solution intentionally stays with 3 focused pages.

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

### Devices list loading strategy

The hosted mock API exposes explicit `page-N.json` files, but it does not provide server-side
sorting or filtering. The current implementation therefore chooses the simplest consistent behavior:

1. load the full devices dataset,
2. apply filtering and sorting globally across all devices,
3. paginate the filtered result locally in the client.

This keeps the user-facing behavior predictable: filters and sorting always work over the whole
dataset, not only over a single transport page from the mock API.

An obvious future optimization would be to use the explicit page endpoints for a faster initial
render and progressively hydrate the full dataset in the background. That optimization is noted
intentionally, but was not chosen for the current implementation because the simpler full-dataset
approach is easier to reason about and defend in the assignment.

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

## Technical Decisions

- **Vite over heavier setup:** fast iteration and minimal scaffolding for a small SPA
- **React Router + TanStack Query:** enough structure for route composition and remote data without over-engineering
- **Typed API boundary with Zod adapters:** keeps backend payload quirks away from page components
- **Lightweight FSD-inspired split:** enough separation to talk clearly about ownership and extension points
- **Full-dataset devices list controls:** the mock API does not provide server-side sorting/filtering, so the app loads the full devices dataset and keeps filtering, sorting, and pagination globally consistent
- **Hand-rolled chart instead of extra library:** keeps dependency count low while still satisfying the “table + chart” requirement

## What Is Implemented

The repository contains:

- Vite + React + TypeScript bootstrap
- app shell with primary navigation
- `Dashboard`, `Devices List`, and `Device Detail` routes
- KPI overview and status distribution chart on the dashboard
- sortable/filterable devices list with local client-side pagination
- device detail with metadata and event timeline
- shared UI primitives (`Button`, `Card`, `StatusBadge`)
- typed API boundary with endpoint config, schemas, and adapters
- mock fixtures runtime-validated with Zod on import
- TanStack Query provider and query helpers over the hosted mock API
- loading, error, and empty states on the main pages
- client-side devices pagination over the full aggregated dataset
- persisted devices list sort/filter preferences in localStorage
- responsive mobile card representation and collapsible controls for the devices screen
- responsive polish across the key routes
- lightweight FSD-inspired folder split for `app` and `pages`

## If I Had More Time

- optimize the devices list bootstrap by using explicit `page-N.json` endpoints for faster first paint
- add a dedicated `Users` or `Settings` page as an optional 4th route
- deepen route-level tests for key interactive flows
- refine dashboard visualizations and device list ergonomics further
