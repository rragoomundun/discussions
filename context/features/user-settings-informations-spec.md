# Informations User Settings

## Overview

Update the user informations.

## Requirements

- In the informations component add the three following fields:
  - Location: a text input
  - Gender: a select that can be "Not specific", "Male", "Female"
  - Date of birth: a date input with the format YYYY-MM-DD
- Also add the biography textarea below. Show initialy 10 rows
- Have a div with the same style as the div on the security tab. Inside this div have a "Save" button.
- When the user click on "Save" make a put request to the API /user/personal-information with the following fields: birthday, location, gender, biography. If the request succeed update the informations in the store accordingly

## Notes

- On the component load display the values into their specific fields
- Location, Gender, and Date of birth needs to be on the same line on desktop whereas on lower resolution we need to have one field per line
- Biography is always on another line
