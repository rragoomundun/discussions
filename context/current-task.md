# Current Task: User Messages

## Status

Completed

## Goals

- Implement the "Messages" tab of the user profile (`src/app/modules/user/components/messages/`)
- On entering `/user/:id/messages`, call `GET /user/:id/messages/meta` to get the number of pages
- Call `GET /user/:id/messages` to get the user's messages, forwarding the `page` query param when present
- Display pagination (only when more than one page) before and after the content
- Clicking a pagination link re-calls `/user/:id/messages` with the new `page` query param
- Create a new `message-item` component in the `user` module representing a single message, matching `@context/mockups/user-messages.png`:
  - Breadcrumb-style header built with Bootstrap's own breadcrumb classes (not this project's `Breadcrumb` component): "In {Category Name} / {Forum Name} / {Discussion Name}"
    - Category Name links to the category
    - Forum Name links to the forum
    - Discussion Name links to the discussion (with a `page` query param)
  - "Posted: {date}" formatted as shown in the mockup
  - The message body (markdown, rendered to HTML)
- Show loading state using the `app-skeleton-loading-item` class

## Notes

- Source spec: `context/features/4-user-messages-spec.md`
- Mockup reference: `context/mockups/user-messages.png`
- `/user/:id/messages` response shape (per item): `{ discussion: { id, title, page }, forum: { id, name }, category: { id, name }, message: { id, message, date } }`
- `Messages`/`getMessages()` mirrors the `Discussions` component's meta+pagination pattern (page only sent to the API when present in the URL, pagination hidden when only one page)
- Reused `MESSAGE_COMPONENT.POSTED` translation key and its `"MMM d, yyy, HH:mm"` date format for the "Posted:" line, matching the mockup and the existing `message` component exactly
- Category/forum/discussion links use the app's standard `id-slug` URL convention; the discussion link carries `?page={discussion.page}` as specified
- Verified live against the running local API: breadcrumb links (category/forum/discussion) resolve correctly, markdown message body renders, and clicking a pagination link (both the top and bottom controls) correctly loads the new page
