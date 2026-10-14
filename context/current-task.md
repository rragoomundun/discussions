# Current Task: Pinned Icon

## Status

In Progress

## Goals

- In the forum listing page (`/:category/:forum`), show a pin icon (`fa-solid fa-thumbtack`) before the lock icon for discussions where `pinned` is true
- On the discussion page (`/:category/:forum/:discussion`), show the same pin icon before the lock icon when the discussion is pinned

## Notes

- Spec source: context/features/14-pinned-icon-spec.md
- Spec says "/:category/:discussion" for the listing page; that route doesn't exist — treating it as the forum listing page (`/:category/:forum`), which renders `app-discussion-link` items and already has the lock icon
- Lock icon locations: `src/app/shared/components/discussion-link/discussion-link.html` (list item) and `src/app/modules/forum/components/discussion/discussion.html` (detail page)
- The `Discussion` list model (`src/app/shared/models/Discussion.ts`) doesn't have a `pinned` field yet (only `DiscussionDetail` does, added in the pinned-status feature) — needs to be added
