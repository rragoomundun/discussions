# Current Task: Settings Link In Header Dropdown

<!-- Fix name and short description -->

Add a "Settings" link with a cog icon to the header's user dropdown menu, visible only when a user is logged in.

## Status

In Progress

## Goals

- Add a link to `/settings` in the header dropdown menu (`src/app/core/components/header/`)
- Link only appears when a user is logged in (inside the existing `@if (user)` block)
- Link shows a cog icon (Font Awesome 6 free, e.g. `fa-solid fa-gear`/`fa-cog`) next to its label
- Add a translation key for the link label, following existing i18n pattern (`public/i18n/<lang>.json`, used via `translate` pipe)

## Notes

- Existing `/settings` route already exists (`src/app/modules/settings/settings.routes.ts`), distinct from admin-only `/forum-settings`
- Header dropdown is in `src/app/core/components/header/header.html` / `header.ts` — currently shows user.name, admin link (if `user.role === 'admin'`), and logout inside `@if (user) { ... } @else { ... }`
- Follow existing pattern/style of other links in that dropdown (routerLink usage, icon placement, translate pipe)
