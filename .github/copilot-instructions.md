# Copilot instructions for this repository

## Project overview

This repository is a Vite + React + TypeScript application for the UD ULFA auth and dashboard experience. The app uses React Router for route-based screens, Tailwind utility classes for styling, and Zod schemas for form validation.

Most of the app logic is intentionally organized by feature domain rather than by technical layer alone:

- `src/pages` contains route-level screens (login, forgot password, OTP verification, reset password, dashboard).
- `src/features/auth` contains the auth flow: components, hooks, schemas, and mock account data.
- `src/features/dashboard` contains dashboard UI and chart components plus the dashboard hook.
- `src/App.tsx` is the root router and defines the app's navigation.

The codebase is designed around a local mock-auth pattern: credentials are checked against `registeredAccounts`, and the active user is stored in `localStorage` or `sessionStorage` rather than through a backend API.

## Commands

Run the project from the repository root:

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Lint the project: `npm run lint`
- Preview production build: `npm run preview`

There is no automated test runner configured in this repo right now (`package.json` does not define a `test` script, and no Vitest/Jest setup is present). There is therefore no single-test command to document yet.

## Architectural patterns to preserve

- `src/App.tsx` owns the top-level router and route map.
- Route pages in `src/pages` should stay thin and compose feature hooks/components instead of embedding business logic directly.
- Auth-related UI is grouped under `src/features/auth` with a consistent pattern:
  - `components/`: presentational UI
  - `hooks/`: stateful logic and page interactions
  - `schemas/`: Zod validation schemas
  - `data/`: mock or static domain data
- Dashboard UI is grouped under `src/features/dashboard` with chart components and a `useDashboard` hook for active-user state and logout behavior.
- Styling is Tailwind-first; prefer utility classes and component-level composition rather than introducing large custom CSS overrides unless a feature genuinely requires it.

## Code conventions specific to this repo

Follow the project-specific React SOP in `.github/instructions/react-coding-sop.instructions.md` when editing files under `src/**`:

- Pages should orchestrate layout and delegate logic to custom hooks.
- Presentational components should not fetch data or perform business validation inline.
- Form validation should use Zod schemas (`safeParse`, `z.object`, etc.) instead of ad hoc manual validation.
- Custom hooks are the place for UI logic such as form state, submit flows, navigation, and local storage/session logic.
- Keep stateful logic near the feature that owns it; do not introduce global Zustand stores unless the feature truly requires cross-screen state.

For this codebase specifically:

- Auth flows use `useNavigate()` for route transitions after successful login, password reset, or OTP verification.
- Validation and error mapping are typically done in the feature hook and surfaced through `errors` objects to the form UI.
- The mock auth account list is intentionally static; when changing credentials or roles, update `src/features/auth/data/registeredAccounts.ts` and any connected schema assumptions.
- Dashboard and auth flows rely on browser storage keys such as `udulfa_active_user` to preserve the session; when changing these keys, adjust reads and writes together.

## Working style expectations

- Prefer changes that stay aligned with the existing folder structure and naming patterns.
- Keep route-level concerns in the page files, not in low-level components.
- When adding a new auth or dashboard flow, mirror the structure already used by `useLoginForm`, `loginSchema`, and the corresponding view components.
- Do not add generic “best practice” instructions or unrelated architectural layers unless the repository already uses them.

This repository is intentionally compact and feature-oriented; the most important guidance is to preserve the existing `features/*` organization and the Zod-driven validation pattern while keeping pages lightweight and routing-driven.
