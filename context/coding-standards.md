# Coding Standards

## TypeScript

- No any types - use proper typing or unknown
- Define interfaces for all props, API responses, and data models

## File Organization

- Core Components: `src/app/core/components/*`
- Core Guards: `src/app/core/guards/*`
- Core Interceptors: `src/app/core/interceptors/*`
- Shared Components: `src/app/shared/components/*`;
- Shared Models: `src/app/shared/models/*`
- Shared Services: `src/app/shared/services/*`
- Modules: `src/app/modules/*`
- Modules Components: `src/app/modules/[module]/components/*`
- Modules Services: `src/app/modules/[module]/services/*`
- Store: `src/app/shared/store/*`

## Naming

- Models: PascalCase (`BottomLink.js`)
- Files: Match component name or kebab-case except for models files
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

## Styling

- Bootstrap 5 for all styling
- No inline styles

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible
