# Devansh Sharma — Portfolio

> **AI Engineer & Systems Builder** — Server-side rendered portfolio built with **FastAPI + Jinja2**.  
> **Live Site:** [https://devansh-iota.vercel.app](https://devansh-iota.vercel.app)

## Stack

| Layer     | Tech                                       |
|-----------|--------------------------------------------|
| Backend   | Python 3.10+ · FastAPI · Uvicorn           |
| Templates | Jinja2 (SSR)                               |
| Styling   | Vanilla CSS (no frameworks)                |
| JS        | Vanilla JS (no bundler)                    |
| Assets    | Served from `/static/`                     |

## Project Structure

```
portfolio-v2/
├── main.py               # FastAPI app + routes
├── pyproject.toml        # Project metadata & deps
├── requirements.txt      # pip dependencies
├── uv.lock               # uv lockfile
├── .python-version       # Python version pin
├── data/
│   ├── __init__.py
│   └── portfolio_data.py # All portfolio content
├── routers/
│   ├── __init__.py
│   └── portfolio.py      # JSON API routes
├── templates/
│   ├── base.html         # Base layout + nav
│   └── index.html        # Full portfolio page
└── static/
    ├── css/style.css     # All styles
    ├── js/main.js        # All interactivity
    └── img/              # Images & assets
```

## Running Locally

```bash
# Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Start the dev server
uvicorn main:app --reload --port 8000
```

Then open **http://localhost:8000** in your browser.

## Deployment

### Render / Railway / Cloud Run / VPS
Set the start command to:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## API

The portfolio data is also available as a JSON API:

| Endpoint            | Description          |
|---------------------|----------------------|
| `GET /api/personal` | Personal info        |
| `GET /api/skills`   | Skill categories     |
| `GET /api/projects` | All projects         |
| `GET /api/projects/{id}` | Single project  |
| `GET /api/experiments` | Lab experiments   |
| `GET /api/experiments/{id}` | Single experiment |
| `GET /api/journey`  | Career timeline      |
| `GET /api/certificates` | Certifications  |
| `GET /api/certificates/{id}` | Single certificate |
| `GET /api/health`   | Health check         |
| `GET /api/docs`     | Swagger UI           |

