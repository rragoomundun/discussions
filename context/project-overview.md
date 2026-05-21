# Discussions — Project Overview (v1)

## Core Idea

Discussions is a free and open-source forum platform that lets anyone self-host their own community forum, supporting both public and private threaded discussions.

---

## User Roles

| Role          | Capabilities                                                                            |
| ------------- | --------------------------------------------------------------------------------------- |
| **Admin**     | Full access: forum configuration, moderation of all users and moderators, participation |
| **Moderator** | Moderate regular users, participate in discussions                                      |
| **Regular**   | Participate in discussions only                                                         |

### Role Hierarchy

```
Admin
  └── Moderator
        └── Regular
```

---

## Features

### Authentication (all users)

| Feature              | Description               |
| -------------------- | ------------------------- |
| Register             | Username, email, password |
| Confirm Registration | Token sent by email       |
| Login                | Username + password       |
| Logout               | Ends session              |
| Forgot Password      | Recovery email sent       |
| Reset Password       | New password via token    |

### Profile (all users)

**Fields:** id, name, email, password, role, image, birthday, biography, location, gender, signature, active, createdAt

**Editable:** email, password, image, birthday, biography, location, gender, signature

**Public profile displays:**

- Number of discussions started
- Number of messages posted
- Registration date, role, birthday, location, gender, status, biography

Anyone can view all messages and discussions created by any user from their profile page.

### Content (all users)

- Create a discussion
- Read a discussion
- Post a message to a discussion

### Admin Only

**General Settings**

- Forum title and whether to show it in the header
- Language
- Logo and favicon, and whether to show the logo in the header
- Description and meta description

**Forums Configuration**

- Create, update, delete categories
- Create, update, delete forums

**Bottom Links**

- Create, update, delete bottom links

---

## Data Models

> These are not final and may evolve.

**User**

- id
- name
- email
- password
- role: `'admin' | 'moderator' | 'regular'`
- image
- birthday
- biography
- location
- gender: `'male' | 'female' | 'other' | null`
- signature
- active
- createdAt

**Config**

- title
- showTitle
- language
- logo
- favicon
- showLogo
- description
- metaDescription

**BottomLink**

- id
- label
- url
- order

**Category**

- id
- name
- description
- metaDescription
- order

**Forum**

- id
- name
- description
- metaDescription
- order
- categoryId

**Discussion**

- id
- title
- forumId
- authorId
- open
- createdAt
- updatedAt

**Message**

- id
- body
- discussionId
- authorId
- editorId
- createdAt
- updatedAt
- editedComment

---

## Tech Stack

| Layer            | Technology                 |
| ---------------- | -------------------------- |
| Framework        | Angular 21+ (SSR enabled)  |
| State Management | NgRx                       |
| Styling          | Bootstrap 5                |
| Icons            | Font Awesome 6 (free tier) |
| i18n             | ngx-translate              |

---

## Monetization

Free and open-source (v1). No monetization planned for this version.
