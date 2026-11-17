import os
from pathlib import Path
import pytest
from fastapi.testclient import TestClient

from main import app, STATIC_DIR

client = TestClient(app)


# ── 1. HTTP Security Headers Tests ────────────────────────────────────────────

def test_security_headers_on_html_response():
    """Verify security headers are consistently present on standard HTML routes."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"
    assert response.headers.get("referrer-policy") == "strict-origin-when-cross-origin"
    
    csp = response.headers.get("content-security-policy", "")
    assert "default-src 'self'" in csp
    assert "frame-ancestors 'none'" in csp
    assert "object-src 'none'" in csp
    assert "base-uri 'self'" in csp
    assert "https://fonts.googleapis.com" in csp
    assert "https://fonts.gstatic.com" in csp


def test_security_headers_on_api_response():
    """Verify security headers are present on API responses."""
    response = client.get("/api/projects")
    assert response.status_code == 200
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"
    assert "content-security-policy" in response.headers


def test_security_headers_on_404_error_response():
    """Verify security headers are preserved on error responses."""
    response = client.get("/non-existent-sector-123")
    assert response.status_code == 404
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"
    assert "content-security-policy" in response.headers


def test_hsts_disabled_in_local_development():
    """HSTS should not be active in non-production local HTTP development."""
    response = client.get("/")
    assert "strict-transport-security" not in response.headers


def test_hsts_enabled_in_production_https(monkeypatch):
    """HSTS should be active only when in production and served over HTTPS."""
    monkeypatch.setenv("ENVIRONMENT", "production")
    response = client.get("/", headers={"x-forwarded-proto": "https"})
    assert response.headers.get("strict-transport-security") == "max-age=31536000; includeSubDomains"


# ── 2. CORS Configuration Tests ───────────────────────────────────────────────

def test_cors_authorized_origin():
    """Authorized frontend origin should receive Access-Control-Allow-Origin."""
    authorized_origin = "https://devansh-iota.vercel.app"
    response = client.get("/api/projects", headers={"Origin": authorized_origin})
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == authorized_origin


def test_cors_unauthorized_origin():
    """Unauthorized origin should NOT receive Access-Control-Allow-Origin."""
    unauthorized_origin = "https://malicious-website.com"
    response = client.get("/api/projects", headers={"Origin": unauthorized_origin})
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") is None


def test_cors_preflight_options():
    """Preflight OPTIONS request should return allowed methods."""
    response = client.options(
        "/api/projects",
        headers={
            "Origin": "https://devansh-iota.vercel.app",
            "Access-Control-Request-Method": "GET",
        },
    )
    assert response.status_code == 200
    assert "GET" in response.headers.get("access-control-allow-methods", "")


# ── 3. Custom Branded 404 Error Page Tests ────────────────────────────────────

def test_web_404_returns_branded_html():
    """Unknown web routes must return custom cyberpunk CRT HTML page with HTTP 404."""
    response = client.get("/unknown-matrix-route")
    assert response.status_code == 404
    assert "text/html" in response.headers.get("content-type", "")
    assert "STATUS // 404_NOT_FOUND" in response.text
    assert "TRANSMISSION LOST" in response.text
    assert 'href="/"' in response.text


def test_api_404_returns_json():
    """Unknown /api/* routes must return JSON with HTTP 404."""
    response = client.get("/api/unknown-endpoint")
    assert response.status_code == 404
    assert "application/json" in response.headers.get("content-type", "")
    data = response.json()
    assert "detail" in data


def test_api_project_not_found():
    """Project not found must return JSON with 404."""
    response = client.get("/api/projects/non-existent-proj")
    assert response.status_code == 404
    assert "application/json" in response.headers.get("content-type", "")


# ── 4. Resume Endpoint Hardening Tests ────────────────────────────────────────

def test_resume_download_primary_exists():
    """Downloading resume returns 200 PDF."""
    response = client.get("/resume")
    assert response.status_code == 200
    assert response.headers.get("content-type") == "application/pdf"
    assert 'filename="Devansh_Resume.pdf"' in response.headers.get("content-disposition", "")
    assert response.headers.get("cache-control") == "public, no-cache, must-revalidate"


def test_cv_download_route():
    """The /cv route also serves the PDF resume."""
    response = client.get("/cv")
    assert response.status_code == 200
    assert response.headers.get("content-type") == "application/pdf"


def test_resume_missing_returns_404(monkeypatch, tmp_path):
    """When neither resume file exists, it returns HTTP 404 instead of 500."""
    from main import STATIC_DIR
    import main

    # Temporarily point STATIC_DIR to an empty temporary path
    empty_static = tmp_path / "static"
    (empty_static / "img" / "images").mkdir(parents=True)
    monkeypatch.setattr(main, "STATIC_DIR", empty_static)

    # Browser request receives branded 404 HTML
    response = client.get("/resume")
    assert response.status_code == 404
    assert "404" in response.text

    # JSON client receives 404 with detail message
    json_response = client.get("/resume", headers={"Accept": "application/json"})
    assert json_response.status_code == 404
    assert json_response.json().get("detail") == "Resume file not found"


# ── 5. Input Validation Tests ─────────────────────────────────────────────────

def test_project_id_excessive_length_validation():
    """Excessively long project_id path param should fail validation with 422."""
    long_id = "a" * 150
    response = client.get(f"/api/projects/{long_id}")
    assert response.status_code == 422
    assert "application/json" in response.headers.get("content-type", "")


def test_experiment_status_validation():
    """Experiment filtering by valid status works."""
    response = client.get("/api/experiments?status=CONCLUDED")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
