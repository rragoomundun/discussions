# Current Task: User Profile Structure

## Status

Completed

## Goals

- Create a `user` feature module
- Create components in the module: `profile`, `informations`, `discussions`, `messages`
- Create route structure `/user/:id` (profile component) with child routes:
  - `/informations` (informations component)
  - `/discussions` (discussions component)
  - `/messages` (messages component)
- Redirect `/user/:id` to `/user/:id/informations`
- On profile component load, call API `/user/:id`, which returns `{ name, role, nbDiscussions, nbMessages, createdAt }`
- Display the data as shown in `@context/mockups/user-information.png`
- Display breadcrumb with the user name
- Display profile picture (128px x 128px) — fallback to `assets/images/user.png` if none exists
- Display member name, with user role below it (`Admin` for admin, `Moderator` for moderator, `Member` for regular)
- Display statistics below: number of discussions, number of messages, joined date (`createdAt`) formatted as `D MMMM Y`
- Display tabs (Informations, Discussions, Messages) with no content besides `<router-outlet>` — actual content rendered by child routes
- Tab routes:
  - Informations → `/user/:id/informations`
  - Discussions → `/user/:id/discussions`
  - Messages → `/user/:id/messages`

## Notes

- Source spec: `context/features/1-user-profile-structure-spec.md`
- Mockup reference: `context/mockups/user-information.png`
- Assumption: the spec's API response list `{ name, role, nbDiscussions, nbMessages, createdAt }` omitted `image`, but a later bullet requires displaying the profile picture with a fallback — added `image: string | null` to the `UserProfile` model/endpoint contract to satisfy that requirement (`getUser/user/:id`). Flag for review if the actual API doesn't return this field.
- Route param `:id` follows the existing app-wide `id-slug` convention (e.g. `/user/5-raphael`), matching how `authorLink` is already built in `message.ts` and `discussion.ts`, rather than a bare numeric id.
- `informations`, `discussions`, `messages` child components were scaffolded with empty templates — no content requirements were given in this spec (structure only); content is expected in a future feature.
- Verified against the running local API (localhost:5000) via dev server + playwright-cli screenshots: profile header, tab navigation, mobile select, and the "user not found" error state all render correctly.
