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
    experience,
    leadership,
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


# ── Precomputed Static Context (Optimized: generated once at startup) ────────
def _enrich_image_path(path: str | None, prefix: str = "/static/img") -> str:
    if not path:
        return ""
    return path if path.startswith("/static") else f"{prefix}{path}"

ENRICHED_PROJECTS = []
for p in projects:
    ep = dict(p)
    if ep.get("image"):
        ep["image"] = _enrich_image_path(ep["image"])
    ENRICHED_PROJECTS.append(ep)

ENRICHED_CERTS = []
for c in certificates:
    ec = dict(c)
    if ec.get("image"):
        ec["image"] = _enrich_image_path(ec["image"])
    ENRICHED_CERTS.append(ec)

ENRICHED_PERSONAL = dict(personal_info)
if ENRICHED_PERSONAL.get("cv"):
    ENRICHED_PERSONAL["cv"] = _enrich_image_path(ENRICHED_PERSONAL["cv"])
if ENRICHED_PERSONAL.get("avatar"):
    ENRICHED_PERSONAL["avatar"] = _enrich_image_path(ENRICHED_PERSONAL["avatar"])

ALGOZ_GALLERY = [
    {"src": "/static/img/images/AlgoZ1.jpg", "caption": "AlgoZenith Flagship Workshop & Coding Contest", "tag": "WORKSHOP"},
    {"src": "/static/img/images/AlgoZ2.jpeg", "caption": "Competitive Programming Mentorship Session", "tag": "MENTORSHIP"},
    {"src": "/static/img/images/AlgoZ3.jpg", "caption": "Student Chapter Technical Keynote & Orientation", "tag": "MEETUP"},
    {"src": "/static/img/images/AlgoZ4.jpg", "caption": "Campus Coding League & Problem Solving Round", "tag": "CONTEST"},
    {"src": "/static/img/images/AlgoZ5.JPG", "caption": "AlgoZenith Executive Team & Lead Organizers", "tag": "CORE TEAM"},
    {"src": "/static/img/images/AlgoZ6.jpg", "caption": "Hands-on Data Structures & Algorithm Lab", "tag": "DSA LAB"},
    {"src": "/static/img/images/AlgoZ7.jpg", "caption": "Hackathon Strategy & Team Collaboration", "tag": "HACKATHON"},
    {"src": "/static/img/images/AlgoZ8.JPG", "caption": "Technical Session Q&A and Participant Discussion", "tag": "COMMUNITY"},
    {"src": "/static/img/images/AlgoZ9.jpeg", "caption": "Interview Prep & Advanced Algorithm Deep Dive", "tag": "PREP"},
    {"src": "/static/img/images/AlgoZ10.JPG", "caption": "Event Finale & Student Recognition Ceremony", "tag": "AWARDS"},
]

GFG_GALLERY = [
    {"src": "/static/img/images/GFG1.jpg", "caption": "GeeksforGeeks Chapter Flagship Hackathon Opening", "tag": "KEYNOTE"},
    {"src": "/static/img/images/GFG2.jpg", "caption": "Campus Technical Outreach & Registration Booth", "tag": "OUTREACH"},
    {"src": "/static/img/images/GFG3.jpg", "caption": "Faculty Connect & Guest Speaker Panel", "tag": "FACULTY"},
    {"src": "/static/img/images/GFG4.jpg", "caption": "Coding Contest Participants in Action", "tag": "CONTEST"},
    {"src": "/static/img/images/GFG5.jpg", "caption": "PR Lead & Event Organizer Coordination", "tag": "LEADERSHIP"},
    {"src": "/static/img/images/GFG6.jpg", "caption": "Seminar on Modern Tech Stacks & Development", "tag": "SEMINAR"},
    {"src": "/static/img/images/GFG7.jpg", "caption": "GeeksforGeeks_SRMCEM Core Team Group Photo", "tag": "TEAM"},
]

DRIFTWALL_ITEMS = []
for item in ALGOZ_GALLERY:
    DRIFTWALL_ITEMS.append({
        "image": item["src"],
        "title": item["caption"],
        "tag": item["tag"],
        "category": "AlgoZenith SRMCEM",
        "href": "/journey",
    })
for item in GFG_GALLERY:
    DRIFTWALL_ITEMS.append({
        "image": item["src"],
        "title": item["caption"],
        "tag": item["tag"],
        "category": "GeeksforGeeks_SRMCEM",
        "href": "/journey",
    })
for p in ENRICHED_PROJECTS[:3]:
    if p.get("image"):
        DRIFTWALL_ITEMS.append({
            "image": p["image"],
            "title": f"{p['title']} — {p.get('subtitle', '')}",
            "tag": p.get("category", "SYSTEM").split()[0].upper(),
            "category": "Shipped System",
            "href": p.get("github", "#projects"),
        })
for c in ENRICHED_CERTS:
    if c.get("featured") and c.get("image"):
        DRIFTWALL_ITEMS.append({
            "image": c["image"],
            "title": f"{c['title']} ({c.get('issuer', '')})",
            "tag": c.get("category", "CREDENTIAL"),
            "category": "Verified Credential",
            "href": c.get("verification_url", "#achievements"),
        })

STATIC_CONTEXT = {
    "personal":          ENRICHED_PERSONAL,
    "personality":       personality,
    "stats":             stats,
    "skills":            skill_categories,
    "projects":          ENRICHED_PROJECTS,
    "experiments":       experiments,
    "journey":           journey_milestones,
    "experience":        experience,
    "leadership":        leadership,
    "algoz_gallery":     ALGOZ_GALLERY,
    "gfg_gallery":       GFG_GALLERY,
    "driftwall_items":   DRIFTWALL_ITEMS,
    "driftwall_json":    json.dumps(DRIFTWALL_ITEMS),
    "certificates":      ENRICHED_CERTS,
    "certificates_json": json.dumps(ENRICHED_CERTS),
}


def _build_context(request: Request) -> dict:
    """Build the template context from precomputed portfolio data."""
    return {"request": request, **STATIC_CONTEXT}


# ── Main SSR Route ────────────────────────────────────────────────────────────
@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def index(request: Request):
    ctx = _build_context(request)
    return templates.TemplateResponse(request=request, name="index.html", context={k: v for k, v in ctx.items() if k != "request"})


# ── Dedicated Journey Page ────────────────────────────────────────────────────
@app.get("/journey", response_class=HTMLResponse, include_in_schema=False)
@app.get("/journey/{milestone_id}", response_class=HTMLResponse, include_in_schema=False)
async def journey_page(request: Request, milestone_id: str | None = None):
    ctx = _build_context(request)
    ctx["active_milestone"] = milestone_id or "all"
    return templates.TemplateResponse(request=request, name="journey.html", context={k: v for k, v in ctx.items() if k != "request"})


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

    # Canonical entries for the portfolio
    urls = [
        ("/", "weekly", "1.0"),
        ("/journey", "monthly", "0.9"),
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
