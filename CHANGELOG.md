# Changelog

## v2.0.2 - Slider delete no longer strands a ghost row

- `Data/Actions/NotificationAction.js` (`manageSlider`): when the API answers "Slider not found" (or an invalid slider id),
  the slider list is re-fetched so the page matches the server instead of keeping a row that can never be deleted.
- Root cause of the error was server-side (20-minute role-less slider cache that was never flushed); fixed in
  `durable-backend` (see its CHANGELOG). This is only the safety net.

## v2.0.1 - Category Control: edit + delete now usable

### Root cause: edit / delete buttons were invisible
- Edit and delete were already in `category.jsx`, but only the enable/disable button showed. The action cell is
  `col textTrunc ... btn-group`; `.textTrunc` (`display:-webkit-box`, 1-line clamp, `overflow:hidden`) overrides
  Bootstrap's `.btn-group` because `legacy.css` loads **after** Bootstrap in this app (the CRA app imported it
  before, so it worked there). The buttons stacked and every button after the first was clipped.
- `styles/admin.css`: `.textTrunc.btn-group { display:inline-flex; overflow:visible }`. This also restores the
  hidden action buttons on the other pages that use the same cell: Cables, Network, Education, Electricity, Biller,
  Manage products, CG wallet, Blacklist, Sliders, Converter.

### Category Control
- Split the 500-line page into `features/Category/` (`CategoryTable`, `CategoryRow`, `CreateCategoryModal`,
  `AddBillerModal`, `EditCategoryModal`, `DeleteCategoryModal`, `OptionGrid`, `constants`, `utils`).
  `views/app/controls/category.jsx` is now just the page shell (permissions, bulk enable/disable, one modal at a time).
- **Edit**: rename + status in one modal, with a live "Saved as: ..." preview that mirrors the backend rules. Only the
  changed fields are sent (the old code posted the whole populated row). Save is disabled until something changed.
- **Delete**: type-the-name confirmation (delete cascades to plans / prices), clear warning text, modal closes only on
  success. Enable/disable toggle also sends just `{ enabler }`.
- Modals are mounted only while open, so forms always start clean (removes the reset/"submit flag" effects).
- Fixes: S/N now continues across pages (was 1-10 on every page); rows keyed by `_id`; page range change resets to
  page 1; deleting the last item on a page steps back instead of showing an empty page; "Add biller" no longer
  submits the whole category (was sending a populated object as `biller`) and greys out billers already on the list.

### Data layer (tiny)
- `Actions/ProviderAction.js`: `manageCategory` now returns `true` / `false` so callers can close dialogs on success only.
- `Reducer/ProviderReducer.js`: `DELETE_CATEGORY` also removes the item from `mainSearch` (it stayed visible while searching).

### Needs the matching `durable-backend` update (see its CHANGELOG)
- Rename is display-name only; delete is blocked while users hold balance and cleans up references.

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
