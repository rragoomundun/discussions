# Picture User Setting

## Overview

Add the possibility for the user to change its profile picture.

## Requirements

- In the picture component, displays at the center this icon: fa-regular fa-circle-user fa-8x if there is no profile picture for the user
- If there is a profile picture:
  - Displays it in the center with a dimension of 128x128 px
  - Displays with the color --app-color-red a fa-times icon at the top right of the picture
- When the user click on the fa-times icon set to null the image
- Always display below the picture or user icon and in the center a button with the text "Change Picture"
- When clicking on "Change Picture" open the file manager and allow the user to select a single image in the jpeg, png, gif, webp format. Then:
  - Open a modal that allows the user to crop the image with the ngx-image-cropper library. In this modal, have in the header at the right a times icon to close it (and cancel changing the image) and have in the footer, at the bottom right two buttons: "Crop" and "Cancel". Clicking on "Crop" will crop the image while clicking on "Cancel" will cancel what we are doing
  - After finishing cropping display the new image
- Have below a div with the following classes: text-center border-top pt-3. Inside this div have a button with the text "Apply". When clicking on "Apply":
  - If the image has been deleted or changed call the [DELETE] /file API with as body parameter the field `path` that equals the user's `image` field
  - If the image has been changed call the [POST] /file API with as parameter the Blob of the new file in the field file. Then call the route [PUT] /user/profile-picture with as body a `path` field that contains the value of the `path` field returned by the [POST] /file API. Also update the `image` field of the `User` model to take the value of `API_URL` (in environment) + `path`

## Notes

- The profile picture link is the image field of the User object.
