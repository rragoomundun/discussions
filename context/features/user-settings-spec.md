# User Settings

## Overview

Create the user settings page structure.

## Requirements

- Create a new module called settings
- The module need to contain the following components:
  - settings
  - email
  - security
  - picture
  - informations
  - signature
- The settings component is wired to the /settings route
- At the top display Settings just like Forum Settings in the forum settings component.
- The rest of the settings view is separated in two parts:
  - The first part on the left contain the navigation (use the same style as the navigation on the forum settings page). It contains the following items:
    - E-Mail -> /settings/email
    - Security -> /settings/security
    - Picture -> /settings/picture
    - Informations -> /settings/informations
    - Signature -> /settings/signature
  - The second part contains a router outlet that display the current part of the setting

## Notes

- For the moment don't put anything into these components: email, security, picture, informations, signature. Only make the settings component.
