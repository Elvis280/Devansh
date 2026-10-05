# Devansh Sharma — Portfolio v2

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![Jinja2](https://img.shields.io/badge/Jinja2-SSR-B41717?style=flat&logo=jinja&logoColor=white)](https://palletsprojects.com/p/jinja/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://devansh-iota.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Forward Deployed & AI Systems Engineer** — A high-performance, server-side rendered (SSR) portfolio built with **FastAPI**, **Jinja2**, and **Vanilla WebGL / Canvas**. Engineered for instant page loads, dynamic animations without heavy JS frameworks, full SEO optimization, and dual-purpose REST API delivery.

🔗 **Live Portfolio:** [https://devansh-iota.vercel.app](https://devansh-iota.vercel.app)  
📄 **Direct Resume Download:** [Devansh_Resume.pdf](https://devansh-iota.vercel.app/resume) (or `/resume` / `/cv`)

---

## Table of Contents

- [Overview & Architecture](#overview--architecture)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Option A: Using `uv` (Recommended)](#option-a-using-uv-recommended)
  - [Option B: Using Standard `pip` and `venv`](#option-b-using-standard-pip-and-venv)
- [REST API Endpoints](#rest-api-endpoints)
- [SEO & Discoverability](#seo--discoverability)
- [Resume & Asset Management](#resume--asset-management)
- [Deployment](#deployment)
  - [Vercel (Serverless)](#vercel-serverless)
  - [Docker / Container Deployment](#docker--container-deployment)
  - [Render / Railway / VPS](#render--railway--vps)
- [Author & Contact](#author--contact)

---

## Overview & Architecture

Unlike typical portfolios bloated with large client-side single-page application (SPA) bundles, **Portfolio v2** prioritizes raw performance, zero hydration overhead, and clean architectural separation:

1. **Server-Side Rendered (SSR):** Templates are rendered instantly on the server via FastAPI and Jinja2, ensuring near-instant First Contentful Paint (FCP) and optimal search crawler indexing.
2. **Framework-Free Aesthetics:** Built with curated Vanilla CSS custom properties, CRT scanline grain overlays, and custom typography (`JetBrains Mono`, `Bebas Neue`, `Edo SZ`).
3. **Hardware-Accelerated Experiences:** Features custom HTML5 Canvas particle physics simulations for the hero headline and a WebGL 3D infinite cylinder menu powered by `gl-matrix` for certification showcases.
4. **Decoupled Data Architecture:** All portfolio content lives in `data/portfolio_data.py` as a single source of truth, serving both the SSR templates and a fully documented JSON REST API.

---

## Key Features

- **Hero Particle Physics Canvas:** An interactive, physics-driven particle simulation rendering `DEVANSH SHARMA` with mouse collision avoidance and natural settling dynamics.
- **WebGL 3D Infinite Menu:** An interactive, 3D rotating cylinder menu built with WebGL and matrix math (`gl-matrix`) for browsing certifications with direct credential verification links.
- **Interactive Personal Dossier:** A modal window breaking down academic background, tech stacks, and honors, with direct one-click PDF resume download.
- **Selected Projects & System Architecture:** Detailed breakdowns of production-ready systems including:
  - **Knowfforge:** AI Knowledge Base generator that transforms PDFs into source-faithful Markdown knowledge units for RAG pipelines.
  - **Nexa:** Modular AI agent system pairing LLM reasoning with tool routing and multi-turn session memory.
  - **Campus Saathi:** Retrieval-Augmented Generation (RAG) assistant for university circulars using FAISS and FastAPI.
- **Interactive Journey Timeline:** Milestone archive documenting AI/ML and Python Full-Stack internships at SRDT, plus student chapter leadership at **AlgoZenith** and **GeeksforGeeks**.
- **The Arsenal (Skills & Experiments):** Filterable categorized technical stack (Python, FastAPI, RAG, FAISS, MySQL, Docker, LLM APIs).
- **Direct Resume Endpoints:** Seamless resume download integration accessible via the navigation overlay, contact link rows, the dossier modal, and direct URL routes (`/resume` and `/cv`).
- **Complete SEO Suite:** Dynamic XML sitemap generator (`/sitemap.xml`), robots exclusion standard (`/robots.txt`), Google Search Console verification, Open Graph tags, Twitter Cards, and Schema.org `Person` JSON-LD structured data.
- **Interactive API Documentation:** Automatically generated OpenAPI/Swagger UI at `/api/docs` and ReDoc at `/api/redoc`.

---

## Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Backend & Server** | Python 3.12+ · FastAPI · Uvicorn | High-performance asynchronous ASGI application |
| **Templating** | Jinja2 | Server-side HTML rendering with custom filters |
| **Data Validation** | Pydantic v2 | Robust typing and response modeling |
| **Styling** | Vanilla CSS3 | Custom design system, CSS variables, dark brutalist aesthetic |
| **Interactivity** | Vanilla JavaScript (ES6+) | Zero external framework dependencies |
| **Graphics & 3D** | WebGL · Canvas API · `gl-matrix` | Hardware-accelerated particle physics & 3D rotating cylinder |
| **Package Management** | `uv` / `pip` | Lightning-fast deterministic resolution with `uv.lock` |
| **Deployment** | Vercel Serverless / ASGI | Standard WSGI/ASGI container or Vercel serverless functions |

---

## Project Structure

```
portfolio-v2/
├── api/
│   └── index.py              # Vercel serverless function entrypoint
├── data/
│   ├── __init__.py
│   └── portfolio_data.py     # Single source of truth for all portfolio content
├── routers/
│   ├── __init__.py
│   └── portfolio.py          # REST API endpoints (/api/*)
├── static/
│   ├── css/
│   │   └── style.css         # Complete design system & custom styles
│   ├── fonts/                # Custom web typography
│   ├── img/
│   │   ├── certificates/     # Verified credential images
│   │   ├── images/           # Project mockups, polaroids & resumes
│   │   │   ├── Devansh_Resume.pdf  # Active resume PDF
│   │   │   └── Devansh_CV.pdf      # Mirror resume PDF
│   │   ├── dev_hero_portrait.jpg
│   │   ├── favicon.svg
│   │   └── ...
│   └── js/
│       ├── gl-matrix-min.js  # Matrix math utility for 3D projections
│       ├── infinite-menu.js  # WebGL 3D infinite rotating cylinder menu
│       ├── particle-text.js  # Interactive canvas particle physics
│       └── main.js           # Core interaction, smooth navigation, modals
├── templates/
│   ├── base.html             # Base layout, SEO meta, navigation & footer
│   └── index.html            # Main portfolio page with all sections
├── main.py                   # FastAPI application initialization & core routes
├── pyproject.toml            # Project metadata and dependencies
├── requirements.txt          # Standard pip dependencies
├── uv.lock                   # Deterministic dependency lockfile
├── robots.txt                # Search engine crawlers directive
├── sitemap.xml               # Static XML sitemap fallback
└── README.md                 # Project documentation
```

---

## Getting Started

### Prerequisites

- **Python 3.12+**
- (Optional, recommended) [uv](https://github.com/astral-sh/uv) for ultra-fast package management

### Option A: Using `uv` (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Elvis280/portfoliov2.git
   cd portfoliov2
   ```

2. **Sync dependencies and virtual environment:**
   ```bash
   uv sync
   ```

3. **Start the local development server:**
   ```bash
   uv run uvicorn main:app --reload --port 8000
   ```

4. Open your browser at **[http://localhost:8000](http://localhost:8000)**.

---

### Option B: Using Standard `pip` and `venv`

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Elvis280/portfoliov2.git
   cd portfoliov2
   ```

2. **Create and activate a virtual environment:**
   - **Windows:**
     ```powershell
     python -m venv .venv
     .venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the development server:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

5. Open **[http://localhost:8000](http://localhost:8000)** in your browser.

---

## REST API Endpoints

The portfolio doubles as a full JSON REST API:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Main server-side rendered portfolio page |
| `GET` | `/resume` | Direct download / view of updated resume PDF |
| `GET` | `/cv` | Alias route for resume download |
| `GET` | `/api/personal` | Personal contact details, biography, roles, and resume links |
| `GET` | `/api/personality` | "I Like" and "I Don't Like" preferences |
| `GET` | `/api/stats` | High-level portfolio metrics (projects, AI systems, certs) |
| `GET` | `/api/skills` | Categorized technical skills matrix |
| `GET` | `/api/projects` | All selected projects (filter: `?featured=true`) |
| `GET` | `/api/projects/{id}` | Detailed data for a specific project |
| `GET` | `/api/experiments` | Laboratory experiments (filter: `?status=CONCLUDED`) |
| `GET` | `/api/experiments/{id}` | Single experiment details by ID or code |
| `GET` | `/api/experience` | Internship & industry experience |
| `GET` | `/api/leadership` | Student chapter leadership positions |
| `GET` | `/api/journey` | Chronological career timeline milestones |
| `GET` | `/api/certificates` | All verified certifications and credentials |
| `GET` | `/api/certificates/{id}` | Single certificate details by ID |
| `GET` | `/api/health` | Health check and runtime information |
| `GET` | `/api/docs` | Interactive Swagger UI API documentation |
| `GET` | `/api/redoc` | ReDoc API documentation |
| `GET` | `/sitemap.xml` | Dynamically generated XML sitemap |
| `GET` | `/robots.txt` | Crawler directives linking to sitemap |

---

## SEO & Discoverability

- **Canonical URL:** Configured to `https://devansh-iota.vercel.app/`
- **Dynamic Sitemap:** Generated on-the-fly at `/sitemap.xml` compliant with Google Search Console standards (clean URL hierarchy without fragment hashes).
- **Social Metadata:** Complete Open Graph (`og:*`) and Twitter Card (`twitter:*`) tags configured for rich previews when shared on LinkedIn, Twitter, Discord, and Slack.
- **Structured Data:** Embedded Schema.org JSON-LD `ProfilePage` and `Person` schema providing rich search engine knowledge graph data.

---

## Resume & Asset Management

The resume is maintained as `Devansh_Resume.pdf`:

- **Static Asset:** Located at `static/img/images/Devansh_Resume.pdf` (and mirrored to `Devansh_CV.pdf` for backward compatibility).
- **FastAPI Direct Endpoints:** Accessible via `/resume` and `/cv`.
- **UI Access Points:**
  - Navigation drawer overlay: "↓ Resume PDF" download button.
  - Personal Dossier Modal: "DOWNLOAD RESUME (PDF)" action button.
  - Contact Section: "Download My Resume" quick link row with automatic download attribute.

To update the resume in the future:
1. Place the updated PDF into `static/img/images/Devansh_Resume.pdf` (and optionally mirror to `Devansh_CV.pdf`).
2. The server and download links will immediately serve the new revision.

---

## Deployment

### Vercel (Serverless)

The application includes an `api/index.py` serverless handler configured for Vercel:

```bash
vercel deploy --prod
```

### Docker / Container Deployment

Create a `Dockerfile` in the root:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t portfolio-v2 .
docker run -p 8000:8000 portfolio-v2
```

### Render / Railway / VPS

Set your start command to:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Author & Contact

**Devansh Sharma**  
Forward Deployed & AI Systems Engineer · Computer Science Student  
Lucknow, Uttar Pradesh, India

- 🌐 **Portfolio:** [https://devansh-iota.vercel.app](https://devansh-iota.vercel.app)
- 🐙 **GitHub:** [@Elvis280](https://github.com/Elvis280)
- 💼 **LinkedIn:** [devansh-sharma28](https://www.linkedin.com/in/devansh-sharma28/)
- 🐦 **Twitter / X:** [@Devansh280](https://x.com/Devansh280)
- ⚡ **LeetCode:** [Devansh28](https://leetcode.com/u/Devansh28)
- 📚 **GeeksforGeeks:** [devansh28sharma](https://www.geeksforgeeks.org/user/devansh28sharma/)
- ✉️ **Email:** [devansh28sharma@gmail.com](mailto:devansh28sharma@gmail.com)

---

*Licensed under the [MIT License](LICENSE).*
