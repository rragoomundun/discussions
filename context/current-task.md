# Current Task: User Discussions

## Status

Completed

## Goals

- Implement the "Discussions" tab of the user profile (`src/app/modules/user/components/discussions/`)
- On entering `/user/:id/discussions`, call `GET /user/:id/discussions/meta` to get the number of pages
- Call `GET /user/:id/discussions` to get the user's discussions, forwarding the `page` query param when present
- Display pagination both before and after the content
- Render each discussion using the existing `app-discussion-link` component
- Show loading state using the `app-skeleton-loading-item` class
- Clicking a pagination link re-calls `/user/:id/discussions` with the new `page` query param

## Notes

- Source spec: `context/features/3-user-discussions-spec.md`
- `/user/:id/discussions` response shape: `[{ id, title, open, createdAt, user: { id, name, role }, nbMessages, lastMessage: { messageId, date, user: { id, name } } }]`
- Reused the existing `Discussion` model and `app-discussion-link` component as-is (response shape matches exactly)
- The `page` query param is only sent to the API when present in the URL (per spec); the pagination component still displays page 1 as active by default when absent
- Pagination is hidden when there's only one page, matching the existing Forum page convention (spec's "before and after" describes layout position, not an unconditional render)
- **Bug found and fixed**: `app-discussion-link`'s title/"Last message" links were relative (`[routerLink]="discussionSlug()"`), which only resolved correctly when nested under `/category/forum` as on the Forum page — under `/user/:id/discussions` this produced a dead link. Initially patched around it with a `linkable` input to render plain text instead of a link on this page. That workaround is now superseded: the `Discussion` model and API response were extended with `category`/`forum`, `discussion-link` was moved to `shared/components/` (now used by both Forum and this page) and its `discussionSlug` now builds a correct **absolute** path from that data, so it links correctly everywhere. Removed the now-dead `linkable` input accordingly.
- Verified against the running local API: discussions list renders correctly with real data, and discussion links now resolve to their real absolute URL (e.g. `/2-main-discussions/18-personal-development/69-...`) instead of a dead relative link
