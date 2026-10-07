# Current Task: Center username with ellipsis icon

## Status

In Progress

## Goals

- On the user profile page, when the ellipsis-vertical dropdown icon is shown next to the username, the username should remain visually centered the same way it is when the icon isn't shown (and the same way the role line below it is centered)
- Currently the name+icon group is centered as a whole, which pushes the name itself off-center relative to the role line underneath it (see attached screenshot: "Nadine ⋮" sits right of the centered "(Moderator)" text below it)

## Notes

- Root cause: `#this-name-box` in `src/app/modules/user/components/profile/profile.html` / `.scss` centers the name and the ellipsis dropdown together as one flex group, so the name text's own center shifts left of true center whenever the icon is present
- A previous attempt added a `this-profile-margin-left` class binding on the `<h1>` to compensate, but that class's CSS rule no longer exists in `profile.scss` — so no compensation currently applies
- Fix approach: keep the username centered independently (same as the role line), and position the ellipsis dropdown so it doesn't affect that centering — e.g. absolutely position the dropdown relative to the name instead of including it in the centered flex group
