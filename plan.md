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

## Commit Plan

1. Add TanStack Query and server-state setup
2. Implement Devices List desktop slice
3. Add sorting and status filtering
4. Add mobile card representation for Devices List
5. Add localStorage persistence for sort and filter
6. Implement Device Detail page
7. Implement Dashboard page
8. Polish responsiveness and interaction ergonomics
9. Finalize README
10. Remove this `plan.md`

## Notes for Final Review

- Keep dashboard intentionally simple
- Prioritize clarity of API/data flow over UI breadth
- Prefer explicit trade-offs over half-finished extra features
- Use README to explain architectural choices and future evolution path
