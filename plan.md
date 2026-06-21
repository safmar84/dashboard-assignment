# Development Plan

> Temporary working document. Keep it current during implementation and remove it in the final cleanup commit.

## Guardrails

- No vibecoding
- One step = one commit
- App must stay runnable after every step
- Test continuously during development
- Add dependencies only in the commit where they are first used

## Commit Plan

1. Bootstrap Vite + React + TypeScript project
2. Add app shell and routing skeleton
3. Add `AGENTS.md` and refresh `README.md` to match the real project state
4. Add design foundations and shared primitives
5. Add API boundary with Zod schemas and adapters
6. Add first tests for pure data logic
7. Add TanStack Query and server-state setup
8. Implement Devices List desktop slice
9. Add sorting and status filtering
10. Add mobile card representation for Devices List
11. Add localStorage persistence for sort and filter
12. Implement Device Detail page
13. Implement Dashboard page
14. Polish responsiveness and interaction ergonomics
15. Finalize README
16. Remove this `plan.md`

## Notes for Final Review

- Keep dashboard intentionally simple
- Prioritize clarity of API/data flow over UI breadth
- Prefer explicit trade-offs over half-finished extra features
- Use README to explain architectural choices and future evolution path
