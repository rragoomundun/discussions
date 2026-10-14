# Pinned status

## Overview

Change the pinned status.

## Requirements

- On the discussion page, in the actions, add a Pin / Unpin action that allows to pin or unpin the discussion
- When the user click on pin or unpin call API /discussion/:discussionId/pinned . It takes as body { pinned } where pinned is a boolean
