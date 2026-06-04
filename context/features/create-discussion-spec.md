# Create Discussion

## Overview

Create a new discussion.

## Requirements

- Create a new component in modules/forum/components called NewDiscussion. This component have to be accessible at /:category/:forum/new
- Have an input field (use custom input component) with the label "Title"
- Have a message-input field with the input isNew set to true
- When the user submit call the API [POST] /discussion and save the result in a signal. The result have this format: `id, title, open, createdAt, updatedAt, forumId, userId`
- If the previous API call succeed, call then the API [POST] /message with the following body: `{message, discussionId}`
- If the previous API call succed, navigate to /:category/:forum/:discussionId-:discussionTitle . Use the UtilService.getSlug function to format the discussion title
