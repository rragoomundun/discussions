# Current Task: Warning

## Status

In Progress

## Goals

- Add a "Warn" button to the footer of messages
- Add an ellipsis-vertical icon next to the user name on the profile page
- Clicking "Warn" (message footer) opens the "Give a warning" modal
- Clicking the ellipsis icon opens a dropdown whose first item is a "Warn" button, which also opens the "Give a warning" modal
- Create a shared `GiveWarning` modal component:
  - Input: `user` object `{ id, name }`
  - Title: "Give a warning to {name}"
  - Body: a text-area labeled "reason"
  - "Send" button at the bottom
  - On "Send": call `POST /warning` with body `{ message, userId }`
  - On success: hide the "Send" button and show "Warning sent to {name}"; on failure, display an error

## Notes

- The message footer "Warn" button only shows if the logged-in user is a moderator or admin AND the message's author is a regular user
- The ellipsis icon only shows if the logged-in user is a moderator or admin
- The `GiveWarning` component must be inserted into both the discussion component and the profile component
