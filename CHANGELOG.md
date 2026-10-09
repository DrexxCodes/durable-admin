# Changelog

## v2.0.0 – Next.js + glass makeover (from the CRA `superadmin`)

### Core (not touched)
- `durable-backend`: no changes.
- `src/Data/**` (actions, reducers, context, action types, config): same logic. Only import paths were rewritten
  to the `@/` alias, plus one compatibility edit below.
- Every URL still resolves exactly as before (`/users/profile/:id`, `/controls/data/:id`, `/wallets/...`). The old
  `PageRender` naming rules were ported 1:1 into `config/routes.js` (`resolvePageName`).

### Compatibility edits (needed for "latest" packages)
- `src/Data/Store.js`: `legacy_createStore` + named `{ thunk }` (identical to the user app). Redux 5 / redux-thunk 3
  no longer have the old default export.
- `features/Transactions/index.jsx`: the 3 `useReactToPrint` calls also pass `contentRef` (react-to-print v3).
- `lib/router.js`: react-router replacement now also carries `navigate(path, { state })` / `useLocation().state`
  (sessionStorage, keyed by destination path). The admin uses it for user -> wallet / purchase / profile hand-offs;
  the user app's version dropped it.

### Logic / UX fixes
- Opening a logged-in page while signed out (bookmark, refresh with an expired token) now goes to
  `/login?next=<page>`, and login returns there. Previously it showed the 404 page.
- No more flash of login / 404 while a stored token is being verified (`BootContext`, set after `loadUser`).
- Dashboard: removed a stray `;` that rendered under the stat cards (`views/app/dashboard.jsx`).
- Sidebar items still come from `sidebarList` in the context, so the white-label `show` rules are unchanged.
- Idle auto-logout kept at 30 minutes. Success / error dialogs keep the old behaviour.
- Back-office is now `noindex`.

### UI (glassmorphism, responsive)
- New `styles/admin.css` on top of the shared theme: aurora background, frosted sidebar / top bar / bottom bar /
  dialogs / cards / calendar, gradient primary buttons, brand sheen on the dashboard stat cards, solid fallback when
  `backdrop-filter` is unsupported, reduced-motion respected.
- New shell: grouped, collapsible desktop sidebar (Overview / Manage / Updates); phone bottom tabs
  (Home, Users, Sales, Wallet) + a "More" sheet for the other ~10 sections; top bar with greeting, bell, avatar.
- Sign-in / activate / forgot-password share one split glass layout (`components/layout/AuthLayout.jsx`).
- Phones: dialogs become bottom sheets, inputs are 16px (no iOS zoom on focus), 42px touch targets, wide content
  cannot push the page sideways, safe-area insets respected.

### Cost / latency
- Per-route code splitting (87 pages load on demand) instead of one CRA bundle.
- Identical in-flight GET requests are shared (`lib/http.js`). No response caching in the admin, so edits are always fresh.
- Dropped: jquery, bootstrap JS, aos, reactstrap, react-document-meta, react18-otp-input, tailwind build step
  (the ~80 `tw-*` utilities the pages use live in `styles/tw.css`), the success/error GIFs and unused images.
- Images moved to `public/assets` with ASCII file names.

### Packages
- All dependencies are `latest` (see `package.json`); `legacy-peer-deps` is on, as in the user app.
- Not carried over: CRA tooling, testing-library, `react-monnify` (was commented out).

### Verification
- All 183 source files parse; all 771 `@/` imports resolve; no `react-router-dom` / `reactstrap` / jquery left.
- Not yet run: this environment had no network, so `npm install`, `next build` and a browser pass still need to be done.
