"""
test_schemas.py — Tests for Pydantic Models and Swagger / OpenAPI generation
"""
from fastapi.testclient import TestClient
from main import app
from routers.portfolio import Project, Experiment, Certificate

client = TestClient(app)


def test_openapi_schemas_registered():
    """Verify OpenAPI contains the Pydantic model schemas."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    schemas = response.json().get("components", {}).get("schemas", {})
    assert "Project" in schemas
    assert "ProjectWorkflowStep" in schemas
    assert "ProjectCaseStudy" in schemas
    assert "Experiment" in schemas
    assert "Certificate" in schemas


def test_projects_schema_compliance():
    """Verify /api/projects returns a list validating against Project model."""
    response = client.get("/api/projects")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for item in data:
        validated = Project.model_validate(item)
        assert validated.id
        assert validated.title
        assert validated.image.startswith("/static")


def test_single_project_schema_compliance():
    """Verify /api/projects/{id} returns an object validating against Project model."""
    response = client.get("/api/projects/knowfforge")
    assert response.status_code == 200
    data = response.json()
    project = Project.model_validate(data)
    assert project.id == "knowfforge"
    assert len(project.workflow) > 0
    assert project.case_study is not None
    assert project.case_study.problem


def test_experiments_schema_compliance():
    """Verify /api/experiments returns a list validating against Experiment model."""
    response = client.get("/api/experiments")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for item in data:
        exp = Experiment.model_validate(item)
        assert exp.id.startswith("exp-")
        assert exp.status
        assert exp.title


def test_certificates_schema_compliance():
    """Verify /api/certificates returns a list validating against Certificate model."""
    response = client.get("/api/certificates")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    for item in data:
        cert = Certificate.model_validate(item)
        assert cert.id
        assert cert.title
        assert cert.issuer
