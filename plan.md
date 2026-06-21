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

## Commit Plan

1. Add app shell and routing skeleton
2. Add design foundations and shared primitives
3. Add API boundary with Zod schemas and adapters
4. Add first tests for pure data logic
5. Add TanStack Query and server-state setup
6. Implement Devices List desktop slice
7. Add sorting and status filtering
8. Add mobile card representation for Devices List
9. Add localStorage persistence for sort and filter
10. Implement Device Detail page
11. Implement Dashboard page
12. Polish responsiveness and interaction ergonomics
13. Finalize README
14. Remove this `plan.md`

## Notes for Final Review

- Keep dashboard intentionally simple
- Prioritize clarity of API/data flow over UI breadth
- Prefer explicit trade-offs over half-finished extra features
- Use README to explain architectural choices and future evolution path
