# Current Task: Get warnings

## Status

In Progress

## Goals

- Add a "Warnings" tab to the Profile component
- In this tab, call `GET /warning/all` with query param `userId`, returning `[{ id, message, date, moderator: { id, name } }]`
- If there are no warnings, display "No warnings"
- Otherwise display one card per warning:
  - Top left: "By {moderator.name}, {date}"
  - Below: the warning message, or "No reason given." if empty

## Notes

- Only show the "Warnings" tab if:
  - the profile user is a regular user AND the profile user's id matches the connected user's id
  - OR the profile user is a regular user AND the connected user is an administrator or moderator
