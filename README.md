# Angular Deezer App

An Angular 21 music app that uses the Deezer API for artist/album discovery and includes playlist management.

Live deployment at https://angular-deezer-app.vercel.app

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run locally](#run-locally)
- [Environment and Config](#environment-and-config)
  - [Deezer API proxy](#deezer-api-proxy)
  - [Auth0](#auth0)
- [Available Scripts](#available-scripts)
- [Quality Gates](#quality-gates)
- [Technical Choices](#technical-choices)
  - [State Management (Signals vs NgRx)](#state-management-signals-vs-ngrx)
  - [PrimeNG with tailwind](#primeng-with-tailwind)

## Tech Stack

- Angular 21 (standalone APIs)
- TypeScript (strict mode)
- Signals-first state with RxJS interop where useful
- PrimeNG + Tailwind CSS
- Auth0 Angular SDK
- Dexie (IndexedDB)
- ESLint + Prettier + Husky + lint-staged
- Vitest (via Angular test builder)

## Project Structure

```text
src/
  app/
    features/
      album/
      artist/
      auth/
      playlists/
      search/
    shared/
      components/
      models/
      pipes/
      resolvers/
      services/
      stores/
      utils/
    app.config.ts
    app.routes.ts
  environments/
    environment.ts
db.ts
proxy.conf.json
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI

### Install

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Run locally

```bash
npm start
```

App runs on `http://localhost:4200`.

## Environment and Config

### Deezer API proxy

Requests are proxied through `/deezer-api` (see `proxy.conf.json`) to avoid CORS issues during local development.

### Auth0

Auth config can be found in `src/environments/environment.ts`.

Update the values for your own tenant/app:

- `auth0.domain`
- `auth0.clientId`

## Available Scripts

- `npm start` — start dev server (`ng serve`)
- `npm run build` — build app
- `npm run watch` — build in watch mode (development config)
- `npm test` — run unit tests
- `npm run lint` — run linting

## Quality Gates

- ESLint + Prettier are configured
- Pre-commit hook runs `lint-staged` (`.husky/pre-commit`)
- `strict` TypeScript mode is enabled

## Technical Choices

### State Management (Signals vs NgRx)

- Why I chose signal stores :
  - Responsive ui updates without manually subscribing
  - computed() simplified deriving state
  - debounce was still possible
  - Dexie liveQuery feeds directly into signals, so IndexedDB changes rehydrate UI automatically.
  - Less boilerplate : no actions/reducers/effects boilerplate for a scope where methods & signals are enough.
  - Most modern approach

- Reasons why I could have used NgRx instead
  - I was so used to using observables,I had to change a lot last minute to fit requirements for signal store. The final results aren't my best,so NgRx even with all of the boilerplating might have been a more efficient option for me personally.
  - NgRx tends to scale better,and my stores did grow bigger and bigger. NgRx would have made things easier in this aspect

### PrimeNG with tailwind

I chose PrimeNG with tailwind mainly to speed up development.

This ended up not being the case. I struggled to overwrite styles,I ended up trying various methods to achieve this (hence all the '!' important styles). The docs aren't super helpful on setting up new themes,and their theme builder is behind a paywall.
