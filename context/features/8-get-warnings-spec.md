# Get warnings

## Overview

Get warnings for a specific user.

## Requirements

- In the Profile component, add a tab called "Warnings"
- In this tab call API /warning/all. It takes one query parameter: userId. It returns [{ id, message, date, moderator { id, name } }]
- If they are no warnings display: "No warnings"
- If they are warnings display them in cards (one card for one warning). For each cards :
  - Display in the top left:
    - "By {moderator.name}, {date}"
  - Display below the warning message. If there is no message display "No reason given."

## Notes

- Show the "Warnings" tabs only if:
  - The profile user is a regular user and the profile user id is the same as the connected user id
  - or if the profile user is a regular user and the connected user is the administrator or moderator
