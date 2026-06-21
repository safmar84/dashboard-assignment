# Development Plan

> Temporary working document. Keep it current during implementation and remove it in the final cleanup commit.

## Guardrails

- No vibecoding
- One step = one commit
- App must stay runnable after every step
- Test continuously during development
- Add dependencies only in the commit where they are first used

## Current Progress

- Done: repository guidance documents (`README.md`, `AGENTS.md`, temporary `plan.md`)
- Done: Vite + React + TypeScript bootstrap
- Done: app shell and routing skeleton with React Router
- Done: design foundations and shared primitives
- Done: API boundary with Zod schemas and adapters
- Done: first tests for pure data logic
- Done: TanStack Query and server-state setup
- Done: Devices List desktop slice
- Done: sorting and status filtering
- Done: mobile card representation for Devices List
- Done: localStorage persistence for devices list controls

## Commit Plan

1. Implement Device Detail page
2. Implement Dashboard page
3. Polish responsiveness and interaction ergonomics
4. Finalize README
5. Remove this `plan.md`

## Notes for Final Review

- Keep dashboard intentionally simple
- Prioritize clarity of API/data flow over UI breadth
- Prefer explicit trade-offs over half-finished extra features
- Use README to explain architectural choices and future evolution path
