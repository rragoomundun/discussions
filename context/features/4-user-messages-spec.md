# User messages

## Overview

See messages posted by a specific user.

## Requirements

- When we enter /user/:id/messages route call API GET /user/:id/messages/meta to get the number of pages
- Also call API GET /user/:id/messages to get the user's messages. Send query param page if exists in url query parameters
- Display pagination (if they are more than one page) before and after the content
- When the user click on another page link call again /user/:id/messages with page query param
- Create a component in user module called message-item that represent a single message
  - The component should matches the items in mockup @context/mockups/user-messages.png
  - Create an appropriate breadcrumb using bootstrap breadcrumb (not breadcrumb component created in this project )
  - Replace "Category Name" with a link to the category where the message was posted
  - Replace "Forum Name" with a link to the forum where the message was posted
  - Replace "Discussion Name" with a link to the discussion (with page query parameter) where the message where posted
  - Display the date with the message appropriate date formated as it is on the mockup
  - Display the message (it is in markdown, so format it)
- When the content is loading show a div with class app-skeleton-loading-item

## Notes

GET /user/:id/messages returns { discussion { id, title, page }, forum { id, name }, category { id, name }, message { id, message, date } }
