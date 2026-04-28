# Moka Potter — Agent Notes

## Dev Server
- **Fixed port: 5174** — do not change. Run with `npm run dev` or `npx vite --port 5174 --host`.
- The server must stay on the same port across sessions. Background it with `nohup` if needed.

## Build
- `npm run build` (Vite). Output goes to `dist/`.
- No tests exist yet (`npm test` exits with error).

## Stack
- Vue 3 + Vue Router 4 + Vite
- `date-fns` for calendar math
- `idb` for IndexedDB (lightweight wrapper)
- Fonts: **Ostrich Sans** (local, tall/condensed) for headings; **Inter** (Google Fonts CDN) for body

## Routes
| Path | View | Notes |
|------|------|-------|
| `/` | Home | New brew form + calendar history |
| `/brew/:id` | BrewDetail | Editable cup ratings (auto-save) |
| `/day/:date` | DayView | Brews for one day (YYYY-MM-DD) |

## Data Model (IndexedDB)
- DB: `moka-potter`, store: `brews`, keyPath: `id` (autoIncrement)
- Brew shape:
  ```
  date: "YYYY-MM-DD"
  displayDate: "27 Apr, Mon"
  time: "09:42"
  beanName, weight, water, temp, grindSize
  cups: [
    { coffee, sugar, milk, frothed, rating, comments }
  ]
  createdAt: Date.now()
  ```
- API: `addBrew`, `getAllBrews`, `getBrewById`, `updateBrew`, `deleteBrew`

## Critical Gotchas
- **Rating auto-save on detail page:** use `toRaw()` to unwrap Vue's Proxy before passing the brew object to `updateBrew`. IndexedDB throws `DataCloneError` on Proxies.
- **Cups are inline arrays** inside each brew. Deleting a brew deletes all its cups.
- **Validation:** Brew fields (water, temp, bean, weight, grindSize) are all compulsory. In each cup, only `coffee` is compulsory.
- **Calendar in History:** month grid with arrows. Days with brews get a dot. Click navigates to `/day/:date`.

## Deployment (Cloudflare Pages)
- **Platform:** Cloudflare Pages (static hosting, not Workers directly).
- **Build output:** `dist/` (relative path in `vite.config.js`).
- **SPA routing:** `public/_redirects` contains `/* /index.html 200` so Vue Router's `createWebHistory()` works.

### Two ways to deploy:

**1. Git Integration (recommended)**
- Connect GitHub repo in Cloudflare Pages dashboard
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- `wrangler.toml` already has `pages_build_output_dir = "dist"`
- Deploys automatically on every push to `master`

**2. Manual CLI deploy**
- `npm run deploy` — build + deploy via Wrangler
- Requires `CLOUDFLARE_API_TOKEN` or `npx wrangler login`

- **No port config needed** in production — Cloudflare serves over HTTPS (443) at the edge.

## File Layout
```
src/
  views/        Home.vue, BrewDetail.vue, DayView.vue
  components/   History.vue (calendar + recent list)
  db.js         IndexedDB module
  main.js       Router setup
  assets/
    fonts/webfonts/    Ostrich Sans files
    styles/global.css  All styling
public/
  _redirects           SPA catch-all for Cloudflare Pages
```
