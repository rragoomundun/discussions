# Guards

## Overview

Add guards to /setup and /auth/\* .

## Requirements

Currently the routes /setup and /auth/\* are always accessible no matter the user and no matter if there is a logged in user or no. This is bad.

- The /setup route should only be accessible if there is no configuration (`getExists()` in `Config` service returns field `config` with the value of `false`). Create a guard that check this and add it to the setup route.
- The /auth/\* routes should not be accessible if there is a logged in user. Add a guard that fix this.
