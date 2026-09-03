# webapp-template

A minimal Vite + React + TypeScript app shell, extracted from a production app.
The features were removed; the infrastructure stayed. Use it as a GitHub
template repo and build your pages on top.

## Stack

- Vite 5 + React 18 + TypeScript (SWC)
- react-router-dom 6 for routing
- Tailwind CSS 3 with HSL design tokens (light + dark, class-based)
- shadcn/ui component library (Radix primitives) under `src/components/ui/`
- TanStack Query for server state
- Token-based auth wiring (localStorage bearer token + `/api/me` probe)
- Vitest + Testing Library (jsdom)
- Vercel SPA deploy config (`vercel.json`)

## Quickstart

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build to dist/
npm test           # vitest run
npm run lint       # eslint
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` if your API is not
same-origin.

## Directory guide

```
index.html                 Entry HTML; title/meta/favicon live here
vercel.json                Vercel SPA rewrites + cache headers
src/
  main.tsx                 React root
  App.tsx                  Providers + route table
  index.css                Design tokens (:root light, .dark) + base styles
  pages/                   Route components (Home, NotFound)
  components/
    Layout/MainLayout.tsx  App shell: header, footer, <Outlet />
    ProtectedRoute.tsx     Auth gate for private routes
    Logo.tsx               Placeholder wordmark (replace)
    ModeToggle.tsx         Light/dark/system switcher
    ui/                    shadcn/ui components (generic, keep or prune)
  contexts/
    AuthContext.tsx        Boot-time token probe, user state, signOut
    ThemeContext.tsx       Theme state, persists to localStorage
  hooks/                   use-toast, use-mobile
  lib/
    api.ts                 apiFetch: base URL + bearer token + 401 handling
    utils.ts               cn() class merger
  config/features.ts       Build-time feature flags
  test/                    Vitest setup + example test
```

## How to add a feature page

1. Create `src/pages/Thing.tsx` (default export a component).
2. Register it in `src/App.tsx` inside the `MainLayout` route group:
   `<Route path="/thing" element={<Thing />} />`.
3. If it needs auth, wrap it: `<ProtectedRoute><Thing /></ProtectedRoute>`.
4. Fetch data through `apiFetch` from `src/lib/api.ts` (usually inside a
   TanStack Query hook in `src/hooks/`), never raw `fetch` + localStorage.
5. Put user-facing colors on the tokens in `src/index.css`, not hex values.

## Auth wiring

There is no login page in the template. The pattern that survives:

- `src/lib/api.ts` owns the token (localStorage `app_auth_token`), the API
  base URL, and the 401-means-logout rule.
- `AuthContext` probes `GET /api/me` once on boot; `ProtectedRoute` redirects
  to `LOGIN_PATH` (`/signin`) when there is no user.
- To finish it: build a `/signin` page that obtains a token from your backend,
  stores it under `AUTH_TOKEN_KEY`, and navigates into the app.

## What was deliberately left out

- All product feature pages, hooks, and domain types from the source app.
- The service worker / offline fallback (add one back if you need PWA offline).
- Playwright e2e setup (the source app's e2e suite did not travel with it).
- Any real branding: logo, favicon, names, and manifest are placeholders.
- Backend code. This is the frontend shell only; it expects a bearer-token API.
