# Angular Project Rubric

> **Angular 21 · Deezer API · Standalone Components · Signals-first State**

---

## Choose Your Path

You have one API: **[Deezer API](https://developers.deezer.com/api)**

Build something impressive. Search for artists, explore albums, display track lists, visualise audio features — the scope is yours to define.

**Required features:**

**Playlist management:**

- Create, rename, and delete playlists
- Add and remove individual tracks
- Persist all of this in IndexedDB and rehydrate on app load
- Display a playlist count and total duration

**Artist → Album → Track flow:**

- Search must be debounced — no API call on every keystroke
- Artist page must show bio/info alongside the discography
- Album page must show release date, genre, and tracklist
- Each track must display duration, track number, and a playable 30s preview
- Must use route params for each drill-down level (`/artist/:id`, `/album/:id`)

**Free ideas:**

- [Music app UI redesign on Dribbble](https://dribbble.com/search/music-app)

---

## Expectations

### Git

- A repo with a meaningful README (setup instructions, Spotify app credentials, scripts)
- Many, many commits — grouped by feature, no broken/partial commits
- **Meaningful** branches (`feature/`, `fix/`, `chore/`)
- PRs that you haven't approved yourself — this means talking to one another
- Bonus points for meaningful comments on peers' work

---

### TypeScript

- [x] Strict mode enabled — `strict: true` in `tsconfig.json`
- [x] `any` anywhere — enforced via `@typescript-eslint/no-explicit-any`
- Interfaces or types for all Deezer API response shapes — be able to justify which you used and why
- Typed component inputs/outputs, typed service return values
- No non-null assertions (`!`) without a comment explaining why it's safe

---

### Project Setup & Structure

- **Angular 21** — standalone components throughout, zero NgModules
- Feature-based folder structure e.g. `src/app/features/search`, `src/app/features/artist`
- Separation of concerns — services handle API calls, components handle the view
- Naming conventions:
  - TypeScript — `camelCase`
  - CSS/files — `kebab-case`
  - Components — `PascalCase`
  - Observables (if used) — `observable$` suffix
  - Names should be obvious and non-ambiguous
- [x] ESLint + Prettier configured
- ESLint + Prettier passing

---

### Accessibility

- 100 on Lighthouse accessibility audit
- Semantic HTML throughout — no div soup
- ARIA attributes where Angular CDK a11y isn't sufficient
- Keyboard navigable — focus management on route changes

---

### Angular

- Standalone components with explicit `imports` arrays
- Input signals (`input()`) and output signals (`output()`) — no legacy `@Input`/`@Output` decorators
- `@for`, `@if`, `@defer` control flow — no legacy `*ngFor`/`*ngIf`
- Computed signals with `computed()` for derived state
- Effects with `effect()` for side-effects — justified usage
- `inject()` instead of constructor injection
- Smart use of Angular pipes — custom pipe where appropriate
- Reactive forms with typed `FormGroup`/`FormControl`

---

### Routing

- Clean route config — well-structured `app.routes.ts`
- Lazy loading with `loadComponent` for all feature routes
- Route params used meaningfully e.g. `/artist/:id`, `/album/:id`
- Protected routes using an Auth guard (Deezer OAuth flow)
- Route resolvers or deferred loading for initial data
- Bonus: breadcrumbs, animated route transitions

---

### UI Design

- Objective design — colour, contrast, visual hierarchy, whitespace, consistency, scale
- Fully responsive — mobile through desktop, no horizontal scroll
- User feedback on all async actions — loading states, error states, empty states
- Styling choice justified and applied consistently (Angular Material, Tailwind, SCSS+BEM, etc.)
- **Hint: copy from people who do this for a living** — Deezer's own UI, Dribbble, etc.

---

### ESLint / Static Analysis

- ESLint passing with zero warnings
- [x] `@angular-eslint` rules enabled
- [x] `no-explicit-any`, `no-unused-vars`, `eqeqeq` rules active
- [x] Prettier integrated
- [] Prettier consisten

---

### State Management — NgRx or Signals (your choice)

> You must justify your choice. Be able to explain the trade-offs.

**If NgRx:**

- Actions, Reducers, Selectors, Effects
- No logic leaking into components
- Deezer token/auth state managed in the store

**If Signals:**

- `signal()`, `computed()`, `effect()`
- Injectable signal stores (`@Injectable` service with signals)
- `rxResource` or `toSignal` for `HttpClient` interop

**RxJS is not forbidden** — but if you use it, be able to explain why a Signal didn't suffice. Minimal RxJS is the expectation.

---

## Rubric

### Requirements: /80 (weighted: 75%)

| Category                           | Marks   |
| ---------------------------------- | ------- |
| Git — branches, PRs, and reviews   | /10     |
| Accessibility (a11y)               | /5      |
| TypeScript                         | /5      |
| Project setup & structure          | /5      |
| Code quality                       | /10     |
| Angular                            | /10     |
| Routing                            | /10     |
| UI design                          | /10     |
| ESLint / static analysis           | /5      |
| State management (NgRx or Signals) | /10     |
| **Total**                          | **/80** |

---

### Bonuses: /50

| Bonus                       | Notes                                                        |
| --------------------------- | ------------------------------------------------------------ |
| Hosted deployment           | Firebase, Render, GitHub Pages, Vercel, etc.                 |
| Deezer OAuth auth           | Real OAuth flow, token refresh, protected routes             |
| Custom directives / pipes   | Reusable structural or attribute directives                  |
| Animated routes             | View Transitions API or Angular animations                   |
| Virtual / infinite scroll   | CDK Virtual Scroll for track lists                           |
| Excellent design            | Goes beyond functional — genuinely impressive UI             |
| Audio preview               | Play Deezer 30s previews inline                              |
| Graphs & data visualisation | Top artists, audio feature radar charts, play history        |
| Caching & rehydration       | localStorage / IndexedDB with signal store rehydration       |
| Advanced state              | Derived state, optimistic updates, undo                      |
| Size optimisations          | Bundle analysis, tree-shaking, image lazy loading            |
| RxJS flexing                | Debounced search, retry logic, switchMap/mergeMap strategies |

---

## Scoring Summary

|                      |                     |
| -------------------- | ------------------- |
| Requirements (/80)   | × 75% weighting     |
| Bonus                | /50                 |
| **Total (max 125%)** | **\_\_\_\_ / 125%** |

---

## Angular 21 Gotchas

These are not optional modernisations — they are the Angular 21 way. Using legacy APIs will cost you marks:

- `input()` / `output()` signals replace `@Input` / `@Output` decorators
- `@for` / `@if` / `@defer` replace `*ngFor` / `*ngIf` structural directives
- `inject()` replaces constructor injection
- Standalone components replace NgModules entirely

---

### Due Date: CoB [INSERT DATE]
