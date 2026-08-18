# Current Feature: Amplify SSR Deploy Manifest

## Status

In Progress

## Goals

- Add `deploy-manifest.json` at repo root describing routes (static assets → CDN, everything else → Compute) and the `default` compute resource (entrypoint, runtime) per AWS Amplify's deployment specification.
- Extend `amplify.yml`'s build phase to assemble `.amplify-hosting/` after `ng build`: `compute/default/{browser,server}` (preserving the sibling layout `server.mjs` expects via `../browser`) and `static/` (copy of `dist/discussions/browser` for CDN-served assets).
- Point `artifacts.baseDirectory` at `.amplify-hosting` instead of `dist/discussions`.
- Gitignore `.amplify-hosting/` (local build artifact).

## Notes

- Prior deploy (job 2 on app `dyqbeju4eyaze`) failed at the DEPLOY step: `Failed to find the deploy-manifest.json file in the build output`, confirmed via build log. Platform was manually flipped to `WEB_COMPUTE` via `aws amplify update-app` since the console-created app had stayed on static `WEB` (custom `amplify.yml` in repo bypassed Amplify's own SSR auto-detection).
- Checked `dist/discussions/server/*.mjs`: only Node built-ins (`node:module`, `stream`) remain as external imports — esbuild already bundled `express`/`@angular/ssr` deps, so `node_modules` does NOT need to be copied into `compute/default` (unlike the plain-Express AWS doc example).
- `src/server.ts` computes `browserDistFolder = join(import.meta.dirname, '../browser')` — this means inside `compute/default`, the layout must stay `server/server.mjs` + sibling `browser/`, so `entrypoint` in the manifest is `server/server.mjs`, not `server.mjs`.
- Schema confirmed against AWS's official Express deployment-manifest doc (docs.aws.amazon.com/amplify/latest/userguide/deploy-express-server.html): `version`, `framework`, `routes` (with a catch-all), `computeResources` (`name`, `runtime`, `entrypoint`) are required.

## History

<!-- Keep this updated. Earliest to latest -->

- **21-05-2026 — Claude Code Initialization** — Added CLAUDE.md, .claude/ skills (feature, hotfix), and context/ documentation files.
- **21-05-2026 — Category Description Field** — Added description field to Category model, Update Category modal, and API payload.
- **22-05-2026 — Update Bottom Links** — Implemented bottom links management in Forum Settings: card-based UI with drag-and-drop reordering (Angular CDK), add/delete links, responsive layout, and NgRx actions/effects/reducer/selector for saving.
- **22-05-2026 — Footer Links** — Made footer links functional: internal links (starting with `/`) use `routerLink`, external links use `href`; added `·` separator between links.
- **22-05-2026 — User Settings** — Created settings module at `/settings` with left-nav layout (E-Mail, Security, Picture, Informations, Signature) mirroring forum-settings; child components scaffolded empty.
- **23-05-2026 — Auth Guard** — Created `authGuard` (allows access to authenticated users only) and applied it to the `/settings` route.
- **23-05-2026 — User Settings E-Mail** — Added email change form to user settings: single email field pre-populated with current email, `PUT /user/email`, NgRx actions/effects/reducer/selector, store updated on success.
- **23-05-2026 — User Settings Password** — Added password change form to security settings: password and passwordConfirmation fields, `PUT /user/password`, field-level error display for `PASSWORD_MIN_LENGTH`, `PASSWORD_NOT_STRONG`, `PASSWORD_CONFIRMATION_NO_MATCH` via direct service call.
- **24-05-2026 — User Settings Picture** — Added profile picture management: placeholder icon or 128×128 image preview with red × to clear, "Change Picture" opens file manager, crop modal (ngx-image-cropper) in a separate component, Apply button calls `DELETE /file`, `POST /file`, and `PUT /user/profile-picture` as needed; NgRx action updates `user.image` in store.
- **29-05-2026 — User Settings Informations** — Added personal information form: Location (text), Gender (select), Date of birth (date) on one row on desktop / stacked on mobile; Biography textarea (10 rows); `PUT /user/personal-information`; NgRx actions/effects/reducer/selector update store on success.
- **30-05-2026 — User Settings Signature** — Added signature textarea (10 rows) to the Signature settings page; `PUT /user/signature`; NgRx actions/effects/reducer/selector update `user.signature` in store on success; success/error feedback messages.
- **01-06-2026 — Home Page** — Extended Forum model with `nbDiscussions`, `nbMessages`, `lastMessage` optional fields; added `getHome()` to ForumService; replaced `home` module with `forum` module — ForumHome fetches `GET /forum` into a signal and renders categories/forums via ForumLink shared component; added routes for `/:category`, `/:category/:forum`, `/:category/:forum/:discussion`; added SeoService and UtilService.
- **01-06-2026 — Category Page** — Added CategoryService with `getCategoryForums(categoryId)` calling `GET /category/:categoryId/forum`; CategoryHome reads category ID from URL slug, fetches data into a signal, and sets SEO title/description on success.
- **03-06-2026 — Get Discussions** — Added ForumMetaData and Discussion models; added `getForumMeta()` to ForumService; created DiscussionService with `getDiscussions(forumId, page)`; updated Forum component to fetch meta then discussions into signals, re-fetching on page query param changes; created shared Pagination component with smart ellipsis logic (Bootstrap 5); added SSR server route for `/:category/:forum`.
- **04-06-2026 — Get Discussion** — Added `DiscussionDetail` model and `getDiscussion()` to DiscussionService; added `Message` model and `MessageService` with `getMessages(discussionId, page)`; implemented Discussion component fetching discussion metadata then paginated messages into signals; added SSR server route for `/:category/:forum/:discussion`.
- **04-06-2026 — New Message** — Created shared `MessageInput` component: 8-row textarea (via `app-text-area`), Preview button opening a Bootstrap modal with markdown-rendered preview (`utilService.markdownToHTML`), Reply/Send button emitting the message; supports `isNew` and `onPost` inputs for dual new/reply mode; fixed `TextArea` no-label branch to bind `formControlName` and `placeholder`.
- **04-06-2026 — Create Discussion** — Added `NewDiscussionResult` model and `createDiscussion(title, forumId)` to `DiscussionService`; created `NewDiscussion` component at `/:category/:forum/new` with title input + `app-message-input [isNew]="true"`, sequential `POST /discussion` → `POST /message` API calls, then navigates to `/:category/:forum/:id-:slug` on success.
- **04-06-2026 — Breadcrumb** — Created shared `Breadcrumb` component (`BreadcrumbItem` model, home icon, `routerLink` navigation, current-item greyed styling); integrated into forum-home, category-home, forum, discussion, new-discussion, settings, and forum-settings pages.
- **17-08-2026 — Amplify SSR Build Config** — Added `amplify.yml` at repo root for AWS Amplify Hosting SSR (`WEB_COMPUTE`) deployment: `npm ci` + branch-conditional `ng build` (`--configuration=production` on `main`, `--configuration=development` elsewhere), artifacts `baseDirectory: dist/discussions` (containing `browser/` + `server/server.mjs`). Root cause of prior 404: the existing manually-deployed Amplify app was on the static-only `WEB` platform, which can't run SSR.
