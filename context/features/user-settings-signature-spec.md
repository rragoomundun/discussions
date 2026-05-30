# Update User Signature

## Overview

Update the user signature.

## Requirements

- In the signature component of the settings module add a text area where the user can write a signature
- Use the label "Signature" for the text area
- In the text area have the following placeholder: "Write a signature that will be displayed below your messages."
- Have below the text area a div like in the informations component with the button "Save"
- When the user click on "Save" call the API [PUT] /user/signature to update the signature. If successful update the signature in the store and display a success message. If not successful display an error message
