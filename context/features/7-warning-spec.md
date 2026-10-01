# Warning

## Overview

Give warning to a user

## Requirements

- Add to the footer of messages a button with the text "Warn"
- Add to the user profile page, next to the user name an icon. Use the icon ellipsis-vertical from font awesome
- When the user click on the "Warn" button display the "Give a warning" modal
- When the user click on the ellipsis icon show a dropdown where the first element is a button with the text "Warn". When the user click on the "Warn" button display the "Give a warning" modal

### Give a warning

- Create a shared component called GiveWarning
- The GiveWarning component is a modal it takes as input an object called user with the fields { id, name }
- For the title of the modal display "Give a warning to {name}"
- In the body of the modal display a text-area with the label reason
- At the bottom add a "Send" button
- When the user click the "Send" button call the API POST /warning with as body { message, userId }
- If the warning was sent properly hide the "Send" button and show "Warning sent to {name}" otherwise display an error

## Notes

- The warn button at the bottom of a user message needs to be show only if the logged in user is a moderator or administrator and if the message's user is regular
- Only show the ellipsis-icon if the logged in user is a moderator or administrator
- The GiveWarning component needs to be inserted in the discussion component and in the profile component
