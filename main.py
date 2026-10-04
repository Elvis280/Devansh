"""
main.py — FastAPI + Jinja2 server-side rendered portfolio
All data is passed directly from Python dicts → Jinja2 templates.
Static files (CSS, JS, images) are served from /static.
"""
import json
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from data.portfolio_data import (
    personal_info,
    personality,
    stats,
    skill_categories,
    projects,
    experiments,
    journey_milestones,
    certificates,
)
from routers.portfolio import router as portfolio_router

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR   = Path(__file__).resolve().parent
TEMPLATES  = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(
    title="Devansh Sharma — Portfolio",
    description="Server-side rendered portfolio using FastAPI + Jinja2",
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# ── Static Files ──────────────────────────────────────────────────────────────
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# ── Jinja2 Templates ──────────────────────────────────────────────────────────
templates = Jinja2Templates(directory=str(TEMPLATES))

# ── Custom Jinja2 Filters ─────────────────────────────────────────────────────
def jinja_zfill(value: str, width: int) -> str:
    """Equivalent of Python's str.zfill() for Jinja2 templates."""
    return str(value).zfill(width)

templates.env.filters["zfill"] = jinja_zfill


def _build_context(request: Request) -> dict:
    """Build the shared template context from portfolio data."""

    # Rich stats displayed across hero and journey
    rich_stats = [
        {"label": "Projects Built",    "value": "10+", "desc": "Shipped & live"},
        {"label": "AI Systems",        "value": "6+",  "desc": "Agents, RAG & ML"},
        {"label": "Certifications",    "value": "11+", "desc": "Verified credentials"},
        {"label": "Tech Stack",        "value": "25+", "desc": "Python, APIs, Vector, DBs"},
    ]

    # Prepend /static/img/ prefix for project images
    enriched_projects = []
    for p in projects:
        ep = dict(p)
        if ep.get("image") and not ep["image"].startswith("/static"):
            ep["image"] = f"/static/img{ep['image']}"
        enriched_projects.append(ep)

    # Prepend /static/img/ prefix for certificate images
    enriched_certs = []
    for c in certificates:
        ec = dict(c)
        if ec.get("image") and not ec["image"].startswith("/static"):
            ec["image"] = f"/static/img{ec['image']}"
        enriched_certs.append(ec)

    # Enrich personal info paths
    personal = dict(personal_info)
    if personal.get("cv") and not personal["cv"].startswith("/static"):
        personal["cv"] = f"/static/img{personal['cv']}"
    if personal.get("avatar") and not personal["avatar"].startswith("/static"):
        personal["avatar"] = f"/static/img{personal['avatar']}"

    return {
        "request":      request,
        "personal":     personal,
        "personality":  personality,
        "stats":        rich_stats,
        "skills":       skill_categories,
        "projects":     enriched_projects,
        "experiments":  experiments,
        "journey":      journey_milestones,
        "certificates": enriched_certs,
        "certificates_json": json.dumps(enriched_certs),
    }


# ── Main SSR Route ────────────────────────────────────────────────────────────
@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def index(request: Request):
    ctx = _build_context(request)
    return templates.TemplateResponse(request=request, name="index.html", context={k: v for k, v in ctx.items() if k != "request"})


# ── Favicon Routes ────────────────────────────────────────────────────────────
@app.get("/favicon.ico", include_in_schema=False)
@app.get("/favicon.svg", include_in_schema=False)
async def favicon():
    return FileResponse(STATIC_DIR / "img" / "favicon.svg", media_type="image/svg+xml")


# ── JSON API Routes ───────────────────────────────────────────────────────────
app.include_router(portfolio_router)


@app.get("/api/health", tags=["system"], response_class=JSONResponse)
async def health():
    return {"status": "ok", "renderer": "FastAPI + Jinja2", "version": "2.0.0"}
