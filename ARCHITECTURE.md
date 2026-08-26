# Portfolio v2 — FastAPI + React (Vite)

## Project Structure

```
portfolio-v2/
├── backend/          # FastAPI (Python) — serves portfolio data as REST API
│   ├── main.py       # App entry point
│   ├── routers/      # API route handlers
│   ├── data/         # All portfolio data (Python dicts)
│   └── .venv/        # uv-managed virtual environment
│
└── frontend/         # Vite + React + TypeScript — portfolio UI
    ├── src/
    │   ├── App.tsx
    │   ├── api/          # Axios API client (fetches from FastAPI)
    │   ├── hooks/        # TanStack Query hooks
    │   ├── components/   # All 19 portfolio components
    │   └── styles/       # Design system CSS
    └── public/           # Static assets (portrait, CV, certificates)
```

---

## Running Locally

You need **two terminal windows** — one for the backend, one for the frontend.

### Terminal 1 — FastAPI Backend

```bash
cd backend
uv run uvicorn main:app --reload --port 8000
```

Backend API: `http://localhost:8000`  
Swagger Docs: `http://localhost:8000/docs`

### Terminal 2 — Vite Frontend

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`

> The Vite dev server proxies all `/api` requests to the FastAPI backend automatically — no CORS issues during development.

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/personal` | Personal info |
| `GET` | `/api/personality` | iLike / iDontLike |
| `GET` | `/api/stats` | Portfolio stats |
| `GET` | `/api/skills` | Skill categories |
| `GET` | `/api/projects` | All projects (add `?featured=true` to filter) |
| `GET` | `/api/projects/{id}` | Single project |
| `GET` | `/api/experiments` | All experiments (add `?status=CONCLUDED`) |
| `GET` | `/api/journey` | Journey milestones |
| `GET` | `/api/certificates` | Certifications |
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Swagger UI |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI + Uvicorn (Python 3.14) |
| Package manager (Python) | uv |
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v4 |
| Data fetching | TanStack Query (React Query) |
| HTTP client | Axios |
| Animation | Framer Motion + GSAP + Lenis |
| Icons | Lucide React |
