# Warning limit

## Overview

Manage warning limit

## Requirements

- Add field warningLimit to the Config model
- Create a new forum settings tab called Warnings
- In this tab have an input component with label Warning limit and show in the input the value of warningLimit from the store
- Have a save button at the bottom
- On click on save call the API /config/warning-limit with body { limit }. Limit is the value of the input field

## Note

- The input field is a number that have a minimum value of 5
- If the API return an INVALID error display under the input "The warning limit must be greater or equals to 5"
