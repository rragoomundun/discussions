# User discussions

## Overview

Get the discussions for a user.

## Requirements

- When we enter /user/:id/discussions route call API GET /user/:id/discussions/meta to get the number of pages
- Also call the API /user/:id/discussions to get the user's discussions. Send query param page if exists in url query parameters
- Display pagination before and after the content
- Display the content by using app-discussion-link component
- When the content is loading show a div with class app-skeleton-loading-item
- When the user click on another page link call again /user/:id/discussions with page query param

## Notes

- The content returned by /user/:id/discussions returns the following array [{id, title, open, createdAt, user { id, name, role}, nbMessages, lastMessage { messageId, date, user {id, name} }}]
