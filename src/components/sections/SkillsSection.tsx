"use client";

import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { skillCategories, certifications } from "@/lib/data";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const;

const BANDS = [
  {
    angle: "-rotate-[2deg]",
    bg: "bg-gradient-to-r from-violet-100/80 via-violet-50/70 to-violet-100/80",
    pill: "bg-white/90 text-violet-800 border-violet-300/60 shadow-violet-100/50",
    watermark: "text-violet-300/[0.06]",
    label: "text-violet-600",
    dot: "bg-violet-500",
    speed: 38,
  },
  {
    angle: "rotate-[1.5deg]",
    bg: "bg-gradient-to-r from-fuchsia-100/70 via-fuchsia-50/60 to-fuchsia-100/70",
    pill: "bg-white/90 text-fuchsia-800 border-fuchsia-300/60 shadow-fuchsia-100/50",
    watermark: "text-fuchsia-300/[0.06]",
    label: "text-fuchsia-600",
    dot: "bg-fuchsia-500",
    speed: 42,
    reverse: true,
  },
  {
    angle: "-rotate-[1deg]",
    bg: "bg-gradient-to-r from-teal-100/70 via-teal-50/60 to-teal-100/70",
    pill: "bg-white/90 text-teal-800 border-teal-300/60 shadow-teal-100/50",
    watermark: "text-teal-300/[0.06]",
    label: "text-teal-600",
    dot: "bg-teal-500",
    speed: 34,
  },
  {
    angle: "rotate-[1.5deg]",
    bg: "bg-gradient-to-r from-sky-100/70 via-sky-50/60 to-sky-100/70",
    pill: "bg-white/90 text-sky-800 border-sky-300/60 shadow-sky-100/50",
    watermark: "text-sky-300/[0.06]",
    label: "text-sky-600",
    dot: "bg-sky-500",
    speed: 40,
    reverse: true,
  },
  {
    angle: "-rotate-[2deg]",
    bg: "bg-gradient-to-r from-amber-100/70 via-amber-50/60 to-amber-100/70",
    pill: "bg-white/90 text-amber-800 border-amber-300/60 shadow-amber-100/50",
    watermark: "text-amber-300/[0.06]",
    label: "text-amber-600",
    dot: "bg-amber-500",
    speed: 36,
  },
];

const CERT_THEMES = [
  {
    sealStroke: "rgba(245,158,11,0.5)",
    sealFill: "rgba(251,191,36,0.08)",
    sealCheck: "rgba(217,119,6,0.7)",
    ribbonColor: "rgba(245,158,11,0.35)",
    accent: "from-amber-400 to-orange-500",
    titleColor: "text-amber-900",
    issuerColor: "text-amber-600/70",
    parchment: "linear-gradient(145deg, #fef9f0 0%, #fdf4e7 40%, #fcecd8 100%)",
    frame: "rgba(217,119,6,0.18)",
    dots: "rgba(217,119,6,0.08)",
    shadow: "rgba(217,119,6,0.12)",
  },
  {
    sealStroke: "rgba(139,92,246,0.5)",
    sealFill: "rgba(139,92,246,0.08)",
    sealCheck: "rgba(109,40,217,0.7)",
    ribbonColor: "rgba(139,92,246,0.35)",
    accent: "from-violet-400 to-purple-600",
    titleColor: "text-violet-900",
    issuerColor: "text-violet-600/70",
    parchment: "linear-gradient(145deg, #f9f5ff 0%, #f3edff 40%, #ede5ff 100%)",
    frame: "rgba(139,92,246,0.18)",
    dots: "rgba(139,92,246,0.07)",
    shadow: "rgba(139,92,246,0.12)",
  },
  {
    sealStroke: "rgba(20,184,166,0.5)",
    sealFill: "rgba(20,184,166,0.08)",
    sealCheck: "rgba(13,148,136,0.7)",
    ribbonColor: "rgba(20,184,166,0.35)",
    accent: "from-teal-400 to-emerald-500",
    titleColor: "text-teal-900",
    issuerColor: "text-teal-600/70",
    parchment: "linear-gradient(145deg, #f0fdf6 0%, #e6f9ed 40%, #dcf5e4 100%)",
    frame: "rgba(20,184,166,0.18)",
    dots: "rgba(20,184,166,0.07)",
    shadow: "rgba(20,184,166,0.12)",
  },
];

/* ═══════════════════════════════════════════════════════════════
   CATEGORY ILLUSTRATIONS — small animated SVGs per domain
   ═══════════════════════════════════════════════════════════════ */

function CodeIllust() {
  return (
    <svg viewBox="0 0 70 70" className="w-14 h-14 sm:w-18 sm:h-18" aria-hidden>
      <rect x={5} y={8} width={60} height={52} rx={5} fill="rgba(139,92,246,0.06)" stroke="rgba(139,92,246,0.5)" strokeWidth={1.5} />
      <circle cx={13} cy={15} r={2} fill="rgba(139,92,246,0.7)" />
      <circle cx={20} cy={15} r={2} fill="rgba(139,92,246,0.5)" />
      <circle cx={27} cy={15} r={2} fill="rgba(139,92,246,0.35)" />
      <line x1={5} y1={21} x2={65} y2={21} stroke="rgba(139,92,246,0.25)" strokeWidth={0.8} />
      <line x1={14} y1={29} x2={42} y2={29} stroke="rgba(139,92,246,0.4)" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={20} y1={37} x2={50} y2={37} stroke="rgba(139,92,246,0.3)" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={20} y1={45} x2={38} y2={45} stroke="rgba(139,92,246,0.22)" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={14} y1={53} x2={30} y2={53} stroke="rgba(139,92,246,0.16)" strokeWidth={2.5} strokeLinecap="round" />
      <motion.rect
        x={32} y={50} width={2} height={9} rx={1}
        fill="rgba(139,92,246,0.85)"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}

function BrainIllust() {
  const nodes = [
    { cx: 35, cy: 12, r: 5 },
    { cx: 12, cy: 28, r: 4 },
    { cx: 58, cy: 28, r: 4 },
    { cx: 22, cy: 50, r: 4.5 },
    { cx: 48, cy: 50, r: 4.5 },
    { cx: 35, cy: 64, r: 3.5 },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 4], [2, 3], [0, 5],
  ];
  return (
    <svg viewBox="0 0 70 70" className="w-14 h-14 sm:w-18 sm:h-18" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(236,72,153,0.3)" strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.cx} cy={n.cy} r={n.r}
          fill="rgba(236,72,153,0.15)" stroke="rgba(236,72,153,0.6)" strokeWidth={1.2}
          animate={{ r: [n.r, n.r + 1.5, n.r] }}
          transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.circle
        r={2.5} fill="rgba(236,72,153,0.85)"
        animate={{ cx: [35, 12, 22, 35], cy: [12, 28, 50, 64], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function DataIllust() {
  return (
    <svg viewBox="0 0 70 70" className="w-14 h-14 sm:w-18 sm:h-18" aria-hidden>
      <ellipse cx={35} cy={18} rx={22} ry={9} fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.55)" strokeWidth={1.2} />
      <rect x={13} y={18} width={44} height={32} fill="rgba(20,184,166,0.06)" />
      <line x1={13} y1={18} x2={13} y2={50} stroke="rgba(20,184,166,0.55)" strokeWidth={1.2} />
      <line x1={57} y1={18} x2={57} y2={50} stroke="rgba(20,184,166,0.55)" strokeWidth={1.2} />
      <ellipse cx={35} cy={34} rx={22} ry={9} fill="none" stroke="rgba(20,184,166,0.3)" strokeWidth={0.8} />
      <ellipse cx={35} cy={50} rx={22} ry={9} fill="rgba(20,184,166,0.06)" stroke="rgba(20,184,166,0.55)" strokeWidth={1.2} />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i} r={1.8} fill="rgba(20,184,166,0.85)"
          animate={{ cx: [22 + i * 13, 22 + i * 13], cy: [58, 8], opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function CloudIllust() {
  return (
    <svg viewBox="0 0 70 70" className="w-14 h-14 sm:w-18 sm:h-18" aria-hidden>
      <path
        d="M14 46 C14 46 8 46 8 38 C8 31 14 27 20 27 C20 18 28 12 36 12 C44 12 52 18 52 27 C58 27 64 31 64 38 C64 46 58 46 58 46 Z"
        fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.55)" strokeWidth={1.2}
      />
      <rect x={20} y={32} width={12} height={9} rx={2} fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.45)" strokeWidth={0.8} />
      <rect x={38} y={32} width={12} height={9} rx={2} fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.35)" strokeWidth={0.8} />
      <motion.g animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <line x1={36} y1={60} x2={36} y2={50} stroke="rgba(14,165,233,0.7)" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M31 54 L36 49 L41 54" fill="none" stroke="rgba(14,165,233,0.7)" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

function ToolsIllust() {
  return (
    <svg viewBox="0 0 70 70" className="w-14 h-14 sm:w-18 sm:h-18" aria-hidden>
      <motion.circle
        cx={35} cy={35} r={14}
        fill="none" stroke="rgba(245,158,11,0.45)" strokeWidth={1.5} strokeDasharray="4 3"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "35px 35px" }}
      />
      <circle cx={35} cy={35} r={7} fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.55)" strokeWidth={1} />
      <circle cx={35} cy={35} r={2} fill="rgba(245,158,11,0.7)" />
      <rect x={8} y={8} width={20} height={16} rx={3} fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.45)" strokeWidth={1} />
      <circle cx={13} cy={13} r={1.2} fill="rgba(245,158,11,0.6)" />
      <line x1={12} y1={18} x2={22} y2={18} stroke="rgba(245,158,11,0.35)" strokeWidth={1.5} strokeLinecap="round" />
      {[[50, 10], [57, 10], [64, 10], [50, 17], [57, 17], [64, 17]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.35)" strokeWidth={0.6} />
      ))}
      <line x1={15} y1={52} x2={28} y2={65} stroke="rgba(245,158,11,0.45)" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={15} y1={62} x2={22} y2={55} stroke="rgba(245,158,11,0.3)" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

const ILLUSTRATIONS = [CodeIllust, BrainIllust, DataIllust, CloudIllust, ToolsIllust];

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATION SEAL — decorative medallion SVG
   ═══════════════════════════════════════════════════════════════ */

function CertSeal({ stroke, fill, check, ribbon }: {
  stroke: string;
  fill: string;
  check: string;
  ribbon: string;
}) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 sm:w-24 sm:h-24" aria-hidden>
      {/* outer rotating dashed ring */}
      <motion.circle
        cx={40} cy={36} r={28}
        fill="none" stroke={stroke} strokeWidth={1.5} strokeDasharray="5 4"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "40px 36px" }}
      />
      {/* inner ring */}
      <circle cx={40} cy={36} r={20} fill={fill} stroke={stroke} strokeWidth={1.2} />
      {/* ribbon tails */}
      <line x1={28} y1={58} x2={34} y2={50} stroke={ribbon} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={52} y1={58} x2={46} y2={50} stroke={ribbon} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={26} y1={64} x2={34} y2={50} stroke={ribbon} strokeWidth={2} strokeLinecap="round" />
      <line x1={54} y1={64} x2={46} y2={50} stroke={ribbon} strokeWidth={2} strokeLinecap="round" />
      {/* check mark */}
      <motion.path
        d="M30 36 L37 43 L52 28"
        fill="none" stroke={check} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILL MARQUEE BAND — category header + scrolling ribbon
   ═══════════════════════════════════════════════════════════════ */

function SkillBand({
  category,
  index,
}: {
  category: (typeof skillCategories)[number];
  index: number;
}) {
  const band = BANDS[index % BANDS.length];
  const Illust = ILLUSTRATIONS[index % ILLUSTRATIONS.length];

  return (
    <div>
      {/* ── category header with illustration ── */}
      <div className="flex items-center gap-5 mb-4 px-2">
        <div className="shrink-0">
          <Illust />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", band.dot)} />
            <h3
              className={cn(
                "text-xl sm:text-2xl font-extrabold font-[family-name:var(--font-heading)] tracking-wide",
                band.label
              )}
            >
              {category.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 ml-[20px]">
            {category.skills.length} technologies
          </p>
        </div>
      </div>

      {/* ── skill pills — wrapped, no outer card ── */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 pl-2">
        {category.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: si * 0.04, ease: EASE }}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap",
              "transition-all duration-200 cursor-default",
              "hover:scale-105 hover:shadow-md hover:z-10 hover:-translate-y-0.5",
              band.pill
            )}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATION FLIP CARD — parchment diploma style + 3D flip
   ═══════════════════════════════════════════════════════════════ */

function CertFlipCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = CERT_THEMES[index % CERT_THEMES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: EASE }}
      className="w-full"
    >
      <div
        className="group h-[300px] sm:h-[340px]"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* card wrapper — warm shadow + hover lift */}
        <div
          className="relative w-full h-full rounded-2xl transition-all duration-500 hover:-translate-y-1"
          style={{ boxShadow: `0 4px 20px ${theme.shadow}, 0 1px 4px rgba(0,0,0,0.04)` }}
        >
          {/* inner card that flips */}
          <div
            className="relative w-full h-full transition-transform duration-700 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* ── FRONT — parchment diploma ── */}
            <div
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl"
              style={{ backfaceVisibility: "hidden", background: theme.parchment }}
            >
              {/* subtle dot texture — gives it richness */}
              <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  backgroundImage: `radial-gradient(circle, ${theme.dots} 0.5px, transparent 0.5px)`,
                  backgroundSize: "10px 10px",
                }}
              />

              {/* inner decorative frame */}
              <div
                className="absolute inset-3 sm:inset-4 rounded-xl pointer-events-none"
                style={{ border: `1px solid ${theme.frame}` }}
              />

              {/* accent strip at top */}
              <div className={cn("h-1 w-full bg-gradient-to-r", theme.accent)} />

              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 sm:p-8 text-center relative">
                {/* decorative seal */}
                <CertSeal
                  stroke={theme.sealStroke}
                  fill={theme.sealFill}
                  check={theme.sealCheck}
                  ribbon={theme.ribbonColor}
                />

                {/* title & issuer */}
                <div>
                  <p className={cn("text-base font-bold leading-snug font-[family-name:var(--font-heading)]", theme.titleColor)}>
                    {cert.title}
                  </p>
                  <p className={cn("mt-1.5 text-xs font-medium", theme.issuerColor)}>
                    {cert.issuer}
                  </p>
                </div>

                {/* hover hint */}
                <span className="mt-auto flex items-center gap-1.5 text-[10px] font-medium text-gray-300 group-hover:text-gray-500 transition-colors">
                  <MousePointerClick size={12} />
                  Hover to view certificate
                </span>
              </div>
            </div>

            {/* ── BACK — certificate image ── */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl bg-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className={cn("h-1 w-full bg-gradient-to-r", theme.accent)} />
              <img
                src={cert.certificateImage}
                alt={`${cert.title} Certificate`}
                className="h-full w-full object-contain p-3"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative lg:min-h-screen flex items-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-black"
      style={{
        background:
          "linear-gradient(175deg, #faf8f5 0%, #f3eff0 25%, #eeeaf2 50%, #f0ece6 75%, #f7f4f0 100%)",
      }}
    >
      {/* ── subtle color washes ── */}
      <div className="pointer-events-none absolute -top-24 right-10 h-96 w-96 rounded-full bg-violet-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 -left-20 h-80 w-80 rounded-full bg-fuchsia-100/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-72 w-72 rounded-full bg-amber-100/15 blur-[100px]" />

      {/* ── floating accents (fewer, subtler) ── */}
      <motion.div
        className="pointer-events-none absolute top-20 left-[10%] w-2.5 h-2.5 rounded-full bg-violet-400/20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-[55%] right-[12%] w-2 h-2 rounded-full bg-amber-400/15"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[25%] left-[8%] w-2 h-2 rounded-full bg-teal-400/15"
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-6xl relative">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-lavender-500/60">
              Expertise
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-lavender-300/50 to-transparent" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark font-[family-name:var(--font-heading)] leading-[1.05] tracking-tight">
                Skills & Certifications
              </h2>
            </div>
          </div>

          <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-lavender-300/50 via-gray-300/30 to-transparent" />
        </motion.div>

        {/* ── CERTIFICATIONS ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14"
        >
          {/* cert cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {certifications.map((cert, i) => (
              <CertFlipCard key={cert.title} cert={cert} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── SKILLS — header + ribbon per category ────────── */}
        <div className="mt-24 space-y-8 sm:space-y-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <SkillBand category={cat} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
