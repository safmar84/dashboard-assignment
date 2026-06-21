# AGENTS.md

## Project Purpose

This repository contains a small React SPA built as a Wultra take-home assignment. The goal is not maximum feature count, but a codebase that demonstrates:

- strong ownership,
- maintainable frontend architecture,
- clear TypeScript + REST API integration,
- thoughtful responsive behavior,
- decisions that are easy to explain in an interview.

## Working Principles

- Keep the app runnable after every meaningful change.
- Prefer small, explainable commits over large implementation jumps.
- Do not introduce libraries before they are actually needed.
- Optimize for clarity and maintainability over cleverness.
- Avoid "vibecoding": every added abstraction must be understandable and defensible.

## Planned Architecture Map

The project should follow a **lightweight FSD-inspired structure**:

- `app` - application bootstrap, providers, routing
- `pages` - route-level screens
- `widgets` - composed UI sections used by pages
- `features` - focused user interactions
- `entities` - domain models and domain UI
- `shared` - reusable UI, utilities, config, API helpers

This is meant as a practical organizational tool, not as a strict dogmatic rule set.

## UI and Responsive Rules

- Use a dark visual baseline with blue accent inspired by Wultra branding.
- Prefer a small set of shared primitives over a large component library.
- On mobile, prioritize usability of `Devices List` and `Device Detail`.
- The devices overview may switch from table to stacked/card representation on small screens.
- Responsive design should re-prioritize content, not just compress layout.
- Avoid hover-only interactions and tiny hit areas.

## API and Data Rules

- Keep a clear boundary between remote API data and app-facing domain data.
- Validate API payloads with Zod where practical.
- Use typed adapters/mappers before data reaches page UI.
- Keep loading and error handling consistent across pages.

## How to Extend Safely

When adding a new feature:

1. Start from the domain and route intent.
2. Add or update the API boundary first if remote data changes.
3. Reuse shared primitives before creating new ones.
4. Keep mobile behavior explicit for any new page-level UI.
5. Update `README.md` and this file whenever architectural expectations change.

## Temporary Planning Note

Development may use a temporary `plan.md` in the repository during implementation. That file is a working artifact and is expected to be removed in the final cleanup commit.
