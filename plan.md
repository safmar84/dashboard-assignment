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

## Commit Plan

1. Add first tests for pure data logic
2. Add TanStack Query and server-state setup
3. Implement Devices List desktop slice
4. Add sorting and status filtering
5. Add mobile card representation for Devices List
6. Add localStorage persistence for sort and filter
7. Implement Device Detail page
8. Implement Dashboard page
9. Polish responsiveness and interaction ergonomics
10. Finalize README
11. Remove this `plan.md`

## Notes for Final Review

- Keep dashboard intentionally simple
- Prioritize clarity of API/data flow over UI breadth
- Prefer explicit trade-offs over half-finished extra features
- Use README to explain architectural choices and future evolution path
