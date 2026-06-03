# Get Discussions

## Overview

Get discussions in a forum.

## Requirements

- Call API [GET] /forum/:forumId/meta. It returns the following data : `id, name, category {id, name}, nbPages`. Create a model called ForumMetaData and store the information in a signal
- After getting the meta datas call API [GET] /discussion/all. It takes the query parameter `forumId`, the forum id and the query parameter `page`, the page number. It returns an array of the following object `id, title, open, createdAt, user {id, name}, nbMessages, lastMessage {messageId, date, user {id, name}}`. Save the response in a model called Discussion with the appropriate structure
- Create a shared pagination component that takes as input the number of pages and read `page` as query parameter to select the appropriate page. Display the pages number from 1 to nbPages.

## Notes

- The component that we are wokring with is forum
- Do not store the data into the store, use signals instead
- Do not write the HTML/CSS (except for the pagination), I'll do this
