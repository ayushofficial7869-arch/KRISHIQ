# Krishiq — Deployment Guide

Krishiq (SIH26132 · Team PYRONEX) is a two-part application:

| Component | Stack | Default URL |
|---|---|---|
| Frontend | Next.js 14 + React 18 + TypeScript + Tailwind, multi-language (EN / HI / MR / GU) | `http://localhost:3000` |
| Backend | FastAPI + SQLModel + SQLite, Uvicorn | `http://localhost:8000` |

The frontend calls the backend through a single configurable base URL
(`NEXT_PUBLIC_API_URL`). If the backend is unreachable, the demo pages still
render because the client ships a small fallback dataset (`lib/demo.ts`).

---

## 1. Prerequisites

- **Node.js 18.17+** (developed and verified on Node 24) and **npm 9+**
- **Python 3.11+** (developed on Python 3.13.5)
- Git (optional)

Verify:

```bash
node --version   # v18.17.0 or newer
npm --version
python --version
```

---

## 2. Local Setup & Run

### Step 1 — Unzip

Unzip `krishiq_delivery.zip` anywhere, then open a terminal in the project root
(the folder containing `package.json` and `main.py`).

### Step 2 — Install frontend dependencies

```bash
npm install
```

### Step 3 — Install backend dependencies

```bash
python -m pip install -r requirements.txt
```

### Step 4 — Environment variables

One optional variable exists (`.env.example`):

```ini
# Frontend API base URL used by all client components.
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For local development it usually needs no change. To override, create a file
named `.env.local` in the project root with your value:

```bash
copy .env.example .env.local   # Windows
# cp .env.example .env.local   # macOS / Linux — edit if your API moves
```

> `NEXT_PUBLIC_*` variables are baked into the client at build time. If you
> change them, rebuild the frontend.

### Step 5 — Start the backend

```bash
python -m uvicorn main:app --port 8000 --reload
```

The API lands at `http://localhost:8000` (docs at `/docs`). Optional seed data:

```bash
python reset_db.py && python seed.py
```

> Stop the backend before running `reset_db.py` (SQLite file lock).

### Step 6 — Development server

```bash
npm run dev
```

Open **http://localhost:3000** — or use `run.bat` (Windows) / `run.sh`
(Linux/macOS) to boot backend and frontend together.

### Step 7 — Production build preview

```bash
npm run build
npm run start
```

`npm run build` must complete with zero errors. Verified route map:

| Route | Page |
|---|---|
| `/` | Home — farm command center |
| `/landing` | Editorial landing page (hero radar, bento economics, comparative ledger, FAQ) |
| `/sell` | Farmer lot input (crop, quantity, grade, pickup) |
| `/results` | Ranked net realisation + pooling + temporal model |
| `/pools` | Active pooling / FPO dashboard |
| `/map` | Leaflet spatial mandi comparison |
| `/offers/[lotId]` | Verifiable digital offers + escrow status |

---

## 3. One-Click Deployment (Static Frontend)

The frontend is a standard Next.js SSR/static build and deploys to any Next
host. Each platform below needs the same two values:

- **Build command:** `npm run build`
- **Output directory:** `.next`
- **Environment variable:** `NEXT_PUBLIC_API_URL` — set it to the deployed
  backend URL (e.g. `https://krishiq-api.onrender.com`).

### Vercel (recommended for Next.js)

1. Push the project to a GitHub/GitLab repo.
2. In Vercel: **Add New Project → Import** the repo; the Next.js preset is auto-detected.
3. Add the environment variable `NEXT_PUBLIC_API_URL`.
4. Deploy. The landing page is live at `/landing`.

### Netlify

1. **Add new site → Import from Git**.
2. Build command: `npm run build`; publish directory: `.next`.
3. Framework preset: **Next.js**; add `NEXT_PUBLIC_API_URL`.
4. Deploy. Netlify serves the `.next` build output directly.

### Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git**.
2. Framework preset: **Next.js** (Static Site / Build Tool: `npm run build`).
3. Set `NEXT_PUBLIC_API_URL` as an environment variable; output dir `.next`.
4. Deploy.

### Backend hosting (one-time)

The FastAPI layer has no built-in one-click host in this package; deploy it to
Render / Railway / Fly.io / a VM:

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

> **CORS:** `main.py` already whitelists `http://localhost:3000`,
> `http://127.0.0.1:3000`, and `https://*.netlify.app`. Add your production
> frontend origin to that list before hosting the API. The map uses Leaflet +
> OpenStreetMap raster tiles, which require no API key.

---

## 4. Troubleshooting

- **Frontend shows demo data / no API results** → backend not running or
  `NEXT_PUBLIC_API_URL` not pointing at it.
- **`ERR_OSSL_EVP_UNSUPPORTED` on older Node** → upgrade to Node 18.17+/20+.
- **SQLite locked on `reset_db.py`** → stop the backend process first.
- **Stale build after pulling updates** → delete `.next` and run `npm run build` again.