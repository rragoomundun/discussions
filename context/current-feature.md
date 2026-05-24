# Current Feature: User Settings Picture

## Status

In Progress

## Goals

- Display `fa-regular fa-circle-user fa-8x` icon centered when no profile picture
- If profile picture exists: display it at 128×128 px centered, with a red `fa-times` icon at top-right to clear it
- Clicking the `fa-times` icon sets the image to null
- Always show a centered "Change Picture" button below the picture/icon
- Clicking "Change Picture" opens the file manager (jpeg, png, gif, webp, single file)
- After file selection, open a crop modal (ngx-image-cropper): header with close (×) icon, footer with "Crop" and "Cancel" buttons; "Crop" confirms, "Cancel" discards
- After cropping, display the new cropped image preview
- Below the picture area, show a div (`.text-center.border-top.pt-3`) containing an "Apply" button
- On "Apply": if image was deleted or changed, call `DELETE /file` with `{ path: user.image }`
- If image was changed: call `POST /file` with the new Blob in `file` field, then call `PUT /user/profile-picture` with `{ path }` from the response; update `user.image` in the store to `API_URL + path`

## Notes

- Profile picture is stored in `user.image`
- Use ngx-image-cropper for the crop modal
- `API_URL` is available from the environment

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
