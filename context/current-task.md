# Current Task: Warning Limit

## Status

In Progress

## Goals

- Add `warningLimit` field to the Config model
- Create a new forum settings tab called "Warnings"
- In this tab, add an input component labeled "Warning limit" showing the current `warningLimit` value from the store
- Add a save button at the bottom of the tab
- On save click, call the API `/config/warning-limit` with body `{ limit }`, where `limit` is the input field value

## Notes

- The input field is a number with a minimum value of 5
- If the API returns an `INVALID` error, display under the input: "The warning limit must be greater or equals to 5"
