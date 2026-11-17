"""
main.py — FastAPI + Jinja2 server-side rendered portfolio
All data is passed directly from Python dicts → Jinja2 templates.
Static files (CSS, JS, images) are served from /static.
"""
import json
import os
import re
from datetime import date
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.exceptions import HTTPException as StarletteHTTPException

from data.portfolio_data import (
    certificates,
    experience,
    experiments,
    journey_milestones,
    leadership,
    personal_info,
    personality,
    projects,
    skill_categories,
    stats,
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
    debug=os.getenv("DEBUG", "false").lower() == "true",
)

# ── CORS Configuration ────────────────────────────────────────────────────────
# Explicitly configured origins. Add additional domains via ALLOWED_ORIGINS env var.
# Example: ALLOWED_ORIGINS="https://devansh-iota.vercel.app,https://custom-domain.com"
ALLOWED_ORIGINS_ENV = os.getenv("ALLOWED_ORIGINS", "")
if ALLOWED_ORIGINS_ENV:
    ALLOWED_ORIGINS = [orig.strip() for orig in ALLOWED_ORIGINS_ENV.split(",") if orig.strip()]
else:
    ALLOWED_ORIGINS = [
        "https://devansh-iota.vercel.app",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "HEAD", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Origin"],
)


# ── HTTP Security Headers Helper & Middleware ────────────────────────────────
def get_security_headers(request: Request) -> dict[str, str]:
    """Generate defense-in-depth HTTP security headers."""
    csp_policy = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline'; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "img-src 'self' data: https:; "
        "connect-src 'self'; "
        "object-src 'none'; "
        "base-uri 'self'; "
        "frame-ancestors 'none';"
    )
    csp_header = (
        "Content-Security-Policy-Report-Only"
        if os.getenv("CSP_REPORT_ONLY", "false").lower() == "true"
        else "Content-Security-Policy"
    )

    headers = {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        csp_header: csp_policy,
    }

    # HSTS enabled only under valid production HTTPS conditions
    is_https = (
        request.url.scheme == "https"
        or request.headers.get("x-forwarded-proto") == "https"
    )
    is_prod = (
        os.getenv("ENVIRONMENT", "").lower() in ("production", "prod")
        or os.getenv("VERCEL_ENV", "").lower() == "production"
    )
    if (is_prod and is_https) or os.getenv("ENABLE_HSTS", "").lower() == "true":
        headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

    return headers


@app.middleware("http")
async def security_headers_middleware(request: Request, call_next):
    """Ensure all application responses carry defense-in-depth security headers."""
    response = await call_next(request)
    sec_headers = get_security_headers(request)
    for k, v in sec_headers.items():
        if k not in response.headers:
            response.headers[k] = v
    return response

# ── Versioned Static Files with Long-Lived Caching ───────────────────────────
class VersionedStaticFiles(StaticFiles):
    """
    Serves static files with long-lived immutable caching (max-age=31536000)
    ONLY when the asset filename or query string indicates version/hash fingerprinting.
    Unversioned assets receive revalidation directives (no-cache, must-revalidate)
    so users never keep outdated images after deployment.
    """
    def file_response(self, full_path, stat_result, scope, status_code=200):
        resp = super().file_response(full_path, stat_result, scope, status_code)
        path = scope.get("path", "")
        query = scope.get("query_string", b"").decode("latin-1")

        is_versioned = (
            any(k in query for k in ("v=", "ver=", "hash="))
            or bool(re.search(r"[-._]([a-f0-9]{8,}|v\d+)\.", path, re.I))
            or path.endswith((".ttf", ".woff", ".woff2", ".eot"))
        )

        if is_versioned:
            resp.headers["Cache-Control"] = "public, max-age=31536000, immutable"
        else:
            resp.headers["Cache-Control"] = "public, no-cache, must-revalidate"

        return resp


# ── Static Files Mount ────────────────────────────────────────────────────────
app.mount("/static", VersionedStaticFiles(directory=str(STATIC_DIR)), name="static")

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
    {"src": "/static/img/images/thumbs/AlgoZ1.webp", "thumb": "/static/img/images/thumbs/AlgoZ1.webp", "full": "/static/img/images/full/AlgoZ1.webp", "caption": "AlgoZenith Flagship Workshop & Coding Contest", "tag": "WORKSHOP"},
    {"src": "/static/img/images/thumbs/AlgoZ2.webp", "thumb": "/static/img/images/thumbs/AlgoZ2.webp", "full": "/static/img/images/full/AlgoZ2.webp", "caption": "Competitive Programming Mentorship Session", "tag": "MENTORSHIP"},
    {"src": "/static/img/images/thumbs/AlgoZ3.webp", "thumb": "/static/img/images/thumbs/AlgoZ3.webp", "full": "/static/img/images/full/AlgoZ3.webp", "caption": "Student Chapter Technical Keynote & Orientation", "tag": "MEETUP"},
    {"src": "/static/img/images/thumbs/AlgoZ4.webp", "thumb": "/static/img/images/thumbs/AlgoZ4.webp", "full": "/static/img/images/full/AlgoZ4.webp", "caption": "Campus Coding League & Problem Solving Round", "tag": "CONTEST"},
    {"src": "/static/img/images/thumbs/AlgoZ5.webp", "thumb": "/static/img/images/thumbs/AlgoZ5.webp", "full": "/static/img/images/full/AlgoZ5.webp", "caption": "AlgoZenith Executive Team & Lead Organizers", "tag": "CORE TEAM"},
    {"src": "/static/img/images/thumbs/AlgoZ6.webp", "thumb": "/static/img/images/thumbs/AlgoZ6.webp", "full": "/static/img/images/full/AlgoZ6.webp", "caption": "Hands-on Data Structures & Algorithm Lab", "tag": "DSA LAB"},
    {"src": "/static/img/images/thumbs/AlgoZ7.webp", "thumb": "/static/img/images/thumbs/AlgoZ7.webp", "full": "/static/img/images/full/AlgoZ7.webp", "caption": "Hackathon Strategy & Team Collaboration", "tag": "HACKATHON"},
    {"src": "/static/img/images/thumbs/AlgoZ8.webp", "thumb": "/static/img/images/thumbs/AlgoZ8.webp", "full": "/static/img/images/full/AlgoZ8.webp", "caption": "Technical Session Q&A and Participant Discussion", "tag": "COMMUNITY"},
    {"src": "/static/img/images/thumbs/AlgoZ9.webp", "thumb": "/static/img/images/thumbs/AlgoZ9.webp", "full": "/static/img/images/full/AlgoZ9.webp", "caption": "Interview Prep & Advanced Algorithm Deep Dive", "tag": "PREP"},
    {"src": "/static/img/images/thumbs/AlgoZ10.webp", "thumb": "/static/img/images/thumbs/AlgoZ10.webp", "full": "/static/img/images/full/AlgoZ10.webp", "caption": "Event Finale & Student Recognition Ceremony", "tag": "AWARDS"},
]

GFG_GALLERY = [
    {"src": "/static/img/images/thumbs/GFG1.webp", "thumb": "/static/img/images/thumbs/GFG1.webp", "full": "/static/img/images/full/GFG1.webp", "caption": "GeeksforGeeks Chapter Flagship Hackathon Opening", "tag": "KEYNOTE"},
    {"src": "/static/img/images/thumbs/GFG2.webp", "thumb": "/static/img/images/thumbs/GFG2.webp", "full": "/static/img/images/full/GFG2.webp", "caption": "Campus Technical Outreach & Registration Booth", "tag": "OUTREACH"},
    {"src": "/static/img/images/thumbs/GFG3.webp", "thumb": "/static/img/images/thumbs/GFG3.webp", "full": "/static/img/images/full/GFG3.webp", "caption": "Faculty Connect & Guest Speaker Panel", "tag": "FACULTY"},
    {"src": "/static/img/images/thumbs/GFG4.webp", "thumb": "/static/img/images/thumbs/GFG4.webp", "full": "/static/img/images/full/GFG4.webp", "caption": "Coding Contest Participants in Action", "tag": "CONTEST"},
    {"src": "/static/img/images/thumbs/GFG5.webp", "thumb": "/static/img/images/thumbs/GFG5.webp", "full": "/static/img/images/full/GFG5.webp", "caption": "PR Lead & Event Organizer Coordination", "tag": "LEADERSHIP"},
    {"src": "/static/img/images/thumbs/GFG6.webp", "thumb": "/static/img/images/thumbs/GFG6.webp", "full": "/static/img/images/full/GFG6.webp", "caption": "Seminar on Modern Tech Stacks & Development", "tag": "SEMINAR"},
    {"src": "/static/img/images/thumbs/GFG7.webp", "thumb": "/static/img/images/thumbs/GFG7.webp", "full": "/static/img/images/full/GFG7.webp", "caption": "GeeksforGeeks_SRMCEM Core Team Group Photo", "tag": "TEAM"},
]

DRIFTWALL_ITEMS = []
for item in ALGOZ_GALLERY:
    DRIFTWALL_ITEMS.append({
        "image": item["src"],
        "thumb": item.get("thumb", item["src"]),
        "full": item.get("full", item["src"]),
        "title": item["caption"],
        "tag": item["tag"],
        "category": "AlgoZenith SRMCEM",
        "href": "/journey",
    })
for item in GFG_GALLERY:
    DRIFTWALL_ITEMS.append({
        "image": item["src"],
        "thumb": item.get("thumb", item["src"]),
        "full": item.get("full", item["src"]),
        "title": item["caption"],
        "tag": item["tag"],
        "category": "GeeksforGeeks_SRMCEM",
        "href": "/journey",
    })
for p in ENRICHED_PROJECTS[:3]:
    if p.get("image"):
        DRIFTWALL_ITEMS.append({
            "image": p["image"],
            "thumb": p["image"],
            "full": p["image"],
            "title": f"{p['title']} — {p.get('subtitle', '')}",
            "tag": p.get("category", "SYSTEM").split()[0].upper(),
            "category": "Shipped System",
            "href": p.get("github", "#projects"),
        })
for c in ENRICHED_CERTS:
    if c.get("featured") and c.get("image"):
        DRIFTWALL_ITEMS.append({
            "image": c["image"],
            "thumb": c["image"],
            "full": c["image"],
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
    return FileResponse(
        STATIC_DIR / "img" / "favicon.svg",
        media_type="image/svg+xml",
        headers={"Cache-Control": "public, max-age=86400"},
    )


# ── Resume / CV Direct Routes ──────────────────────────────────────────────────
@app.get("/resume", include_in_schema=False)
@app.get("/cv", include_in_schema=False)
async def resume():
    resume_dir = (STATIC_DIR / "img" / "images").resolve()
    primary_path = (resume_dir / "Devansh_Resume.pdf").resolve()
    fallback_path = (resume_dir / "Devansh_CV.pdf").resolve()

    target_file = None
    if primary_path.is_file() and primary_path.is_relative_to(resume_dir):
        target_file = primary_path
    elif fallback_path.is_file() and fallback_path.is_relative_to(resume_dir):
        target_file = fallback_path

    if not target_file:
        raise HTTPException(status_code=404, detail="Resume file not found")

    return FileResponse(
        target_file,
        media_type="application/pdf",
        filename="Devansh_Resume.pdf",
        headers={"Cache-Control": "public, no-cache, must-revalidate"},
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


# ── Exception Handlers ────────────────────────────────────────────────────────
@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request: Request, exc: StarletteHTTPException):
    sec_headers = get_security_headers(request)

    # API endpoints and JSON requests always return structured JSON
    is_api = (
        request.url.path.startswith("/api/")
        or "application/json" in request.headers.get("accept", "")
    )
    if is_api:
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
            headers=sec_headers,
        )

    # Branded Cyberpunk / CRT 404 HTML Page for web route misses
    if exc.status_code == 404:
        ctx = _build_context(request)
        ctx["error_code"] = 404
        return templates.TemplateResponse(
            request=request,
            name="errors/404.html",
            status_code=404,
            context={k: v for k, v in ctx.items() if k != "request"},
            headers=sec_headers,
        )

    # Fallback for other HTTP status codes
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers=sec_headers,
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    sec_headers = get_security_headers(request)
    is_api = (
        request.url.path.startswith("/api/")
        or "application/json" in request.headers.get("accept", "")
    )
    if is_api:
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"},
            headers=sec_headers,
        )

    ctx = _build_context(request)
    ctx["error_code"] = 500
    return templates.TemplateResponse(
        request=request,
        name="errors/404.html",
        status_code=500,
        context={k: v for k, v in ctx.items() if k != "request"},
        headers=sec_headers,
    )
