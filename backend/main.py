"""
main.py — FastAPI entry point for Devansh Sharma's portfolio backend
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.portfolio import router

app = FastAPI(
    title="Devansh Sharma — Portfolio API",
    description="REST API serving all portfolio data: personal info, projects, experiments, journey milestones, and certifications.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow the Vite frontend dev server + any deployed frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # Optional alternate port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(router)


# ── Health Check ──────────────────────────────────────────────────────────────
@app.get("/health", tags=["system"])
async def health():
    return {"status": "ok", "api": "Devansh Portfolio API v1"}


# ── Root ──────────────────────────────────────────────────────────────────────
@app.get("/", tags=["system"])
async def root():
    return {
        "message": "Devansh Sharma Portfolio API",
        "docs": "/docs",
        "endpoints": [
            "/api/personal",
            "/api/personality",
            "/api/stats",
            "/api/skills",
            "/api/projects",
            "/api/experiments",
            "/api/journey",
            "/api/certificates",
            "/health",
        ],
    }
