# Current Feature: Update Bottom Links

## Status

In Progress

## Goals

- Display all bottom links in the Forum Settings -> Bottom Links section as cards (one link per card)
- Each card contains a form with two fields: Link text and Link URL
- Show a `fa-times` icon on the right of each card; clicking it deletes the link
- On tablet and desktop, cards take 50% of available width; on mobile, cards take full width
- Cards are never displayed two side-by-side (single column layout even on wider screens)
- "Add Link" button at bottom-left under the cards to add a new link
- "Save" button below "Add Link" to save the links configuration and update bottom links in the app state

## Notes

- Use the same design as the rest of the forum settings
- Bootstrap 5 column classes for responsive width (col-12 col-md-6)
- Bottom links are already in the NgRx config slice

## History

<!-- Keep this updated. Earliest to latest -->

- **21-05-2026 — Claude Code Initialization** — Added CLAUDE.md, .claude/ skills (feature, hotfix), and context/ documentation files.
- **21-05-2026 — Category Description Field** — Added description field to Category model, Update Category modal, and API payload.
