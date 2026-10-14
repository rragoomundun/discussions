# Current Task: Pinned Status

## Status

In Progress

## Goals

- On the discussion page, add a Pin / Unpin action alongside the other discussion actions (open/close, delete)
- Clicking Pin/Unpin calls `PUT /discussion/:discussionId/pinned` with body `{ pinned }` (boolean)

## Notes

- Spec source: context/features/13-pinned-status-spec.md
- `discussion.html` already has a commented-out Pin button placeholder in the actions block, and `DISCUSSION_PAGE.PIN` / `DISCUSSION_PAGE.UNPIN` translation keys already exist in en.json
