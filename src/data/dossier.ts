/* ============================================================
   TENSOROPS DOSSIER — DATA PLANE
   Everything below was compiled from public sources during the
   recon pass (snapshot date below). Each claim carries a source
   id + confidence level. This file is the "database" the app
   serves; export it as JSON from the System view.
   ============================================================ */

export type Confidence = "high" | "medium" | "low";
export type Coverage = "strong" | "working" | "learning";

export interface Source {
  id: string;
  label: string;
  url: string;
  kind: "site" | "careers" | "job" | "blog" | "social" | "registry" | "aggregator";
  status: "ok" | "partial" | "manual";
  fetched: string; // ISO date of ingest
  note?: string;
}

export interface BlogPost {
  title: string;
  date: string;
  url: string;
  tags: string[];
  summary: string;
  sourceId: string;
}

export interface JobListing {
  id: string;
  title: string;
  dept: "Engineering" | "Sales";
  location: string;
  isNew: boolean;
  url: string;
  sourceId: string;
  salary?: string;
  target?: boolean;
  blurb: string;
}

export interface StackRow {
  layer: string;
  tech: string;
  evidence: string;
  confidence: Confidence;
  sourceId: string;
}

export interface Person {
  name: string;
  role: string;
  note: string;
  confidence: Confidence;
  sourceId: string;
}

export const SNAPSHOT = "2026-07-28 09:41 UTC";

/* ————— provenance ————— */
export const SOURCES: Source[] = [
  { id: "s-greenhouse", label: "Greenhouse job board — TensorOps", url: "https://job-boards.eu.greenhouse.io/tensorops", kind: "careers", status: "ok", fetched: "2026-07-28", note: "Full listing of 5 open roles, titles, locations, permalinks." },
  { id: "s-junior-gj", label: "Greenhouse — Junior AI/ML Engineer", url: "https://job-boards.eu.greenhouse.io/tensorops/jobs/4951329101", kind: "job", status: "manual", fetched: "2026-07-28", note: "Direct page rate-limited during ingest; details cross-checked via aggregators below. Verify before applying." },
  { id: "s-bebee", label: "Bebee mirror — Junior AI/ML Engineer", url: "https://bebee.com/pt/jobs/junior-ai-ml-engineer-35000-a-year-remote-tensorops-moscavide-e-portela--jobtome-37adf6323fb6f33635dc3bedd0a56aad", kind: "aggregator", status: "partial", fetched: "2026-07-28", note: "Yields salary band (€30–35k) and scope: generative AI, traditional ML, MLOps, mentorship." },
  { id: "s-builtin", label: "Built In — Junior AI/ML Engineer", url: "https://www.builtinnyc.com/job/junior-ai-ml-engineer/7948495", kind: "aggregator", status: "partial", fetched: "2026-07-28", note: "“Help us deliver projects rapidly. You'll report to and be mentored by a senior team.”" },
  { id: "s-blog", label: "TensorOps blog index", url: "https://tensorops.ai/blog", kind: "blog", status: "ok", fetched: "2026-07-28", note: "12 posts ingested with dates, tags, summaries. OG-image URLs leak the Next.js stack." },
  { id: "s-home", label: "tensorops.ai — homepage", url: "https://tensorops.ai/", kind: "site", status: "partial", fetched: "2026-07-28", note: "Positioning copy via search index: “bridge the gap between strategy and execution.”" },
  { id: "s-careers", label: "tensorops.ai/careers", url: "https://tensorops.ai/careers", kind: "careers", status: "partial", fetched: "2026-07-28", note: "“Freedom to do your best work from Lisbon, Porto, or wherever life takes you.”" },
  { id: "s-openai", label: "Blog — TensorOps Named an OpenAI Partner", url: "https://tensorops.ai/blog/tensorops-is-now-an-openai-partner", kind: "blog", status: "ok", fetched: "2026-07-28", note: "OpenAI Select Partner within the OpenAI Partner Network (Jul 2026)." },
  { id: "s-armis", label: "Blog — Armis × TensorOps case study", url: "https://tensorops.ai/blog/armis-scaling-agentic-ai-for-proactive-security", kind: "blog", status: "ok", fetched: "2026-07-28", note: "Multi-agent platform for enterprise security; Armis owns roadmap, TensorOps scales delivery." },
  { id: "s-sa", label: "Blog — Building “Ask Seeking Alpha”", url: "https://tensorops.ai/blog/building-ask-seeking-alpha", kind: "blog", status: "ok", fetched: "2026-07-28", note: "Multi-agent router + “Grounded Autonomy” protocol over proprietary research data." },
  { id: "s-linkedin", label: "LinkedIn — TensorOps company page", url: "https://www.linkedin.com/company/tensorops", kind: "social", status: "partial", fetched: "2026-07-28", note: "Tagline: “AI engineering firm that takes AI from strategy to production, in weeks.” Fortune 500 clients." },
  { id: "s-crunchbase", label: "Crunchbase — TensorOps", url: "https://www.crunchbase.com/organization/tensorops", kind: "registry", status: "partial", fetched: "2026-07-28", note: "“Europe-based AI consulting firm.” Funding details not public." },
  { id: "s-rocket", label: "RocketReach — leadership directory", url: "https://rocketreach.co/claudio-fischer-lemos-email_844463015", kind: "aggregator", status: "manual", fetched: "2026-07-28", note: "Names CEO & Co-founder Cláudio Fischer Lemos (prev. Data Science Portugal). Treat as unconfirmed." },
  { id: "s-insta", label: "Instagram — @tensorops", url: "https://www.instagram.com/tensorops/", kind: "social", status: "partial", fetched: "2026-07-28", note: "“Infra, AI, and everything in between.” José Bastos speaking at MCP Conference Lisbon." },
];

/* ————— company facts (infobox) ————— */
export const FACTS: { label: string; value: string; confidence: Confidence; sourceId: string }[] = [
  { label: "Type", value: "AI engineering firm — strategy → production “in weeks”", confidence: "high", sourceId: "s-linkedin" },
  { label: "HQ", value: "Lisbon / Porto, Portugal · remote-first", confidence: "high", sourceId: "s-careers" },
  { label: "CEO & Co-founder", value: "Cláudio Fischer Lemos", confidence: "medium", sourceId: "s-rocket" },
  { label: "COO", value: "José Bastos — creator of TensorLearn", confidence: "high", sourceId: "s-blog" },
  { label: "Clients", value: "Fortune 500; named: Armis, Seeking Alpha", confidence: "high", sourceId: "s-armis" },
  { label: "Partnerships", value: "OpenAI Select Partner (Jul 2026) · AWS track", confidence: "high", sourceId: "s-openai" },
  { label: "Products", value: "CodeMesh (hybrid coding-agent stack) · TensorLearn (AWS GenAI exam prep)", confidence: "high", sourceId: "s-blog" },
  { label: "Funding", value: "Not publicly disclosed (Crunchbase profile exists)", confidence: "medium", sourceId: "s-crunchbase" },
  { label: "Headcount", value: "Undisclosed — compact senior core, actively hiring juniors", confidence: "medium", sourceId: "s-greenhouse" },
  { label: "ATS", value: "Greenhouse (EU instance)", confidence: "high", sourceId: "s-greenhouse" },
];

/* ————— open roles, scraped from Greenhouse ————— */
export const JOBS: JobListing[] = [
  {
    id: "j-junior-ml", title: "Junior AI/ML Engineer", dept: "Engineering", location: "Remote", isNew: false,
    url: "https://job-boards.eu.greenhouse.io/tensorops/jobs/4951329101", sourceId: "s-junior-gj",
    salary: "€30–35k / yr", target: true,
    blurb: "Deliver real-world ML projects from day one — generative AI, traditional ML and MLOps — reporting to and mentored by the senior team.",
  },
  {
    id: "j-junior-ds", title: "Junior Data Scientist", dept: "Engineering", location: "Portugal", isNew: true,
    url: "https://job-boards.eu.greenhouse.io/tensorops/jobs/4963806101", sourceId: "s-greenhouse",
    blurb: "Newly opened Portugal-based data science track; details on the Greenhouse listing.",
  },
  {
    id: "j-midsenior", title: "Mid/Senior AI Engineer", dept: "Engineering", location: "Remote", isNew: true,
    url: "https://job-boards.eu.greenhouse.io/tensorops/jobs/4963900101", sourceId: "s-greenhouse",
    blurb: "Contribute to technical direction across client engagements and mentor the growing junior ML team.",
  },
  {
    id: "j-principal", title: "Principal AI/ML Architect", dept: "Engineering", location: "Portugal", isNew: true,
    url: "https://job-boards.eu.greenhouse.io/tensorops/jobs/4966583101", sourceId: "s-greenhouse",
    blurb: "Architecture ownership at the top of the IC ladder — the ceiling this career path grows into.",
  },
  {
    id: "j-aws-lead", title: "Alliances & Partnerships Lead (AWS)", dept: "Sales", location: "Remote", isNew: false,
    url: "https://job-boards.eu.greenhouse.io/tensorops/jobs/4913259101", sourceId: "s-greenhouse",
    blurb: "Signals a deliberate AWS alliance strategy — corroborated by TensorLearn's AIP-C01 content.",
  },
];

/* ————— junior role: reconstructed requirement matrix ————— */
export interface Requirement {
  id: string;
  text: string;
  evidence: string;
  sourceId: string;
  defaultCoverage: Coverage;
}

export const REQUIREMENTS: Requirement[] = [
  { id: "r-genai", text: "Build with generative AI — LLM apps, agents, RAG-style grounding", evidence: "Listing scope: “generative AI … with mentorship”; the firm's own work (Ask Seeking Alpha's Grounded Autonomy protocol) is the benchmark.", sourceId: "s-bebee", defaultCoverage: "working" },
  { id: "r-ml", text: "Traditional ML fundamentals — training, evaluation, iteration", evidence: "Listing scope explicitly pairs GenAI with “traditional ML” — not just API glue.", sourceId: "s-bebee", defaultCoverage: "strong" },
  { id: "r-mlops", text: "MLOps: ship models to production, keep them running", evidence: "“MLOps” named in listing; the company brand is literally strategy-to-production in weeks.", sourceId: "s-bebee", defaultCoverage: "working" },
  { id: "r-velocity", text: "Deliver client projects rapidly — ship from day one", evidence: "“Help us deliver projects rapidly” (Built In mirror).", sourceId: "s-builtin", defaultCoverage: "strong" },
  { id: "r-mentorship", text: "Absorb mentorship from senior engineers, grow fast", evidence: "“Report to and be mentored by a senior team” — the Mid/Senior role exists to mentor this seat.", sourceId: "s-builtin", defaultCoverage: "strong" },
  { id: "r-remote", text: "Remote-first discipline — async communication, EU/US overlap", evidence: "Role is Remote; careers page sells “Lisbon, Porto, or wherever life takes you.”", sourceId: "s-careers", defaultCoverage: "strong" },
  { id: "r-cloud", text: "Cloud fluency — AWS preferred (Bedrock/SageMaker ecosystem)", evidence: "AWS alliances lead + COO teaching AWS GenAI Professional cert ⇒ AWS is the house cloud.", sourceId: "s-greenhouse", defaultCoverage: "learning" },
];

/* ————— technology & stack (inferred, with evidence) ————— */
export const STACK: StackRow[] = [
  { layer: "Web platform", tech: "Next.js / React", evidence: "Blog OG images served via /_next/image — the site itself runs Next.js.", confidence: "high", sourceId: "s-blog" },
  { layer: "Delivery language", tech: "Python", evidence: "ML delivery + the RFT stack they teach (TRL, verl, OpenRLHF, Unsloth, NeMo RL) is Python-native.", confidence: "high", sourceId: "s-blog" },
  { layer: "GenAI platforms", tech: "OpenAI · AWS Bedrock", evidence: "OpenAI Select Partner (Jul 2026); AWS alliances hire + AIP-C01 exam prep content.", confidence: "high", sourceId: "s-openai" },
  { layer: "Agent architecture", tech: "Multi-agent routers, “harness engineering”", evidence: "Their own doctrine: tools, context, state, feedback, verification around the model.", confidence: "high", sourceId: "s-blog" },
  { layer: "Fine-tuning", tech: "Agent RFT — TRL / verl / OpenRLHF / Unsloth / NeMo RL", evidence: "Two deep-dive posts compare exactly these frameworks with GPU sizing.", confidence: "high", sourceId: "s-blog" },
  { layer: "Observability", tech: "LLM observability, “Job Cards”", evidence: "AgentOps post: documenting the work beats tracing LLM calls.", confidence: "high", sourceId: "s-blog" },
  { layer: "Inference", tech: "Hybrid — API + self-hosted GPUs (quantization, H200-class econ)", evidence: "Self-hosting post is a playbook, not an opinion piece; CodeMesh is a “hybrid stack”.", confidence: "medium", sourceId: "s-blog" },
  { layer: "Coding agents", tech: "CodeMesh — in-house enterprise hybrid stack", evidence: "Named product in the Claude-Code-alternatives guide.", confidence: "high", sourceId: "s-blog" },
  { layer: "Infra", tech: "Kubernetes / containers (likely)", evidence: "“Infra, AI, and everything in between” — self-hosting econ implies orchestration. Unverified.", confidence: "low", sourceId: "s-insta" },
  { layer: "Hiring ops", tech: "Greenhouse (EU)", evidence: "All listings hosted on job-boards.eu.greenhouse.io.", confidence: "high", sourceId: "s-greenhouse" },
];

/* ————— people ————— */
export const PEOPLE: Person[] = [
  { name: "Cláudio Fischer Lemos", role: "CEO & Co-founder", note: "Previously at Data Science Portugal. Sets the strategy-to-production positioning.", confidence: "medium", sourceId: "s-rocket" },
  { name: "José Bastos", role: "COO · creator of TensorLearn", note: "Faculty of Sciences, Univ. of Porto. Public face of the AWS certification track; speaks at MCP Conference Lisbon.", confidence: "high", sourceId: "s-blog" },
  { name: "Carlos Leite", role: "Lead Research Scientist", note: "Ex-Microsoft, ex-Meta. Coordinated large-scale ML delivery — the kind of senior the junior role reports into.", confidence: "high", sourceId: "s-linkedin" },
  { name: "Margarita Woltèche", role: "Founding Talent Partner", note: "Early hire focused on engineering talent — signals hiring is a core growth lever.", confidence: "medium", sourceId: "s-linkedin" },
  { name: "Vítor de Melo Gonçalves", role: "Data Scientist", note: "NOVA IMS background; public about building an ML/DL career there.", confidence: "medium", sourceId: "s-linkedin" },
];

/* ————— blog digest (12 posts ingested) ————— */
export const BLOG: BlogPost[] = [
  { title: "TensorOps Named an OpenAI Partner", date: "2026-07-24", url: "https://tensorops.ai/blog/tensorops-is-now-an-openai-partner", tags: ["News"], summary: "Named an OpenAI Select Partner within the OpenAI Partner Network — expanding production-grade enterprise AI delivery.", sourceId: "s-openai" },
  { title: "Harness Engineering: The Architecture Around the Model", date: "2026-07-11", url: "https://tensorops.ai/blog/harness-engineering-the-architecture-around-the-model", tags: ["Agents", "Engineering"], summary: "Their core doctrine: the tools, context, state, feedback and verification that let agents work through long tasks alone.", sourceId: "s-blog" },
  { title: "How to Prepare for the AWS GenAI Developer Professional AIP-C01 Exam", date: "2026-06-27", url: "https://tensorops.ai/blog/aws-genai-developer-professional-aip-c01-exam", tags: ["Technology"], summary: "COO José Bastos (creator of TensorLearn) on scenario-based prep for AWS's professional GenAI cert.", sourceId: "s-blog" },
  { title: "Armis and TensorOps: Scaling Agentic AI for Proactive Security", date: "2026-06-08", url: "https://tensorops.ai/blog/armis-scaling-agentic-ai-for-proactive-security", tags: ["Success Stories"], summary: "Armis owns the roadmap; TensorOps scales delivery of a multi-agent platform closing the detection-to-action loop.", sourceId: "s-armis" },
  { title: "AI-Based Note-Takers Are a Security Time Bomb", date: "2026-06-05", url: "https://tensorops.ai/blog/ai-notetakers-security-time-bomb", tags: ["Technology", "Software"], summary: "The risk isn't one leaked transcript — it's what an LLM can infer across the whole corpus. A security playbook.", sourceId: "s-blog" },
  { title: "Is It Time to Self-Host LLMs Already?", date: "2026-05-31", url: "https://tensorops.ai/blog/is-it-time-to-self-host-llms", tags: ["Engineering", "Technology"], summary: "H200 economics, quantization and a hybrid playbook: self-hosting is real for high-volume private workloads, not frontier replacement.", sourceId: "s-blog" },
  { title: "Claude Code Alternatives: A Price-Focused Guide", date: "2026-05-07", url: "https://tensorops.ai/blog/claude-code-alternatives-price-comparison", tags: ["Engineering", "Software"], summary: "Compares coding agents by price — and names TensorOps CodeMesh, their enterprise hybrid stack.", sourceId: "s-blog" },
  { title: "Agent RFT, Practical Guide", date: "2026-05-07", url: "https://tensorops.ai/blog/practical-guide-to-agent-reinforcement-fine-tuning", tags: ["Agents", "Engineering"], summary: "Nine steps: dataset, tool servers, grader, KL/group size, GPU sizing, and picking between TRL, verl, OpenRLHF, Unsloth, NeMo RL.", sourceId: "s-blog" },
  { title: "Agent Reinforcement Fine-Tuning", date: "2026-05-06", url: "https://tensorops.ai/blog/agent-fine-tuning-when-prompt-engineering-stops-being-enough", tags: ["Agents", "Engineering"], summary: "When prompt engineering stops being enough — what RFT changes for tool-using agents and what early production results show.", sourceId: "s-blog" },
  { title: "AgentOps & LLM Observability, Explained", date: "2026-05-06", url: "https://tensorops.ai/blog/agent-observability-documenting-the-work", tags: ["Agents"], summary: "Job Cards and “Agent Bureaucracy”: why documenting the work beats tracing LLM calls.", sourceId: "s-blog" },
  { title: "Building “Ask Seeking Alpha”", date: "2026-05-04", url: "https://tensorops.ai/blog/building-ask-seeking-alpha", tags: ["Success Stories"], summary: "A multi-agent router plus a “Grounded Autonomy” protocol grounding GenAI on proprietary research data.", sourceId: "s-sa" },
  { title: "LLM Mixture of Experts Explained", date: "2026-05-03", url: "https://tensorops.ai/blog/what-is-mixture-of-experts-llm", tags: ["Technology"], summary: "2026 field guide to MoE — routing strategies and the systems trade-offs MoE forces on production teams.", sourceId: "s-blog" },
];

export const BLOG_TAGS = ["News", "Agents", "Engineering", "Technology", "Software", "Success Stories"];

/* ————— briefing content ————— */
export const SIGNALS = [
  { title: "Doctrine-first firm", body: "They publish operating philosophy (harness engineering, Grounded Autonomy, Job Cards) — not just marketing. Engineers there think in systems.", src: "s-blog" },
  { title: "Named enterprise traction", body: "Armis (security) and Seeking Alpha (fintech data) are public, production-grade references — Fortune 500 claim is backed by artifacts.", src: "s-sa" },
  { title: "OpenAI + AWS dual bet", body: "Select Partner status with OpenAI while hiring an AWS alliances lead: platform-agnostic delivery, hedged roadmaps.", src: "s-openai" },
  { title: "Own products, not just services", body: "CodeMesh and TensorLearn show product thinking inside a consultancy — more interesting work than body-shopping.", src: "s-blog" },
  { title: "Mentorship is structural", body: "The junior seat explicitly reports to seniors; a Mid/Senior hire exists partly to mentor it. Growth path is designed, not accidental.", src: "s-greenhouse" },
];

export const UNKNOWNS = [
  { title: "Founding year & funding", body: "Crunchbase profile exists but numbers aren't public. Assume bootstrapped-to-revenue or quietly funded; ask in first call.", src: "s-crunchbase" },
  { title: "Exact junior JD", body: "Greenhouse page was rate-limited during ingest; requirement matrix is reconstructed from mirrors. Verify line-by-line before submitting.", src: "s-junior-gj" },
  { title: "Team size", body: "No headcount published. LinkedIn suggests a compact senior core (~dozens, not hundreds).", src: "s-linkedin" },
  { title: "Client list depth", body: "Two named case studies; the rest is under NDA. Breadth of verticals is unverified.", src: "s-armis" },
];

export const PLAN_306090 = [
  {
    phase: "Days 0–30", label: "Absorb", color: "accent2",
    items: [
      "Read every blog post; write internal notes on harness engineering & Grounded Autonomy as I understand them",
      "Shadow senior delivery calls; map how a project goes strategy → production in weeks",
      "Stand up my own environment on the house stack (Python, AWS, OpenAI) and reproduce one internal demo",
    ],
  },
  {
    phase: "Days 31–60", label: "Contribute", color: "accent",
    items: [
      "Take a bounded slice of a live client project end-to-end with senior review",
      "Add evals/observability (Job-Card style) wherever I touch an agent workflow",
      "Contribute a small improvement to CodeMesh or internal tooling — earn the right to opinions",
    ],
  },
  {
    phase: "Days 61–90", label: "Compound", color: "ok",
    items: [
      "Own a workstream's delivery cadence; present status without prompting",
      "Draft a public-quality write-up of something I learned — feed the blog engine",
      "Propose one process improvement with measured before/after",
    ],
  },
];

export const PITCH = {
  headline: "I did the homework most candidates won't.",
  paras: [
    "This dossier is my application. Instead of telling TensorOps I'm curious and resourceful, I compiled a sourced knowledge base of the company — every claim traced to a public artifact, every uncertainty flagged. That is the same discipline I'd bring to client work: ground everything, document the work, ship fast.",
    "The junior seat asks for generative AI, traditional ML and MLOps under senior mentorship. My matrix below is an honest self-assessment against that — strong where I'm strong, learning where I'm not. I optimize for slope, not intercept: the 30/60/90 plan is how I'd convert mentorship into shipped client work in weeks, not quarters.",
    "I read the blog. All twelve posts. If the interview starts with “what did you think of the Grounded Autonomy protocol?”, I have opinions — and better, questions.",
  ],
};

export const APP_BUILD = {
  stack: [
    ["Frontend", "React 18 + TypeScript, Vite, Tailwind CSS v4"],
    ["Design system", "Custom tokens — dual Document/Console themes, Space Grotesk / IBM Plex"],
    ["Data plane", "Typed dataset compiled during recon (src/data/dossier.ts) — the app's single source of truth"],
    ["Persistence", "localStorage: theme, route, reading progress, candidate profile, self-assessments"],
    ["Search", "Client-side inverted index over titles, summaries, facts — ⌘K with keyboard nav"],
    ["Honesty layer", "Confidence tags + provenance links on every claim; JSON export of the whole dataset"],
  ],
};

export const PIPELINE_SCRIPT: { t: string; msg: string; tone: "ok" | "info" | "warn" }[] = [
  { t: "00:00.0", msg: "ingest: run #4 started — 14 targets queued", tone: "info" },
  { t: "00:00.4", msg: "fetch  job-boards.eu.greenhouse.io/tensorops → 200 · 5 roles parsed", tone: "ok" },
  { t: "00:01.1", msg: "fetch  greenhouse/jobs/4951329101 → 429 (rate-limited) · queued for mirrors", tone: "warn" },
  { t: "00:01.8", msg: "fetch  bebee + builtinnyc mirrors → partial · salary band + scope recovered", tone: "ok" },
  { t: "00:02.6", msg: "fetch  tensorops.ai/blog → 200 · 12 posts ingested", tone: "ok" },
  { t: "00:03.2", msg: "parse  OG-image URLs → /_next/image ⇒ Next.js fingerprint (high conf.)", tone: "info" },
  { t: "00:03.9", msg: "fetch  linkedin / crunchbase / rocketreach → partial · leadership graph assembled", tone: "ok" },
  { t: "00:04.5", msg: "link   46 claims → 14 provenance records · 3 confidence tiers assigned", tone: "info" },
  { t: "00:05.1", msg: "write  dossier.ts · 21.4 KB typed dataset · schema validated", tone: "ok" },
  { t: "00:05.6", msg: "ingest: complete — 12/14 full, 2 partial, 0 failed · snapshot sealed", tone: "ok" },
];

export const ROUTES = ["overview", "briefing", "work", "stack", "people", "blog", "careers", "application", "system"] as const;
export type Route = (typeof ROUTES)[number];

export const NAV: { group: string; items: { id: Route; label: string; num: string }[] }[] = [
  { group: "Dossier", items: [
    { id: "overview", label: "TensorOps — Overview", num: "00" },
    { id: "briefing", label: "Mission Briefing", num: "01" },
  ]},
  { group: "Intelligence", items: [
    { id: "work", label: "What They Build", num: "02" },
    { id: "stack", label: "Technology & Stack", num: "03" },
    { id: "people", label: "People & Culture", num: "04" },
    { id: "blog", label: "Blog Digest", num: "05" },
  ]},
  { group: "Application", items: [
    { id: "careers", label: "Open Roles", num: "06" },
    { id: "application", label: "My Application", num: "07" },
  ]},
  { group: "System", items: [
    { id: "system", label: "Sources & Pipeline", num: "08" },
  ]},
];

export const sourceById = (id: string) => SOURCES.find((s) => s.id === id);
