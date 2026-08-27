# Current Task: New Discussions Access

<!-- Fix name and short description -->

Restrict access to the "new discussion" feature to logged-in users only.

## Status

In Progress

## Goals

- Hide the "New Discussion" button in a forum when there is no logged-in user
- Guard the route `/:category/:forum/new` so it is only accessible to logged-in users (currently accessible to everyone)

## Notes

- Source spec: context/fixes/02-new-discussions-access-spec.md (requested as "01-new-discussions-access-spec.md", which doesn't exist — this is the only matching fix spec)
- Likely needs an auth-based guard (check existing `adminGuard` in `core/guards` for pattern) applied to the new-discussion route
- Button visibility should react to `user` slice of the NgRx store (`user: User | null | undefined`)
