# Krishiq Frontend

Mobile-first Next.js 14 + TypeScript + Tailwind starter based on the supplied Krishiq build plan.

## Run
```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages
- `/` Home
- `/sell` Farmer lot input
- `/results` Recommendation results + pooling suggestion
- `/pools` Pool/FPO dashboard
- `/map` Mandi comparison demo
- `/offers/1` Offers + payment status

The UI currently uses a small local demo dataset so it never renders blank during a presentation. Replace the demo data with the Phase 3 FastAPI calls when the backend is ready.
