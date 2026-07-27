# SkillMatch

Smart Internship & Skill Matching Platform — connects students with internship
opportunities based on their skills, education, experience, preferences, and
career goals.

> **Status:** Sprint 0 — project foundation only. No application features are
> implemented yet. See [Future Roadmap](#future-roadmap) for what's planned.

## Features

Nothing yet — Sprint 0 is foundation and standards only. Planned features are
listed under [Future Roadmap](#future-roadmap).

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build tool and dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling (via the Vite plugin)
- [React Router](https://reactrouter.com/) — client-side routing
- [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage) — backend
- ESLint 9 (flat config) + Prettier — linting and formatting
- Deployed on [Vercel](https://vercel.com/)

## Project Structure

```text
src/
├── assets/          Static images, icons, fonts
├── components/
│   ├── ui/          Small, generic, reusable primitives
│   └── shared/      Composed components reused across features
├── layouts/         Page shells that wrap routes
├── pages/           Route-level components
├── features/        Feature-scoped code (auth, internships, matching, ...)
├── hooks/           Reusable custom hooks
├── lib/             Third-party client setup (Supabase client)
├── services/        Data-access functions
├── types/           Shared TypeScript types
├── utils/           Pure helper functions
├── constants/       Fixed values and config
├── routes/          Router configuration
├── App.tsx
├── main.tsx
└── index.css
```

See [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md) for the reasoning behind
this structure and full coding conventions.

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A Supabase project (ask a teammate for access, or create your own for local dev)

### Installation

```bash
git clone <repo-url>
cd skillmatch
npm install
cp .env.example .env
# fill in .env with your Supabase project values (see below)
npm run dev
```

The app will be available at the URL Vite prints (typically `http://localhost:5173`).

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable                 | Description               | Where to get it                             |
| ------------------------ | ------------------------- | ------------------------------------------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL | Supabase Dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Public anon key           | Supabase Dashboard → Project Settings → API |

`.env` is gitignored and must never be committed. `.env.example` stays tracked
as documentation and must never contain real values.

## Development

```bash
npm run dev           # start dev server
npm run build          # type-check + production build
npm run preview        # preview the production build
npm run lint            # lint with ESLint
npm run lint:fix        # lint and autofix
npm run format          # format with Prettier
npm run format:check    # check formatting only
npm run typecheck       # type-check without building
```

## Git Workflow

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

`main` is production-ready code only. `develop` is the integration branch.
All work happens on a branch off `develop` and merges back via pull request.

## Branch Naming

`feature/<name>`, `fix/<name>`, `refactor/<area>`, `docs/<name>`, `chore/<task>`, `test/<name>`
— e.g. `feature/student-profile`, `fix/login-validation`.

## Commit Convention

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`,
`refactor:`, `docs:`, `style:`, `test:`, `chore:`, `perf:`, `build:`, `ci:`.

Example: `feat: add student profile page`

## Pull Request Guidelines

- All changes merge into `develop` via PR — no direct pushes to `main` or `develop`.
- A developer may not approve their own PR; one of the other two teammates must review.
- PRs should be scoped to a single feature or fix.
- Before merge: lint, build, and format checks must all pass, and the branch
  must be up to date with `develop`.
- Merge strategy: squash-merge feature branches into `develop`.

## Coding Standards

Full conventions (naming, TypeScript rules, React patterns) live in
[`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md).

## Team

3 developers building SkillMatch together.

## Future Roadmap

Planned, not yet implemented:

- Student accounts and profiles
- Company accounts and profiles
- Internship listings
- Internship search and filtering
- Internship applications
- SkillMatch scoring engine
- Skill-gap analysis
- Resume analysis
- Job-description analysis
- Personalized internship recommendations
- Notifications and messaging
- Admin dashboard
- Analytics
