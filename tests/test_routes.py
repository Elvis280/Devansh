"""
test_routes.py — Comprehensive tests verifying HTTP 200 on all routes and valid JSON schemas.
Uses pytest and httpx (via TestClient and AsyncClient).
"""
import httpx
import pytest
from fastapi.testclient import TestClient

from data.portfolio_data import certificates, experiments, projects
from main import app
from routers.portfolio import Certificate, Experiment, Project

client = TestClient(app)


# ── 1. Web & Static Document Routes (HTTP 200) ────────────────────────────────

@pytest.mark.parametrize(
    ("path", "expected_content_type"),
    [
        ("/", "text/html"),
        ("/journey", "text/html"),
        ("/journey/2024", "text/html"),
        ("/favicon.ico", "image/"),
        ("/favicon.svg", "image/svg+xml"),
        ("/resume", "application/pdf"),
        ("/cv", "application/pdf"),
        ("/sitemap.xml", "application/xml"),
        ("/robots.txt", "text/plain"),
    ],
)
def test_web_routes_status_200(path: str, expected_content_type: str):
    """Verify that all public web, document, and SEO routes return HTTP 200 with correct media types."""
    response = client.get(path)
    assert response.status_code == 200, f"Route {path} returned status {response.status_code}"
    content_type = response.headers.get("content-type", "")
    assert expected_content_type in content_type, f"Expected {expected_content_type} in {content_type}"


# ── 2. System & Documentation Routes (HTTP 200) ───────────────────────────────

def test_api_health_route_and_schema():
    """Verify /api/health returns HTTP 200 with structured JSON schema."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert isinstance(data, dict)
    assert data.get("status") == "ok"
    assert "renderer" in data
    assert "version" in data


def test_openapi_json_schema():
    """Verify /openapi.json returns HTTP 200 with a valid OpenAPI 3 specification."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    spec = response.json()
    assert spec.get("openapi", "").startswith("3.")
    assert "paths" in spec
    assert "components" in spec
    assert "schemas" in spec["components"]
    # Verify core schemas exist in OpenAPI registry
    schemas = spec["components"]["schemas"]
    assert "Project" in schemas
    assert "Experiment" in schemas
    assert "Certificate" in schemas


def test_swagger_and_redoc_ui_docs():
    """Verify Swagger UI (/api/docs) and ReDoc (/api/redoc) return HTTP 200 HTML pages."""
    for doc_path in ("/api/docs", "/api/redoc"):
        response = client.get(doc_path)
        assert response.status_code == 200
        assert "text/html" in response.headers.get("content-type", "")


# ── 3. Portfolio API Routes & Schema Validation ───────────────────────────────

def test_api_personal_schema():
    """Verify /api/personal returns HTTP 200 with valid personal info schema."""
    response = client.get("/api/personal")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert isinstance(data, dict)
    for field in ("name", "title", "email", "github", "avatar", "cv", "roles"):
        assert field in data, f"Missing required field '{field}' in /api/personal"
    assert data["avatar"].startswith("/static")
    assert data["cv"].startswith("/static")


def test_api_personality_schema():
    """Verify /api/personality returns HTTP 200 with i_like and i_dont_like lists."""
    response = client.get("/api/personality")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert "i_like" in data
    assert "i_dont_like" in data
    assert isinstance(data["i_like"], list)
    assert isinstance(data["i_dont_like"], list)


def test_api_stats_schema():
    """Verify /api/stats returns HTTP 200 with list of stat metrics."""
    response = client.get("/api/stats")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for item in data:
        assert "label" in item
        assert "value" in item
        assert "desc" in item


def test_api_experience_schema():
    """Verify /api/experience returns HTTP 200 with structured experience entries."""
    response = client.get("/api/experience")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for item in data:
        assert "id" in item
        assert "role" in item
        assert "org" in item
        assert "period" in item
        assert "bullets" in item
        assert isinstance(item["bullets"], list)


def test_api_leadership_schema():
    """Verify /api/leadership returns HTTP 200 with structured leadership roles."""
    response = client.get("/api/leadership")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for item in data:
        assert "id" in item
        assert "role" in item
        assert "org" in item
        assert "period" in item


def test_api_skills_schema():
    """Verify /api/skills returns HTTP 200 with categorized skills."""
    response = client.get("/api/skills")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for category in data:
        assert "id" in category
        assert "label" in category
        assert "skills" in category
        assert isinstance(category["skills"], list)


def test_api_journey_schema():
    """Verify /api/journey returns HTTP 200 with milestones."""
    response = client.get("/api/journey")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for milestone in data:
        assert "year" in milestone
        assert "title" in milestone
        assert "highlights" in milestone


# ── 4. Typed Pydantic Schema Validation (Projects, Experiments, Certs) ────────

def test_api_projects_list_schema():
    """Verify /api/projects returns HTTP 200 and all items conform to Project Pydantic model."""
    response = client.get("/api/projects")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    items = response.json()
    assert len(items) > 0
    for item in items:
        validated = Project.model_validate(item)
        assert validated.id
        assert validated.title
        assert validated.image.startswith("/static")
        assert len(validated.tech) > 0


def test_api_projects_featured_filter():
    """Verify /api/projects?featured=true returns HTTP 200 and only featured items."""
    response = client.get("/api/projects?featured=true")
    assert response.status_code == 200
    items = response.json()
    assert len(items) > 0
    for item in items:
        validated = Project.model_validate(item)
        assert validated.featured is True


@pytest.mark.parametrize("project_data", projects)
def test_api_single_project_schema(project_data: dict):
    """Verify /api/projects/{id} returns HTTP 200 and validates against Project model."""
    p_id = project_data["id"]
    response = client.get(f"/api/projects/{p_id}")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    validated = Project.model_validate(response.json())
    assert validated.id == p_id
    assert validated.title == project_data["title"]


def test_api_experiments_list_schema():
    """Verify /api/experiments returns HTTP 200 and all items conform to Experiment model."""
    response = client.get("/api/experiments")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    items = response.json()
    assert len(items) > 0
    for item in items:
        validated = Experiment.model_validate(item)
        assert validated.id.startswith("exp-")
        assert validated.status
        assert validated.title


def test_api_experiments_status_filter():
    """Verify /api/experiments?status=CONCLUDED returns HTTP 200 with filtered items."""
    response = client.get("/api/experiments?status=CONCLUDED")
    assert response.status_code == 200
    items = response.json()
    assert len(items) > 0
    for item in items:
        validated = Experiment.model_validate(item)
        assert validated.status == "CONCLUDED"


@pytest.mark.parametrize("exp_data", experiments)
def test_api_single_experiment_schema(exp_data: dict):
    """Verify /api/experiments/{id} returns HTTP 200 and validates against Experiment model."""
    e_id = exp_data["id"]
    response = client.get(f"/api/experiments/{e_id}")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    validated = Experiment.model_validate(response.json())
    assert validated.id == e_id
    assert validated.title == exp_data["title"]


def test_api_certificates_list_schema():
    """Verify /api/certificates returns HTTP 200 and all items conform to Certificate model."""
    response = client.get("/api/certificates")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    items = response.json()
    assert len(items) > 0
    for item in items:
        validated = Certificate.model_validate(item)
        assert validated.id
        assert validated.title
        assert validated.issuer


@pytest.mark.parametrize("cert_data", certificates)
def test_api_single_certificate_schema(cert_data: dict):
    """Verify /api/certificates/{id} returns HTTP 200 and validates against Certificate model."""
    c_id = cert_data["id"]
    response = client.get(f"/api/certificates/{c_id}")
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    validated = Certificate.model_validate(response.json())
    assert validated.id == c_id
    assert validated.title == cert_data["title"]


# ── 5. Async HTTPX Client Verification ────────────────────────────────────────

@pytest.mark.anyio
async def test_async_httpx_client_routes():
    """Verify asynchronous request execution on core routes using httpx.AsyncClient."""
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as ac:
        # Test HTML SSR route
        home_resp = await ac.get("/")
        assert home_resp.status_code == 200
        assert "text/html" in home_resp.headers.get("content-type", "")

        # Test API JSON route
        health_resp = await ac.get("/api/health")
        assert health_resp.status_code == 200
        assert health_resp.json().get("status") == "ok"

        # Test Projects API with model validation
        proj_resp = await ac.get("/api/projects")
        assert proj_resp.status_code == 200
        proj_data = proj_resp.json()
        assert len(proj_data) > 0
        Project.model_validate(proj_data[0])
