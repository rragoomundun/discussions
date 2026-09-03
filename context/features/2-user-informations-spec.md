# User informations

## Overview

Display a user informations.

## Requirements

- Work on the "Informations" tab of the user profile
- Call API /user/:id/informations to get the user informations. The API returns { birthday, location, gender, biography }
- Display the information as it is showned on the @context/mockups/user-information.png mockup. The biography is the text on the right, the rest is on the left.
- If an information of the left area is not available displays "Unknown" instead
- If the biography is empty, display "This user didn't add a biography."
- When loading use class app-skeleton-loading-item on divs to show that it is loading

## Notes

- The biography field is in markdown so use the markdownToHTML function to format it.
