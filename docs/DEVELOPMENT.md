# SkillMatch — Development Standards

This document is the practical reference for day-to-day development. The README
covers project setup; this file covers _how we write code together_.

## Folder Structure

```text
src/
├── assets/          Static images, icons, fonts
├── components/
│   ├── ui/          Small, generic, reusable primitives (Button, Input, Card)
│   └── shared/      Composed components reused across features (Navbar, EmptyState)
├── layouts/         Page shells (RootLayout, DashboardLayout) that wrap routes
├── pages/           Route-level components — one per route, composed from features
├── features/        Feature-scoped code (e.g. features/internships, features/matching),
│                    each holding its own components/hooks/types as it's built
├── hooks/           Reusable, cross-feature custom hooks
├── lib/             Third-party client setup (Supabase client, etc.)
├── services/        Data-access functions (API/Supabase calls), one module per resource
├── types/            Shared TypeScript types/interfaces used across features
├── utils/           Small, pure helper functions (formatting, validation, etc.)
├── constants/       Fixed values (routes, enums-as-const, config)
├── routes/          Router configuration
├── App.tsx
├── main.tsx
└── index.css
```

**Why this structure:** `pages` stay thin and route-focused, while `features`
lets each domain (auth, student profiles, internships, matching, admin) grow
independently without cross-contamination. `components/ui` vs `components/shared`
separates presentation-only primitives from composed, app-aware pieces. Nothing
is created here that isn't already justified by the roadmap in the README.

## Naming Conventions

### Files

| Type               | Convention                                    | Example                                 |
| ------------------ | --------------------------------------------- | --------------------------------------- |
| Components         | `PascalCase.tsx`                              | `InternshipCard.tsx`                    |
| Hooks              | `camelCase.ts`, prefixed `use`                | `useAuth.ts`                            |
| Utilities/services | `camelCase.ts`                                | `formatDate.ts`, `internshipService.ts` |
| Types              | `camelCase.ts`                                | `internship.ts`                         |
| Styles             | `kebab-case.css` (rare — Tailwind is primary) | `print-layout.css`                      |

### Components

- One component per file; file name matches the component name.
- Reusable, presentation-only pieces go in `components/ui`; anything that
  composes app/domain logic goes in `components/shared` or a `features/*` folder.
- Create a new component when: markup is reused in 2+ places, a section of a
  page exceeds ~100 lines, or a piece of UI has its own local state/logic worth isolating.
- Props: define an explicit `interface <ComponentName>Props`, destructure in
  the function signature, avoid optional props without a sensible default.

### Functions

- `camelCase`, verb-first (`getInternships`, `calculateMatchScore`).
- Async functions are named as their action, not suffixed `Async` (`fetchStudentProfile`,
  not `fetchStudentProfileAsync`) — the `Promise<T>` return type communicates that.
- Pure utility functions live in `utils/` and must not perform I/O.

### Variables

- `camelCase` for variables and functions; `SCREAMING_SNAKE_CASE` for true constants
  (`MAX_APPLICATIONS_PER_STUDENT`).
- Booleans read as a question: `isLoading`, `hasError`, `canSubmit`.
- Environment variables are prefixed `VITE_` (required by Vite to expose them
  client-side) and declared in `src/vite-env.d.ts` for type safety.

## TypeScript

- `strict: true` is enabled — do not weaken it.
- Prefer `interface` for object shapes that might be extended (props, entities);
  use `type` for unions, intersections, and function signatures.
- `any` is banned (`@typescript-eslint/no-explicit-any` is an error). Use `unknown`
  and narrow it, or model the real shape. If an `any` is truly unavoidable
  (e.g. an untyped third-party payload), it must be paired with a comment
  explaining why and ideally scoped with `// eslint-disable-next-line`.
- Handle nullable values explicitly — no non-null assertions (`!`) outside of
  narrow, obviously-safe cases (e.g. `document.getElementById('root')!` in `main.tsx`).
- Prefer union types (`type Status = 'pending' | 'accepted' | 'rejected'`) over
  enums for simple string sets; use `enum` only when you need reverse-mapping or
  namespacing benefits.
- Shared types live in `src/types/`, one file per domain concept
  (`internship.ts`, `student.ts`). Component-local prop types stay in the component file.
- Use `import type { X } from '...'` for type-only imports (enforced by
  `@typescript-eslint/consistent-type-imports`).

## React Conventions

- Functional components only, no class components.
- One default export per file for the main component; named exports for anything else.
- Local UI state: `useState`. Cross-cutting/shared state: lift to the nearest
  common ancestor first — don't reach for a global store until there's a proven need.
- Custom hooks encapsulate reusable stateful logic and always start with `use`.
- `useEffect` is for synchronizing with external systems (subscriptions, DOM,
  Supabase listeners) — not for derived state that can be computed during render.
- A component should do one thing: fetch-and-display logic belongs in a hook or
  service, not inlined in JSX-heavy components.

## Git Branch Workflow

```text
main
  └── develop
        ├── feature/<name>
        ├── fix/<name>
        ├── refactor/<area>
        ├── docs/<name>
        ├── chore/<task>
        └── test/<name>
```

- `main` — production-ready, deployable code only. Never commit directly.
- `develop` — integration branch; all feature branches merge here first.
- Branch names are lowercase, hyphenated: `feature/student-profile`, `fix/login-validation`.
- Create branches off `develop`, not `main`.

### Pull Requests

- Every change lands via a PR into `develop` (never a direct push).
- A developer cannot approve their own PR — at least one of the other two
  teammates must review and approve before merge.
- PRs should be scoped to one feature/fix — avoid bundling unrelated changes.
- Required before merge: lint passes, build passes, format check passes, no
  merge conflicts with `develop`.
- Merge strategy: squash-merge into `develop` to keep history readable;
  `develop` → `main` merges happen as a regular merge commit at release time.

## Commit Convention

Conventional Commits, enforced by convention (not tooling, for now — see below):

```text
feat:     new feature
fix:      bug fix
refactor: code change that neither fixes a bug nor adds a feature
docs:     documentation only
style:    formatting, no logic change
test:     adding or updating tests
chore:    tooling, dependencies, config
perf:     performance improvement
build:    build system or external dependency changes
ci:       CI configuration changes
```

Example: `feat: add student profile page`

We are not adding commit-linting tooling (e.g. commitlint + Husky) in Sprint 0 —
with 3 developers, a documented convention is enough overhead-for-value right
now. Revisit if commit messages drift once the team grows or CI is introduced.

## Common Commands

```bash
npm install         # install dependencies
npm run dev         # start local dev server
npm run build       # type-check + production build
npm run preview     # preview the production build locally
npm run lint        # run ESLint
npm run lint:fix    # run ESLint with autofix
npm run format      # format all files with Prettier
npm run format:check # check formatting without writing
npm run typecheck   # type-check without emitting/building
```
