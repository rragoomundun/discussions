# Current Task: User Informations

## Status

Completed

## Goals

- Implement the "Informations" tab of the user profile (`src/app/modules/user/components/informations/`)
- Call API `/user/:id/informations`, which returns `{ birthday, location, gender, biography }`
- Display the data as shown in `@context/mockups/user-information.png`:
  - Left area: birthday, location, gender
  - Right area: biography
- For any missing field in the left area, display "Unknown" instead
- If biography is empty, display "This user didn't add a biography."
- Show loading state using the `app-skeleton-loading-item` class on divs while data loads

## Notes

- Source spec: `context/features/2-user-informations-spec.md`
- Mockup reference: `context/mockups/user-information.png`
- Biography field is markdown — format it with the `markdownToHTML` function (`src/app/shared/utils/text/text.util.ts`)
- Reused existing `GENERAL.DATE_OF_BIRTH`/`LOCATION`/`GENDER`/`MALE`/`FEMALE` labels (matching the settings informations form) rather than the mockup's literal "Birthday" wording, for consistency across the app
- Added `GENERAL.UNKNOWN` and `USER_PAGE.INFORMATIONS_PAGE.NO_BIOGRAPHY`/`ERROR` translation keys
- `:id` is read from the parent route's params (`route.parent.snapshot.paramMap`) since the child route doesn't inherit it by default
- Verified against the running local API: real user with birthday/location/gender/biography set renders correctly (multi-line markdown), and a user with none of those set correctly shows "Unknown" for each field and the no-biography fallback message
