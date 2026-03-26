// ─── Services / "What I Build" ─────────────────────────────────────────────

export interface Service {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    icon: "Sparkles",
    title: "GenAI Applications",
    description:
      "Multi-agent architectures, RAG pipelines, and LLM-powered assistants with structured outputs, tool use, and production-grade observability.",
    tags: ["LangChain", "LangGraph", "OpenAI SDK", "RAG", "MCP", "Pinecone", "LangSmith", "Prompt Engineering"],
  },
  {
    icon: "Brain",
    title: "AI/ML Systems",
    description:
      "End-to-end machine learning pipelines from custom Transformers and CNNs to anomaly detection autoencoders and reinforcement learning agents.",
    tags: ["PyTorch", "TensorFlow", "Scikit-learn", "FAISS", "Pandas", "NumPy", "Hugging Face"],
  },
  {
    icon: "Code2",
    title: "Scalable Software",
    description:
      "Production REST APIs, cloud-native deployments, and monitoring dashboards, built for high-concurrency traffic and operational reliability.",
    tags: ["Java", "Python", "FastAPI", "AWS", "GCP", "Redis", "Docker", "CI/CD"],
  },
];

// ─── Projects ──────────────────────────────────────────────────────────────

export type ProjectCategory = "All" | "GenAI" | "ML/DL" | "Presentations";

export interface Project {
  title: string;
  description: string;
  metrics: string[];
  tags: string[];
  github: string;
  category: ProjectCategory;
  status?: "active";
}

export const projects: Project[] = [
  {
    title: "WeatherWise.ai",
    description:
      "Agentic weather intelligence system with multi-agent architecture, corrective RAG with vision grounding, and MCP integration. Converts natural language into expert-level meteorological analysis grounded in NOAA, NASA, and AMS research.",
    metrics: ["Multi-Agent", "Corrective RAG", "Xweather MCP"],
    tags: ["LangGraph", "Claude Sonnet", "MCP", "Pinecone", "LangSmith"],
    github: "",
    category: "GenAI",
    status: "active",
  },
  {
    title: "Deep Research Pro",
    description:
      "AI research co-pilot that orchestrates six specialized agents - planner, searcher, summarizer, follow-up evaluator, writer, and QA — across multi-wave research cycles with parallel execution and two-level caching (in-memory + SQLite). Generates 2K–5K word cited reports with inline references, exportable to Markdown, HTML, and PDF.",
    metrics: ["50x Speedup", "6 Agents", "3 Research Waves"],
    tags: ["OpenAI Agents SDK", "Pydantic", "Multi-Agent", "Parallel Processing", "Gradio"],
    github: "https://github.com/yavar29/GenAI_Projects/tree/main/OpenAI_Agents_SDK/deep_research_pro",
    category: "GenAI",
  },
  {
    title: "Context-Aware RAG Assistant",
    description:
      "Intelligent RAG pipeline with FAISS vector indexing, runtime persona switching, and real-time Pushover alerts, deployed on Hugging Face.",
    metrics: ["10x Faster Retrieval", "4 Personas", "100+ Docs"],
    tags: ["LangChain", "FAISS", "FastAPI", "Gradio"],
    github: "https://github.com/yavar29/GenAI_Projects/tree/main/Context-Aware_AI_RAG_Assistant",
    category: "GenAI",
  },
  {
    title: "Transformer Sentiment Analysis",
    description:
      "Custom Transformer built from scratch in PyTorch with multi-head self-attention and Word2Vec embeddings, trained on 560K Yelp reviews.",
    metrics: ["91.8% Accuracy", "0.92 F1", "213M Params"],
    tags: ["PyTorch", "Transformers", "spaCy", "Gensim"],
    github: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Transformer",
    category: "ML/DL",
  },
  {
    title: "VGG-16 vs ResNet-18",
    description:
      "Comprehensive comparison of VGG-16 and ResNet-18 on 30K images across 3 classes with hyperparameter tuning and data augmentation.",
    metrics: ["96.5% Accuracy", "30K Images", "3 Classes"],
    tags: ["PyTorch", "CNN", "Computer Vision", "Data Augmentation"],
    github: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/VGG%20and%20Resnet",
    category: "ML/DL",
  },
  {
    title: "ThermoWatch-AE",
    description:
      "Convolutional Autoencoder for unsupervised anomaly detection in machine temperature data using the Numenta Anomaly Benchmark.",
    metrics: ["R² 0.997", "0.007 MAE", "Unsupervised"],
    tags: ["PyTorch", "Autoencoder", "Anomaly Detection", "NAB"],
    github: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Autoencoder_AnomalyDetection",
    category: "ML/DL",
  },
  {
    title: "EMNIST Character Recognition",
    description:
      "CNN for 36-class handwritten character recognition (26 letters + 10 digits) trained on 100K EMNIST balanced samples.",
    metrics: ["91.1% Accuracy", "36 Classes", "425K Params"],
    tags: ["PyTorch", "CNN", "Computer Vision", "EMNIST"],
    github: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Convolutional%20Neural%20Network/EMNIST_text_recognition",
    category: "ML/DL",
  },
  {
    title: "GridWorld RL",
    description:
      "SARSA vs n-Step Double Q-Learning comparison on custom GridWorld with Optuna-based hyperparameter optimization.",
    metrics: ["0.92 Avg Reward", "n=3 Optimal", "Optuna-tuned"],
    tags: ["Reinforcement Learning", "Q-Learning", "SARSA", "Optuna"],
    github: "https://github.com/yavar29/ML_Projects/tree/main/Reinforcement%20Learning%20Models%20",
    category: "ML/DL",
  },
  {
    title: "Speech Emotion Recognition",
    description:
      "1D CNN for classifying 5 emotions from speech audio using MFCC features, data augmentation, and a Flask web interface.",
    metrics: ["5 Emotions", "RAVDESS", "Flask UI"],
    tags: ["CNN", "MFCC", "Flask", "Audio Processing"],
    github: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Convolutional%20Neural%20Network/SpeechEmotionRecognition",
    category: "ML/DL",
  },
];

// ─── Presentations ──────────────────────────────────────────────────────────

export interface Presentation {
  title: string;
  course: string;
  institution: string;
  description: string;
  highlights: string[];
  tags: string[];
  pdfUrl: string;
}

export const presentations: Presentation[] = [
  {
    title: "GraphCast for Medium Range Weather Prediction",
    course: "CSE 676 Deep Learning",
    institution: "University at Buffalo, SUNY",
    description:
      "Paper presentation and code demo explaining how DeepMind's GraphCast, a Graph Neural Network, outperforms traditional numerical weather prediction models by predicting hundreds of global weather variables at 0.25° resolution for up to 10 days, surpassing ECMWF's HRES on 90.3% of verification targets.",
    highlights: [
      "Encoder-Processor-Decoder GNN architecture with multi-mesh message passing",
      "Outperformed HRES on 90.3% of 1380 variable-level combinations",
      "Severe event forecasting: tropical cyclones, atmospheric rivers, extreme temperatures",
      "Live code demo using remote-graphcast with ERA5 and Open-Meteo datasets",
    ],
    tags: ["Graph Neural Networks", "Deep Learning", "Weather Prediction", "ERA5", "DeepMind"],
    pdfUrl: "/GraphCast_Presentation_YavarKhan.pdf",
  },
];

// ─── Featured Project (WeatherWise.ai) ─────────────────────────────────────

export const featuredProject = {
  title: "WeatherWise.ai",
  quote: {
    text: "The purpose of computing is insight, not numbers.",
    author: "Richard Hamming",
  },
  description:
    "WeatherWise.ai is a conversational weather intelligence system. Ask anything from a simple forecast to a complex atmospheric science question, and get expert-level analysis grounded in real-time data and published research. No dashboards to navigate, no endpoints to query. Just a conversation that reasons like a meteorologist and cites like a researcher.",
  collaborator: {
    name: "Ishita Srivastava",
    linkedin: "https://ishitasrivastava.me/",
  },
  highlights: [
    {
      label: "Real-time intelligence",
      detail: "Live conditions, forecasts, and severe alerts via Vaisala Xweather MCP",
    },
    {
      label: "Multi-location reasoning",
      detail: "Side-by-side comparisons with synthesized severity assessments",
    },
    {
      label: "Research-grounded explanations",
      detail: "Answers backed by NOAA, NASA, NCA5, and AMS research through multi-vector RAG",
    },
    {
      label: "Safety-first advisories",
      detail: "Route-aware hazard briefings with human-in-the-loop approval for severe events",
    },
    {
      label: "Mathematical derivations",
      detail: "Unit conversions, derived metrics, and computations on live weather data",
    },
  ],
  tech: ["LangGraph", "Claude Sonnet 4 / 3.7", "MCP", "LangSmith", "Pydantic v2", "Python 3.11+", "GCP", "Pinecone", "uv"],
  linkedinPost: {
    url: "https://www.linkedin.com/posts/yavar-khan29_genai-aiagents-langgraph-activity-7426743062099369984-sDfE",
    snippet:
      "Google Gemini estimated \"90% and 100%\" after admitting it couldn't locate the data. WeatherWise returned the precise figure: 32%, pulled from real meteorological records.",
    hashtags: ["#GenAI", "#AIAgents", "#LangGraph", "#MCP", "#RAG", "#WeatherWiseAI"],
  },
  org: "VectorWorkX",
  isPrivate: true,
};

// ─── Journey / Timeline (legacy) ───────────────────────────────────────────

export interface TimelineEntry {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export const timeline: TimelineEntry[] = [
  {
    period: "Jul 2016 – May 2020",
    title: "Bachelor of Technology",
    subtitle: "Amity University, India — Information Technology",
    description:
      "Built a strong foundation in computer science, data structures, and algorithms while developing early ML projects in speech recognition and computer vision.",
    highlights: ["Information Technology", "B.Tech"],
  },
  {
    period: "Dec 2020 – Aug 2023",
    title: "Software Engineering Analyst",
    subtitle: "Accenture, Pune, India",
    description:
      "Built and deployed 50+ Java REST APIs on Apigee and AWS. Reduced production API errors from 25% to under 1%. Led a 6-member team driving Agile, CI/CD, and TDD practices across 12+ projects.",
    highlights: [
      "50+ APIs Deployed",
      "25% → <1% Error Rate",
      "6-member Team Lead",
      "200+ Issues Resolved",
    ],
  },
  {
    period: "Aug 2024 – Dec 2025",
    title: "Master of Science — Computer Science",
    subtitle: "University at Buffalo, SUNY — AI/ML Track | GPA: 3.87",
    description:
      "Focused on deep learning, NLP, and reinforcement learning. Built custom Transformers, CNN architectures, and multi-agent GenAI systems during coursework and independent research.",
    highlights: ["AI/ML Track", "GPA: 3.87"],
  },
  {
    period: "2025 – Present",
    title: "Building the Future",
    subtitle: "AI Engineer — Open to Opportunities",
    description:
      "Designing agentic AI systems, contributing to open-source GenAI tooling, and seeking impactful roles at the intersection of software engineering and artificial intelligence.",
    highlights: ["Agentic AI", "GenAI", "Open Source"],
  },
];

// ─── Journey Roadmap (new) ─────────────────────────────────────────────────

export interface RoadmapCourse {
  name: string;
  grade: string;
}

export interface RoadmapSubRole {
  title: string;
  period: string;
  description: string[];
}

export interface Endorsement {
  quote: string;
}

export interface Endorser {
  name: string;
  title: string;
  endorsements: Endorsement[];
}

export interface RoadmapCollaborator {
  name: string;
  context: string;
  linkedin?: string;
}

export interface RoadmapMilestone {
  id: string;
  year: string;
  label: string;
  role: string;
  color: string;
  icon: string;
  isActive?: boolean;
  story: string;
  tech: string[];
  metrics?: string[];
  courses?: RoadmapCourse[];
  gpa?: string;
  transcriptPdf?: string;
  degreePdf?: string;
  subRoles?: RoadmapSubRole[];
  coreSubjects?: string[];
  endorsers?: Endorser[];
  collaborator?: RoadmapCollaborator;
}

export const roadmapMilestones: RoadmapMilestone[] = [
  {
    id: "bachelors",
    year: "2016 – 2020",
    label: "Amity University, India",
    role: "Bachelor of Technology, Information Technology",
    color: "#8B6FC0",
    icon: "GraduationCap",
    story:
      "Built a strong foundation in computer science fundamentals, algorithms, and software development.",
    tech: ["C++", "Java", "Python", "Linux","MySQL"],
    coreSubjects: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Data Mining",
    ],
    endorsers: [
      {
        name: "Sunil Kumar Chowdhary",
        title: "Assistant Professor, Amity School of Engineering & Technology",
        endorsements: [
          { quote: "Demonstrated a strong grasp of algorithmic principles and a keen ability to identify patterns and optimize code to provide solutions for complex computational problems." },
          { quote: "A self-motivated innovator with the ability to grasp new concepts quickly and a desire to expand knowledge beyond the prescribed curriculum." },
          { quote: "Exhibited clarity of thought and deep technical knowledge, confidently navigating the minute technicalities of complex projects." },
        ],
      },
      {
        name: "Dr. Archana Singh",
        title: "Professor & Head, Department of AI & ML",
        endorsements: [
          { quote: "Displayed remarkable innovation and technical acumen in deciphering the complexities of a machine learning model and successfully implementing it." },
          { quote: "Highly impressed by his performance and technical knowledge in Artificial Intelligence and Data Mining." },
          { quote: "Consistently demonstrated dedication and a keen aptitude for learning, keeping abreast of the latest technological developments." },
        ],
      },
    ],
  },
  {
    id: "accenture",
    year: "2020 – 2023",
    label: "Pune, India",
    role: "Accenture Soln Pvt Ltd",
    color: "#0EA5E9",
    icon: "Briefcase",
    story:
      "Managed large-scale production services for a Fortune 500 pharmaceutical client as part of a global web API team. Coordinated with cross-functional teams in Singapore, Prague, and the USA to ensure 24/7 operational reliability across time zones. This tenure established the rigorous engineering discipline required to maintain mission-critical, high-traffic systems at a global scale.",
    tech: ["Java", "AWS","Apigee", "ElasticSearch", "Postman","Docker", "Jenkins", "Kibana", "JIRA","CI/CD", "TDD", "Agile"],
    metrics: [
      "50+ APIs Deployed",
      "Led a 6-member team",
      "200+ Production Issues Resolved",
      "12+ Enterprise Projects",
      "Migrated 80+ APIs to AWS Lambda",
    ],
    subRoles: [
      {
        title: "Software Engineering Analyst (Promoted)",
        period: "Jan 2022 – Aug 2023",
        description: [
          "Deployed and managed 50+ Java REST APIs on Apigee and AWS, engineered for high-concurrency traffic and production stability",
          "Enforced secure API management: IAM role integration, rate limiting, and quota policies across global environments",
          "Built real-time monitoring dashboards using ElasticSearch and CloudWatch to track latency, error trends, and system health",
          "Mentored junior engineers on API design, Agile/Scrum practices, and CI/CD/TDD workflows",
          "Delivered 12+ enterprise projects on time with zero production rollbacks",
        ],
      },
      {
        title: "Software Engineer Associate",
        period: "Dec 2020 – Dec 2021",
        description: [
          "Resolved 200+ client-reported production issues using JIRA workflows, ElasticSearch log analysis, and Apigee trace sessions",
          "Managed Apigee access controls, permissions, and API gateway configurations",
          "Monitored API performance and health metrics via ElasticSearch and CloudWatch",
          "First point of contact for client-facing API debugging and incident triage",
        ],
      },
    ],
    endorsers: [
      {
        name: "Kanhai Arora",
        title: "Application Development Manager, Accenture",
        endorsements: [
          { quote: "Leveraging a data-driven approach, Yavar conducted insightful analysis of internal logs and developed custom scripts to identify and resolve complex infrastructure bottlenecks." },
          { quote: "Displaying remarkable responsibility and accountability, he took the initiative to tackle unexpected workloads with great aplomb, ensuring all crucial project milestones were met." },
          { quote: "Yavar became the preferred go-to person for developers requiring assistance on API monitoring infrastructure and production deployment due to his technical know-how." },
        ],
      },
      {
        name: "Garje S.",
        title: "Pr Application Development Team Leader, Accenture",
        endorsements: [
          { quote: "Spearheaded a substantial project to address critical error rates reaching 25%, utilizing a systematic methodology to identify and resolve root causes." },
          { quote: "Impressed colleagues with a good grasp of engineering concepts, demonstrating an ability to handle multiple assignments under high-pressure situations with equanimity." },
          { quote: "Bolstered system health through the meticulous analysis of AWS Lambda and ElasticSearch logs, ultimately garnering well-deserved acclaim for stabilizing production environments." },
        ],
      },
    ],
  },
  {
    id: "masters",
    year: "2024 – 2025",
    label: "SUNY Buffalo",
    role: "M.S. Computer Science (AI/ML Track)",
    color: "#10B981",
    icon: "BookOpen",
    gpa: "3.87",
    transcriptPdf: "/YavarKhan_OfficialTranscript.pdf",
    degreePdf: "/YavarKhan_MS_Degree.pdf",
    story:
      "Undertook an intensive deep-dive into the mathematical foundations and practical implementation of modern machine learning. This journey ranged from building custom Transformers and CNNs from scratch in PyTorch to mastering the theory behind optimization, loss functions, and gradient flow. Complemented by strong fundamentals in algorithms, large-scale data systems, and computer security.",
    tech: ["Transformers", "Neural Networks", "Reinforcement Learning","PyTorch","Scikit-learn", "spaCy", "Gensim","Optimization", "Loss Functions", "Gradient Flow", "Algorithms", "Large-scale Data Systems", "Computer Security"],
    courses: [
      { name: "Machine Learning", grade: "A" },
      { name: "Deep Learning", grade: " A" },
      { name: "Computer Vision & Image Processing", grade: "A-" },
      { name: "Data Intensive Computing", grade: "A-" },
      { name: "Analysis of Algorithms and Design", grade: "A-" },
      { name: "Computer Security", grade: " A" },
    ],
  },
  {
    id: "genai-pivot",
    year: "2025 – Present",
    label: "AI/ML Engineer Preparation",
    role: "The GenAI Pivot",
    color: "#F59E0B",
    icon: "Zap",
    story:
      "Building on a solid foundation in deep learning and classical machine learning from my Master's, I transitioned into the application layer. I now focus on mastering modern AI frameworks, designing multi-agent architectures, and shipping production-ready Generative AI applications from the ground up.",
    tech: ["LLMs", "LangChain", "LangGraph", "OpenAI SDK", "RAG", "Embeddings", "Tokenization","Prompt Engineering", "Pydantic", "FAISS",  "Hugging Face Spaces","FastAPI","Vector DBs","Semantic Search"],
    metrics: [
      "2 GenAI Projects Shipped",
      "Multi-Agent Architectures",
      "RAG Pipelines in Production",
    ],
  },
  {
    id: "current",
    year: "Active Development",
    label: " ",
    role: "WeatherWise.ai",
    color: "#EF4444",
    icon: "Rocket",
    isActive: true,
    story:
      "An agentic AI system that transforms raw meteorological data into expert-level weather intelligence. Instead of manually querying weather APIs, parsing raw JSON, or cross-referencing climate research, users interact through natural language and receive scientifically grounded analysis with dynamic visualizations, powered by multi-agent orchestration and reasoning sourced from NOAA research, NASA atmospheric studies, and peer-reviewed climate science.",
    collaborator: {
      name: "Ishita Srivastava",
      context: "~8 years of experience at NCAR in atmospheric research",
      linkedin: "https://ishitasrivastava.me/",
    },
    tech: ["LangChain", "LangGraph", "LangSmith", "MCP", "RAG", "Anthropic Claude (Sonnet + Haiku)"],
    metrics: [
      "Multi-Agent Architecture",
      "Corrective RAG with Vision Grounding",
      "Dependency-Aware Parallel Execution",
      "LLM-Generated Visualization",
      "GCP Cloud Run",
    ],
  },
];

// ─── WeatherWise.ai Build Log ──────────────────────────────────────────────

export type BuildLogStatus = "shipped" | "in_progress" | "next";

export interface BuildLogEntry {
  title: string;
  description: string;
  tags: string[];
}

export interface BuildLogMilestone {
  milestone: string;
  status: BuildLogStatus;
  entries: BuildLogEntry[];
}

export interface BuildLogKeyStats {
  commits: string;
  agents: string;
  ragVectors: string;
  vizPivots: string;
  prodCost: string;
  liveUrl: string;
}

export const buildLogKeyStats: BuildLogKeyStats = {
  commits: "100+",
  agents: "7",
  ragVectors: "429",
  vizPivots: "3",
  prodCost: "$3-8/mo",
  liveUrl: "weather-wise.ai",
};

export const buildLog: BuildLogMilestone[] = [
  {
    milestone: "Foundation",
    status: "shipped",
    entries: [
      {
        title: "Xweather MCP Integration",
        description:
          "Real-time weather tools (forecasts, air quality, alerts, raster maps) connected via MCP with auth and tool filtering.",
        tags: ["MCP", "LangGraph", "Pydantic", "Async"],
      },
      {
        title: "Sandboxed Python Calculator",
        description:
          "AST-validated execution environment for math and statistical operations on weather data.",
        tags: ["Python AST", "Sandboxing", "Security"],
      },
    ],
  },
  {
    milestone: "Multi-Agent Architecture",
    status: "shipped",
    entries: [
      {
        title: "Planner-Executor with Parallel Fan-Out",
        description:
          "7 specialized agents with dependency-aware DAG execution and dynamic parallel fan-out/fan-in.",
        tags: ["LangGraph", "Send API", "DAG Execution", "Parallel Processing"],
      },
      {
        title: "Dynamic Model Routing",
        description:
          "Per-agent model selection based on task complexity, balancing reasoning quality against cost and latency.",
        tags: ["Model Selection", "Cost Optimization"],
      },
      {
        title: "Dual Data Pipeline",
        description:
          "Structured JSON for computation agents, LLM-formatted text for synthesis. Clean separation eliminated data parsing failures across the pipeline.",
        tags: ["Data Architecture", "Pipeline Design"],
      },
      {
        title: "Session Persistence",
        description:
          "Stateful multi-turn conversations with full graph checkpointing and context-aware follow-ups.",
        tags: ["LangGraph", "Checkpointing", "State Management"],
      },
    ],
  },
  {
    milestone: "RAG & Knowledge Pipeline",
    status: "shipped",
    entries: [
      {
        title: "Pinecone Vector Store",
        description:
          "Multimodal ingestion pipeline for climate research PDFs with vision-based image understanding and serverless vector retrieval.",
        tags: ["RAG", "Pinecone", "Embeddings", "Vision"],
      },
    ],
  },
  {
    milestone: "Visualization",
    status: "shipped",
    entries: [
      {
        title: "Dynamic LLM-Generated Charts",
        description:
          "The LLM analyzes query complexity and generates complete ECharts configurations autonomously, from simple bar charts to multi-series comparisons, with no templates or predefined chart logic.",
        tags: ["ECharts", "Structured Output", "Generative Visualization"],
      },
    ],
  },
  {
    milestone: "Frontend & Observability",
    status: "shipped",
    entries: [
      {
        title: "Thinking Timeline",
        description:
          "Real-time reasoning disclosure with dynamic progress headers and expandable tool call details via WebSocket streaming.",
        tags: ["React", "WebSocket", "Framer Motion"],
      },
      {
        title: "Trace Visualizer",
        description:
          "On-demand agent execution flow diagrams for end-to-end debugging.",
        tags: ["LangSmith", "Observability"],
      },
    ],
  },
  {
    milestone: "Production",
    status: "shipped",
    entries: [
      {
        title: "GCP Cloud Run",
        description:
          "Terraform-managed deployment with CI/CD, secret management, and custom domain. Single container serves full stack.",
        tags: ["GCP", "Terraform", "Cloud Build", "Cloudflare"],
      },
      {
        title: "Prompt Caching",
        description:
          "Native cache control to reduce token costs on repeated system prompts across turns.",
        tags: ["Prompt Caching", "Cost Optimization"],
      },
    ],
  },
  {
    milestone: "In Progress",
    status: "in_progress",
    entries: [
      {
        title: "Evaluation Framework",
        description:
          "Golden test suite with automated scoring for accuracy, grounding, and tool-use correctness.",
        tags: ["Evaluation", "LangSmith"],
      },
      {
        title: "Migration to Claude Code Native",
        description:
          "Replacing LangGraph orchestration with Anthropic's first-party agent SDK for native tool use and MCP integration.",
        tags: ["Claude Code", "Agent SDK"],
      },
    ],
  },
  {
    milestone: "Up Next",
    status: "next",
    entries: [
      {
        title: "RAG Pipeline Upgrade",
        description:
          "Exploring Gemini 2 embeddings, BM25 hybrid search, reranking, and agentic/graph RAG for improved retrieval accuracy.",
        tags: ["RAG", "Hybrid Search", "Reranking", "Graph RAG"],
      },
      {
        title: "Expanded MCP Ecosystem",
        description:
          "Additional MCP servers for wildfire impact, air quality, and maritime data.",
        tags: ["Multi-MCP", "Tool Ecosystem"],
      },
      {
        title: "Cross-Model Evaluation",
        description:
          "Automated benchmarking across multiple LLM providers on domain accuracy and routing precision.",
        tags: ["Evaluation", "Multi-Model"],
      },
    ],
  },
];

// ─── Skills ────────────────────────────────────────────────────────────────

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Backend",
    skills: ["Python", "Java", "C++", "SpringBoot", "FastAPI", "REST APIs", "AsyncIO", "SQL", "Pydantic"],
  },
  {
    title: "AI/ML & GenAI",
    skills: [
      "PyTorch", "TensorFlow", "Scikit-learn", "LLMs", "RAG", "Multi-Agent Systems",
      "Prompt Engineering", "Transformers", "FAISS", "LangChain", "LangGraph", "MCP",
      "Claude API", "Anthropic SDK", "Structured Output", "Agentic AI",
    ],
  },
  {
    title: "Data & Retrieval",
    skills: ["Pandas", "NumPy", "ElasticSearch", "ETL Pipelines", "Embedding Pipelines", "PostgreSQL", "MySQL", "Pinecone", "Vector Databases", "ChromaDB"],
  },
  {
    title: "Cloud & Deployment",
    skills: ["AWS Lambda", "S3", "IAM", "CloudWatch", "GCP Cloud Run", "Terraform", "Cloud Build", "Secret Manager", "Vertex AI", "Docker", "Hugging Face Spaces", "CI/CD"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "JIRA", "Kibana", "Postman", "Gradio", "Streamlit", "Confluence", "Linux/Unix", "LangSmith", "Claude Code"],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  certificateUrl: string;
  certificateImage: string;
}

export const certifications: Certification[] = [
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", certificateUrl: "/certificates/aws_cloud_practitioner.pdf", certificateImage: "/certificates/aws_cloud_practitioner.png" },
  { title: "Machine Learning Specialization", issuer: "Stanford / DeepLearning.AI", certificateUrl: "/certificates/ml_specialization_stanford.pdf", certificateImage: "/certificates/ml_specialization_stanford.png" },
  { title: "Algorithmic Toolbox", issuer: "UC San Diego (Coursera)", certificateUrl: "/certificates/algorithmic_toolbox.pdf", certificateImage: "/certificates/algorithmic_toolbox.png" },
];
