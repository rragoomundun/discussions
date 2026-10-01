# Current Task: Active status

## Status

In Progress

## Goals

- In the user profile, show the ellipsis icon if the profile user is a regular user AND the logged-in user is a moderator or admin
- In the ellipsis dropdown:
  - If the profile user is active, show a "Ban user" item
  - If the profile user is not active, show an "Unban user" item
- On click, call `PUT /user/:userId/active` with body `{ active }`:
  - `active: true` when "Unban user" was clicked
  - `active: false` when "Ban user" was clicked

## Notes

- This changes the existing ellipsis-icon visibility rule (previously also required the profile user to be active) — the icon should now show for any regular-user profile viewed by a mod/admin, active or not, so the ban/unban action stays reachable
