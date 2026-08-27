# Current Task: Add Guards to /setup and /auth/\*

Currently the `/setup` and `/auth/*` routes are always accessible regardless of forum configuration state or login status. This fix adds route guards to close that gap.

## Status

In Progress

## Goals

- Create a guard for the `/setup` route that only allows access when no configuration exists (`Config` service `getExists()` returns `{ config: false }`); apply it to the `/setup` route.
- Create a guard for the `/auth/*` routes that blocks access when a user is already logged in; apply it to the `/auth/*` routes.

## Notes

- Source spec: `context/fixes/01-guards-spec.md`
- Relevant existing state: `config` store slice (`exists`, `config`), `user` store slice (`user: User | null | undefined`).
- Follow existing guard patterns in `src/app/core/guards/*` (e.g. `adminGuard`) — functional `CanActivateFn` style per project conventions.
