# Search

## Overview

Search functionality.

## Requirements

### Search bar

- Implement search bar as it is shown on these mockups.
  - Desktop: @context/mockups/search-desktop.png
  - Mobile: @context/mockups/search-mobile.png
- When the user click on search, go to page /search with query parameter query and empty the search bar

### Search page

- Create module search with component search availale at route /search
- Have a breadcrumb as it is on @context/mockups/search-desktop
- Make the input take the query value
- On component load or on click the search icon (in the header or next to the search bar), call the following APIs:
  - /search/meta (takes query as query parameter): return { nbPages } the number of pages for the search results. On load display a loading skeleton.
  - /search (takes query as query parameter): return { discussion { id, title }, forum { id, name }, category { id, name }, message { id, message, date }, user { id, name, role } }. On load display a loading skeleton.
- Display the pagination
- Display the results: create a component called search-result and display it as it is on @context/mockups/search-desktop.png and @context/mockups/search-mobile.png
- When the user click on a different page link call again /search with in addition page query parameter

## Notes

### Search bar mobile

- For the search bar on the mobile version:
  - Keep it hidden by default.
  - Display it when the user click on the search icon. Empty the content.
  - If it is displayed and the user click on the search icon in the header or on the search icon next to the search input, hide it.
