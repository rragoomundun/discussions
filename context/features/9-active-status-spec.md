# Active status

## Overview

Change the active status of a user.

## Requirements

- In the user profile, if the user is a regular user and the logged in user is a moderator or the administrator, show the ellipsis icon
- In the dropdown of the ellipsis:
  - If the user is active show an item "Ban user"
  - If the user is not active show an item "Unban user"
- When the logged in user click on "Ban user" or "Unban user", call API PUT /user/:userId/active and pass the body { active }. active is true if the logged in user selected "Unban user", active is false if the logged in user selected "Ban user"
