# Current Task: Search

## Status

In Progress

## Goals

- Add a search bar matching the mockups (@context/mockups/search-desktop.png, @context/mockups/search-mobile.png)
- Clicking search navigates to `/search?query=<value>` and empties the search bar
- Create a `search` module with a `search` component at route `/search`
- Search page has a breadcrumb (`Home / Search`, per desktop mockup)
- Search input on `/search` is pre-filled with the current `query` value
- On component load, and on clicking the search icon (in the header or next to the search input), call:
  - `GET /search/meta?query=` → `{ nbPages }`; show a loading skeleton while pending
  - `GET /search?query=` → array of `{ discussion { id, title }, forum { id, name }, category { id, name }, message { id, message, date }, user { id, name, role } }`; show a loading skeleton while pending
- Display pagination (top and bottom, per desktop mockup) based on `nbPages`
- Create a `search-result` component rendering each result as shown in the mockups (user avatar/name/role, "In: Category / Forum / Discussion" breadcrumb-style line, message excerpt)
- Clicking a different page number re-calls `/search` with `query` + `page` query params

## Notes

- Search bar (mobile), per spec:
  - Hidden by default; clicking the header search icon reveals it and empties its content
  - While visible, clicking either the header search icon or the icon next to the search input hides it again
- Desktop mockup shows the search bar always visible in the header (not icon-toggled) — mobile-only behavior is the icon-toggle described above
- Mockups show a black pagination style, rounded-box result cards, and a "Search for something..." placeholder in the header search input

## Implementation

- New: `SearchResult`/`SearchMeta` models, `Search` service (`search/meta`, `search`), `search-result` shared component, `search` module (`Search` component + `search.routes.ts`), registered at `/search` in `app.routes.ts`.
- Header (`header.ts`/`.html`/`.scss`): added a desktop search bar (always visible, `d-none d-lg-flex`) and a mobile toggle icon + slide-down search bar (`showMobileSearch` signal), closing on outside click (reused the existing `onWindowClick`/hamburger pattern) and after a submitted search.
- Reused existing shared components/styles as-is: `app-breadcrumb`, `app-pagination` (kept its existing blue "active" color rather than overriding to black, for site-wide consistency — mockup is a grayscale wireframe), `.app-skeleton-loading-item`, `urlUtil.getSlug` id-slug link convention, `textUtil.markdownToHTML`. `search-result` combines the existing `message.html` (avatar/name/role header) and `message-item.html` (location breadcrumb + body) card patterns; body is CSS line-clamped to 4 lines (mockup's excerpt look) since there's no backend snippet/truncation field.
- `app.routes.server.ts`: added `{ path: 'search', renderMode: RenderMode.Server }` before the `:category` wildcard — same class of bug just fixed for `/settings` (a single-segment path would otherwise be swallowed by the `:category` SSR route and mis-render).
- Verified live against the running dev server (port 4200) with Playwright + mocked API responses (`/search/meta`, `/search`, `/config*`, `/user`): desktop/mobile layouts screenshot-compared closely against the mockups; header search submit (desktop + mobile) navigates and empties; mobile icon toggles open/closed and closes on outside click; in-page search bar re-searches and resets to page 1; pagination click keeps `query` and only refetches results (not meta). `/search` SSR path confirmed non-crashing (200, graceful `SEARCH_PAGE.ERROR` state) against the real backend, which doesn't implement `/search*` yet — expected, backend work is out of scope here.
- `npm run build` passes; no regressions on `/`, `/settings`, `/forum-settings`, `/auth/login`, `/setup` (spot-checked via curl).
