"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  CloudSun,
  ArrowRightLeft,
  BookOpen,
  ShieldCheck,
  Calculator,
  ArrowUpRight,
} from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { featuredProject } from "@/lib/data";

/* Each capability shown as a real user prompt — question + annotation */
const prompts = [
  {
    question:
      "What\u2019s the current dew point spread in Miami and should I expect radiation fog by tomorrow morning?",
    Icon: CloudSun,
    label: "Real-time",
    color: "text-sky-400",
    bg: "bg-sky-400",
    glow: "shadow-sky-500/20",
    gradient: "from-sky-400 to-cyan-300",
  },
  {
    question:
      "I\u2019m choosing between Denver and Seattle for a weekend hike \u2014 compare trail-level conditions and precipitation risk for both.",
    Icon: ArrowRightLeft,
    label: "Compare",
    color: "text-violet-400",
    bg: "bg-violet-400",
    glow: "shadow-violet-500/20",
    gradient: "from-violet-400 to-purple-300",
  },
  {
    question:
      "Why has the jet stream displaced so far south this winter, and how does that connect to the record snowfall across the Gulf states?",
    Icon: BookOpen,
    label: "Research",
    color: "text-emerald-400",
    bg: "bg-emerald-400",
    glow: "shadow-emerald-500/20",
    gradient: "from-emerald-400 to-teal-300",
  },
  {
    question:
      "I\u2019m driving Chicago to Nashville overnight \u2014 flag any severe cells, ice advisories, or visibility hazards along I-65.",
    Icon: ShieldCheck,
    label: "Safety",
    color: "text-amber-400",
    bg: "bg-amber-400",
    glow: "shadow-amber-500/20",
    gradient: "from-amber-400 to-orange-300",
  },
  {
    question:
      "Pressure dropped 24 hPa in 12 hours at this station \u2014 compute the deepening rate and tell me if this qualifies as bombogenesis.",
    Icon: Calculator,
    label: "Compute",
    color: "text-rose-400",
    bg: "bg-rose-400",
    glow: "shadow-rose-500/20",
    gradient: "from-rose-400 to-pink-300",
  },
];

/* Word-cascade animation — each word fades up in sequence */
const cascadeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};
const cascadeWord = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
};


/* ─── Interactive terminal component ─── */
function AskAnythingTerminal() {
  const p = featuredProject;
  const [active, setActive] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % prompts.length);
  }, []);

  /* Auto-cycle every 5.5s until user clicks a tab */
  useEffect(() => {
    if (userInteracted) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [userInteracted, next]);

  const current = prompts[active];
  const highlight = p.highlights[active];

  return (
    <AnimateOnScroll>
      <div className="relative">
        {/* Ambient glow behind the panel */}
        <div
          className={`absolute -inset-4 rounded-[2rem] blur-2xl opacity-30 transition-all duration-700 bg-gradient-to-br ${current.gradient}`}
        />

        {/* Panel — deep warm amber-brown to harmonize with orange/rose section */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#2e2318] via-[#3a2d20] to-[#2b2015] border border-orange-300/[0.12] overflow-hidden shadow-2xl shadow-amber-900/15">
          {/* Dot grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top bar — header + window chrome */}
          <div className="relative px-5 sm:px-6 pt-6 pb-4 border-b border-orange-200/[0.10]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1 font-[family-name:var(--font-heading)]">
                  Ask Anything
                </p>
                <p className="text-[13px] text-white/55">
                  Real questions. Real-time answers.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
            </div>
          </div>

          {/* Tab pills */}
          <div className="relative px-5 sm:px-6 pt-5 pb-2">
            <div className="flex flex-wrap gap-2">
              {prompts.map((prompt, i) => (
                <button
                  key={prompt.label}
                  onClick={() => {
                    setActive(i);
                    setUserInteracted(true);
                  }}
                  className={`
                    group/tab relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5
                    text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer
                    font-[family-name:var(--font-heading)]
                    ${
                      active === i
                        ? `bg-gradient-to-r ${prompt.gradient} text-white shadow-lg ${prompt.glow}`
                        : "bg-white/[0.10] text-white/55 hover:text-white/80 hover:bg-white/[0.16]"
                    }
                  `}
                >
                  <prompt.Icon size={12} />
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question display area */}
          <div className="relative px-5 sm:px-8 pt-6 pb-8 h-[280px] sm:h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Prompt symbol + question with word cascade */}
                <div className="flex gap-3 items-start">
                  <span className={`shrink-0 mt-1.5 text-sm font-bold font-[family-name:var(--font-heading)] ${current.color}`}>
                    &#x276F;
                  </span>
                  <motion.p
                    className="text-lg sm:text-xl lg:text-[1.35rem] font-medium text-white/95 leading-relaxed lg:leading-[1.8] font-[family-name:var(--font-display)] italic"
                    initial="hidden"
                    animate="visible"
                    variants={cascadeContainer}
                  >
                    {current.question.split(" ").map((word, wi) => (
                      <motion.span
                        key={wi}
                        variants={cascadeWord}
                        className="inline-block mr-[0.28em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                    {/* Blinking cursor */}
                    <motion.span
                      className={`inline-block w-[2px] h-5 ${current.bg} ml-1 align-middle`}
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </motion.p>
                </div>

                {/* Capability annotation */}
                <motion.div
                  className="mt-6 ml-7 flex flex-col gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {/* Row 1: number + label */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-[3px] w-6 shrink-0 rounded-full bg-gradient-to-r ${current.gradient}`}
                    />
                    <span className={`text-sm font-bold ${current.color} font-[family-name:var(--font-heading)]`}>
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/40">&middot;</span>
                    <span className="text-sm font-bold text-white/90 font-[family-name:var(--font-heading)]">
                      {highlight.label}
                    </span>
                  </div>
                  {/* Row 2: detail */}
                  <p className="text-[13px] text-white/65 leading-relaxed pl-[3.25rem]">
                    {highlight.detail}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots at bottom */}
            <div className="flex justify-center gap-1.5 mt-6">
              {prompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setUserInteracted(true);
                  }}
                  className="p-1 cursor-pointer"
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${
                      active === i
                        ? `w-6 bg-gradient-to-r ${prompt.gradient}`
                        : "w-1.5 bg-white/25 hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export default function FeaturedProject() {
  const p = featuredProject;

  /* Split snippet at first sentence boundary for large/small display */
  const firstDot = p.linkedinPost.snippet.indexOf(".");
  const snippetLead = p.linkedinPost.snippet.slice(0, firstDot + 1);
  const snippetTail = p.linkedinPost.snippet.slice(firstDot + 2);

  return (
    <section
      id="featured"
      className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8 border-b-2 border-black"
    >
      {/* ── Warm sunset atmospheric gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(148deg, #fca5a5 0%, #fb923c 14%, #fcd34d 30%, #fef9c3 48%, #ffffff 60%, #d1fae5 74%, #a5f3fc 88%, #bae6fd 100%)",
        }}
      />

      {/* ── Warm atmospheric blobs ── */}
      <div className="pointer-events-none absolute -top-20 right-[5%] h-[28rem] w-[28rem] rounded-full bg-orange-300/25 blur-3xl animate-mesh-drift-1" />
      <div className="pointer-events-none absolute bottom-[-5%] left-[5%] h-[24rem] w-[24rem] rounded-full bg-amber-300/22 blur-3xl animate-mesh-drift-2" />
      <div className="pointer-events-none absolute top-[35%] left-[25%] h-80 w-80 rounded-full bg-rose-200/28 blur-3xl animate-mesh-drift-3" />
      <div className="pointer-events-none absolute bottom-[25%] right-[20%] h-72 w-72 rounded-full bg-teal-200/20 blur-3xl animate-mesh-drift-1" />
      <div className="pointer-events-none absolute top-[10%] left-[10%] h-64 w-64 rounded-full bg-red-200/15 blur-3xl animate-mesh-drift-2" />
      <div className="pointer-events-none absolute top-[65%] right-[35%] h-52 w-52 rounded-full bg-cyan-200/15 blur-3xl animate-mesh-drift-3" />

      {/* ── Temperature isotherms (full-width animated SVG) ── */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -80 110 C 180 90, 380 145, 620 120 S 900 70, 1130 100 S 1350 130, 1520 110"
          stroke="#ef4444" strokeWidth="1.6" strokeDasharray="8 7" opacity="0.28"
          className="animate-isobar-flow"
        />
        <path
          d="M -80 230 C 160 205, 390 265, 640 238 S 910 175, 1130 212 S 1340 248, 1520 228"
          stroke="#f97316" strokeWidth="1.4" strokeDasharray="10 9" opacity="0.23"
          className="animate-isobar-flow" style={{ animationDelay: "-6s" }}
        />
        <path
          d="M -80 355 C 210 330, 460 385, 710 358 S 970 305, 1180 338 S 1370 368, 1520 352"
          stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="6 11" opacity="0.19"
          className="animate-isobar-flow" style={{ animationDelay: "-12s" }}
        />
        <path
          d="M -80 470 C 270 450, 520 505, 780 480 S 1040 425, 1255 460 S 1400 488, 1520 470"
          stroke="#fbbf24" strokeWidth="1" strokeDasharray="12 9" opacity="0.15"
          className="animate-isobar-flow" style={{ animationDelay: "-4s" }}
        />
        <path
          d="M -80 540 C 310 520, 570 562, 830 540 S 1085 500, 1295 532 S 1415 550, 1520 538"
          stroke="#34d399" strokeWidth="0.8" strokeDasharray="5 12" opacity="0.13"
          className="animate-isobar-flow" style={{ animationDelay: "-9s" }}
        />
        {/* Temperature labels */}
        <text x="14" y="107" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.48">32°C</text>
        <text x="14" y="227" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.40">28°C</text>
        <text x="14" y="351" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.34">24°C</text>
      </svg>

      {/* ── Sun rays SVG — top-left corner ── */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-[280px] h-[280px] opacity-[0.25] hidden lg:block">
        <svg viewBox="-140 -140 280 280" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="55" stroke="#fbbf24" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="38" stroke="#fbbf24" strokeWidth="0.7" fill="none" opacity="0.6" />
          {/* Short radial ticks (12) */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
            const r = Math.PI / 180;
            const x1 = Math.round(Math.cos(deg * r) * 62 * 100) / 100;
            const y1 = Math.round(Math.sin(deg * r) * 62 * 100) / 100;
            const x2 = Math.round(Math.cos(deg * r) * 80 * 100) / 100;
            const y2 = Math.round(Math.sin(deg * r) * 80 * 100) / 100;
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" opacity="0.65" />;
          })}
          {/* Long rays at cardinal / 45° */}
          {[0,45,90,135,180,225,270,315].map((deg) => {
            const r = Math.PI / 180;
            const x1 = Math.round(Math.cos(deg * r) * 62 * 100) / 100;
            const y1 = Math.round(Math.sin(deg * r) * 62 * 100) / 100;
            const x2 = Math.round(Math.cos(deg * r) * 100 * 100) / 100;
            const y2 = Math.round(Math.sin(deg * r) * 100 * 100) / 100;
            return <line key={`long-${deg}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" />;
          })}
          {/* Center dot */}
          <circle cx="0" cy="0" r="6" fill="#fbbf24" opacity="0.5" />
        </svg>
      </div>

      {/* ── Cloud + sun doodle — bottom-right ── */}
      <div className="pointer-events-none absolute bottom-6 -right-4 w-[260px] h-[180px] opacity-[0.28] hidden lg:block">
        <svg viewBox="0 0 260 180" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Sun disk behind cloud */}
          <circle cx="178" cy="68" r="30" stroke="#fbbf24" strokeWidth="1.4" fill="none" />
          {/* Short sun rays */}
          <line x1="178" y1="34" x2="178" y2="26" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="178" y1="102" x2="178" y2="110" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="144" y1="68" x2="136" y2="68" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="212" y1="68" x2="220" y2="68" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="154" y1="44" x2="148" y2="38" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="202" y1="44" x2="208" y2="38" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="154" y1="92" x2="148" y2="98" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="202" y1="92" x2="208" y2="98" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
          {/* Cloud outline */}
          <path
            d="M 22 118 Q 4 118, 4 100 Q 4 82, 26 82 Q 28 62, 52 62 Q 66 44, 92 50 Q 112 34, 138 50 Q 158 42, 164 66 Q 180 66, 180 84 Q 180 104, 160 104 Q 150 120, 130 120 L 36 120 Z"
            stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── Warm wavy wind trails — bottom edge ── */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full hidden md:block"
        height="100"
        viewBox="0 0 1440 100"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 68 Q 180 52, 360 70 Q 540 88, 720 68 Q 900 48, 1080 68 Q 1260 86, 1440 68" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.24" />
        <path d="M 0 80 Q 200 64, 420 82 Q 640 100, 860 78 Q 1080 58, 1300 78 Q 1390 90, 1440 76" stroke="#f59e0b" strokeWidth="1.1" fill="none" opacity="0.18" />
        <path d="M 0 90 Q 150 76, 320 92 Q 500 108, 700 86 Q 900 66, 1100 86 Q 1280 104, 1440 84" stroke="#fbbf24" strokeWidth="0.8" fill="none" opacity="0.14" />
      </svg>

      {/* ── Floating nodes — warm palette ── */}
      <div className="pointer-events-none absolute top-[12%] right-[8%] h-3 w-3 rounded-full bg-orange-400/30 animate-float-gentle shadow-[0_0_12px_rgba(251,146,60,0.2)]" />
      <div className="pointer-events-none absolute top-[25%] left-[8%] h-2 w-2 rounded-full bg-rose-400/25 animate-float-gentle-alt" />
      <div className="pointer-events-none absolute bottom-[18%] right-[12%] h-2.5 w-2.5 rounded-full bg-amber-400/25 animate-float-gentle" style={{ animationDelay: "1s" }} />
      <div className="pointer-events-none absolute top-[52%] left-[5%] h-2 w-2 rounded-full bg-teal-400/25 animate-float-gentle-alt" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none absolute bottom-[32%] left-[18%] h-1.5 w-1.5 rounded-full bg-yellow-400/20 animate-float-gentle" style={{ animationDelay: "3s" }} />
      <div className="pointer-events-none absolute top-[40%] right-[4%] h-2 w-2 rounded-full bg-red-400/20 animate-float-gentle-alt" style={{ animationDelay: "1.5s" }} />
      <div className="pointer-events-none absolute top-[72%] left-[28%] h-2.5 w-2.5 rounded-full bg-cyan-400/18 animate-float-gentle" style={{ animationDelay: "0.7s" }} />

      {/* ── Pulse rings — warm tones ── */}
      <div className="pointer-events-none absolute top-[20%] right-[5%] hidden lg:block">
        <div className="relative h-4 w-4">
          <span className="absolute inset-0 rounded-full bg-orange-400/25 animate-pulse-ring" />
          <span className="absolute inset-[5px] rounded-full bg-orange-400/40" />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[24%] left-[4%] hidden lg:block">
        <div className="relative h-4 w-4">
          <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-pulse-ring" style={{ animationDelay: "1.5s" }} />
          <span className="absolute inset-[5px] rounded-full bg-amber-400/30" />
        </div>
      </div>
      <div className="pointer-events-none absolute top-[58%] right-[3%] hidden xl:block">
        <div className="relative h-3 w-3">
          <span className="absolute inset-0 rounded-full bg-teal-400/20 animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
          <span className="absolute inset-[4px] rounded-full bg-teal-400/30" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ━━━ 1. HERO: Title (left) + Quote aside (right) ━━━ */}
        <div className="mb-16">
          <AnimateOnScroll>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-rose-700 mb-5">
              Featured Project
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_38%] gap-8 lg:gap-12 items-end">
            {/* Left — title + collaborator */}
            <AnimateOnScroll>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-brand-dark font-[family-name:var(--font-heading)] leading-[1.05] tracking-tight">
                {p.title}
              </h2>
              <p className="mt-3 text-sm text-brand-dark/55">
                In collaboration with{" "}
                <a
                  href={p.collaborator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-dark/70 hover:text-orange-700 transition-colors"
                >
                  {p.collaborator.name}
                </a>
              </p>
            </AnimateOnScroll>

            {/* Right — compact quote aside */}
            <AnimateOnScroll delay={0.15}>
              <div className="relative pl-6 py-1">
                {/* Vertical accent line with dot terminals */}
                <motion.svg
                  className="absolute left-0 top-0 h-full w-3 pointer-events-none"
                  viewBox="0 0 12 100"
                  fill="none"
                  preserveAspectRatio="none"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.line
                    x1="6" y1="6" x2="6" y2="94"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeOpacity="0.5"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: { pathLength: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                  <motion.circle
                    cx="6" cy="4" r="2.5"
                    fill="#f97316"
                    fillOpacity="0.45"
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  />
                  <motion.circle
                    cx="6" cy="96" r="2.5"
                    fill="#f97316"
                    fillOpacity="0.45"
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                  />
                </motion.svg>

                {/* Quote mark */}
                <motion.span
                  className="block text-[3.5rem] leading-[0.7] font-[family-name:var(--font-display)] text-amber-500/45 select-none pointer-events-none"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  &ldquo;
                </motion.span>

                {/* Quote text */}
                <p className="relative z-10 text-[15px] sm:text-base font-medium leading-[1.8] font-[family-name:var(--font-mono)] text-brand-dark/80 mt-1">
                  The purpose of computing is{" "}
                  <span className="text-brand-dark font-semibold underline decoration-amber-500/55 decoration-2 underline-offset-4">
                    insight
                  </span>
                  , not numbers.
                </p>

                {/* Author */}
                <p className="relative z-10 mt-3 text-[10px] font-medium text-brand-dark/55 tracking-[0.15em] font-[family-name:var(--font-mono)]">
                  &mdash; {p.quote.author}
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* ━━━ 2. DESCRIPTION — clean text, no card ━━━ */}
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl px-2 sm:px-4">
            <p className="text-center text-base sm:text-lg leading-[1.95] text-brand-dark/80 font-[family-name:var(--font-display)] tracking-wide">
              {p.description}
            </p>
          </div>
        </AnimateOnScroll>

        {/* ━━━ 3. ASK ANYTHING — header absorbed into terminal ━━━ */}
        <div className="mt-16">
          <AskAnythingTerminal />
        </div>

        {/* ━━━ 4. LINKEDIN — flows after terminal with just spacing ━━━ */}
        <div className="mt-14">
          <AnimateOnScroll>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-dark/55 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-amber-500/60 to-transparent" />
              In the Wild
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <a
              href={p.linkedinPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl"
            >
              {/* Ambient hover bloom */}
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-amber-400/25 via-orange-300/15 to-rose-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Card shell — warm atmospheric glass, no solid white */}
              <div
                className="relative rounded-2xl overflow-hidden border border-white/25 shadow-2xl shadow-amber-900/[0.15] group-hover:shadow-amber-400/[0.20] group-hover:border-amber-300/40 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(148deg, rgba(251,146,60,0.20) 0%, rgba(251,191,36,0.13) 35%, rgba(252,211,77,0.10) 58%, rgba(244,114,182,0.16) 100%)",
                  backdropFilter: "blur(18px)",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[9rem_1fr]">

                  {/* ── Left: LinkedIn brand panel ── */}
                  <div
                    className="relative hidden lg:flex flex-col items-center justify-between py-10 px-5 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(175deg, rgba(251,146,60,0.28) 0%, rgba(249,115,22,0.22) 50%, rgba(244,114,182,0.20) 100%)",
                    }}
                  >
                    {/* Vertical separator */}
                    <div className="absolute right-0 top-[10%] h-[80%] w-px bg-gradient-to-b from-transparent via-amber-400/35 to-transparent" />

                    {/* Top: LinkedIn icon in gradient square */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-400 shadow-lg shadow-orange-900/[0.25]">
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>

                    {/* Middle: vertical label */}
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-orange-700/65 [writing-mode:vertical-lr] rotate-180 select-none">
                      LinkedIn
                    </p>

                    {/* Bottom: profile photo + name */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative">
                        <Image
                          src="/images/YavarPersonalPhoto1.png"
                          alt="Yavar Khan"
                          width={38}
                          height={38}
                          className="rounded-full object-cover ring-2 ring-amber-400/50"
                          style={{ boxShadow: "0 0 0 3px rgba(251,146,60,0.15)" }}
                        />
                      </div>
                      <p className="text-[9px] font-semibold text-brand-dark/50 tracking-wide text-center">
                        Yavar Khan
                      </p>
                    </div>
                  </div>

                  {/* ── Right: post content ── */}
                  <div className="p-8 sm:p-10 lg:py-10 lg:px-11">

                    {/* Mobile-only header */}
                    <div className="flex items-center justify-between mb-6 lg:hidden">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/YavarPersonalPhoto1.png"
                          alt="Yavar Khan"
                          width={36}
                          height={36}
                          className="rounded-full object-cover ring-2 ring-amber-400/50"
                        />
                        <div>
                          <p className="text-sm font-bold text-brand-dark">Yavar Khan</p>
                          <p className="text-[10px] text-brand-dark/45">Launch Announcement</p>
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/30 to-rose-400/25 border border-amber-400/25">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-orange-600/70">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    </div>

                    {/* Label */}
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600/60 mb-4 hidden lg:block">
                      Launch Announcement
                    </p>

                    {/* ── Big display sentence ── */}
                    <p className="text-[1.45rem] sm:text-2xl lg:text-[1.65rem] font-bold text-brand-dark/85 leading-[1.38] tracking-tight mb-4 font-[family-name:var(--font-heading)]">
                      {snippetLead}
                    </p>

                    {/* ── Rest of snippet at body size ── */}
                    {snippetTail && (
                      <p className="text-sm sm:text-[15px] text-brand-dark/60 leading-relaxed mb-8">
                        {snippetTail}
                      </p>
                    )}

                    {/* ── Footer: tags + CTA ── */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-amber-400/20">
                      <div className="flex flex-wrap gap-2">
                        {p.linkedinPost.hashtags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-semibold text-orange-700/70 bg-amber-400/[0.13] border border-amber-400/22 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600/55 group-hover:text-orange-600 transition-colors duration-300 shrink-0">
                        Read full post
                        <ArrowUpRight
                          size={15}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </a>
          </AnimateOnScroll>
        </div>

        {/* ━━━ 5. TECH — simple bottom text ━━━ */}
        <div className="mt-14">
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-brand-dark/55 leading-relaxed font-[family-name:var(--font-heading)]">
                <span className="font-bold uppercase tracking-[0.2em] text-brand-dark/45">Built with</span>
                <span className="mx-2.5 text-brand-dark/30">&mdash;</span>
                {p.tech.join(" · ")}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <Lock size={12} className="text-brand-dark/40" />
                <span className="text-xs font-medium text-brand-dark/55">
                  Private
                </span>
                <span className="text-brand-dark/30">&#xB7;</span>
                <span className="text-xs text-brand-dark/55">{p.org}</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

      </div>
    </section>
  );
}
