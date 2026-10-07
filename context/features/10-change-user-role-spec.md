# Change user role

## Overview

Change a user role

## Requirements

- In the user profile:
  - If the user role is "regular", display in the dropdown menu an item "Set as moderator"
  - If the user role is "moderator", display in the dropdown menu an item "Set as regular user"

## Notes

- Clicking on "Set as moderator" or "Set as regular user" calls the API PUT /user/:userId/role. It takes a body { role } where role can be moderator or regular.
