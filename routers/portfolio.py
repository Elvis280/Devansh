"""
portfolio.py — All portfolio API routes with Pydantic Models & OpenAPI documentation
"""

from fastapi import APIRouter, HTTPException, Path, Query
from pydantic import BaseModel, ConfigDict, Field

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

# ── Pydantic Models ───────────────────────────────────────────────────────────

class ProjectWorkflowStep(BaseModel):
    label: str = Field(..., description="Stage identifier (e.g. EXTRACT, ORGANIZE)", examples=["EXTRACT"])
    desc: str = Field(..., description="Description of the workflow step", examples=["Layout-aware multi-page PDF document extraction"])

    model_config = ConfigDict(from_attributes=True)


class ProjectCaseStudy(BaseModel):
    problem: str = Field(..., description="Core problem statement and architectural motivation")
    approach: str = Field(..., description="Architectural approach and technical solution design")
    architecture: str = Field(..., description="Component flow or architecture pipeline")
    challenges: str = Field(..., description="Key technical challenges and how they were mitigated")
    result: str = Field(..., description="Quantifiable or qualitative outcome and benchmarks")

    model_config = ConfigDict(from_attributes=True)


class Project(BaseModel):
    id: str = Field(..., description="Unique slug identifier", examples=["knowfforge"])
    number: str = Field(..., description="Display sequence number", examples=["01"])
    title: str = Field(..., description="Project title", examples=["KNOWFFORGE"])
    subtitle: str = Field(..., description="Project tagline or subtitle", examples=["AI Knowledge Base Generator & Document Structuring Pipeline"])
    description: str = Field(..., description="High-level project overview")
    image: str = Field(..., description="Relative or absolute static path to mockup image", examples=["/static/img/images/mockup/journal_intentos.webp"])
    gradient: str = Field(..., description="Tailwind CSS backdrop gradient classes", examples=["from-stone-900 via-zinc-800 to-neutral-900"])
    tech: list[str] = Field(default_factory=list, description="Technologies, libraries, and frameworks used")
    github: str = Field(..., description="GitHub repository or profile URL", examples=["https://github.com/Elvis280/doc-analysis"])
    demo: str = Field(..., description="Live demo or deployment URL", examples=["https://github.com/Elvis280/doc-analysis"])
    featured: bool = Field(default=False, description="Whether project is featured on the hero showcase")
    category: str = Field(..., description="Domain category classification", examples=["AI Knowledge Base & RAG"])
    workflow: list[ProjectWorkflowStep] = Field(default_factory=list, description="Step-by-step workflow architecture")
    case_study: ProjectCaseStudy | None = Field(default=None, description="Detailed project case study deep dive")

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": "knowfforge",
                "number": "01",
                "title": "KNOWFFORGE",
                "subtitle": "AI Knowledge Base Generator & Document Structuring Pipeline",
                "description": "A FastAPI and Python pipeline that converts PDF documents into structured Markdown knowledge units.",
                "image": "/static/img/images/mockup/journal_intentos.webp",
                "gradient": "from-stone-900 via-zinc-800 to-neutral-900",
                "tech": ["Python", "FastAPI", "RAG", "LLMs"],
                "github": "https://github.com/Elvis280/doc-analysis",
                "demo": "https://github.com/Elvis280/doc-analysis",
                "featured": True,
                "category": "AI Knowledge Base & RAG",
                "workflow": [
                    {"label": "EXTRACT", "desc": "Layout-aware multi-page PDF document extraction"}
                ],
            }
        },
    )


class Experiment(BaseModel):
    id: str = Field(..., description="Experiment slug identifier", examples=["exp-001"])
    number: str = Field(..., description="Display sequence number", examples=["001"])
    question: str = Field(..., description="Research or architectural hypothesis headline", examples=["DOCUMENT → STRUCTURED KNOWLEDGE"])
    title: str = Field(..., description="Descriptive experiment title", examples=["Layout-Preserving PDF Parsing for High-Precision RAG"])
    category: str = Field(..., description="Technical domain category", examples=["RAG & Search"])
    status: str = Field(..., description="Experiment status (e.g. CONCLUDED, ACTIVE)", examples=["CONCLUDED"])
    hypothesis: str = Field(..., description="The underlying premise or hypothesis tested")
    tech: list[str] = Field(default_factory=list, description="Technologies and libraries used in this experiment")
    implementation: str = Field(..., description="Technical implementation summary")
    result: str = Field(..., description="Empirical metrics, findings, and results")
    what_went_wrong: str = Field(..., description="Edge cases, bugs, or failures encountered")
    what_learned: str = Field(..., description="Key technical learnings and takeaways")
    date: str = Field(..., description="Date or month of experiment execution", examples=["JAN 2025"])
    log_snippet: str = Field(..., description="Simulated or real runtime execution log snippet")

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": "exp-001",
                "number": "001",
                "question": "DOCUMENT → STRUCTURED KNOWLEDGE",
                "title": "Layout-Preserving PDF Parsing for High-Precision RAG",
                "category": "RAG & Search",
                "status": "CONCLUDED",
                "hypothesis": "Structure-faithful Markdown conversion eliminates chunk fragmentation.",
                "tech": ["Python", "FastAPI", "LLMs"],
                "implementation": "Built the Knowfforge pipeline: extracting multi-page PDF documents.",
                "result": "Boosted Top-3 retrieval recall from 68% to 92%.",
                "what_went_wrong": "Tables split across page breaks fractured into separate chunks.",
                "what_learned": "Preprocessing yields far greater fidelity than scaling model size.",
                "date": "JAN 2025",
                "log_snippet": "[KNOWFFORGE] Input: multi-column PDF (48 pages)\n[PARSER] Success",
            }
        },
    )


class Certificate(BaseModel):
    id: str = Field(..., description="Certificate slug identifier", examples=["google-ai-agents"])
    title: str = Field(..., description="Short credential title", examples=["AI Agents Intensive"])
    name: str = Field(..., description="Full official certificate name", examples=["5-Day AI Agents Intensive Course"])
    issuer: str = Field(..., description="Issuing body or platform", examples=["Google × Kaggle"])
    org_name: str = Field(..., description="Organization name", examples=["Google Cloud & Kaggle"])
    org_logo: str = Field(default="", description="SVG markup or image URL for issuer logo")
    date: str = Field(..., description="Issue date string", examples=["November 2024"])
    year: str = Field(..., description="Issue year string", examples=["2024"])
    category: str = Field(..., description="Skill category", examples=["AI / AGENTS"])
    credential: str = Field(..., description="Type of credential earned", examples=["5-Day AI Agents Intensive Credential"])
    image: str = Field(default="", description="Path to credential badge/certificate image")
    verification_url: str = Field(..., description="Public verification or badge URL", examples=["https://www.kaggle.com/certification/badges/elvis2804/105"])
    url: str = Field(..., description="Primary credential link", examples=["https://www.kaggle.com/certification/badges/elvis2804/105"])
    skills: list[str] = Field(default_factory=list, description="Verified competencies or topics covered")
    learned: list[str] = Field(default_factory=list, description="Key syllabus learnings and achievements")
    featured: bool = Field(default=False, description="Whether credential is highlighted on the home page")
    color: str = Field(default="", description="Tailwind CSS accent color classes", examples=["from-blue-500 to-indigo-400"])

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": "google-ai-agents",
                "title": "AI Agents Intensive",
                "name": "5-Day AI Agents Intensive Course",
                "issuer": "Google × Kaggle",
                "org_name": "Google Cloud & Kaggle",
                "org_logo": "<svg></svg>",
                "date": "November 2024",
                "year": "2024",
                "category": "AI / AGENTS",
                "credential": "5-Day AI Agents Intensive Credential",
                "image": "/static/img/certificates/AI Agents Intensive Course with Google.webp",
                "verification_url": "https://www.kaggle.com/certification/badges/elvis2804/105",
                "url": "https://www.kaggle.com/certification/badges/elvis2804/105",
                "skills": ["AI Agents", "Google Gemini"],
                "learned": ["Engineered autonomous agent workflows"],
                "featured": True,
                "color": "from-blue-500 to-indigo-400",
            }
        },
    )


# ── Router Initialization ─────────────────────────────────────────────────────

router = APIRouter(prefix="/api", tags=["portfolio"])


def _enrich_image(item: dict, key: str = "image") -> dict:
    d = dict(item)
    if d.get(key) and not d[key].startswith("/static"):
        d[key] = f"/static/img{d[key]}"
    return d


@router.get("/personal", summary="Get personal profile info")
async def get_personal():
    """Return personal info object with static asset paths."""
    p = dict(personal_info)
    if p.get("cv") and not p["cv"].startswith("/static"):
        p["cv"] = f"/static/img{p['cv']}"
    if p.get("avatar") and not p["avatar"].startswith("/static"):
        p["avatar"] = f"/static/img{p['avatar']}"
    return p


@router.get("/personality", summary="Get personality traits")
async def get_personality():
    """Return personality (iLike / iDontLike) object."""
    return personality


@router.get("/stats", summary="Get portfolio metrics & statistics")
async def get_stats():
    """Return portfolio stats (projects, certs, etc.)."""
    return stats


@router.get("/experience", summary="Get work experience & internships")
async def get_experience():
    """Return all internship / work experience entries."""
    return experience


@router.get("/leadership", summary="Get leadership & community roles")
async def get_leadership():
    """Return all leadership roles."""
    return leadership


@router.get("/skills", summary="Get skill categories & competencies")
async def get_skills():
    """Return all skill categories with their skills."""
    return skill_categories


# ── Projects API ──────────────────────────────────────────────────────────────

@router.get(
    "/projects",
    response_model=list[Project],
    summary="List all projects",
    description="Return all projects with full typed schema. Optionally filter by `featured=true`.",
)
async def get_projects(
    featured: bool | None = Query(default=None, description="Filter projects by featured status")
):
    """
    Return all projects. Optionally filter by featured=true.
    Example: GET /api/projects?featured=true
    """
    enriched = [_enrich_image(p) for p in projects]
    if featured is not None:
        return [p for p in enriched if p.get("featured") == featured]
    return enriched


@router.get(
    "/projects/{project_id}",
    response_model=Project,
    summary="Get single project by ID",
    description="Return a single project by its unique slug identifier.",
    responses={404: {"description": "Project not found"}},
)
async def get_project(
    project_id: str = Path(..., min_length=1, max_length=100, description="Project ID identifier (e.g. knowfforge)")
):
    """Return a single project by ID."""
    p_id = project_id.lower().strip()
    for project in projects:
        if project["id"].lower() == p_id:
            return _enrich_image(project)
    raise HTTPException(status_code=404, detail="Project not found")


# ── Experiments API ───────────────────────────────────────────────────────────

@router.get(
    "/experiments",
    response_model=list[Experiment],
    summary="List all research experiments",
    description="Return all research and engineering experiments. Optionally filter by status (e.g. CONCLUDED).",
)
async def get_experiments(
    status: str | None = Query(default=None, max_length=50, description="Experiment status filter (e.g. CONCLUDED)")
):
    """
    Return all experiments. Optionally filter by status.
    Example: GET /api/experiments?status=CONCLUDED
    """
    if status:
        return [e for e in experiments if e["status"].upper() == status.upper()]
    return experiments


@router.get(
    "/experiments/{experiment_id}",
    response_model=Experiment,
    summary="Get single experiment by ID",
    description="Return a single experiment by ID (e.g. exp-001) or number (e.g. 001).",
    responses={404: {"description": "Experiment not found"}},
)
async def get_experiment(
    experiment_id: str = Path(..., min_length=1, max_length=100, description="Experiment ID or number")
):
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


# ── Journey API ───────────────────────────────────────────────────────────────

@router.get("/journey", summary="Get career journey milestones")
async def get_journey():
    """Return full journey timeline milestones."""
    return journey_milestones


# ── Certificates API ──────────────────────────────────────────────────────────

@router.get(
    "/certificates",
    response_model=list[Certificate],
    summary="List all certifications",
    description="Return all earned certifications and credentials with enriched image paths.",
)
async def get_certificates():
    """Return all certifications with static image paths."""
    return [_enrich_image(c) for c in certificates]


@router.get(
    "/certificates/{cert_id}",
    response_model=Certificate,
    summary="Get single certificate by ID",
    description="Return a single certificate by its unique identifier (e.g. google-ai-agents).",
    responses={404: {"description": "Certificate not found"}},
)
async def get_certificate(
    cert_id: str = Path(..., min_length=1, max_length=100, description="Certificate ID identifier")
):
    """Return a single certificate by ID."""
    c_id = cert_id.lower().strip()
    for cert in certificates:
        if cert["id"].lower() == c_id:
            return _enrich_image(cert)
    raise HTTPException(status_code=404, detail="Certificate not found")
