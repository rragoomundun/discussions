# Current Task: Banned User Limitations

## Status

In Progress

## Goals

- In a forum page (`/:category/:forum`), hide the "New Discussion" button when the logged in user is banned (no replacement message)
- In a discussion page (`/:category/:forum/:discussion`), hide the "Reply to this discussion" text area when the logged in user is banned, showing instead the message "You cannot reply because you are banned."
- Hide the "Edit" button at the bottom of a banned user's own messages

## Notes

- Spec source: context/features/12-banned-user-limitations-spec.md
- "Banned" means the user's `active` flag is `false`
