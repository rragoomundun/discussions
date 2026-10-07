# Current Task: Change user role

## Status

In Progress

## Goals

- In the user profile's ellipsis dropdown:
  - If the profile user's role is "regular", show an item "Set as moderator"
  - If the profile user's role is "moderator", show an item "Set as regular user"
- Clicking either item calls `PUT /user/:userId/role` with body `{ role }`, where `role` is `moderator` or `regular`

## Notes

- Admin only: the "Set as moderator" / "Set as regular user" items are visible only when the connected user is the administrator.
- This extends the ellipsis-icon visibility rule to also cover moderator-role profiles (currently it only shows for regular-role profiles viewed by a mod/admin) — for an admin viewer, the icon must also show on moderator profiles so this item is reachable.
