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

## Commit Plan

1. Add design foundations and shared primitives
2. Add API boundary with Zod schemas and adapters
3. Add first tests for pure data logic
4. Add TanStack Query and server-state setup
5. Implement Devices List desktop slice
6. Add sorting and status filtering
7. Add mobile card representation for Devices List
8. Add localStorage persistence for sort and filter
9. Implement Device Detail page
10. Implement Dashboard page
11. Polish responsiveness and interaction ergonomics
12. Finalize README
13. Remove this `plan.md`

## Notes for Final Review

- Keep dashboard intentionally simple
- Prioritize clarity of API/data flow over UI breadth
- Prefer explicit trade-offs over half-finished extra features
- Use README to explain architectural choices and future evolution path
