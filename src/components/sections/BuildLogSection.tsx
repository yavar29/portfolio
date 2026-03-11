"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Clock, ChevronDown } from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { buildLog, type BuildLogStatus } from "@/lib/data";

/* ─── Status configuration ─── */
const STATUS_CFG: Record<
  BuildLogStatus,
  {
    Icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    color: string;
    colorMuted: string;
    gradient: string;
  }
> = {
  shipped: {
    Icon: Check,
    label: "Shipped",
    color: "#059669",
    colorMuted: "#6ee7b7",
    gradient: "from-emerald-500 to-teal-400",
  },
  in_progress: {
    Icon: Loader2,
    label: "Building",
    color: "#0284c7",
    colorMuted: "#7dd3fc",
    gradient: "from-sky-500 to-cyan-400",
  },
  next: {
    Icon: Clock,
    label: "Planned",
    color: "#d97706",
    colorMuted: "#fcd34d",
    gradient: "from-amber-500 to-orange-400",
  },
};

/* ─── Pre-computed stats (counts entries, not sections) ─── */
const stats = (() => {
  let shipped = 0,
    building = 0,
    planned = 0;
  let totalEntries = 0;
  for (const m of buildLog) {
    totalEntries += m.entries.length;
    if (m.status === "shipped") {
      shipped += m.entries.length;
    } else if (m.status === "in_progress") {
      building += m.entries.length;
    } else {
      planned += m.entries.length;
    }
  }
  return { shipped, building, planned, shippedEntries: shipped, totalEntries };
})();

/* ─── Stat chip sub-component ─── */
function StatChip({
  color,
  count,
  label,
  pulse,
}: {
  color: "emerald" | "sky" | "amber";
  count: number;
  label: string;
  pulse?: boolean;
}) {
  const palette = {
    emerald: { dot: "bg-emerald-400", text: "text-white/60" },
    sky: { dot: "bg-sky-400", text: "text-white/60" },
    amber: { dot: "bg-amber-400", text: "text-white/60" },
  };
  const c = palette[color];
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${c.dot} ${pulse ? "animate-pulse" : ""}`}
      />
      <span className={`text-[11px] font-semibold ${c.text}`}>
        {count} {label}
      </span>
    </div>
  );
}

/* ─── Main component ─── */
export default function BuildLogSection() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const VISIBLE_ENTRIES = 2;

  const advance = useCallback(() => {
    setActive((p) => (p + 1) % buildLog.length);
    setExpanded(false);
  }, []);

  /* Auto-cycle every 5.5s until user clicks a tab */
  useEffect(() => {
    if (interacted) return;
    const id = setInterval(advance, 5500);
    return () => clearInterval(id);
  }, [interacted, advance]);

  const phase = buildLog[active];
  const cfg = STATUS_CFG[phase.status];

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black">
      {/* ── Atmospheric gradient background ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #93c5fd 0%, #a78bfa 14%, #c4b5fd 30%, #e9e4ff 48%, #ffffff 60%, #fef08a 74%, #fdba74 87%, #fca5a5 100%)",
        }}
      />

      {/* ── Atmospheric color blobs ── */}
      <div className="pointer-events-none absolute -top-24 -left-10 h-[30rem] w-[30rem] rounded-full bg-sky-300/25 blur-3xl animate-mesh-drift-1" />
      <div className="pointer-events-none absolute bottom-[-8%] right-[5%] h-[26rem] w-[26rem] rounded-full bg-violet-300/20 blur-3xl animate-mesh-drift-2" />
      <div className="pointer-events-none absolute top-[38%] left-[42%] h-80 w-80 rounded-full bg-amber-200/30 blur-3xl animate-mesh-drift-3" />
      <div className="pointer-events-none absolute top-[8%] right-[18%] h-72 w-72 rounded-full bg-rose-200/20 blur-3xl animate-mesh-drift-2" />
      <div className="pointer-events-none absolute bottom-[12%] left-[15%] h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl animate-mesh-drift-1" />
      <div className="pointer-events-none absolute top-[60%] right-[38%] h-52 w-52 rounded-full bg-cyan-200/15 blur-3xl animate-mesh-drift-3" />

      {/* ── Isobar pressure contour lines (full-width animated SVG) ── */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -80 90 C 180 70, 400 120, 640 100 S 920 55, 1150 85 S 1360 115, 1520 90"
          stroke="#4f46e5" strokeWidth="1.6" strokeDasharray="8 7" opacity="0.30"
          className="animate-isobar-flow"
        />
        <path
          d="M -80 200 C 150 178, 380 242, 620 215 S 890 158, 1110 195 S 1330 232, 1520 205"
          stroke="#7c3aed" strokeWidth="1.4" strokeDasharray="10 9" opacity="0.24"
          className="animate-isobar-flow" style={{ animationDelay: "-7s" }}
        />
        <path
          d="M -80 335 C 200 312, 450 372, 700 345 S 960 292, 1170 325 S 1360 362, 1520 340"
          stroke="#6366f1" strokeWidth="1.2" strokeDasharray="6 11" opacity="0.19"
          className="animate-isobar-flow" style={{ animationDelay: "-14s" }}
        />
        <path
          d="M -80 460 C 260 438, 510 498, 770 470 S 1030 412, 1240 450 S 1390 478, 1520 460"
          stroke="#8b5cf6" strokeWidth="1" strokeDasharray="12 9" opacity="0.16"
          className="animate-isobar-flow" style={{ animationDelay: "-4s" }}
        />
        <path
          d="M -80 530 C 300 508, 560 558, 820 535 S 1070 488, 1280 520 S 1410 542, 1520 525"
          stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="5 12" opacity="0.12"
          className="animate-isobar-flow" style={{ animationDelay: "-11s" }}
        />
        <text x="14" y="86"  fill="#4f46e5" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.50">1016 hPa</text>
        <text x="14" y="196" fill="#7c3aed" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.42">1020 hPa</text>
        <text x="14" y="330" fill="#6366f1" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.34">1024 hPa</text>
      </svg>

      {/* ── Wind trail wavy curves — top ── */}
      <svg
        className="pointer-events-none absolute top-0 left-0 w-full hidden md:block"
        height="110"
        viewBox="0 0 1440 110"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 32 Q 180 16, 360 40 Q 540 64, 720 40 Q 900 16, 1080 40 Q 1260 64, 1440 40" stroke="#7c3aed" strokeWidth="1.6" fill="none" opacity="0.24" />
        <path d="M 0 58 Q 200 40, 420 62 Q 640 84, 860 60 Q 1080 38, 1300 60 Q 1390 70, 1440 57" stroke="#6366f1" strokeWidth="1.2" fill="none" opacity="0.18" />
        <path d="M 0 80 Q 150 65, 320 82 Q 500 100, 700 78 Q 900 56, 1100 78 Q 1280 96, 1440 74" stroke="#8b5cf6" strokeWidth="0.9" fill="none" opacity="0.13" />
      </svg>

      {/* ── Weather radar rings — top-right corner ── */}
      <div className="pointer-events-none absolute -top-20 -right-24 w-[460px] h-[460px] hidden lg:block">
        <svg viewBox="0 0 420 420" fill="none" className="w-full h-full opacity-[0.30]" xmlns="http://www.w3.org/2000/svg">
          <circle cx="210" cy="210" r="200" stroke="#3b82f6" strokeWidth="0.7" />
          <circle cx="210" cy="210" r="155" stroke="#3b82f6" strokeWidth="0.7" />
          <circle cx="210" cy="210" r="110" stroke="#3b82f6" strokeWidth="0.7" />
          <circle cx="210" cy="210" r="65"  stroke="#3b82f6" strokeWidth="0.7" />
          <circle cx="210" cy="210" r="25"  stroke="#3b82f6" strokeWidth="0.7" />
          <line x1="210" y1="5"   x2="210" y2="415" stroke="#3b82f6" strokeWidth="0.5" />
          <line x1="5"   y1="210" x2="415" y2="210" stroke="#3b82f6" strokeWidth="0.5" />
          <line x1="68"  y1="68"  x2="352" y2="352" stroke="#3b82f6" strokeWidth="0.3" />
          <line x1="352" y1="68"  x2="68"  y2="352" stroke="#3b82f6" strokeWidth="0.3" />
          <text x="215" y="53"  fill="#3b82f6" fontSize="6.5" fontFamily="monospace">50km</text>
          <text x="215" y="98"  fill="#3b82f6" fontSize="6.5" fontFamily="monospace">100km</text>
          <text x="215" y="153" fill="#3b82f6" fontSize="6.5" fontFamily="monospace">150km</text>
          <circle cx="210" cy="210" r="4" fill="#3b82f6" opacity="0.5" />
          {/* Rotating sweep arm */}
          <g className="animate-radar-sweep">
            <line x1="210" y1="210" x2="210" y2="10" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            <circle cx="210" cy="10" r="2.5" fill="#06b6d4" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* ── Weather station readout — top-right, near radar ── */}
      <div className="pointer-events-none absolute top-10 right-10 hidden xl:block">
        <div className="rounded-xl border border-sky-400/20 bg-sky-50/30 px-3 py-2 text-right">
          <p className="text-[8px] font-bold tracking-[0.2em] text-indigo-500/50 uppercase font-mono">LIVE · Weather Data</p>
          <p className="mt-1 text-lg font-bold text-sky-600/35 font-mono">23°C</p>
          <p className="text-[8px] text-indigo-400/40 font-mono">↑ NW 18 km/h</p>
          <p className="mt-0.5 text-[8px] text-indigo-400/35 font-mono">1016 hPa · Rising</p>
        </div>
      </div>

      {/* ── Cloud + rain doodle — bottom-left ── */}
      <div className="pointer-events-none absolute bottom-6 -left-4 w-[240px] h-[170px] opacity-[0.32] hidden lg:block">
        <svg viewBox="0 0 240 170" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 45 110 Q 22 110, 22 88 Q 22 66, 46 66 Q 48 44, 72 44 Q 86 24, 112 30 Q 134 14, 162 30 Q 188 24, 194 52 Q 216 52, 216 76 Q 216 100, 192 100 Q 180 114, 158 114 L 60 114 Z"
            stroke="#6366f1" strokeWidth="1.5" fill="none" strokeLinejoin="round"
          />
          <line x1="68"  y1="122" x2="64"  y2="137" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <line x1="86"  y1="120" x2="82"  y2="135" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <line x1="104" y1="124" x2="100" y2="139" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <line x1="122" y1="120" x2="118" y2="135" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <line x1="140" y1="122" x2="136" y2="137" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <line x1="158" y1="120" x2="154" y2="135" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <line x1="77"  y1="140" x2="73"  y2="154" stroke="#6366f1" strokeWidth="1"   strokeLinecap="round" opacity="0.55" />
          <line x1="95"  y1="138" x2="91"  y2="152" stroke="#6366f1" strokeWidth="1"   strokeLinecap="round" opacity="0.55" />
          <line x1="113" y1="140" x2="109" y2="154" stroke="#6366f1" strokeWidth="1"   strokeLinecap="round" opacity="0.55" />
          <line x1="131" y1="138" x2="127" y2="152" stroke="#6366f1" strokeWidth="1"   strokeLinecap="round" opacity="0.55" />
          <line x1="149" y1="140" x2="145" y2="154" stroke="#6366f1" strokeWidth="1"   strokeLinecap="round" opacity="0.55" />
        </svg>
      </div>

      {/* ── Lightning bolt — mid-left ── */}
      <div className="pointer-events-none absolute top-[42%] left-[1.5%] opacity-[0.25] hidden xl:block">
        <svg width="52" height="88" viewBox="0 0 52 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 34 2 L 8 46 L 24 46 L 18 86 L 44 40 L 28 40 Z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── Small lightning bolt — bottom-right accent ── */}
      <div className="pointer-events-none absolute bottom-[18%] right-[2%] opacity-[0.18] hidden xl:block">
        <svg width="32" height="54" viewBox="0 0 52 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 34 2 L 8 46 L 24 46 L 18 86 L 44 40 L 28 40 Z" fill="#f59e0b" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── Floating decorative nodes ── */}
      <div className="pointer-events-none absolute top-[10%] left-[7%] h-3 w-3 rounded-full bg-sky-500/30 animate-float-gentle shadow-[0_0_12px_rgba(14,165,233,0.2)]" />
      <div className="pointer-events-none absolute top-[22%] right-[9%] h-2 w-2 rounded-full bg-violet-500/25 animate-float-gentle-alt" />
      <div className="pointer-events-none absolute bottom-[16%] left-[11%] h-2.5 w-2.5 rounded-full bg-sky-400/25 animate-float-gentle" style={{ animationDelay: "1s" }} />
      <div className="pointer-events-none absolute top-[50%] right-[6%] h-2 w-2 rounded-full bg-amber-500/30 animate-float-gentle-alt" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none absolute bottom-[28%] right-[14%] h-1.5 w-1.5 rounded-full bg-rose-400/20 animate-float-gentle" style={{ animationDelay: "3s" }} />
      <div className="pointer-events-none absolute top-[38%] left-[4%] h-2 w-2 rounded-full bg-indigo-500/25 animate-float-gentle-alt" style={{ animationDelay: "1.5s" }} />
      <div className="pointer-events-none absolute top-[70%] right-[22%] h-2.5 w-2.5 rounded-full bg-cyan-400/20 animate-float-gentle" style={{ animationDelay: "0.8s" }} />

      {/* ── Pulse rings ── */}
      <div className="pointer-events-none absolute top-[18%] left-[5%] hidden lg:block">
        <div className="relative h-4 w-4">
          <span className="absolute inset-0 rounded-full bg-sky-400/25 animate-pulse-ring" />
          <span className="absolute inset-[5px] rounded-full bg-sky-400/40" />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[22%] right-[5%] hidden lg:block">
        <div className="relative h-4 w-4">
          <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse-ring" style={{ animationDelay: "1.5s" }} />
          <span className="absolute inset-[5px] rounded-full bg-emerald-400/30" />
        </div>
      </div>
      <div className="pointer-events-none absolute top-[55%] left-[3%] hidden xl:block">
        <div className="relative h-3 w-3">
          <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
          <span className="absolute inset-[4px] rounded-full bg-amber-400/35" />
        </div>
      </div>

      {/* ── Animated SVG connectors — left pipeline ── */}
      <motion.svg
        className="pointer-events-none absolute left-[1%] top-[32%] hidden lg:block"
        width="110"
        height="200"
        viewBox="0 0 110 200"
        fill="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <defs>
          <linearGradient id="bl-line-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(99,102,241,0)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.28)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 100 L 35 100 C 55 100, 60 55, 78 55 L 110 55"
          stroke="url(#bl-line-l)" strokeWidth="1"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        />
        <motion.path
          d="M 35 100 C 55 100, 60 145, 78 145 L 110 145"
          stroke="url(#bl-line-l)" strokeWidth="1"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
        />
        <motion.circle cx="35" cy="100" r="3" fill="rgba(99,102,241,0.38)"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
          transition={{ delay: 0.3, type: "spring" }} />
        <motion.circle cx="78" cy="55" r="2.5" fill="rgba(52,211,153,0.32)"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
          transition={{ delay: 1.2, type: "spring" }} />
        <motion.circle cx="78" cy="145" r="2.5" fill="rgba(56,189,248,0.32)"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
          transition={{ delay: 1.5, type: "spring" }} />
      </motion.svg>

      {/* ── Animated SVG connectors — right pipeline ── */}
      <motion.svg
        className="pointer-events-none absolute right-[1%] top-[42%] hidden lg:block"
        width="110"
        height="170"
        viewBox="0 0 110 170"
        fill="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <defs>
          <linearGradient id="bl-line-r" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(99,102,241,0)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.28)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 110 85 L 75 85 C 55 85, 50 40, 32 40 L 0 40"
          stroke="url(#bl-line-r)" strokeWidth="1"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
        />
        <motion.path
          d="M 75 85 C 55 85, 50 130, 32 130 L 0 130"
          stroke="url(#bl-line-r)" strokeWidth="1"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.8 }}
        />
        <motion.circle cx="75" cy="85" r="3" fill="rgba(99,102,241,0.38)"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
          transition={{ delay: 0.5, type: "spring" }} />
        <motion.circle cx="32" cy="40" r="2.5" fill="rgba(251,191,36,0.32)"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
          transition={{ delay: 1.3, type: "spring" }} />
        <motion.circle cx="32" cy="130" r="2.5" fill="rgba(52,211,153,0.32)"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
          transition={{ delay: 1.6, type: "spring" }} />
      </motion.svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <AnimateOnScroll>
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">

            {/* Left: Big title */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-600/65 mb-5 flex items-center gap-2.5 font-mono">
                <span className="text-emerald-600/75 font-bold">$</span>
                engineering progress
              </p>
              <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold text-brand-dark font-[family-name:var(--font-heading)] leading-[1.05] tracking-tight">
                WeatherWise.ai
                <br />
                <span className="text-brand-dark/40">Build Log.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base sm:text-lg text-brand-dark/60 leading-relaxed">
                Key milestones shipped so far — and what&apos;s coming next.
              </p>
            </div>

            {/* Right: Live stats */}
            <div className="flex items-stretch gap-7 sm:gap-9 shrink-0 lg:pb-2">
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-4xl sm:text-5xl font-black text-emerald-600 font-[family-name:var(--font-heading)] leading-none tabular-nums">
                  {stats.shipped}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/45">Shipped</p>
              </div>
              <div className="w-px bg-brand-dark/12 self-stretch" />
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-4xl sm:text-5xl font-black text-sky-600 font-[family-name:var(--font-heading)] leading-none tabular-nums">
                  {stats.building}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/45">Building</p>
              </div>
              <div className="w-px bg-brand-dark/12 self-stretch" />
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-4xl sm:text-5xl font-black text-amber-600 font-[family-name:var(--font-heading)] leading-none tabular-nums">
                  {stats.planned}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/45">Planned</p>
              </div>
            </div>

          </div>
        </AnimateOnScroll>

        {/* ── Dispatch Board — single warm panel ── */}
        <AnimateOnScroll>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(42, 36, 56, 0.88)",
              backdropFilter: "blur(24px)",
              boxShadow:
                "0 12px 48px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
            }}
          >
            {/* ── Tab bar ── */}
            <div className="flex border-b overflow-x-auto hide-scrollbar" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
              {buildLog.map((m, i) => {
                const s = STATUS_CFG[m.status];
                const isActive = i === active;
                return (
                  <button
                    key={m.milestone}
                    onClick={() => {
                      setActive(i);
                      setInteracted(true);
                      setExpanded(false);
                    }}
                    className={`
                      relative px-5 sm:px-6 py-4 text-[13px] font-semibold whitespace-nowrap
                      transition-colors duration-300 cursor-pointer shrink-0
                      font-[family-name:var(--font-heading)]
                      ${isActive ? "text-white" : "text-white/40 hover:text-white/65"}
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${m.status === "in_progress" ? "animate-pulse" : ""}`}
                        style={{ backgroundColor: isActive ? s.color : `${s.color}50` }}
                      />
                      {m.milestone}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="bl-tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: s.color }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Phase content ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="px-6 sm:px-10 py-8 sm:py-10 flex flex-col min-h-[30rem]"
              >
                {/* Phase header */}
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="text-[11px] font-bold tracking-[0.2em] font-mono"
                    style={{ color: cfg.color }}
                  >
                    v{active + 1}.0
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
                    {phase.milestone}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: `${cfg.color}22`,
                      color: cfg.colorMuted,
                      border: `1px solid ${cfg.color}35`,
                    }}
                  >
                    <cfg.Icon
                      size={10}
                      className={phase.status === "in_progress" ? "animate-spin" : ""}
                    />
                    {cfg.label}
                  </span>
                </div>

                {/* ── Entries — editorial list, hairline-separated ── */}
                <div className="flex-1">
                  {(() => {
                    const visibleEntries = expanded
                      ? phase.entries
                      : phase.entries.slice(0, VISIBLE_ENTRIES);
                    const hiddenCount = phase.entries.length - VISIBLE_ENTRIES;

                    return (
                      <>
                        {visibleEntries.map((entry, i) => (
                          <motion.div
                            key={entry.title}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.07, ease: "easeOut" }}
                          >
                            {i > 0 && (
                              <div
                                className="my-6 sm:my-7"
                                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.07)" }}
                              />
                            )}
                            <div className="flex gap-5 sm:gap-7">
                              {/* Margin number */}
                              <span
                                className="text-[2.5rem] sm:text-[3rem] font-black leading-none font-[family-name:var(--font-heading)] shrink-0 w-12 sm:w-14 text-right select-none"
                                style={{ color: `${cfg.color}30` }}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>

                              {/* Content */}
                              <div className="flex-1 min-w-0 pt-1">
                                <h4 className="text-[17px] sm:text-lg font-bold text-white mb-1.5 font-[family-name:var(--font-heading)]">
                                  {entry.title}
                                </h4>
                                <p className="text-[15px] text-white/65 leading-[1.7] mb-4">
                                  {entry.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {entry.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                                      style={{
                                        backgroundColor: `${cfg.color}18`,
                                        color: cfg.colorMuted,
                                        border: `1px solid ${cfg.color}30`,
                                      }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Show more / Show less toggle */}
                        {hiddenCount > 0 && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={() => setExpanded((prev) => !prev)}
                            className="mt-6 flex items-center gap-1.5 mx-auto cursor-pointer text-[12px] font-semibold tracking-wide transition-colors duration-200"
                            style={{ color: cfg.colorMuted }}
                          >
                            {expanded ? "Show less" : `+${hiddenCount} more`}
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                            />
                          </motion.button>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* ── Bottom bar: stats + progress ── */}
                <div
                  className="mt-8 pt-6 flex items-center gap-4 sm:gap-6 flex-wrap"
                  style={{ borderTop: "1px solid rgba(255, 255, 255, 0.07)" }}
                >
                  <StatChip color="emerald" count={stats.shipped} label="Shipped" />
                  <StatChip color="sky" count={stats.building} label="Building" pulse />
                  <StatChip color="amber" count={stats.planned} label="Planned" />

                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-xs text-white/40 font-medium hidden sm:inline">
                      {stats.shippedEntries}/{stats.totalEntries}
                    </span>
                    <div className="h-1.5 w-20 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(stats.shippedEntries / stats.totalEntries) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Navigation dots ── */}
            <div className="flex justify-center gap-2 pb-5">
              {buildLog.map((m, i) => {
                const s = STATUS_CFG[m.status];
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActive(i);
                      setInteracted(true);
                      setExpanded(false);
                    }}
                    className="p-1 cursor-pointer"
                  >
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        active === i
                          ? `w-6 bg-gradient-to-r ${s.gradient}`
                          : "w-1.5 bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
