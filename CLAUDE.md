# Discussions

Discussions is a free and open source forum software built with Angular 21+ and SSR support.

## Context Files

Read the following to get the full context of the project.

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run start          # Dev server (ng serve)
npm run build          # Production build → dist/
npm run watch          # Build with watch in dev config
node dist/discussions/server/server.mjs  # Run SSR server after build
```

## Architecture

### Module structure

All feature modules are lazy-loaded. Root routes map to:

- `/setup` → initial forum configuration (runs once, no admin yet)
- `/auth` → register, login, password reset flows
- `/forum-settings` → admin-only panel (guarded by `adminGuard`)
- `/` → home page

### App initialization flow

`AppService.init()` runs at startup (via `provideAppInitializer`) and decides the initial navigation:

1. No config exists → redirect to `/setup`
2. Config exists but no admin → redirect to `/auth/register`
3. Otherwise → dispatch `getUser()` to hydrate the current session

### NgRx store

Three slices in `src/app/shared/store/`:

| Slice    | Purpose                       | Key state                                           |
| -------- | ----------------------------- | --------------------------------------------------- |
| `config` | Forum configuration and setup | `exists`, `config`, `bottomLinks`, status flags     |
| `user`   | Authenticated user session    | `user: User \| null \| undefined`, `onGetUser`      |
| `auth`   | Auth side-effects             | `logout` action triggers cookie deletion + redirect |

Status flags on async operations use the string pattern `'false' | 'true' | 'success' | 'error'`.

### HTTP layer

`apiInterceptor` (`core/interceptors/api/api-interceptor.ts`) prepends `environment.API_URL` to every request except i18n file loads (`/i18n/`). All API services use the base paths: `auth/`, `config/`, `user/`, `forum/`, `file/`.

### Shared components

`src/app/shared/components/` holds form primitives (Input, Checkbox, Select, TextArea, ImageInput) that use Angular's control container pattern — bind them with `formControlName` inside a parent `FormGroup`.

### i18n

Translation files live in `public/i18n/<lang>.json`. The app bootstraps with `lang: 'en'` and `fallbackLang: 'en'`. Use `TranslationService` (wrapper around ngx-translate) rather than injecting `TranslateService` directly.

### Conventions

- All components are standalone (no NgModules).
- Functional patterns throughout: `HttpInterceptorFn`, `CanActivateFn`, `createEffect()`.
- New Angular signal APIs (`input()`, `output()`) are preferred over `@Input()`/`@Output()` decorators.
- SSR is enabled; avoid direct `document`/`window` access — use `AppService.platform()` to detect browser vs server context.
