export const personalInfo = {
  name: "Devansh Sharma",
  handle: "Elvis280",
  title: "Builder / AI Engineer / Computer Science Student",
  roleHeadline: "AI Engineer & Systems Builder",
  statement: "I build things that probably shouldn't exist yet.",
  alternateStatement: "I build things that think, learn and adapt.",
  email: "devansh28sharma@gmail.com",
  phone: "+91 80818 74158",
  github: "https://github.com/Elvis280",
  linkedin: "https://www.linkedin.com/in/devansh-sharma28/",
  twitter: "https://x.com/Devansh280",
  leetcode: "https://leetcode.com/u/elvis2804/",
  location: "Lucknow, Uttar Pradesh, India",
  country: "India",
  status: "AVAILABLE FOR → INTERNSHIPS / OPPORTUNITIES",
  metadataTags: [
    "BASED IN INDIA",
    "CS / AI / SOFTWARE",
    "AVAILABLE FOR → INTERNSHIPS / OPPORTUNITIES",
  ],
  bio: "Computer Science undergraduate who enjoys building things end to end – from AI agents and RAG pipelines to back-end and full-stack applications. Comfortable moving between machine learning experiments and shipping working software.",
  editorialBio: "I like building systems that solve real problems using AI and code. Always learning, always shipping. Engineer by mind, builder by choice.",
  objective: "Seeking to build intelligent systems, autonomous agents, and production software at scale.",
  education: {
    institution: "Shri Ramswaroop Memorial College of Engineering and Management (SRMCEM)",
    degree: "B.Tech – Computer Science and Engineering",
    period: "Sept 2023 – May 2027",
    location: "Lucknow, India",
  },
  avatar: "/Dev.png",
  cv: "/images/Devansh_CV.pdf",
  roles: [
    "AI Engineer",
    "Agentic AI Developer",
    "RAG Pipeline Builder",
    "Full-Stack Developer",
    "ML & Data Systems",
  ],
};

export const personality = {
  iLike: [
    { text: "Building before overplanning", desc: "Prototype first to learn ground-truth constraints faster." },
    { text: "Breaking things to understand them", desc: "Stress-testing edge cases and discovering failure modes." },
    { text: "Understanding how systems work", desc: "Peeling back abstractions from hardware to token pipelines." },
    { text: "Experimenting with weird ideas", desc: "Combining computer vision, agent loops, and multimodal perception." },
  ],
  iDontLike: [
    { text: "Overengineered solutions", desc: "Building 10 layers of complexity when 2 will solve the core problem." },
    { text: "Copy-paste projects", desc: "Generic tutorials masquerading as original engineering." },
    { text: "Technology for the sake of technology", desc: "Using AI where simple deterministic logic or SQL does it better." },
  ],
};

export const stats = [
  { label: "Projects Built", value: "10+" },
  { label: "AI Systems", value: "6+" },
  { label: "Certifications", value: "11+" },
  { label: "Tech Stack", value: "25+" },
];

export const skillCategories = [
  {
    id: "ai-agents",
    label: "AI & Agents",
    icon: "Brain",
    color: "from-violet-500 to-purple-600",
    skills: ["Agentic AI", "LLMs", "RAG", "Agent Workflows", "Prompt Engineering", "Model Context Protocol (MCP)", "Multi-Agent Systems"],
  },
  {
    id: "machine-learning",
    label: "Machine Learning & Analytics",
    icon: "Zap",
    color: "from-cyan-400 to-blue-500",
    skills: ["Scikit-learn", "K-Means", "Random Forest", "Apriori", "Prophet", "RFM Analysis", "Data Analytics", "Model Inference"],
  },
  {
    id: "programming",
    label: "Programming Languages",
    icon: "Code2",
    color: "from-amber-400 to-orange-500",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "development",
    label: "Development & Backend",
    icon: "Server",
    color: "from-emerald-400 to-teal-500",
    skills: ["FastAPI", "Flask", "REST APIs", "Async Processing", "Next.js", "React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    id: "databases",
    label: "Databases & Vector Stores",
    icon: "Database",
    color: "from-blue-500 to-indigo-600",
    skills: ["MySQL", "Supabase", "SQLite", "FAISS", "ChromaDB", "PostgreSQL"],
  },
  {
    id: "tools-devops",
    label: "Tools & Cloud",
    icon: "Cloud",
    color: "from-pink-500 to-rose-600",
    skills: ["Git", "GitHub", "Docker", "Google Cloud", "n8n", "CI/CD", "Vercel"],
  },
];

export interface ProjectWorkflowStep {
  label: string;
  desc: string;
}

export interface ArchitectureNode {
  icon: string;
  title: string;
  desc: string;
}

export interface ProjectResult {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  number: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  category: string;
  status: string;
  duration: string;
  heroImage: string;
  workflow: ProjectWorkflowStep[];
  architectureNodes: ArchitectureNode[];
  results: ProjectResult[];
  links: ProjectLink[];
  caseStudy: {
    problem: string;
    approach: string;
    architecture: string;
    challenges: string;
    result: string;
  };
}

export const projects: ProjectDetail[] = [
  {
    id: "intentos",
    number: "01",
    title: "INTENTOS",
    subtitle: "Autonomous Desktop AI Operating System Agent",
    description: "An autonomous desktop agent that sees the screen, reasons about multi-step user intents, executes OS-level actions, and verifies state changes.",
    image: "",
    heroImage: "",
    gradient: "from-zinc-900 via-neutral-800 to-stone-900",
    tech: ["Python", "Agentic AI", "Model Context Protocol", "FastAPI", "Multimodal Vision", "PyAutoGUI", "OS Automation"],
    github: "https://github.com/Elvis280",
    demo: "https://github.com/Elvis280",
    featured: true,
    category: "Autonomous Agent",
    status: "ACTIVE",
    duration: "JAN 2025 — PRESENT",
    workflow: [
      { label: "OBSERVE", desc: "Multimodal screen capture & OCR parsing" },
      { label: "REASON", desc: "Deconstruct intent into deterministic action graphs" },
      { label: "ACT", desc: "Execute desktop tools via MCP & OS hooks" },
      { label: "VERIFY", desc: "Self-correcting feedback loop on visual state" },
      { label: "LOOP", desc: "Repeat until task complete" },
    ],
    architectureNodes: [
      { icon: "Eye", title: "SCREEN CAPTURE", desc: "Real-time desktop frame acquisition" },
      { icon: "Brain", title: "MULTIMODAL LLM", desc: "Vision-language intent reasoning" },
      { icon: "Wrench", title: "MCP TOOLS", desc: "Structured tool dispatch" },
      { icon: "Terminal", title: "OS EXECUTION", desc: "Native mouse & keyboard control" },
      { icon: "ShieldCheck", title: "VISUAL VERIFY", desc: "Post-action state validation" },
    ],
    results: [
      { value: "1000+", label: "ACTIONS EXECUTED" },
      { value: "82%", label: "TASK SUCCESS RATE" },
      { value: "20+", label: "REAL WORLD TASKS" },
      { value: "∞", label: "POSSIBILITIES" },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://github.com/Elvis280" },
      { label: "SOURCE CODE", url: "https://github.com/Elvis280" },
    ],
    caseStudy: {
      problem: "Traditional AI assistants are trapped in browser tabs and cannot reliably control native desktop applications or recover when UI elements shift position.",
      approach: "Built a closed-loop perception-action engine combining vision LLMs with the Model Context Protocol (MCP) for tool dispatch and state verification.",
      architecture: "Screen capture pipeline -> Multimodal LLM planner -> Structured MCP tool caller -> PyAutoGUI executor -> Post-action screenshot visual verifier.",
      challenges: "LLM coordinate hallucination and high visual latency. Solved by implementing relative coordinate anchoring, OCR bounding box hints, and async frame caching.",
      result: "Achieved reliable execution of complex multi-app tasks with automatic failure recovery.",
    },
  },
  {
    id: "braillevision",
    number: "02",
    title: "BRAILLEVISION",
    subtitle: "Computer Vision Tactile Accessibility System",
    description: "Real-time computer vision system translating physical Braille and tactile dot matrices into synthesized speech and multilingual digital text with low latency.",
    image: "",
    heroImage: "",
    gradient: "from-stone-900 via-zinc-800 to-slate-900",
    tech: ["Python", "OpenCV", "PyTorch", "Computer Vision", "FastAPI", "Edge AI", "gTTS"],
    github: "https://github.com/Elvis280",
    demo: "https://github.com/Elvis280",
    featured: true,
    category: "Computer Vision",
    status: "CONCLUDED",
    duration: "MAR 2024 — JUN 2024",
    workflow: [
      { label: "CAPTURE", desc: "High-contrast edge camera stream" },
      { label: "PREPROCESS", desc: "Adaptive thresholding & morphological filtering" },
      { label: "DETECT", desc: "Tactile dot contour extraction" },
      { label: "GROUP", desc: "Cell grid alignment & affine rectification" },
      { label: "RECOGNIZE", desc: "Braille table decoding to text" },
    ],
    architectureNodes: [
      { icon: "Camera", title: "IMAGE INPUT", desc: "Camera frame acquisition" },
      { icon: "Eye", title: "PREPROCESSING", desc: "Thresholding & filtering" },
      { icon: "Search", title: "DOT DETECTION", desc: "Contour extraction & clustering" },
      { icon: "Grid", title: "CELL GROUPING", desc: "2x3 matrix alignment" },
      { icon: "Volume2", title: "SPEECH OUTPUT", desc: "Multilingual synthesis" },
    ],
    results: [
      { value: "94%", label: "CHARACTER ACCURACY" },
      { value: "<150ms", label: "TRANSLATION LATENCY" },
      { value: "6-dot", label: "CELL DECODING" },
      { value: "REAL-TIME", label: "PROCESSING" },
    ],
    links: [
      { label: "SOURCE CODE", url: "https://github.com/Elvis280" },
    ],
    caseStudy: {
      problem: "Visually impaired individuals face massive barriers reading tactile text on medication boxes, public signage, and documents when electronic Braille displays are unavailable.",
      approach: "Engineered an edge computer vision pipeline that isolates embossed dots under challenging lighting conditions and maps 6-dot cells to linguistic tokens.",
      architecture: "Camera input -> Adaptive thresholding & morphological filtering -> Dot clustering & affine rectification -> Braille table mapper -> Audio synthesizer.",
      challenges: "Varying shadow angles causing false positives on embossed paper. Overcame this with dynamic illumination normalizers and contour aspect-ratio heuristics.",
      result: "Sub-150ms translation latency with 94%+ character accuracy on standard Grade 1 Braille across diverse lighting environments.",
    },
  },
  {
    id: "campus-saathi",
    number: "03",
    title: "CAMPUS SAATHI",
    subtitle: "Document Intelligence RAG System",
    description: "A high-precision Retrieval-Augmented Generation assistant using FAISS and ChromaDB for semantic search across complex academic and administrative repositories.",
    image: "",
    heroImage: "",
    gradient: "from-emerald-950 via-teal-900 to-zinc-900",
    tech: ["Python", "Flask", "RAG", "FAISS", "ChromaDB", "LLMs", "Vector Embeddings", "REST APIs"],
    github: "https://github.com/Elvis280",
    demo: "https://campus-saathi.vercel.app/",
    featured: true,
    category: "RAG System",
    status: "DEPLOYED",
    duration: "FEB 2024 — MAY 2024",
    workflow: [
      { label: "INGEST", desc: "Parse multi-format PDFs & notices" },
      { label: "CHUNK", desc: "Semantic boundary chunking" },
      { label: "EMBED", desc: "Vector embedding generation" },
      { label: "RETRIEVE", desc: "FAISS similarity search" },
      { label: "GENERATE", desc: "Citation-grounded response" },
    ],
    architectureNodes: [
      { icon: "FileText", title: "DOCUMENT INPUT", desc: "PDF & notice ingestion" },
      { icon: "Scissors", title: "CHUNKING", desc: "Semantic boundary splitting" },
      { icon: "Database", title: "VECTOR STORE", desc: "FAISS & ChromaDB indexing" },
      { icon: "Search", title: "RETRIEVAL", desc: "Dense similarity search" },
      { icon: "MessageSquare", title: "RESPONSE", desc: "LLM citation generation" },
    ],
    results: [
      { value: "<2s", label: "QUERY RESOLUTION" },
      { value: "91%", label: "RETRIEVAL ACCURACY" },
      { value: "120+", label: "DOCUMENTS INDEXED" },
      { value: "ZERO", label: "HALLUCINATIONS" },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://campus-saathi.vercel.app/" },
      { label: "SOURCE CODE", url: "https://github.com/Elvis280" },
    ],
    caseStudy: {
      problem: "Students and faculty waste hours searching through scattered PDF notices, academic rules, and syllabi with generic keyword search failing on synonym queries.",
      approach: "Built a customized RAG pipeline with hybrid search (dense vector embeddings + semantic reranking) and citation-grounded answering.",
      architecture: "Document ingestion worker -> Chunking engine -> Vector store (FAISS/ChromaDB) -> Query embedding & similarity retrieval -> Flask API -> Responsive frontend.",
      challenges: "Context loss across table boundaries in PDF regulations. Resolved using structural markdown conversion before vector indexing.",
      result: "Reduced query resolution time from minutes to under 2 seconds, serving accurate, hallucination-free answers with precise document citations.",
    },
  },
  {
    id: "nexa-ai",
    number: "04",
    title: "NEXA",
    subtitle: "Modular Personal AI Assistant",
    description: "A Python-based AI agent with 5+ modular workflows, persistent session memory, tool calling, and multi-turn conversational reasoning.",
    image: "/images/nexa-ai.png",
    heroImage: "/images/nexa-ai.png",
    gradient: "from-violet-950 via-indigo-900 to-zinc-900",
    tech: ["Python", "Agentic AI", "LLMs", "FastAPI", "Session Memory", "Tool Execution", "Async Loops"],
    github: "https://github.com/Elvis280/NEXA_AI",
    demo: "https://nexa-ai-n6lv.onrender.com/",
    featured: true,
    category: "Personal AI",
    status: "DEPLOYED",
    duration: "APR 2024 — JUL 2024",
    workflow: [
      { label: "LISTEN", desc: "Multi-turn intent classification" },
      { label: "PLAN", desc: "Dynamic tool routing" },
      { label: "EXECUTE", desc: "API tool invocation" },
      { label: "REMEMBER", desc: "Session memory persistence" },
    ],
    architectureNodes: [
      { icon: "User", title: "USER INPUT", desc: "Conversational interface" },
      { icon: "Brain", title: "INTENT DETECT", desc: "NLU classification" },
      { icon: "Database", title: "MEMORY", desc: "SQLite session store" },
      { icon: "Wrench", title: "TOOL ROUTING", desc: "5+ modular pipelines" },
      { icon: "Zap", title: "EXECUTION", desc: "Async API invocation" },
    ],
    results: [
      { value: "5+", label: "MODULAR TOOLS" },
      { value: "<1s", label: "TOOL EXECUTION" },
      { value: "PERSISTENT", label: "SESSION MEMORY" },
      { value: "MULTI-TURN", label: "CONTEXT RETENTION" },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://nexa-ai-n6lv.onrender.com/" },
      { label: "SOURCE CODE", url: "https://github.com/Elvis280/NEXA_AI" },
    ],
    caseStudy: {
      problem: "Standard LLM chatbots lack long-term memory across sessions and cannot interactively trigger external APIs or execute custom user scripts.",
      approach: "Architected a modular agent runtime with pluggable tool definitions, SQLite-backed session persistence, and FastAPI asynchronous routing.",
      architecture: "Client UI -> FastAPI gateway -> Intent router -> Tool execution engine (Web search, Weather, Code execution, Email) -> State memory store.",
      challenges: "State drift and context window overflow during prolonged conversations. Mitigated with sliding-window memory summarization.",
      result: "Successfully deployed on Render with sub-second tool execution and dependable multi-turn context retention.",
    },
  },
  {
    id: "retailiq",
    number: "05",
    title: "RETAILIQ",
    subtitle: "AI Customer Analytics Engine & ML Forecasting",
    description: "Analyzed 397K+ transactions from 4,339 customers using RFM/K-Means clustering, Random Forest churn prediction, Prophet demand forecasting, and Apriori rules.",
    image: "",
    heroImage: "",
    gradient: "from-blue-950 via-indigo-950 to-neutral-900",
    tech: ["Python", "Machine Learning", "RFM Analysis", "K-Means", "Prophet", "Apriori", "FastAPI", "Data Analytics"],
    github: "https://github.com/Elvis280",
    demo: "https://retail-iq.vercel.app/",
    featured: true,
    category: "AI & ML System",
    status: "DEPLOYED",
    duration: "JUN 2024 — SEP 2024",
    workflow: [
      { label: "CLEAN", desc: "Transaction ingestion & filtering" },
      { label: "SEGMENT", desc: "RFM scoring & clustering" },
      { label: "PREDICT", desc: "Demand & churn forecasting" },
      { label: "SURFACE", desc: "Interactive analytics views" },
    ],
    architectureNodes: [
      { icon: "Database", title: "RETAIL DATA", desc: "397K+ transactions" },
      { icon: "Filter", title: "FEATURE ENG", desc: "RFM metrics extraction" },
      { icon: "BarChart", title: "ANALYTICS", desc: "K-Means & clustering" },
      { icon: "TrendingUp", title: "AI INSIGHTS", desc: "Prophet & Random Forest" },
      { icon: "Monitor", title: "VISUALIZATION", desc: "15+ interactive views" },
    ],
    results: [
      { value: "397K+", label: "TRANSACTIONS ANALYZED" },
      { value: "62", label: "ASSOCIATION RULES" },
      { value: "15+", label: "INTERACTIVE VIEWS" },
      { value: "4,339", label: "CUSTOMERS SEGMENTED" },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://retail-iq.vercel.app/" },
      { label: "SOURCE CODE", url: "https://github.com/Elvis280" },
    ],
    caseStudy: {
      problem: "Retailers struggle to extract actionable insights from millions of raw transaction logs to prevent customer churn and optimize inventory stock.",
      approach: "Engineered an end-to-end data analytics and ML pipeline transforming unorganized retail records into predictive dashboards and market-basket recommendations.",
      architecture: "Pandas/NumPy preprocessing -> Feature engineering (RFM metrics) -> Scikit-learn clustering & Random Forest classifiers -> Prophet time series -> FastAPI.",
      challenges: "Skewed transaction distributions and seasonal spikes causing forecasting bias. Solved with log transformations and holiday regressors.",
      result: "Delivered 15+ interactive analytical views, uncovering 62 high-confidence association rules to drive targeted cross-selling strategies.",
    },
  },
  {
    id: "carbontwin",
    number: "06",
    title: "CARBONTWIN",
    subtitle: "Environmental Analytics & Carbon Footprint Tracking",
    description: "Full-stack environmental tracking platform with real-time carbon footprint analytics, interactive data visualization, and predictive insights.",
    image: "/images/CarbonTwin.png",
    heroImage: "/images/CarbonTwin.png",
    gradient: "from-emerald-500 to-teal-600",
    tech: ["JavaScript", "HTML", "CSS", "Web App", "Charts", "Sustainability"],
    github: "https://github.com/Elvis280/CarbonTwin",
    demo: "https://elvis280.github.io/CarbonTwin/",
    featured: false,
    category: "Web App",
    status: "DEPLOYED",
    duration: "2024",
    workflow: [
      { label: "INPUT", desc: "Activity telemetry ingestion" },
      { label: "CALCULATE", desc: "Carbon coefficient modeling" },
      { label: "VIZ", desc: "Interactive emission charts" },
      { label: "OPTIMIZE", desc: "Reduction targets & suggestions" },
    ],
    architectureNodes: [
      { icon: "Activity", title: "DATA INPUT", desc: "Activity tracking" },
      { icon: "Calculator", title: "CALCULATE", desc: "Emission factors" },
      { icon: "PieChart", title: "VISUALIZE", desc: "Chart.js dashboards" },
      { icon: "Target", title: "OPTIMIZE", desc: "Offset recommendations" },
    ],
    results: [
      { value: "ZERO-DEP", label: "LIGHTWEIGHT" },
      { value: "REAL-TIME", label: "TRACKING" },
      { value: "LIVE", label: "ON GITHUB PAGES" },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://elvis280.github.io/CarbonTwin/" },
      { label: "SOURCE CODE", url: "https://github.com/Elvis280/CarbonTwin" },
    ],
    caseStudy: {
      problem: "Measuring everyday personal and organizational carbon impact is cumbersome without intuitive visual tooling.",
      approach: "Built a responsive client-side telemetry tracker with dynamic charting and offset calculators.",
      architecture: "Vanilla JS engine -> Chart.js visualization -> Local state storage -> Emission factor algorithms.",
      challenges: "Real-time calculation performance on lower-powered devices. Solved through memoized math utilities.",
      result: "Shipped an intuitive, zero-dependency environmental tool live on GitHub Pages.",
    },
  },
  {
    id: "ecowaste",
    number: "07",
    title: "ECOWASTE",
    subtitle: "Smart Waste Classifier & Sustainability Platform",
    description: "React-based waste categorization system with intelligent classification, real-time state management, and sustainability tracking.",
    image: "/images/EcoWaste.png",
    heroImage: "/images/EcoWaste.png",
    gradient: "from-teal-500 to-cyan-600",
    tech: ["JavaScript", "React", "Web App", "Sustainability", "State Management"],
    github: "https://github.com/Elvis280/EcoWaste",
    demo: "https://eco-waste-roan.vercel.app/",
    featured: false,
    category: "Web App",
    status: "DEPLOYED",
    duration: "2024",
    workflow: [
      { label: "SCAN", desc: "Material classification" },
      { label: "ROUTE", desc: "Recyclability logic" },
      { label: "TRACK", desc: "Impact metrics" },
      { label: "EDUCATE", desc: "Disposal guidelines" },
    ],
    architectureNodes: [
      { icon: "Scan", title: "SCAN", desc: "Material input" },
      { icon: "Route", title: "CLASSIFY", desc: "Category routing" },
      { icon: "TrendingUp", title: "TRACK", desc: "User impact" },
      { icon: "BookOpen", title: "EDUCATE", desc: "Guidelines" },
    ],
    results: [
      { value: "GAMIFIED", label: "USER ENGAGEMENT" },
      { value: "POSITIVE", label: "CLUB ADOPTION" },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://eco-waste-roan.vercel.app/" },
      { label: "SOURCE CODE", url: "https://github.com/Elvis280/EcoWaste" },
    ],
    caseStudy: {
      problem: "Improper municipal waste sorting causes recyclable materials to end up in landfills.",
      approach: "Developed an accessible React web application gamifying waste categorization with instant feedback.",
      architecture: "React frontend -> Component state -> Heuristic classification matrix -> Vercel deployment.",
      challenges: "Creating an engaging user flow that doesn't feel like a chore.",
      result: "Adopted by student environmental clubs with positive feedback on ease of use.",
    },
  },
  {
    id: "agrowise",
    number: "08",
    title: "AGROWISE",
    subtitle: "AI-Driven Agricultural Assistant",
    description: "AI-driven agricultural assistant with FastAPI backend, ML models for crop recommendations, soil analysis, and optimized database queries.",
    image: "",
    heroImage: "",
    gradient: "from-green-500 to-emerald-600",
    tech: ["Python", "FastAPI", "AI APIs", "ML", "Backend", "Soil Modeling"],
    github: "https://github.com/Elvis280",
    demo: "",
    featured: false,
    category: "AI System",
    status: "CONCLUDED",
    duration: "2024",
    workflow: [
      { label: "SAMPLE", desc: "Soil parameter input" },
      { label: "EVALUATE", desc: "ML crop classifier" },
      { label: "RECOMMEND", desc: "Fertilizer timeline" },
      { label: "QUERY", desc: "Agronomist Q&A" },
    ],
    architectureNodes: [
      { icon: "Leaf", title: "SOIL INPUT", desc: "NPK & climate data" },
      { icon: "Brain", title: "ML ENGINE", desc: "Crop recommender" },
      { icon: "Cloud", title: "WEATHER API", desc: "External data" },
      { icon: "MessageSquare", title: "Q&A", desc: "LLM agronomist" },
    ],
    results: [
      { value: "FAST", label: "RECOMMENDATIONS" },
      { value: "ACTIONABLE", label: "OUTPUT" },
    ],
    links: [
      { label: "SOURCE CODE", url: "https://github.com/Elvis280" },
    ],
    caseStudy: {
      problem: "Smallholder farmers lack access to tailored scientific crop advisory based on dynamic soil and weather conditions.",
      approach: "Engineered a lightweight FastAPI backend connecting classification models with conversational LLMs.",
      architecture: "FastAPI REST API -> Scikit-learn crop recommender -> Weather API integration -> SQLite storage.",
      challenges: "Handling sparse soil telemetry gracefully without model failure.",
      result: "Functional agronomy engine providing fast, actionable recommendations.",
    },
  },
  {
    id: "crud-flask",
    number: "09",
    title: "CRUD-FLASK",
    subtitle: "Database-Driven Web Applications",
    description: "Built 3 database-driven web applications with Flask and MySQL, including a Student Management System with full CRUD operations.",
    image: "",
    heroImage: "",
    gradient: "from-orange-500 to-red-600",
    tech: ["Python", "Flask", "MySQL", "REST API", "Database Design", "Jinja2"],
    github: "https://github.com/Elvis280/CRUD-Flask",
    demo: "https://elvis04.pythonanywhere.com/",
    featured: false,
    category: "Backend",
    status: "DEPLOYED",
    duration: "2024",
    workflow: [
      { label: "SCHEMA", desc: "Database schema design" },
      { label: "API", desc: "Flask CRUD routes" },
      { label: "RENDER", desc: "Server-side templating" },
      { label: "DEPLOY", desc: "Production hosting" },
    ],
    architectureNodes: [
      { icon: "Database", title: "MYSQL", desc: "Relational storage" },
      { icon: "Server", title: "FLASK API", desc: "CRUD endpoints" },
      { icon: "FileCode", title: "JINJA", desc: "Template rendering" },
      { icon: "Globe", title: "DEPLOY", desc: "PythonAnywhere" },
    ],
    results: [
      { value: "500+", label: "RECORDS MANAGED" },
      { value: "ZERO", label: "DATA CORRUPTION" },
      { value: "LIVE", label: "PRODUCTION" },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://elvis04.pythonanywhere.com/" },
      { label: "SOURCE CODE", url: "https://github.com/Elvis280/CRUD-Flask" },
    ],
    caseStudy: {
      problem: "Managing student academic records manually leads to duplicate records and administrative errors.",
      approach: "Constructed structured relational databases with normalized tables and secured Flask routes.",
      architecture: "MySQL -> SQLAlchemy / raw SQL queries -> Flask app -> Jinja templates -> PythonAnywhere.",
      challenges: "Preventing SQL injection and managing relational integrity across cascading student records.",
      result: "Robust, live CRUD system with zero data corruption across 500+ simulated student records.",
    },
  },
];

export interface ExperimentItem {
  id: string;
  number: string;
  question: string;
  title: string;
  category: "Agentic AI" | "Computer Vision" | "RAG & Search" | "Systems & LLMs" | "Edge & Hardware";
  status: "CONCLUDED" | "ACTIVE RESEARCH" | "PIVOTED";
  hypothesis: string;
  tech: string[];
  implementation: string;
  result: string;
  whatWentWrong: string;
  whatLearned: string;
  date: string;
  logSnippet?: string;
}

export const experiments: ExperimentItem[] = [
  {
    id: "exp-001",
    number: "001",
    question: "CAN AN AGENT OPERATE A DESKTOP?",
    title: "Autonomous Desktop Loop with Vision LLMs",
    category: "Agentic AI",
    status: "CONCLUDED",
    hypothesis: "A multimodal LLM combined with OS automation hooks can autonomously execute multi-step desktop tasks by seeing screenshots and dispatching native mouse/keyboard events.",
    tech: ["Python", "PyAutoGUI", "Gemini 1.5 Pro / Claude 3.5 Sonnet", "Model Context Protocol", "FastAPI"],
    implementation: "Built a loop capturing 1080p desktop frames, parsing UI elements into relative coordinates, invoking structured tool schemas, and taking post-action validation captures.",
    result: "Successfully automated multi-app tasks like opening a browser, extracting live table data into CSV, and drafting an email with the extracted content.",
    whatWentWrong: "Vision models frequently misjudged pixel coordinates by 10-30px on high-DPI displays, clicking slightly outside input boxes. High frame latency (2-4s) caused the agent to act on stale UI states before animations completed.",
    whatLearned: "Pure coordinate generation is fragile. Hybrid perception (OCR bounding boxes + semantic UI anchors + deterministic waiting for animation stabilization) is required for rock-solid OS automation.",
    date: "MAY 2024",
    logSnippet: `[AGENT_LOOP] Frame captured: 1920x1080 (hash: 4f8a9e)
[OBSERVE] Detected target button: "Export CSV" at bbox [742, 318, 860, 350]
[REASON] Intent: Click Export -> Wait download -> Open file
[ACT] pyautogui.click(x=801, y=334) -> Exit code: 0
[VERIFY] State check: Download complete notification verified.`,
  },
  {
    id: "exp-002",
    number: "002",
    question: "BRAILLE → COMPUTER VISION",
    title: "Tactile Dot Matrix Extraction on Paper Surfaces",
    category: "Computer Vision",
    status: "CONCLUDED",
    hypothesis: "Low-cost mobile camera feeds can isolate embossed 6-dot Braille cells in real-time using classical contour analysis without requiring heavy neural networks.",
    tech: ["Python", "OpenCV", "Adaptive Thresholding", "Morphological Kernels", "gTTS"],
    implementation: "Developed a pipeline applying directional gradient Sobel filters to detect dot shadows, followed by grid fitting to reconstruct 2x3 Braille character matrices.",
    result: "Achieved 94% decoding accuracy in controlled lighting with sub-50ms inference time on standard CPU hardware.",
    whatWentWrong: "Under flat or direct overhead lighting, embossed dots cast zero shadows, rendering classical gradient filters completely blind. Paper creases also created high-frequency noise that mimicked dots.",
    whatLearned: "Lighting angle is the single most critical variable for tactile perception. Combining edge filtering with a lightweight convolutional feature extractor yields significantly higher resilience than pure thresholding.",
    date: "MAR 2024",
    logSnippet: `[CV_PIPELINE] Input resolution: 1280x720 (FPS: 28.4)
[FILTER] Sobel directional kernel applied (angle=45deg)
[CONTOUR] Extracted 48 candidate dot clusters
[GRID_FIT] Aligned 8 Braille cells (Grade 1 encoding)
[OUTPUT] Decoded string: "ACCESSIBILITY" -> Speech synthesis triggered.`,
  },
  {
    id: "exp-003",
    number: "003",
    question: "DOCUMENT → KNOWLEDGE BASE",
    title: "Optimizing Vector Search Retrieval Precision",
    category: "RAG & Search",
    status: "CONCLUDED",
    hypothesis: "Hierarchical chunking with metadata enrichment will outperform fixed-size token splitting in retrieving precise answers from complex academic notices and tabular PDFs.",
    tech: ["FAISS", "ChromaDB", "Sentence Transformers", "Flask", "Python"],
    implementation: "Tested fixed 500-token chunks vs structure-aware markdown chunking across 120 university policy documents, measuring Top-3 retrieval recall.",
    result: "Structured markdown chunking boosted Top-3 retrieval accuracy from 68% to 91% on queries involving nested eligibility criteria and multi-row tables.",
    whatWentWrong: "Fixed chunking arbitrarily split tabular records across chunk boundaries, causing the embedding model to lose context for rows near the split point.",
    whatLearned: "Chunking strategy matters more than the LLM model size. Pre-converting documents into structural markdown before vector embedding prevents catastrophic context fragmentation.",
    date: "FEB 2024",
    logSnippet: `[RAG_BENCHMARK] Corpus: 120 Academic PDFs (4,200 pages)
[TEST_A] Fixed 512-token chunks: Recall@3 = 68.2% | Latency = 120ms
[TEST_B] Structural Markdown + Meta: Recall@3 = 91.4% | Latency = 142ms
[OUTCOME] Chunk boundary context loss eliminated.`,
  },
  {
    id: "exp-004",
    number: "004",
    question: "LOCAL LLM INFERENCE ON CONSUMER HARDWARE",
    title: "Benchmarking Quantized Small Language Models",
    category: "Systems & LLMs",
    status: "ACTIVE RESEARCH",
    hypothesis: "4-bit quantized SLMs (3B-8B parameters) can execute agent tool-calling tasks locally with sufficient reliability to replace paid cloud APIs for offline workflows.",
    tech: ["Ollama", "Llama 3.2 3B", "Qwen 2.5 7B", "GGUF / llama.cpp", "Python"],
    implementation: "Ran structured JSON schema validation benchmarks across 500 tool-dispatch prompts on local CPU/integrated GPU hardware.",
    result: "Qwen 2.5 7B achieved 96.2% valid JSON tool calling with 18 tokens/sec throughput, while 3B models suffered 22% schema syntax errors under complex nesting.",
    whatWentWrong: "Smaller models often hallucinated non-existent tool parameters or omitted required fields when the tool list exceeded 4 functions.",
    whatLearned: "7B is currently the sweet spot for dependable local tool orchestration. Enforcing grammar-constrained decoding (e.g. via GBNF grammars) eliminates JSON parse failures completely.",
    date: "OCT 2024",
    logSnippet: `[BENCHMARK] Model: Qwen-2.5-7B-Instruct-Q4_K_M
[TOOL_EVAL] Prompts: 500 | Schema Valid: 481/500 (96.2%)
[LATENCY] Time-to-First-Token: 310ms | Gen Speed: 18.6 t/s
[STATUS] Viable for offline agent orchestration layer.`,
  },
  {
    id: "exp-005",
    number: "005",
    question: "TOOL CONTEXT STREAMING VIA MCP",
    title: "Model Context Protocol Server & Dynamic Dispatch",
    category: "Agentic AI",
    status: "ACTIVE RESEARCH",
    hypothesis: "Standardizing tool exposure through the Model Context Protocol (MCP) decouples the agent runtime from specific tool implementations and reduces prompt token overhead.",
    tech: ["Anthropic MCP", "Python", "FastAPI", "JSON-RPC", "AsyncIO"],
    implementation: "Implemented a modular MCP server hosting 8 system tools (File I/O, Web Fetch, Shell Exec, SQLite Query) communicating over stdio and SSE transport.",
    result: "Reduced agent prompt overhead by 40% using on-demand tool schema resolution, allowing the agent to discover tools dynamically during multi-step planning.",
    whatWentWrong: "High concurrency tool execution over stdio occasionally locked file handles, requiring robust asynchronous semaphore queuing.",
    whatLearned: "MCP is the USB standard for AI agents. Decoupling tool servers from the core LLM orchestration makes systems infinitely more testable and composable.",
    date: "JAN 2025",
    logSnippet: `[MCP_SERVER] Initialized 8 tools on stdio transport
[DISCOVERY] Agent requested capabilities: [fs_read, db_query, shell_run]
[EXECUTION] Dispatched "db_query" with params {table: "users", limit: 10}
[RESPONSE] 200 OK | Duration: 14ms | Payload size: 412 bytes`,
  },
];

export interface JourneyMilestone {
  year: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  roles: { title: string; org: string; period: string }[];
  achievements: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2023",
    title: "The Genesis & Foundations",
    tagline: "Starting the engineering journey & mastering the fundamentals",
    description: "Enrolled in B.Tech Computer Science & Engineering at SRMCEM, Lucknow. Focused deeply on Data Structures, Algorithms, and low-level computing concepts while writing first automated scripts and backend web services.",
    highlights: [
      "B.Tech CSE kickoff at SRMCEM (2023 - 2027)",
      "Mastered core Python, Java, SQL, and algorithm design",
      "Built first full-stack CRUD applications with database normalization",
    ],
    roles: [
      { title: "Computer Science Undergraduate", org: "SRMCEM, Lucknow", period: "Sept 2023 – Present" },
    ],
    achievements: [
      "HackerRank 5-Star Python Certification",
    ],
  },
  {
    year: "2024",
    title: "First Serious Systems & Applied ML",
    tagline: "Moving from theory to shipping real software & pipelines",
    description: "Completed dual SRDT internships in Machine Learning and Python Full-Stack. Built Campus Saathi RAG system and explored intensive AI agents courses while leading technical coordination at GFG.",
    highlights: [
      "Built Campus Saathi RAG pipeline with FAISS & ChromaDB vector stores",
      "Completed 5-Day Google × Kaggle AI Agents Intensive Course",
      "Appointed Technical Coordinator for GeeksforGeeks Student Chapter",
    ],
    roles: [
      { title: "AI/ML Intern", org: "SRDT Training Program", period: "2024 – 2025" },
      { title: "Python Full-Stack Intern", org: "SRDT Training Program", period: "2024" },
      { title: "Technical Coordinator", org: "GeeksforGeeks Student Chapter", period: "2024" },
    ],
    achievements: [
      "5-Day AI Agents Intensive (Google × Kaggle)",
      "Neo4j Certified Professional (Graph Academy)",
      "Hela Labs Blockchain Certification",
      "AI Builders Lab (Hack2skill)",
    ],
  },
  {
    year: "2025",
    title: "Agentic Frontier, Hackathons & Technical Leadership",
    tagline: "Pushing autonomous agent loops, nationwide hackathons, and mentoring",
    description: "Qualified for Smart India Hackathon (SIH 2025). Took on Technical Lead role at AlgoZenith student chapter and Faculty Connect & PR Lead at GFG. Earned Oracle Agentic AI and Anthropic MCP credentials.",
    highlights: [
      "Qualified for Smart India Hackathon (SIH) 2025",
      "Technical Lead at AlgoZenith & Faculty Connect Lead at GFG",
      "Earned Oracle Agentic AI & Anthropic MCP Certifications",
      "Architected IntentOS: Autonomous desktop perception-action agent",
    ],
    roles: [
      { title: "Technical Lead", org: "AlgoZenith Student Chapter, SRMCEM", period: "2025" },
      { title: "Faculty Connect & PR Lead", org: "GeeksforGeeks Student Chapter", period: "2025" },
    ],
    achievements: [
      "Smart India Hackathon (SIH) 2025 Qualified",
      "Oracle Certified Foundations Associate – Agentic AI",
      "Anthropic MCP Advanced Certified",
      "Google Cloud Skill Boost Agentic AI Day",
    ],
  },
  {
    year: "2026",
    title: "Expanding Frontiers & Building in Public",
    tagline: "Autonomous systems, multimodal AI, and production software",
    description: "Actively building autonomous systems that see, reason, and act. Seeking impactful engineering internships and research opportunities to deploy production-grade AI systems at global scale.",
    highlights: [
      "Engineered RetailIQ: 397K+ customer ML analytics pipeline",
      "Developed BrailleVision tactile computer vision system",
      "Refining IntentOS & advancing multimodal desktop agents",
    ],
    roles: [
      { title: "AI & Software Engineer", org: "Building in Public / Open Source", period: "2026 – Future" },
    ],
    achievements: [
      "Building production-grade autonomous agent systems & sharing learnings publicly",
    ],
  },
];

export const experiences = [
  {
    id: "algozenith",
    role: "Technical Lead",
    organization: "AlgoZenith Student Chapter, SRMCEM",
    period: "Aug 2025 – Aug 2026",
    current: true,
    category: "Leadership",
    description: "Led 8+ coding events and DSA sessions for 50+ students, mentoring 20+ in competitive programming and technical interview preparation.",
    tags: ["Technical Leadership", "DSA", "Competitive Programming", "Mentoring", "Event Organization"],
  },
  {
    id: "gfg",
    role: "Faculty Connect & PR Lead",
    organization: "GeeksforGeeks Student Chapter, SRMCEM",
    period: "Oct 2024 – Aug 2026",
    current: true,
    category: "Leadership",
    description: "Coordinated outreach for 9+ technical events with faculty and organizers, spanning coding contests, seminars, and developer workshops.",
    tags: ["Outreach", "PR & Media", "Technical Events", "Workshops", "Hackathons"],
  },
  {
    id: "srdt-aiml",
    role: "AI/ML Intern",
    organization: "SRDT Training Program (College Organized)",
    period: "2024 – 2025",
    current: false,
    category: "Work Experience",
    description: "Used machine learning to tackle real customer analytics problems – segmentation, churn prediction, recommendations, and demand forecasting. Worked with large-scale retail data and built an end-to-end pipeline, from cleaning and preprocessing through to model inference.",
    tags: ["Machine Learning", "Customer Analytics", "Data Pipelines", "Model Inference", "Python", "Scikit-Learn"],
  },
  {
    id: "srdt-fullstack",
    role: "Python Full-Stack Intern",
    organization: "SRDT Training Program (College Organized)",
    period: "2024",
    current: false,
    category: "Work Experience",
    description: "Built 3 database-driven web applications with Flask and MySQL, including a Student Management System. Handled CRUD operations, database schema design, and server-side logic across each project.",
    tags: ["Python", "Flask", "MySQL", "REST APIs", "CRUD", "Database Design"],
  },
];

export const achievements = [
  {
    id: "sih-2025",
    title: "Smart India Hackathon (SIH) 2025",
    status: "Qualified",
    organization: "Ministry of Education & AICTE",
    description: "Qualified for India's premier nationwide hackathon solving complex national and industrial challenges with AI and software.",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "hackerrank-5star",
    title: "HackerRank 5-Star Python",
    status: "Gold Badge",
    organization: "HackerRank",
    description: "Achieved top 5-star proficiency rating in Python programming, problem solving, algorithms, and data structures.",
    color: "from-emerald-400 to-teal-500",
  },
];

export const certificates = [
  {
    id: "oracle-agentic-ai",
    name: "Oracle Certified Foundations Associate – Agentic AI",
    issuer: "Oracle University",
    date: "2025",
    image: "",
    url: "https://education.oracle.com/",
    skills: ["Agentic AI", "AI Architecture", "Oracle Cloud", "LLM Workflows"],
    color: "from-red-500 to-orange-500",
  },
  {
    id: "kaggle-ai-agents",
    name: "5-Day AI Agents Intensive Course",
    issuer: "Google × Kaggle",
    date: "2024",
    image: "/certificates/AI Agents Intensive Course with Google.png",
    url: "https://www.kaggle.com/certification/badges/elvis2804/105",
    skills: ["AI Agents", "Machine Learning", "Python", "Agent Workflows"],
    color: "from-cyan-500 to-teal-400",
  },
  {
    id: "anthropic-mcp",
    name: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "2025",
    image: "",
    url: "https://www.anthropic.com/",
    skills: ["MCP", "AI Tool-Use", "Agent Context", "LLM Architecture"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "google-ai-day",
    name: "Agentic AI Day",
    issuer: "Google Cloud Skill Boost",
    date: "2025",
    image: "/certificates/Agentic AI Day.png",
    url: "https://certificate.hack2skill.com/user/aidayideasubmission/2025H2S06AID-I14934",
    skills: ["Agentic AI", "Google Cloud", "AI Agents", "LLM"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "hackerrank-python",
    name: "Python (5-Star & Certified)",
    issuer: "HackerRank",
    date: "2024",
    image: "/certificates/Programming Using Python.png",
    url: "https://www.hackerrank.com/certificates/812232d025d9",
    skills: ["Python", "Algorithms", "Problem Solving"],
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: "neo4j",
    name: "Neo4j Certified",
    issuer: "Neo4j Graph Academy",
    date: "2024",
    image: "/certificates/Neo4j.png",
    url: "https://graphacademy.neo4j.com/c/3439211c-c06e-490e-bee2-66dbcd2016e7/",
    skills: ["Graph Databases", "Cypher", "Neo4j"],
    color: "from-violet-500 to-purple-400",
  },
  {
    id: "semrush-seo",
    name: "Semrush SEO Crash Course with Brian Dean",
    issuer: "Semrush Academy",
    date: "2025",
    image: "",
    url: "https://www.semrush.com/academy/",
    skills: ["Technical SEO", "Keyword Strategy", "Content Optimization"],
    color: "from-orange-500 to-amber-400",
  },
  {
    id: "hela-blockchain",
    name: "HeLa Labs Blockchain",
    issuer: "Hela Labs",
    date: "2024",
    image: "/certificates/HeLa Labs Blockchain.png",
    url: "https://credsverse.com/credentials/4dcce8fe-ba40-435f-b881-6e9260f63258",
    skills: ["Blockchain", "Web3", "Smart Contracts"],
    color: "from-emerald-500 to-green-400",
  },
  {
    id: "ai-builders-lab",
    name: "AI Builders Lab",
    issuer: "Hack2skill",
    date: "2024",
    image: "/certificates/AI Builders Lab.png",
    url: "https://certificate.hack2skill.com/user/aibuilderslab2/2024H2S10AIBL-P200273",
    skills: ["AI Development", "ML", "Model Training"],
    color: "from-pink-500 to-rose-400",
  },
  {
    id: "tableau-analytics",
    name: "Data Analytics & Tableau",
    issuer: "Jobaaj Learnings",
    date: "2024",
    image: "/certificates/Data Analytics with Specialization in Tableau.png",
    url: "https://www.jobaajlearnings.com//certificate?file=certificate-329792-37-0.jpeg",
    skills: ["Tableau", "Data Viz", "Business Intelligence"],
    color: "from-blue-500 to-indigo-400",
  },
  {
    id: "tata-crucible",
    name: "TATA Crucible Quiz",
    issuer: "Unstop",
    date: "2024",
    image: "/certificates/TATA Crucible Campus Quiz.png",
    url: "https://unstop.com/certificate-preview/991da870-b4e4-4edb-864f-058a2aa4f4d1",
    skills: ["Critical Thinking", "Problem Solving"],
    color: "from-slate-500 to-gray-400",
  },
];

export const articles = [
  {
    id: "ai-os",
    title: "Building My Own AI Operating System",
    date: "MAY 12, 2024",
    readTime: "6 min read",
    summary: "Architecting autonomous desktop workflows with multimodal screen perception, tool execution loops, and state-machine memory persistence.",
    content: "When designing autonomous agents that interact with desktop operating systems, traditional text-only prompts quickly fall short. In this exploration, I dive into intent parsing, active UI bounding-box detection with vision models, structured tool dispatching via the Model Context Protocol (MCP), and building self-healing error recovery loops.",
    tags: ["Agentic AI", "Operating Systems", "Python", "Computer Vision"],
  },
  {
    id: "lessons-intentos",
    title: "Lessons From Building IntentOS",
    date: "APR 20, 2024",
    readTime: "4 min read",
    summary: "Key architectural takeaways from managing context windows, multi-turn state drift, and asynchronous tool calling in real-time agent loops.",
    content: "Building IntentOS taught me that LLM latency and reliability issues are rarely solved by prompt tweaking alone. Robust system engineering—deterministic fallback pipelines, strict JSON-schema enforcement, caching vector search layers, and asynchronous event loops—makes the difference between a prototype and a dependable agent system.",
    tags: ["FastAPI", "LLMs", "System Design", "MCP"],
  },
  {
    id: "build-in-public",
    title: "Why I Love Building In Public",
    date: "APR 10, 2024",
    readTime: "3 min read",
    summary: "How sharing code architectures, student hackathons, and engineering failures openly accelerated my technical growth and community reach.",
    content: "Sharing raw code, architecture decisions, and project post-mortems on GitHub and Twitter created an invaluable feedback loop. Leading university chapters for AlgoZenith and GeeksforGeeks reinforced that explaining complex concepts clarifies your own mental models more than solitary study ever could.",
    tags: ["Open Source", "Leadership", "Learning", "Community"],
  },
];

export const aiPlayground = [
  {
    id: "agent-systems",
    title: "Autonomous Agent Systems",
    description: "Built multi-agent orchestration systems and modular workflows with 5+ pipelines, session memory, tool calling, and multi-turn conversational reasoning.",
    icon: "Bot",
    gradient: "from-violet-500 to-purple-600",
    tags: ["Agentic AI", "OpenAI / Claude", "Session Memory", "Tool Use", "FastAPI"],
    status: "Production",
  },
  {
    id: "rag-pipelines",
    title: "RAG & Semantic Retrieval",
    description: "Architected Retrieval-Augmented Generation pipelines using FAISS, ChromaDB, embeddings, and custom chunking strategies for accurate document indexing and Q&A.",
    icon: "Database",
    gradient: "from-cyan-500 to-blue-600",
    tags: ["FAISS", "ChromaDB", "Embeddings", "Semantic Search", "LLMs"],
    status: "Production",
  },
  {
    id: "customer-analytics",
    title: "ML & Customer Analytics",
    description: "Engineered customer analytics pipelines over 397K+ retail transactions: RFM segmentation, K-Means clustering, churn prediction, Prophet demand forecasting, and Apriori rules.",
    icon: "Workflow",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["Scikit-learn", "Prophet", "RFM / K-Means", "Apriori", "Data Pipelines"],
    status: "Production",
  },
];

export const approachSteps = [
  {
    num: "01",
    key: "UNDERSTAND",
    title: "Break down the problem",
    description: "Deconstructing ambiguous systems, mapping core bottlenecks, and defining mathematical and context constraints before writing code.",
    icon: "crosshair",
  },
  {
    num: "02",
    key: "IDEATE",
    title: "Explore different approaches",
    description: "Benchmarking algorithmic heuristics, agentic LLM routing, and data structures to optimize latency, cost, and accuracy.",
    icon: "network",
  },
  {
    num: "03",
    key: "BUILD",
    title: "Turn ideas into working systems",
    description: "Architecting modular microservices, vector embeddings indexing, asynchronous FastAPI backends, and responsive UIs.",
    icon: "layers",
  },
  {
    num: "04",
    key: "TEST",
    title: "Validate, iterate, Make it better",
    description: "Stress-testing edge cases, evaluating retrieval precision/recall, benchmarking token latency, and refining user friction.",
    icon: "checkSquare",
  },
  {
    num: "05",
    key: "DEPLOY",
    title: "Ship and solve real world problems",
    description: "Containerizing services with Docker, deploying to resilient cloud infrastructure, and instrumenting real-time telemetry.",
    icon: "send",
  },
];

