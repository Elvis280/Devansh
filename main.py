"""
main.py — FastAPI + Jinja2 server-side rendered portfolio
All data is passed directly from Python dicts → Jinja2 templates.
Static files (CSS, JS, images) are served from /static.
"""
import json
from datetime import date
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse, Response
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


# ── Resume / CV Direct Routes ──────────────────────────────────────────────────
@app.get("/resume", include_in_schema=False)
@app.get("/cv", include_in_schema=False)
async def resume():
    resume_path = STATIC_DIR / "img" / "images" / "Devansh_Resume.pdf"
    if not resume_path.exists():
        resume_path = STATIC_DIR / "img" / "images" / "Devansh_CV.pdf"
    return FileResponse(
        resume_path,
        media_type="application/pdf",
        filename="Devansh_Resume.pdf",
    )


# ── Sitemap ───────────────────────────────────────────────────────────────────
@app.get("/sitemap.xml", include_in_schema=False)
async def sitemap():
    """Generate an XML sitemap for the portfolio."""
    base_url = personal_info.get("portfolio", "https://devansh-iota.vercel.app").rstrip("/")
    today = date.today().isoformat()

    # Canonical entry for the portfolio (Google Search Console compliant without '#' fragments)
    urls = [
        ("/", "weekly", "1.0"),
    ]

    url_entries = "\n".join(
        f"  <url>\n"
        f"    <loc>{base_url}{path}</loc>\n"
        f"    <lastmod>{today}</lastmod>\n"
        f"    <changefreq>{freq}</changefreq>\n"
        f"    <priority>{priority}</priority>\n"
        f"  </url>"
        for path, freq, priority in urls
    )

    sitemap_xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{url_entries}\n"
        '</urlset>'
    )

    return Response(content=sitemap_xml, media_type="application/xml")


# ── Robots.txt ────────────────────────────────────────────────────────────────
@app.get("/robots.txt", include_in_schema=False)
async def robots():
    base_url = personal_info.get("portfolio", "https://devansh-iota.vercel.app").rstrip("/")
    content = (
        "User-agent: *\n"
        "Allow: /\n"
        f"Sitemap: {base_url}/sitemap.xml\n"
    )
    return Response(content=content, media_type="text/plain")


# ── JSON API Routes ───────────────────────────────────────────────────────────
app.include_router(portfolio_router)


@app.get("/api/health", tags=["system"], response_class=JSONResponse)
async def health():
    return {"status": "ok", "renderer": "FastAPI + Jinja2", "version": "2.0.0"}
