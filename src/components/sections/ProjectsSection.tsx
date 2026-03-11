"use client";

import { useState } from "react";
import { ArrowUpRight, FileText, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { projects, presentations, type ProjectCategory } from "@/lib/data";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const TABS: { label: string; value: ProjectCategory }[] = [
  { label: "All", value: "All" },
  { label: "GenAI", value: "GenAI" },
  { label: "ML / DL", value: "ML/DL" },
  { label: "Presentations", value: "Presentations" },
];

const CAT = {
  GenAI: {
    headerText: "text-amber-700",
    headerLine: "to-amber-300/50",
    metric: "text-amber-800 bg-amber-100/80 border border-amber-300/50",
    tagDot: "bg-amber-400",
    bottomLine: "from-amber-300/0 via-amber-500/50 to-amber-300/0",
    glow: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
  },
  "ML/DL": {
    headerText: "text-violet-700",
    headerLine: "to-violet-300/50",
    metric: "text-violet-800 bg-violet-100/80 border border-violet-300/50",
    tagDot: "bg-violet-400",
    bottomLine: "from-violet-300/0 via-violet-500/50 to-violet-300/0",
    glow: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
  },
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════════════════════
   GENAI ILLUSTRATION  —  Agentic RAG Architecture

   Technically accurate representation of a modern agentic system:

   Layer 1 (top):     User query enters
   Layer 2:           Supervisor / Orchestrator LLM — plans, routes, decides
   Layer 3:           Specialized Agents dispatched by supervisor
   Layer 4:           MCP Protocol — standardised tool interface layer
   Layer 5:           Tool Servers (Search API, Vector DB, Code Exec)
   Right column:      RAG pipeline — Docs → Chunk → Embed → Store → Retrieve
   Left feedback:     Eval loop — Faithfulness / Relevance → Corrective re-plan

   Data particles animate along the actual pipeline path.
   ═══════════════════════════════════════════════════════════════ */

function GenAIVisual() {
  /* ── colour palette — violet/purple to match brand ── */
  const C = {
    solid: "rgba(76,29,149,1)",          // violet-900
    med: "rgba(109,40,217,0.95)",        // violet-600
    light: "rgba(139,92,246,0.75)",      // violet-500
    faint: "rgba(139,92,246,0.45)",
    bg: "rgba(139,92,246,0.12)",
    particle: "rgba(124,58,237,1)",      // violet-600
    eval: "rgba(192,38,211,0.9)",        // fuchsia for eval
    evalFaint: "rgba(192,38,211,0.55)",
    rag: "rgba(6,182,212,0.95)",         // cyan for RAG pipeline
    ragFaint: "rgba(6,182,212,0.5)",
    ragBg: "rgba(6,182,212,0.1)",
  };

  /* ── vertical positions for each layer ── */
  const Y = {
    query: 22,
    supervisor: 68,
    agentRow: 142,
    mcp: 206,
    tools: 262,
    ragTop: 60,      // right-side RAG pipeline
    ragBottom: 275,
  };

  const CX = 170; // horizontal centre of main pipeline

  /* ── agents dispatched by supervisor ── */
  const agents = [
    { x: 66,  label: "Research" },
    { x: 134, label: "RAG" },
    { x: 206, label: "Code" },
    { x: 274, label: "Safety" },
  ];

  /* ── tool servers connected via MCP ── */
  const tools = [
    { x: 66,  label: "Search API" },
    { x: 170, label: "Vector DB" },
    { x: 274, label: "Code Exec" },
  ];

  /* ── RAG sub-pipeline steps (right column) ── */
  const ragSteps = [
    { y: 72,  label: "Documents" },
    { y: 112, label: "Chunk" },
    { y: 152, label: "Embed" },
    { y: 192, label: "Vector Store" },
    { y: 232, label: "Retrieve" },
    { y: 272, label: "Augment" },
  ];
  const RAG_X = 340; // x position of RAG column

  return (
    <svg viewBox="0 0 400 310" className="w-full h-auto" aria-hidden>
      <defs>
        <radialGradient id="genai-glow">
          <stop offset="0%" stopColor="rgba(139,92,246,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* arrow marker for directional flows */}
        <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.light} />
        </marker>
        <marker id="arrowSky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.rag} />
        </marker>
        <marker id="arrowEval" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.evalFaint} />
        </marker>
      </defs>

      {/* ambient glow */}
      <circle cx={CX} cy={160} r={160} fill="url(#genai-glow)" />

      {/* ════════════════════════════════════════════════════════════
         LAYER 1 — User Query
         ════════════════════════════════════════════════════════════ */}
      <rect x={CX - 36} y={Y.query - 10} width={72} height={20} rx={10}
            fill={C.bg} stroke={C.light} strokeWidth={1.5} />
      <text x={CX} y={Y.query + 4} textAnchor="middle" fontSize={7} fontWeight={700} fill={C.solid}>
        User Query
      </text>

      {/* arrow: query → supervisor */}
      <motion.line x1={CX} y1={Y.query + 12} x2={CX} y2={Y.supervisor - 18}
        stroke={C.faint} strokeWidth={1.2} strokeDasharray="3 3"
        markerEnd="url(#arrowAmber)"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* ════════════════════════════════════════════════════════════
         LAYER 2 — Supervisor / Orchestrator LLM
         The brain: receives query, plans execution, routes to agents
         ════════════════════════════════════════════════════════════ */}
      <motion.rect x={CX - 52} y={Y.supervisor - 16} width={104} height={32} rx={6}
        fill={C.bg} stroke={C.light} strokeWidth={1.8}
        animate={{ strokeOpacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={CX} y={Y.supervisor - 1} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={C.solid}>
        Supervisor LLM
      </text>
      <text x={CX} y={Y.supervisor + 9} textAnchor="middle" fontSize={5.5} fill={C.med}>
        plan → route → decide
      </text>

      {/* ════════════════════════════════════════════════════════════
         LAYER 3 — Specialized Agents
         Dispatched by supervisor, each has a role
         ════════════════════════════════════════════════════════════ */}
      {/* dispatch lines: supervisor → each agent */}
      {agents.map((a, i) => (
        <g key={`ag-${i}`}>
          <motion.line x1={CX} y1={Y.supervisor + 16} x2={a.x} y2={Y.agentRow - 14}
            stroke={C.faint} strokeWidth={1} strokeDasharray="2 3"
            animate={{ strokeDashoffset: [0, -10] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "linear" }}
          />
          {/* dispatch particle */}
          <motion.circle r={2} fill={C.particle}
            animate={{ cx: [CX, a.x], cy: [Y.supervisor + 16, Y.agentRow - 14], opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 2, delay: i * 0.6 + 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* agent node */}
          <rect x={a.x - 24} y={Y.agentRow - 12} width={48} height={24} rx={4}
            fill={C.bg} stroke={C.light} strokeWidth={1.3} />
          <text x={a.x} y={Y.agentRow + 4} textAnchor="middle" fontSize={6.5} fontWeight={700} fill={C.med}>
            {a.label}
          </text>
          <text x={a.x} y={Y.agentRow - 16} textAnchor="middle" fontSize={4.5} fill={C.light} fontWeight={600}>
            AGENT
          </text>
        </g>
      ))}

      {/* ════════════════════════════════════════════════════════════
         LAYER 4 — MCP Protocol Layer
         Standardised interface: agents don't call tools directly,
         they go through MCP which provides schema, auth, routing
         ════════════════════════════════════════════════════════════ */}
      {/* MCP protocol bar */}
      <rect x={30} y={Y.mcp - 10} width={280} height={20} rx={3}
        fill={C.bg} stroke={C.light} strokeWidth={1.3} strokeDasharray="4 2" />
      <text x={CX} y={Y.mcp + 4} textAnchor="middle" fontSize={6} fontWeight={800} fill={C.med}
        letterSpacing={4}>
        MCP PROTOCOL
      </text>
      {/* small protocol dots along the bar */}
      {[55, 95, 135, 175, 215, 255, 285].map((px, i) => (
        <motion.circle key={`mcp-dot-${i}`} cx={px} cy={Y.mcp} r={1.5} fill={C.light}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* lines: agents → MCP bar */}
      {agents.map((a, i) => (
        <motion.line key={`ag-mcp-${i}`}
          x1={a.x} y1={Y.agentRow + 14} x2={a.x} y2={Y.mcp - 12}
          stroke={C.faint} strokeWidth={1} strokeDasharray="2 2"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 2, delay: i * 0.25, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* ════════════════════════════════════════════════════════════
         LAYER 5 — Tool Servers
         Actual external capabilities exposed through MCP
         ════════════════════════════════════════════════════════════ */}
      {tools.map((t, i) => (
        <g key={`tool-${i}`}>
          <motion.line x1={t.x} y1={Y.mcp + 12} x2={t.x} y2={Y.tools - 12}
            stroke={C.faint} strokeWidth={1} strokeDasharray="2 2"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ duration: 2, delay: i * 0.35 + 0.5, repeat: Infinity, ease: "linear" }}
          />
          <rect x={t.x - 28} y={Y.tools - 10} width={56} height={18} rx={3}
            fill={C.bg} stroke={C.faint} strokeWidth={1.2} />
          <text x={t.x} y={Y.tools + 3} textAnchor="middle" fontSize={5.5} fontWeight={600} fill={C.med}>
            {t.label}
          </text>
          <text x={t.x} y={Y.tools + 14} textAnchor="middle" fontSize={4} fill={C.light} fontWeight={500}>
            SERVER
          </text>
        </g>
      ))}

      {/* ════════════════════════════════════════════════════════════
         RIGHT COLUMN — RAG Pipeline
         The actual retrieval-augmented generation flow:
         Documents → Chunk → Embed (→ vectors) → Store → Retrieve → Augment
         ════════════════════════════════════════════════════════════ */}
      {/* RAG pipeline vertical spine */}
      <motion.line x1={RAG_X} y1={ragSteps[0].y + 8} x2={RAG_X} y2={ragSteps[ragSteps.length - 1].y - 8}
        stroke={C.ragFaint} strokeWidth={1.3} strokeDasharray="3 3"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {ragSteps.map((s, i) => (
        <g key={`rag-${i}`}>
          {/* step node */}
          <circle cx={RAG_X} cy={s.y} r={8} fill={C.ragBg} stroke={C.ragFaint} strokeWidth={1.3} />
          <text x={RAG_X + 14} y={s.y + 3} fontSize={5.5} fontWeight={600} fill={C.rag}>
            {s.label}
          </text>
          {/* flowing particle down the RAG pipe */}
          {i < ragSteps.length - 1 && (
            <motion.circle r={1.8} fill={C.rag}
              animate={{
                cx: [RAG_X, RAG_X],
                cy: [s.y + 8, ragSteps[i + 1].y - 8],
                opacity: [0, 0.9, 0],
              }}
              transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </g>
      ))}

      {/* RAG column header */}
      <text x={RAG_X} y={ragSteps[0].y - 14} textAnchor="middle" fontSize={5} fontWeight={800} fill={C.rag}
        letterSpacing={2}>
        RAG PIPELINE
      </text>

      {/* Connection: Vector DB tool ↔ RAG pipeline (Store step)
          Shows that the Vector DB MCP server IS the RAG store */}
      <motion.line x1={tools[1].x + 30} y1={Y.tools} x2={RAG_X - 10} y2={ragSteps[3].y}
        stroke={C.ragFaint} strokeWidth={1} strokeDasharray="3 3"
        markerEnd="url(#arrowSky)"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />
      <text x={(tools[1].x + 30 + RAG_X - 10) / 2 - 2} y={(Y.tools + ragSteps[3].y) / 2 - 4}
        fontSize={4} fill={C.ragFaint} fontWeight={600} transform={`rotate(-25, ${(tools[1].x + 30 + RAG_X - 10) / 2 - 2}, ${(Y.tools + ragSteps[3].y) / 2 - 4})`}>
        embeddings
      </text>

      {/* Connection: RAG Retrieve → feeds augmented context back to RAG Agent */}
      <motion.line x1={RAG_X - 10} y1={ragSteps[4].y}
        x2={agents[1].x + 26} y2={Y.agentRow}
        stroke={C.ragFaint} strokeWidth={1} strokeDasharray="3 3"
        markerEnd="url(#arrowSky)"
        animate={{ strokeDashoffset: [0, 12] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <text x={(RAG_X - 10 + agents[1].x + 26) / 2 + 8} y={(ragSteps[4].y + Y.agentRow) / 2 - 3}
        fontSize={4} fill={C.ragFaint} fontWeight={600}>
        context
      </text>

      {/* ════════════════════════════════════════════════════════════
         LEFT FEEDBACK — Eval / Grounding Loop
         Output quality is evaluated (faithfulness, relevance,
         hallucination). If it fails → corrective re-plan back
         to supervisor.
         ════════════════════════════════════════════════════════════ */}
      {/* Eval node */}
      <rect x={4} y={Y.agentRow + 36} width={46} height={16} rx={3}
        fill="rgba(192,38,211,0.06)" stroke={C.evalFaint} strokeWidth={1} />
      <text x={27} y={Y.agentRow + 47} textAnchor="middle" fontSize={5} fontWeight={700} fill={C.eval}>
        EVAL
      </text>

      {/* eval criteria labels */}
      <text x={6} y={Y.agentRow + 62} fontSize={4} fill={C.evalFaint} fontWeight={500}>faithfulness</text>
      <text x={6} y={Y.agentRow + 69} fontSize={4} fill={C.evalFaint} fontWeight={500}>relevance</text>
      <text x={6} y={Y.agentRow + 76} fontSize={4} fill={C.evalFaint} fontWeight={500}>grounding</text>

      {/* line: agent output → eval */}
      <motion.line x1={agents[0].x - 24} y1={Y.agentRow + 4} x2={52} y2={Y.agentRow + 38}
        stroke={C.evalFaint} strokeWidth={1} strokeDasharray="2 3"
        animate={{ strokeDashoffset: [0, -10] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* corrective feedback arrow: eval → back up to supervisor (re-plan) */}
      <motion.path
        d={`M 18 ${Y.agentRow + 36} L 18 ${Y.supervisor + 16} L ${CX - 54} ${Y.supervisor + 8}`}
        fill="none" stroke={C.evalFaint} strokeWidth={1} strokeDasharray="3 3"
        markerEnd="url(#arrowEval)"
        animate={{ strokeDashoffset: [0, 12] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />
      <text x={10} y={Y.supervisor + 28} fontSize={3.8} fill={C.evalFaint} fontWeight={600}>
        corrective
      </text>
      <text x={10} y={Y.supervisor + 33} fontSize={3.8} fill={C.evalFaint} fontWeight={600}>
        re-plan
      </text>

      {/* ════════════════════════════════════════════════════════════
         FLOWING DATA — main pipeline pulse
         A particle that traces the full path:
         query → supervisor → agent → MCP → tool → back
         ════════════════════════════════════════════════════════════ */}
      {[0, 1, 2].map((pi) => (
        <motion.circle key={`flow-${pi}`} r={2.5} fill={C.particle}
          animate={{
            cx: [CX, CX, agents[pi].x, agents[pi].x, tools[pi < 2 ? pi : 2].x],
            cy: [Y.query, Y.supervisor, Y.agentRow, Y.mcp, Y.tools],
            opacity: [0, 0.9, 0.9, 0.7, 0],
          }}
          transition={{ duration: 4.5, delay: pi * 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ML / DL ILLUSTRATION  —  Neural Cascade
   ═══════════════════════════════════════════════════════════════ */

function MLDLVisual() {
  /* ── colour palette — violet to match brand ── */
  const C = {
    solid: "rgba(76,29,149,1)",
    med: "rgba(109,40,217,0.95)",
    light: "rgba(139,92,246,0.75)",
    faint: "rgba(139,92,246,0.45)",
    bg: "rgba(139,92,246,0.1)",
    particle: "rgba(124,58,237,1)",
    teal: "rgba(20,184,166,0.9)",
    tealFaint: "rgba(20,184,166,0.45)",
    tealBg: "rgba(20,184,166,0.08)",
    rose: "rgba(244,63,94,0.85)",
    roseFaint: "rgba(244,63,94,0.45)",
  };

  /* ── ML Lifecycle stages (left-to-right flow, then loops back) ──
     Data → Preprocess → Feature Eng → Train (with mini neural net) →
     Evaluate → Deploy → Monitor → feedback to Train
  */

  const CX = 200; // center x of the main pipeline
  const Y = {
    data: 28,
    preprocess: 72,
    features: 118,
    train: 178,
    evaluate: 240,
    deploy: 290,
  };

  /* ── Mini neural net inside the Train block ── */
  const NN_CX = 200;
  const NN_Y0 = 158;
  const nnLayers = [
    [{ x: NN_CX - 30 }, { x: NN_CX }, { x: NN_CX + 30 }],
    [{ x: NN_CX - 15 }, { x: NN_CX + 15 }],
    [{ x: NN_CX }],
  ];
  const nnYs = [NN_Y0, NN_Y0 + 20, NN_Y0 + 40];

  /* ── Data pipeline steps (left column) ── */
  const dataSteps = [
    { y: 30, label: "Tabular" },
    { y: 50, label: "Images" },
    { y: 70, label: "Text" },
  ];
  const DATA_X = 50;

  /* ── Metrics for evaluation ── */
  const metrics = [
    { label: "Accuracy", x: 280, y: Y.evaluate - 10 },
    { label: "Precision", x: 280, y: Y.evaluate + 2 },
    { label: "F1 Score", x: 280, y: Y.evaluate + 14 },
    { label: "Loss", x: 280, y: Y.evaluate + 26 },
  ];

  return (
    <svg viewBox="0 0 400 310" className="w-full h-auto" aria-hidden>
      <defs>
        <radialGradient id="ml-glow">
          <stop offset="0%" stopColor="rgba(139,92,246,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <marker id="arrowViolet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.light} />
        </marker>
        <marker id="arrowTeal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.tealFaint} />
        </marker>
        <marker id="arrowRose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.roseFaint} />
        </marker>
      </defs>

      {/* ambient glow */}
      <circle cx={CX} cy={155} r={160} fill="url(#ml-glow)" />

      {/* ════════════════════════════════════════════════════════════
         LEFT COLUMN — Raw Data Sources
         ════════════════════════════════════════════════════════════ */}
      <text x={DATA_X} y={14} textAnchor="middle" fontSize={6} fontWeight={800} fill={C.solid} letterSpacing={2}>
        DATA SOURCES
      </text>
      {dataSteps.map((s, i) => (
        <g key={`data-${i}`}>
          <rect x={DATA_X - 28} y={s.y - 9} width={56} height={18} rx={4}
            fill={C.bg} stroke={C.faint} strokeWidth={1.2} />
          <text x={DATA_X} y={s.y + 2} textAnchor="middle" fontSize={6.5} fontWeight={700} fill={C.med}>
            {s.label}
          </text>
        </g>
      ))}

      {/* Lines: data sources → preprocess */}
      {dataSteps.map((s, i) => (
        <motion.line key={`data-line-${i}`}
          x1={DATA_X + 30} y1={s.y}
          x2={CX - 52} y2={Y.preprocess}
          stroke={C.faint} strokeWidth={1} strokeDasharray="2 3"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Data particles flowing */}
      {[0, 1, 2].map((i) => (
        <motion.circle key={`dp-${i}`} r={2.5} fill={C.particle}
          animate={{
            cx: [DATA_X + 30, CX - 52],
            cy: [dataSteps[i].y, Y.preprocess],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2, delay: i * 0.8 + 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ════════════════════════════════════════════════════════════
         MAIN PIPELINE — vertical flow down the center
         ════════════════════════════════════════════════════════════ */}

      {/* ── Preprocess ── */}
      <rect x={CX - 50} y={Y.preprocess - 14} width={100} height={28} rx={5}
        fill={C.bg} stroke={C.light} strokeWidth={1.5} />
      <text x={CX} y={Y.preprocess} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={C.solid}>
        Preprocess
      </text>
      <text x={CX} y={Y.preprocess + 10} textAnchor="middle" fontSize={5.5} fill={C.med}>
        clean · normalize · split
      </text>

      {/* arrow: preprocess → features */}
      <motion.line x1={CX} y1={Y.preprocess + 16} x2={CX} y2={Y.features - 16}
        stroke={C.faint} strokeWidth={1.2} strokeDasharray="3 3"
        markerEnd="url(#arrowViolet)"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Feature Engineering ── */}
      <rect x={CX - 54} y={Y.features - 14} width={108} height={28} rx={5}
        fill={C.bg} stroke={C.light} strokeWidth={1.5} />
      <text x={CX} y={Y.features} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={C.solid}>
        Feature Eng.
      </text>
      <text x={CX} y={Y.features + 10} textAnchor="middle" fontSize={5.5} fill={C.med}>
        select · transform · embed
      </text>

      {/* Feature engineering side indicators */}
      <text x={CX + 64} y={Y.features - 5} fontSize={5.5} fill={C.light} fontWeight={700}>PCA</text>
      <text x={CX + 64} y={Y.features + 6} fontSize={5.5} fill={C.light} fontWeight={700}>TF-IDF</text>
      <text x={CX + 64} y={Y.features + 17} fontSize={5.5} fill={C.light} fontWeight={700}>Scaling</text>

      {/* arrow: features → train */}
      <motion.line x1={CX} y1={Y.features + 16} x2={CX} y2={Y.train - 32}
        stroke={C.faint} strokeWidth={1.2} strokeDasharray="3 3"
        markerEnd="url(#arrowViolet)"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* ════════════════════════════════════════════════════════════
         TRAIN BLOCK — with embedded mini neural network
         ════════════════════════════════════════════════════════════ */}
      <motion.rect x={CX - 62} y={Y.train - 30} width={124} height={60} rx={6}
        fill={C.bg} stroke={C.light} strokeWidth={1.8}
        animate={{ strokeOpacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={CX} y={Y.train - 19} textAnchor="middle" fontSize={6.5} fontWeight={800} fill={C.solid}
        letterSpacing={2}>
        MODEL TRAINING
      </text>

      {/* Mini neural network connections */}
      {nnLayers.slice(0, -1).flatMap((layer, li) =>
        layer.flatMap((node, ni) =>
          nnLayers[li + 1].map((next, nni) => (
            <line key={`nn-c-${li}-${ni}-${nni}`}
              x1={node.x} y1={nnYs[li]}
              x2={next.x} y2={nnYs[li + 1]}
              stroke="rgba(139,92,246,0.25)" strokeWidth={1}
            />
          ))
        )
      )}

      {/* Mini neural network neurons */}
      {nnLayers.flatMap((layer, li) =>
        layer.map((node, ni) => (
          <motion.circle key={`nn-n-${li}-${ni}`}
            cx={node.x} cy={nnYs[li]} r={5}
            fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.6)" strokeWidth={1.5}
            animate={{ r: [5, 6.5, 5] }}
            transition={{ duration: 2, delay: li * 0.3 + ni * 0.15, repeat: Infinity, ease: "easeInOut" }}
          />
        ))
      )}

      {/* Signal pulse through mini net */}
      {[0, 1].map((pi) => (
        <motion.circle key={`nn-sig-${pi}`} r={3} fill={C.particle}
          animate={{
            cx: [nnLayers[0][pi].x, nnLayers[1][pi < 2 ? pi : 1].x, nnLayers[2][0].x],
            cy: [nnYs[0], nnYs[1], nnYs[2]],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.5, delay: pi * 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Train block side labels */}
      <text x={CX - 70} y={Y.train - 10} fontSize={5} fill={C.light} fontWeight={700}>Epochs</text>
      <text x={CX - 70} y={Y.train + 1} fontSize={5} fill={C.light} fontWeight={700}>LR Sched</text>
      <text x={CX - 70} y={Y.train + 12} fontSize={5} fill={C.light} fontWeight={700}>Backprop</text>

      {/* arrow: train → evaluate */}
      <motion.line x1={CX} y1={Y.train + 32} x2={CX} y2={Y.evaluate - 18}
        stroke={C.faint} strokeWidth={1.2} strokeDasharray="3 3"
        markerEnd="url(#arrowViolet)"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* ════════════════════════════════════════════════════════════
         EVALUATE
         ════════════════════════════════════════════════════════════ */}
      <rect x={CX - 46} y={Y.evaluate - 15} width={92} height={30} rx={5}
        fill={C.tealBg} stroke={C.tealFaint} strokeWidth={1.5} />
      <text x={CX} y={Y.evaluate - 1} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={C.teal}>
        Evaluate
      </text>
      <text x={CX} y={Y.evaluate + 10} textAnchor="middle" fontSize={5.5} fill={C.tealFaint}>
        validate · test · compare
      </text>

      {/* Metrics panel */}
      {metrics.map((m, i) => (
        <g key={`metric-${i}`}>
          <motion.text x={m.x} y={m.y} fontSize={5.5} fontWeight={700} fill={C.teal}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {m.label}
          </motion.text>
          {/* sparkline-like bar */}
          <motion.rect x={m.x + 36} y={m.y - 5} height={4} rx={2}
            fill={C.tealFaint}
            animate={{ width: [10, 24 + i * 4, 14 + i * 2] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      ))}

      {/* Connection line: evaluate → metrics */}
      <line x1={CX + 46} y1={Y.evaluate} x2={272} y2={Y.evaluate}
        stroke={C.tealFaint} strokeWidth={1} strokeDasharray="2 2" />

      {/* arrow: evaluate → deploy */}
      <motion.line x1={CX} y1={Y.evaluate + 17} x2={CX} y2={Y.deploy - 16}
        stroke={C.tealFaint} strokeWidth={1.2} strokeDasharray="3 3"
        markerEnd="url(#arrowTeal)"
        animate={{ strokeDashoffset: [0, -12] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* ════════════════════════════════════════════════════════════
         DEPLOY / SERVE
         ════════════════════════════════════════════════════════════ */}
      <rect x={CX - 44} y={Y.deploy - 13} width={88} height={26} rx={5}
        fill={C.tealBg} stroke={C.tealFaint} strokeWidth={1.3} />
      <text x={CX} y={Y.deploy + 1} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={C.teal}>
        Deploy
      </text>
      <text x={CX} y={Y.deploy + 11} textAnchor="middle" fontSize={5.5} fill={C.tealFaint}>
        API · Batch · Edge
      </text>

      {/* ════════════════════════════════════════════════════════════
         MONITORING + FEEDBACK LOOP
         From deploy, monitor in production, then retrain if needed
         ════════════════════════════════════════════════════════════ */}
      {/* Monitor node (bottom right) */}
      <rect x={316} y={Y.deploy - 10} width={58} height={20} rx={4}
        fill="rgba(244,63,94,0.06)" stroke={C.roseFaint} strokeWidth={1.2} />
      <text x={345} y={Y.deploy + 4} textAnchor="middle" fontSize={6} fontWeight={800} fill={C.rose}>
        Monitor
      </text>
      <text x={345} y={Y.deploy + 16} textAnchor="middle" fontSize={4.5} fill={C.roseFaint} fontWeight={600}>
        drift · latency
      </text>

      {/* line: deploy → monitor */}
      <motion.line x1={CX + 46} y1={Y.deploy} x2={314} y2={Y.deploy}
        stroke={C.roseFaint} strokeWidth={1} strokeDasharray="2 3"
        animate={{ strokeDashoffset: [0, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Feedback loop: monitor → back up to train (retrain) */}
      <motion.path
        d={`M 374 ${Y.deploy - 2} L 384 ${Y.deploy - 2} L 384 ${Y.train} L ${CX + 64} ${Y.train}`}
        fill="none" stroke={C.roseFaint} strokeWidth={1} strokeDasharray="3 3"
        markerEnd="url(#arrowRose)"
        animate={{ strokeDashoffset: [0, 14] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <text x={389} y={Y.train + 40} fontSize={4.5} fill={C.rose} fontWeight={700}>
        retrain
      </text>
      <text x={389} y={Y.train + 49} fontSize={4.5} fill={C.rose} fontWeight={700}>
        loop
      </text>

      {/* ════════════════════════════════════════════════════════════
         LEFT SIDE — Hyperparameter Tuning loop
         ════════════════════════════════════════════════════════════ */}
      <rect x={4} y={Y.train + 10} width={62} height={20} rx={4}
        fill="rgba(139,92,246,0.06)" stroke={C.faint} strokeWidth={1.2} />
      <text x={35} y={Y.train + 23} textAnchor="middle" fontSize={6} fontWeight={800} fill={C.med}>
        HP Tuning
      </text>
      <text x={35} y={Y.train + 35} textAnchor="middle" fontSize={4.5} fill={C.light} fontWeight={600}>
        grid · bayesian
      </text>

      {/* HP tuning ↔ train loop */}
      <motion.path
        d={`M 35 ${Y.train + 10} L 35 ${Y.train - 16} L ${CX - 64} ${Y.train - 16}`}
        fill="none" stroke={C.faint} strokeWidth={1} strokeDasharray="2 3"
        markerEnd="url(#arrowViolet)"
        animate={{ strokeDashoffset: [0, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      {/* eval → HP tuning feedback */}
      <motion.line x1={CX - 48} y1={Y.evaluate} x2={68} y2={Y.train + 20}
        stroke={C.faint} strokeWidth={1} strokeDasharray="2 3"
        animate={{ strokeDashoffset: [0, 10] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />

      {/* ════════════════════════════════════════════════════════════
         FLOWING DATA PARTICLES — main pipeline pulse
         ════════════════════════════════════════════════════════════ */}
      {[0, 1].map((pi) => (
        <motion.circle key={`flow-ml-${pi}`} r={3} fill={C.particle}
          animate={{
            cx: [CX, CX, CX, CX, CX],
            cy: [Y.preprocess, Y.features, Y.train, Y.evaluate, Y.deploy],
            opacity: [0, 0.9, 0.9, 0.7, 0],
          }}
          transition={{ duration: 5, delay: pi * 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Deploy pulse particle */}
      <motion.circle r={2.5} fill={C.teal}
        animate={{
          cx: [CX + 46, 314, 345, 345],
          cy: [Y.deploy, Y.deploy, Y.deploy, Y.deploy],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const [expandedPres, setExpandedPres] = useState<string | null>(null);

  const genaiProjects = projects.filter((p) => p.category === "GenAI");
  const mldlProjects = projects.filter((p) => p.category === "ML/DL");

  const showGenAI = filter === "All" || filter === "GenAI";
  const showMLDL = filter === "All" || filter === "ML/DL";
  const showPres = filter === "All" || filter === "Presentations";

  const handleFilter = (v: ProjectCategory) => {
    setFilter(v);
    setExpandedPres(null);
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black"
      style={{
        background:
          "linear-gradient(175deg, #faf8ff 0%, #f5f0ff 20%, #f0eafc 42%, #ede6f9 58%, #f3eefb 76%, #f8f5ff 90%, #faf8ff 100%)",
      }}
    >
      {/* ── dot grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(108,72,197,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── ambient glows ── */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-[32rem] w-[32rem] rounded-full bg-amber-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-8%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-violet-200/35 blur-[120px]" />
      <div className="pointer-events-none absolute top-[40%] left-[55%] h-80 w-80 -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-[15%] right-[12%] h-64 w-64 rounded-full bg-sky-200/20 blur-[80px]" />

      {/* ── floating accents ── */}
      <motion.div
        className="pointer-events-none absolute top-24 right-[12%] w-2.5 h-2.5 rounded-full bg-amber-400/40"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-[38%] left-[5%] w-2 h-2 rounded-full bg-violet-400/25"
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[22%] right-[8%] w-2 h-2 rounded-full bg-amber-300/25"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-[65%] left-[18%] w-1.5 h-1.5 rounded-full bg-violet-400/20"
        animate={{ y: [5, -5, 5], x: [-3, 3, -3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-6xl relative">
        {/* ── header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10"
        >
          {/* editorial top line */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-primary/60">
              Portfolio
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-brand-primary/20 to-transparent" />
          </div>

          {/* large display title */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark font-[family-name:var(--font-heading)] leading-[1.05] tracking-tight">
                Projects
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-500 font-[family-name:var(--font-display)] italic">
                A selection of AI/ML and GenAI projects demonstrating end-to-end engineering
              </p>
            </div>

            {/* filter tabs — right-aligned on desktop */}
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleFilter(tab.value)}
                  className="relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer"
                >
                  {filter === tab.value && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 rounded-full bg-brand-dark shadow-lg shadow-brand-primary/15"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10",
                      filter === tab.value
                        ? "text-white"
                        : "text-brand-dark/50 hover:text-brand-dark/80"
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* gradient accent bar */}
          <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-brand-primary/25 via-violet-300/20 to-transparent" />
        </motion.div>

        {/* ── category hubs ──────────────────────────────────── */}
        <div key={filter}>
          {/* ═══ GenAI Hub ═══ */}
          {showGenAI && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-28"
            >
              {/* section header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/50" />
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/50 shadow-sm shadow-amber-200/30">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <h3 className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-amber-700 font-[family-name:var(--font-heading)]">
                    Generative AI
                  </h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/50" />
              </div>

              {filter === "GenAI" ? (
                /* ── sidebar: projects left | illustration right (vertically centered) ── */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
                  <div className="lg:col-span-7 order-2 lg:order-1">
                    {genaiProjects.map((p, i) => (
                      <ProjectEntry
                        key={p.title}
                        project={p}
                        colors={CAT.GenAI}
                        delay={i * 0.12}
                        index={i}
                      />
                    ))}
                  </div>
                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <div className="relative max-w-[440px] mx-auto">
                      <div className="absolute inset-[-10%] rounded-full bg-violet-200/30 blur-2xl pointer-events-none" />
                      <div className="relative">
                        <GenAIVisual />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── centered: illustration top, projects below ── */
                <>
                  <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-[540px]">
                      <div className="absolute inset-[-10%] rounded-full bg-violet-200/30 blur-2xl pointer-events-none" />
                      <div className="relative">
                        <GenAIVisual />
                      </div>
                    </div>
                  </div>
                  <div className="max-w-4xl mx-auto">
                    {genaiProjects.map((p, i) => (
                      <ProjectEntry
                        key={p.title}
                        project={p}
                        colors={CAT.GenAI}
                        delay={i * 0.12}
                        index={i}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ═══ ML / DL Hub ═══ */}
          {showMLDL && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-20"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-400/50" />
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-300/50 shadow-sm shadow-violet-200/30">
                  <span className="h-2 w-2 rounded-full bg-violet-500" />
                  <h3 className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-violet-700 font-[family-name:var(--font-heading)]">
                    Machine Learning &amp; Deep Learning
                  </h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-violet-400/50" />
              </div>

              {filter === "ML/DL" ? (
                /* ── center layout: projects left | illustration center (sticky) | projects right ── */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left projects */}
                  <div className="lg:col-span-4 order-2 lg:order-1">
                    {mldlProjects.slice(0, Math.ceil(mldlProjects.length / 2)).map((p, i) => (
                      <ProjectEntry
                        key={p.title}
                        project={p}
                        colors={CAT["ML/DL"]}
                        delay={i * 0.08}
                        index={i}
                      />
                    ))}
                  </div>
                  {/* Center illustration */}
                  <div className="lg:col-span-4 order-1 lg:order-2">
                    <div className="relative max-w-[340px] mx-auto">
                      <div className="absolute inset-[-10%] rounded-full bg-violet-200/40 blur-2xl pointer-events-none" />
                      <div className="relative">
                        <MLDLVisual />
                      </div>
                    </div>
                  </div>
                  {/* Right projects */}
                  <div className="lg:col-span-4 order-3">
                    {mldlProjects.slice(Math.ceil(mldlProjects.length / 2)).map((p, i) => (
                      <ProjectEntry
                        key={p.title}
                        project={p}
                        colors={CAT["ML/DL"]}
                        delay={(i + Math.ceil(mldlProjects.length / 2)) * 0.08}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* ── centered: illustration top, projects below ── */
                <>
                  <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-[400px]">
                      <div className="absolute inset-[-10%] rounded-full bg-violet-200/40 blur-2xl pointer-events-none" />
                      <div className="relative">
                        <MLDLVisual />
                      </div>
                    </div>
                  </div>
                  <div className="max-w-4xl mx-auto">
                    {mldlProjects.map((p, i) => (
                      <ProjectEntry
                        key={p.title}
                        project={p}
                        colors={CAT["ML/DL"]}
                        delay={i * 0.08}
                        index={i}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ═══ Presentations ═══ */}
          {showPres && presentations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/50" />
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/50 shadow-sm shadow-amber-200/30">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <h3 className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-amber-700 font-[family-name:var(--font-heading)]">
                    Presentations
                  </h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/50" />
              </div>

              <div className="max-w-2xl mx-auto">
                {presentations.map((pres) => (
                  <div key={pres.title} className="group">
                    {/* title + link */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-amber-600 mb-1">
                          <FileText size={11} />
                          Presentation
                        </span>
                        <h4 className="text-lg font-bold font-[family-name:var(--font-heading)] text-brand-dark group-hover:text-brand-primary transition-colors duration-200">
                          {pres.title}
                        </h4>
                      </div>
                      <a
                        href={pres.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 shrink-0 flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-brand-primary transition-all duration-200"
                        aria-label={`View ${pres.title} PDF`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    </div>

                    <p className="text-sm leading-relaxed text-gray-600 mb-3">
                      {pres.description}
                    </p>

                    {/* expandable highlights */}
                    <button
                      onClick={() =>
                        setExpandedPres(
                          expandedPres === pres.title ? null : pres.title
                        )
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer mb-2"
                    >
                      Key Highlights
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          expandedPres === pres.title && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedPres === pres.title && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mb-3 space-y-1.5 overflow-hidden"
                        >
                          {pres.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-xs text-gray-600"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                              {h}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    {/* tags */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {pres.tags.map((tag, j) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 text-[11px] text-gray-500 font-medium"
                        >
                          {j > 0 && (
                            <span className="h-[3px] w-[3px] rounded-full bg-amber-400" />
                          )}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT ENTRY  —  editorial, no-card display
   ═══════════════════════════════════════════════════════════════ */

function ProjectEntry({
  project,
  colors,
  delay,
  index,
}: {
  project: (typeof projects)[number];
  colors: (typeof CAT)[keyof typeof CAT];
  delay: number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="group relative pl-5 py-8 first:pt-0 last:pb-2"
    >
      {/* left accent — appears on hover */}
      <div
        className={cn(
          "absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          colors.bottomLine
        )}
      />

      {/* separator between entries */}
      {index > 0 && (
        <div className="absolute top-0 left-5 right-0 h-px bg-gradient-to-r from-brand-primary/15 via-gray-300/30 to-transparent" />
      )}

      {/* active-development badge */}
      {project.status === "active" && (
        <div className="mb-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300/60 shadow-sm shadow-emerald-100/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700">
            In Active Development
          </span>
        </div>
      )}

      {/* title + GitHub link */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold font-[family-name:var(--font-heading)] text-brand-dark group-hover:text-brand-primary transition-colors duration-200 leading-tight">
          {project.title}
        </h4>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 mt-1 inline-flex items-center gap-1.5 rounded-md border border-brand-primary/30 bg-brand-primary/[0.06] px-2.5 py-1.5 text-[11px] font-semibold text-brand-primary hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-200"
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>

      {/* description */}
      <p className="text-[15px] sm:text-base leading-relaxed text-gray-600 mb-4">
        {project.description}
      </p>

      {/* metrics */}
      <div className="flex flex-wrap gap-2 mb-3.5">
        {project.metrics.map((m) => (
          <span
            key={m}
            className={cn(
              "text-xs font-bold px-2.5 py-1 rounded-md",
              colors.metric
            )}
          >
            {m}
          </span>
        ))}
      </div>

      {/* tags */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {project.tags.map((tag, j) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 text-xs text-gray-500 font-medium"
          >
            {j > 0 && (
              <span
                className={cn("h-1 w-1 rounded-full", colors.tagDot)}
              />
            )}
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
