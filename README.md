# Durable Admin (Next.js). Revamped by Drexx Technologies

Super-admin console for the Durable VTU platform. It talks to the existing `durable-backend` unchanged
(same endpoints, same `frontend-source: webadmin` header) and keeps every original URL.

## Run

```bash
cp .env.example .env     # reuse the values from the old CRA .env (REACT_APP_* names are unchanged)
npm install              # or pnpm install
npm run dev              # http://localhost:4300  (dev talks to http://localhost:9092, see src/Data/Config.js)
npm run build && npm start
```

## Structure

| Old (CRA)            | New                                   |
|----------------------|---------------------------------------|
| `src/Data/**`        | `src/Data/**` (core: actions, reducers, context – untouched) |
| `src/Pages/**`       | `src/views/app/**` (logged-in pages)  |
| `src/Screens/**`     | `src/views/public/**` (login, activate, forgot password) |
| `src/Components/**`  | `src/features/**` (page bodies)       |
| `Routes.jsx` / `PageRender.jsx` | `src/components/PageRouter.jsx` + `src/config/routes.js` (+ generated `routes.generated.js`) |
| `Sidebar`, `DefaultHeader` | `src/components/layout/*` (sidebar, top bar, bottom nav) |
| `src/Assets/**`      | `public/assets/**`                    |
| App.css / Sidebar.css | `src/styles/{legacy,theme,admin,tw}.css` |

New code is split into `components/`, `constants/`, `config/`, `hooks/`, `lib/`, `styles/`.
A new page = add the file under `src/views/app/...` and one line in `config/routes.generated.js`.

See `CHANGELOG.md` for everything that changed.
