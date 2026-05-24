# Password User Settings

## Overview

Update the user password.

## Requirements

- In the security component of the settings module add two input fields: password and password confirmation
- Add a div bellow with the classes border-top and pt-3 and inside this div put a Save button
- When the user click on save call the [PUT] user/password API with the following body parameters:
  - password
  - passwordConfirmation
- Display a success message on success
- Display the error if there is an error
