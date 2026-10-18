// ─── Certifications ────────────────────────────────────────────────────────

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  badge: string;
  // Higher-resolution badge files for large displays, as a srcset.
  badgeSet?: string;
  verifyUrl: string;
  verifyLabel: string;
}

export const certifications: Certification[] = [
  {
    title: "Claude Certified Architect – Professional",
    issuer: "Anthropic",
    date: "October 2026",
    badge: "/badges/claude-certified-architect-professional.webp",
    badgeSet:
      "/badges/claude-certified-architect-professional.webp 320w, /badges/claude-certified-architect-professional-600.webp 600w",
    verifyUrl: "https://www.credly.com/badges/99356023-0947-49a6-8c38-007c8ad9bcde/public_url",
    verifyLabel: "Verify on Credly",
  },
  {
    title: "Claude Certified Architect – Foundations",
    issuer: "Anthropic",
    date: "July 2026",
    badge: "/badges/claude-certified-architect-foundations.webp",
    badgeSet:
      "/badges/claude-certified-architect-foundations.webp 320w, /badges/claude-certified-architect-foundations-480.webp 480w",
    verifyUrl: "https://www.credly.com/badges/4e40f189-2df1-492b-8dfe-dfb93a568198/public_url",
    verifyLabel: "Verify on Credly",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    badge: "/badges/aws-certified-cloud-practitioner.webp",
    verifyUrl: "/certificates/aws-certified-cloud-practitioner.pdf",
    verifyLabel: "View certificate",
  },
];

export const [professionalCert, foundationsCert] = certifications;

// ─── About ─────────────────────────────────────────────────────────────────

export const aboutIntro =
  "AI engineer building end-to-end, high-stakes decision systems, with a background in mission-critical enterprise software.";

export interface ProfileHighlight {
  label: string;
  title: string;
  detail: string;
  // Brand-color vector mark; `size` is a Tailwind height class tuned so the marks carry equal visual weight.
  logo: { src: string; width: number; height: number; size: string };
}

// The fourth highlight is the Professional certification, rendered from `professionalCert`.
export const profileHighlights: ProfileHighlight[] = [
  {
    label: "Now",
    title: "AI Engineer, Aerveil",
    detail: "End-to-end decision engines for vineyards",
    logo: { src: "/logos/aerveil.svg", width: 3548, height: 3622, size: "h-9" },
  },
  {
    label: "Experience",
    title: "Nearly 3 years, Accenture",
    detail: "Mission-critical, enterprise-scale APIs for a Fortune 500 pharma client",
    logo: { src: "/logos/accenture.svg", width: 2001, height: 2122, size: "h-7" },
  },
  {
    label: "Education",
    title: "M.S. Computer Science, SUNY Buffalo",
    detail: "AI/ML track · 3.87 GPA",
    logo: { src: "/logos/ub.svg", width: 3200, height: 1648, size: "h-7" },
  },
];

// ─── Journey ───────────────────────────────────────────────────────────────

export interface Endorser {
  name: string;
  title: string;
  quotes: string[];
}

export interface SubRole {
  title: string;
  period: string;
  points: string[];
}

export interface Milestone {
  id: string;
  period: string;
  year: string;
  title: string;
  org: string;
  place?: string;
  summary?: string;
  highlights?: string[];
  // Logo or badge shown in the milestone's marker on the road.
  logo?: { src: string; width: number; height: number };
  links?: { label: string; href: string; external?: boolean }[];
  details?: {
    subRoles?: SubRole[];
    courses?: { name: string; grade: string }[];
    subjects?: string[];
    tech?: string[];
    endorsers?: Endorser[];
  };
}

// Newest first.
export const milestones: Milestone[] = [
  {
    id: "cca-professional",
    period: professionalCert.date,
    year: "2026",
    title: professionalCert.title,
    org: professionalCert.issuer,
    logo: { src: professionalCert.badge, width: 320, height: 320 },
    links: [{ label: professionalCert.verifyLabel, href: professionalCert.verifyUrl, external: true }],
  },
  {
    id: "cca-foundations",
    period: foundationsCert.date,
    year: "2026",
    title: foundationsCert.title,
    org: foundationsCert.issuer,
    logo: { src: foundationsCert.badge, width: 320, height: 320 },
    links: [{ label: foundationsCert.verifyLabel, href: foundationsCert.verifyUrl, external: true }],
  },
  {
    id: "aerveil",
    period: "Mar 2026 – present",
    year: "2026",
    logo: { src: "/logos/aerveil.svg", width: 3548, height: 3622 },
    title: "Founding AI Engineer",
    org: "Aerveil",
    place: "San Jose, CA",
    summary:
      "Building an AI decision platform that makes frost and spray calls for vineyards, block by block, delivered to growers on WhatsApp. I own it end to end: data pipelines, decision engines, LLM agents, evals and governance, and cloud infrastructure on GCP.",
    highlights: ["Working directly with our first design partner"],
    links: [
      { label: "More about Aerveil", href: "#aerveil" },
      { label: "aerveil.ai", href: "https://aerveil.ai", external: true },
    ],
  },
  {
    id: "buffalo",
    period: "Aug 2024 – Dec 2025",
    year: "2024",
    logo: { src: "/logos/ub.svg", width: 3200, height: 1648 },
    title: "M.S. Computer Science (AI/ML)",
    org: "University at Buffalo, SUNY",
    place: "Buffalo, NY",
    summary:
      "Went deep on the mathematics and practice of modern machine learning, from building Transformers and CNNs from scratch in PyTorch to optimization, loss functions and gradient flow.",
    highlights: ["GPA 3.87 / 4.0"],
    links: [
      { label: "Degree certificate", href: "/YavarKhan_MS_Degree.pdf", external: true },
      { label: "Transcript", href: "/YavarKhan_OfficialTranscript.pdf", external: true },
    ],
    details: {
      courses: [
        { name: "Machine Learning", grade: "A" },
        { name: "Deep Learning", grade: "A" },
        { name: "Computer Security", grade: "A" },
        { name: "Computer Vision & Image Processing", grade: "A-" },
        { name: "Data Intensive Computing", grade: "A-" },
        { name: "Analysis of Algorithms and Design", grade: "A-" },
      ],
      tech: ["PyTorch", "Scikit-learn", "Transformers", "Reinforcement Learning", "spaCy", "Gensim"],
    },
  },
  {
    id: "accenture",
    period: "Dec 2020 – Aug 2023",
    year: "2020",
    logo: { src: "/logos/accenture.svg", width: 2001, height: 2122 },
    title: "Software Engineering Associate → Analyst",
    org: "Accenture",
    place: "Pune, India",
    summary:
      "Ran production APIs for a Fortune 500 pharmaceutical client on a global web API team, working with engineers in the US, Singapore and Prague.",
    highlights: [
      "Operated 120+ OAuth 2.0 APIs on Apigee and AWS at 99.9% uptime",
      "Cut the API error rate from 25% to under 1% in three months",
      "Deployed 50+ API releases and hotfixes with Jenkins and Ansible",
      "Automated a week-long manual audit, retiring 15–20 dead endpoints",
      "Led a 5-member team",
    ],
    details: {
      subRoles: [
        {
          title: "Software Engineering Analyst",
          period: "Jan 2022 – Aug 2023",
          points: [
            "Operated 120+ OAuth 2.0 APIs on Apigee and AWS, engineered for high-concurrency traffic and production stability",
            "Enforced secure API management: IAM role integration, rate limiting and quota policies across global environments",
            "Built real-time monitoring dashboards with Elasticsearch and CloudWatch to track latency, error trends and system health",
            "Trained teammates on the end-to-end release process and mentored junior engineers on API design, Agile and CI/CD",
            "Delivered 12+ enterprise projects on time with zero production rollbacks",
          ],
        },
        {
          title: "Software Engineering Associate",
          period: "Dec 2020 – Dec 2021",
          points: [
            "Resolved 200+ client-reported production issues using JIRA workflows, Elasticsearch log analysis and Apigee trace sessions",
            "Managed Apigee access controls, permissions and API gateway configurations",
            "Monitored API performance and health metrics with Elasticsearch and CloudWatch",
            "First point of contact for client-facing API debugging and incident triage",
          ],
        },
      ],
      tech: ["Java", "AWS", "Apigee", "Elasticsearch", "Jenkins", "Ansible", "Docker", "Kibana", "Postman", "JIRA", "CI/CD", "TDD", "Agile"],
      endorsers: [
        {
          name: "Kanhai Arora",
          title: "Application Development Manager, Accenture",
          quotes: [
            "Leveraging a data-driven approach, Yavar conducted insightful analysis of internal logs and developed custom scripts to identify and resolve complex infrastructure bottlenecks.",
            "Yavar became the preferred go-to person for developers requiring assistance on API monitoring infrastructure and production deployment due to his technical know-how.",
          ],
        },
        {
          name: "Garje S.",
          title: "Pr Application Development Team Leader, Accenture",
          quotes: [
            "Spearheaded a substantial project to address critical error rates reaching 25%, utilizing a systematic methodology to identify and resolve root causes.",
            "Bolstered system health through the meticulous analysis of AWS Lambda and ElasticSearch logs, ultimately garnering well-deserved acclaim for stabilizing production environments.",
          ],
        },
      ],
    },
  },
  {
    id: "amity",
    period: "Jul 2016 – May 2020",
    year: "2016",
    logo: { src: "/logos/amity.webp", width: 353, height: 414 },
    title: "B.Tech, Information Technology",
    org: "Amity University",
    place: "India",
    summary:
      "Built a strong foundation in computer science fundamentals, algorithms and software development.",
    details: {
      subjects: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Data Mining",
      ],
      tech: ["C++", "Java", "Python", "Linux", "MySQL"],
      endorsers: [
        {
          name: "Sunil Kumar Chowdhary",
          title: "Assistant Professor, Amity School of Engineering & Technology",
          quotes: [
            "Demonstrated a strong grasp of algorithmic principles and a keen ability to identify patterns and optimize code to provide solutions for complex computational problems.",
            "A self-motivated innovator with the ability to grasp new concepts quickly and a desire to expand knowledge beyond the prescribed curriculum.",
          ],
        },
        {
          name: "Dr. Archana Singh",
          title: "Professor & Head, Department of AI & ML",
          quotes: [
            "Displayed remarkable innovation and technical acumen in deciphering the complexities of a machine learning model and successfully implementing it.",
            "Highly impressed by his performance and technical knowledge in Artificial Intelligence and Data Mining.",
          ],
        },
      ],
    },
  },
];

// ─── Aerveil ───────────────────────────────────────────────────────────────

export interface AerveilItem {
  title: string;
  detail: string;
}

export const aerveil = {
  name: "Aerveil",
  role: "AI Engineer",
  period: "Mar 2026 – Present",
  tagline:
    "Frost and spray decisions for vineyards, block by block, delivered on WhatsApp with the reasoning behind every call.",
  roleLine: "First AI engineer, owning the platform from design to deployment.",
  links: {
    site: "https://aerveil.ai/",
    linkedin: "https://www.linkedin.com/company/aerveil-ai/",
    instagram: "https://www.instagram.com/aerveil.ai/",
  },
  work: [
    {
      title: "Data ingestion pipelines",
      detail:
        "Hourly, high-resolution NOAA forecasts and observations mapped to every vineyard block through fault-tolerant pipelines with source fallbacks and resumable backfills.",
    },
    {
      title: "LLM agents & tool use",
      detail:
        "A WhatsApp agent with 20 typed, read-only tools over each grower's records and past decisions, keeping session context, grounding every answer, and writing only on explicit confirmation.",
    },
    {
      title: "Evals & reliable AI",
      detail:
        "Every change ships with evals and every new failure becomes a regression test, enforced by LLM-as-judge gates in CI and full tracing of tool calls for debugging.",
    },
    {
      title: "Cloud & delivery",
      detail:
        "GCP infrastructure defined in Terraform on a private VPC, with Secret Manager, least-privilege access, per-grower data isolation, keyless gated CI/CD and log-based alerts.",
    },
  ] satisfies AerveilItem[],
  // Beyond engineering: the product change from design-partner feedback is set as the feature.
  beyondHighlight: "Turned design-partner feedback into product changes, such as product-specific spray windows",
  beyond: [
    "Built and run aerveil.ai",
    "Product demos and grower onboarding",
    "On-site vineyard visits",
    "Marketing and launch content",
  ],
  status: "Testing with our first design partner ahead of the season.",
};

// ─── Projects ──────────────────────────────────────────────────────────────

export interface ProjectLink {
  label: string;
  href: string;
}

export interface FlowNode {
  label: string;
  // The node that coordinates the rest; drawn filled.
  core?: boolean;
}

export interface FeaturedProject {
  title: string;
  kind: string;
  points: string[];
  stack: string[];
  links: ProjectLink[];
  collaborator?: { name: string; href: string };
  // How the system works, left to right. Each stage lists nodes that run side by side.
  // Labels come only from the points above.
  flow: FlowNode[][];
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "WeatherWise.AI",
    kind: "Claude-powered multi-agent weather analyst",
    points: [
      "Built a Claude-powered LangGraph multi-agent weather analyst running parallel tasks across live Vaisala Xweather MCP data, sandboxed code execution and LLM-generated interactive ECharts dashboards.",
      "Implemented multimodal RAG (text, tables, figures) in Pinecone over NOAA, NASA and National Climate Assessment reports; added prompt caching and LangSmith tracing, deployed on GCP Cloud Run via Terraform.",
    ],
    stack: ["LangGraph", "Claude", "MCP", "Pinecone", "LangSmith", "GCP Cloud Run", "Terraform"],
    links: [
      { label: "GitHub", href: "https://github.com/VectorWorkX/WeatherWise.ai" },
      { label: "Demo video", href: "https://github.com/user-attachments/assets/8d0edeee-3438-42ed-931a-97b1560b84af" },
    ],
    collaborator: { name: "Ishita Srivastava", href: "https://ishitasrivastava.me/" },
    flow: [
      [{ label: "Weather question" }],
      [{ label: "Claude + LangGraph agents", core: true }],
      [{ label: "Xweather MCP live data" }, { label: "Sandboxed code" }, { label: "Multimodal RAG, Pinecone" }],
      [{ label: "Interactive ECharts dashboard" }],
    ],
  },
  {
    title: "Deep Research Pro",
    kind: "Multi-agent research system on the OpenAI Agents SDK",
    points: [
      "Built a multi-agent research system on the OpenAI Agents SDK: human-reviewed query planning, parallel search agents, adaptive follow-up waves and Pydantic-validated reports.",
      "Delivered ~40-source cited reports in ~1 min via async fan-out and two-tier (in-memory + SQLite) caching; grounded citations in search-tool URL annotations to prevent hallucinated links.",
    ],
    stack: ["OpenAI Agents SDK", "Pydantic", "SQLite", "Gradio"],
    links: [
      { label: "GitHub", href: "https://github.com/yavar29/GenAI_Projects/tree/main/OpenAI_Agents_SDK/deep_research_pro" },
      { label: "Demo video", href: "/video/deep-research-pro-demo.mp4" },
    ],
    flow: [
      [{ label: "Query planning, human-reviewed", core: true }],
      [{ label: "Search agent" }, { label: "Search agent" }, { label: "Search agent" }],
      [{ label: "Adaptive follow-up waves" }],
      [{ label: "Cited report, Pydantic-validated" }],
    ],
  },
  {
    title: "Context-Aware RAG Assistant",
    kind: "Retrieval-augmented assistant",
    points: [
      "Intelligent RAG pipeline with FAISS vector indexing, runtime persona switching, and real-time Pushover alerts, deployed on Hugging Face.",
    ],
    stack: ["LangChain", "FAISS", "FastAPI", "Gradio"],
    links: [
      { label: "GitHub", href: "https://github.com/yavar29/GenAI_Projects/tree/main/Context-Aware_AI_RAG_Assistant" },
    ],
    flow: [
      [{ label: "FAISS vector index" }],
      [{ label: "RAG pipeline, runtime persona", core: true }],
      [{ label: "Answer" }, { label: "Pushover alert" }],
    ],
  },
];

export interface EarlierProject {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export const earlierProjects: EarlierProject[] = [
  {
    title: "Transformer Sentiment Analysis",
    description: "Transformer built from scratch in PyTorch, trained on 560K Yelp reviews.",
    href: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Transformer",
    linkLabel: "Code",
  },
  {
    title: "VGG-16 vs ResNet-18",
    description: "Two CNN architectures compared on 30K images with tuning and augmentation.",
    href: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/VGG%20and%20Resnet",
    linkLabel: "Code",
  },
  {
    title: "ThermoWatch-AE",
    description: "Convolutional autoencoder for unsupervised anomaly detection in machine temperature data.",
    href: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Autoencoder_AnomalyDetection",
    linkLabel: "Code",
  },
  {
    title: "EMNIST Character Recognition",
    description: "CNN for 36-class handwritten character recognition.",
    href: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Convolutional%20Neural%20Network/EMNIST_text_recognition",
    linkLabel: "Code",
  },
  {
    title: "GridWorld RL",
    description: "SARSA vs. n-step Double Q-learning, tuned with Optuna.",
    href: "https://github.com/yavar29/ML_Projects/tree/main/Reinforcement%20Learning%20Models%20",
    linkLabel: "Code",
  },
  {
    title: "Speech Emotion Recognition",
    description: "1D CNN classifying five emotions from speech using MFCC features.",
    href: "https://github.com/yavar29/ML_Projects/tree/main/Deep%20Learning%20Models/Convolutional%20Neural%20Network/SpeechEmotionRecognition",
    linkLabel: "Code",
  },
];

// ─── Skills ────────────────────────────────────────────────────────────────

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI/ML & GenAI",
    skills: [
      "Claude API", "Anthropic SDK", "OpenAI Agents SDK", "LangGraph", "LangChain", "MCP", "RAG",
      "Multi-Agent Systems", "Agentic AI", "Structured Output", "LLM-as-judge Evals", "Prompt Caching",
      "Prompt Engineering", "LLMs", "Transformers", "PyTorch", "TensorFlow", "Scikit-learn", "FAISS",
    ],
  },
  {
    title: "Programming & Backend",
    skills: ["Python", "Java", "C++", "SQL", "FastAPI", "Pydantic", "REST APIs", "OAuth 2.0", "AsyncIO", "Spring Boot", "Next.js"],
  },
  {
    title: "Data & Retrieval",
    skills: [
      "PostgreSQL", "PostGIS", "SQLite", "MySQL", "Elasticsearch", "Pinecone", "Vector Databases", "ChromaDB",
      "ETL Pipelines", "Embedding Pipelines", "Pandas", "NumPy",
    ],
  },
  {
    title: "Cloud & Deployment",
    skills: [
      "GCP", "AWS", "Terraform", "Docker", "GitHub Actions", "Jenkins", "Ansible", "Apigee", "GCP Cloud Run",
      "Cloud Build", "Secret Manager", "Vertex AI", "AWS Lambda", "S3", "IAM", "CloudWatch", "Hugging Face Spaces", "CI/CD",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: ["Claude Code", "LangSmith", "Git", "Linux/Unix", "Postman", "Twilio", "Kibana", "Gradio", "Streamlit", "JIRA", "Confluence"],
  },
];
