"""
portfolio.py — All portfolio API routes
"""
from fastapi import APIRouter
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

router = APIRouter(prefix="/api", tags=["portfolio"])


@router.get("/personal")
async def get_personal():
    """Return personal info object."""
    return personal_info


@router.get("/personality")
async def get_personality():
    """Return personality (iLike / iDontLike) object."""
    return personality


@router.get("/stats")
async def get_stats():
    """Return portfolio stats (projects, certs, etc.)."""
    return stats


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
    if featured is not None:
        return [p for p in projects if p["featured"] == featured]
    return projects


@router.get("/projects/{project_id}")
async def get_project(project_id: str):
    """Return a single project by ID."""
    for project in projects:
        if project["id"] == project_id:
            return project
    return {"error": "Project not found"}, 404


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
    """Return a single experiment by ID."""
    for exp in experiments:
        if exp["id"] == experiment_id:
            return exp
    return {"error": "Experiment not found"}, 404


@router.get("/journey")
async def get_journey():
    """Return full journey timeline milestones."""
    return journey_milestones


@router.get("/certificates")
async def get_certificates():
    """Return all certifications."""
    return certificates
