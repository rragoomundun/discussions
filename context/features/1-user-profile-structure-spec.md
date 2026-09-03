# User Profile Structure

## Overview

User profile structure.

## Requirements

- Create module user
- Create components in this module: profile, informations, discussions, messages
- Create route structure /user/:id (profile component) that have the following child routes:
  - /informations (informations component)
  - /discussions (discussions component)
  - /messages (messages component)
- If the route is /user/:id redirect to /user/:id/:information
- On profile component load, call API /user/:id. API returns { name, role, nbDiscussions, nbMessages, createdAt }
- Display the data as shown on @context/mockups/user-information.png.
- Display the breadcrumb with the user name
- Display the profile picture (if exists otherwise display assets/images/user.png). Use 128px x 128px dimensions
- Display the member name and below display the user role (Admin for admin, Moderator for moderator, and Member for regular)
- Display bellow the following statistics: nb discussions, nb messages, joined date (createdAt field) with format D MMMM Y
- Display also the tabs but don't put any content inside expect <router-outlet> to display the appropriate component depending on the route
- Each tab load a specific route:
  - Informations -> /user/:id/informations
  - Discussions -> /user/:id/discussions
  - Messages -> /user/:id/messages
