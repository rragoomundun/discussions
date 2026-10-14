# Current Task: Action Display

## Status

In Progress

## Goals

- Hide the entire "Actions:" section on the discussion page when the logged in user is a moderator and the discussion author is a different moderator

## Notes

- Spec source: context/fixes/03-actions-display-spec.md
- Bug location: `src/app/modules/forum/components/discussion/discussion.html`, the outer `@if` wrapping `#this-status` only excludes admin-authored discussions for non-admins; it doesn't account for the moderator-viewing-another-moderator's-discussion case, so the "Actions:" label renders with no buttons underneath it (the inner `@if` already hides the buttons themselves in that case)
