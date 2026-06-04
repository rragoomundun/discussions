# Get Discussion

## Overview

Get a discussion.

## Requirements

- Call API [GET] /discussion/:discussionId to get the discussion informations. It return the following object `{id, title, open, forum {id, name}, category {id, name}, nbPages}`
- Then call API [GET] /message/all. It takes two query parameters: `discussionId` the discussion id, `page` the page to get. It returns an array of the following object: `{id, message, date, editedDate, editionComment, author {id, name, image, signature}, editor {id, name}}`

## Notes

- We are working with the discussion component
- Do not store the information in the store, use signals instead
- Do not write HTML/SCSS, I will do this
