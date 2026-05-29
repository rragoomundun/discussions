# Current Feature: User Settings Informations

## Status

In Progress

## Goals

- Add three inline fields on desktop (one per line on mobile): Location (text input), Gender (select: Not specific / Male / Female), Date of birth (date input, YYYY-MM-DD format)
- Add Biography textarea below (10 rows initial height), always on its own line
- Add a Save button div matching the style of the Security tab's bottom div
- On load, pre-populate all fields with the current user's values from the store
- On Save: `PUT /user/personal-information` with `{ birthday, location, gender, biography }`; on success update the store accordingly

## Notes

- Location, Gender, Date of birth on one row (`col` each) on desktop; stacked on smaller screens
- Biography always occupies its own row
- Match the bottom div style from the Security tab (`border-top pt-3 text-center`)

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
