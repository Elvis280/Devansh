"""
portfolio.py — All portfolio API routes
"""
from fastapi import APIRouter, HTTPException
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

router = APIRouter(prefix="/api", tags=["portfolio"])


def _enrich_image(item: dict, key: str = "image") -> dict:
    d = dict(item)
    if d.get(key) and not d[key].startswith("/static"):
        d[key] = f"/static/img{d[key]}"
    return d


@router.get("/personal")
async def get_personal():
    """Return personal info object with static asset paths."""
    p = dict(personal_info)
    if p.get("cv") and not p["cv"].startswith("/static"):
        p["cv"] = f"/static/img{p['cv']}"
    if p.get("avatar") and not p["avatar"].startswith("/static"):
        p["avatar"] = f"/static/img{p['avatar']}"
    return p


@router.get("/personality")
async def get_personality():
    """Return personality (iLike / iDontLike) object."""
    return personality


@router.get("/stats")
async def get_stats():
    """Return portfolio stats (projects, certs, etc.)."""
    return stats


@router.get("/experience")
async def get_experience():
    """Return all internship / work experience entries."""
    return experience


@router.get("/leadership")
async def get_leadership():
    """Return all leadership roles."""
    return leadership


@router.get("/skills")
async def get_skills():
    """Return all skill categories with their skills."""
    return skill_categories


@router.get("/projects")
async def get_projects(featured: bool | None = None):
    """
    Return all projects. Optionally filter by featured=true.
    Example: GET /api/projects?featured=true
    """
    enriched = [_enrich_image(p) for p in projects]
    if featured is not None:
        return [p for p in enriched if p.get("featured") == featured]
    return enriched


@router.get("/projects/{project_id}")
async def get_project(project_id: str):
    """Return a single project by ID."""
    p_id = project_id.lower().strip()
    for project in projects:
        if project["id"].lower() == p_id:
            return _enrich_image(project)
    raise HTTPException(status_code=404, detail="Project not found")


@router.get("/experiments")
async def get_experiments(status: str | None = None):
    """
    Return all experiments. Optionally filter by status.
    Example: GET /api/experiments?status=CONCLUDED
    """
    if status:
        return [e for e in experiments if e["status"].upper() == status.upper()]
    return experiments


@router.get("/experiments/{experiment_id}")
async def get_experiment(experiment_id: str):
    """Return a single experiment by ID or number."""
    e_id = experiment_id.lower().strip()
    for exp in experiments:
        if (
            exp["id"].lower() == e_id
            or exp.get("number", "").lower() == e_id
            or exp.get("number", "").lstrip("0") == e_id.lstrip("0")
            or exp["id"].replace("exp-", "").lstrip("0") == e_id.replace("exp-", "").lstrip("0")
        ):
            return exp
    raise HTTPException(status_code=404, detail="Experiment not found")


@router.get("/journey")
async def get_journey():
    """Return full journey timeline milestones."""
    return journey_milestones


@router.get("/certificates")
async def get_certificates():
    """Return all certifications with static image paths."""
    return [_enrich_image(c) for c in certificates]


@router.get("/certificates/{cert_id}")
async def get_certificate(cert_id: str):
    """Return a single certificate by ID."""
    c_id = cert_id.lower().strip()
    for cert in certificates:
        if cert["id"].lower() == c_id:
            return _enrich_image(cert)
    raise HTTPException(status_code=404, detail="Certificate not found")

