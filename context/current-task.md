# Current Task: Fix settings route redirect

## Status

In Progress

## Goals

- Entering `/settings` (or any `/settings/*` subroute) directly via the URL must not redirect a logged-in user to `/`
- Anonymous (not logged-in) users must still be redirected away from `/settings/*`
- The fix must work on a fresh page load / hard refresh, not just on in-app client-side navigation

## Notes

- Root cause confirmed via live testing against the running dev server + backend (`curl -i http://localhost:4200/settings`):
  - `src/app/app.routes.server.ts` had only `''`, `:category`, `:category/:forum`, `:category/:forum/new`, `:category/:forum/:discussion` mapped to `RenderMode.Server`, with everything else falling to a `'**' → RenderMode.Client` catch-all.
  - `@angular/ssr` matches `serverRoutes` against the raw URL independently of `app.routes.ts` module boundaries. Since `/settings` is a single path segment, it was matching the `:category` wildcard pattern (meant only for forum category pages) and being forced into `RenderMode.Server`.
  - On the server, `App.init()` still dispatches `UserActions.getUser()`, but the outgoing SSR HTTP call to the API has no cookie-forwarding from the incoming Express request, so it always resolves as unauthenticated. `authGuard` then always sees `user: null` and issues the redirect to `/` — as a real HTTP 302, before any client-side JS runs. This affected any authenticated user, on every hard reload/direct URL entry, hence "always".
  - Confirmed before fix: `curl -i http://localhost:4200/settings` → `302 Found`, `location: /`.
  - Fix: added explicit `RenderMode.Client` entries for `setup`, `auth/**`, `forum-settings/**`, `settings/**`, `user/**` in `app.routes.server.ts`, placed before the `:category` patterns so they match first.
  - Confirmed after fix: `curl -i http://localhost:4200/settings` and `/settings/email` → `200 OK` with the CSR shell (no more server-side redirect). `/forum-settings`, `/auth/login`, `/setup` also fixed as the same bug class. Forum content routes (`/`, `/general`) unaffected, still SSR'd.
- `src/app/modules/settings/settings.routes.ts`'s `canActivate: [authGuard]` was also re-enabled (was commented out) — needed regardless so anonymous users are still blocked client-side once the route is correctly Client-rendered.
- Not yet verified end-to-end with a real authenticated hard reload in a browser (no test credentials available in this environment) — the HTTP-level 302→200 change directly demonstrates the fix for the reported symptom, but the user should confirm the logged-in browser experience.
