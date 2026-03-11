"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import { roadmapMilestones, type RoadmapMilestone } from "@/lib/data";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Zap,
  Rocket,
  Paperclip,
  ChevronDown,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Briefcase,
  BookOpen,
  Zap,
  Rocket,
};

function parseYearRange(year: string) {
  const m = year.match(/(\d{4})\s*[–-]\s*(\S+)/);
  return { from: m?.[1] ?? null, to: m?.[2] ?? null };
}

/* ═══════════════════════════════════════════════════════════
   MILESTONE PANEL — editorial typography, no card borders
═══════════════════════════════════════════════════════════ */
function MilestonePanel({
  ms,
  side,
  open,
  onToggle,
}: {
  ms: RoadmapMilestone;
  side: "left" | "right";
  open: boolean;
  onToggle: () => void;
}) {
  const isRight = side === "right";
  const hasDetails = !!(ms.subRoles || ms.courses || ms.coreSubjects || ms.endorsers);
  const { from: yearFrom, to: yearTo } = parseYearRange(ms.year);

  /* Ghost year — start year, or "NOW" for active */
  const ghostYear = yearFrom ?? (ms.isActive ? "NOW" : null);

  return (
    <motion.div
      className={`relative w-full max-w-[480px] text-justify ${isRight ? "" : "ml-auto"}`}
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {/* Ghost year behind content */}
      {ghostYear && (
        <span
          className={`pointer-events-none select-none absolute -top-4 text-[5.5rem] font-black leading-none tracking-tight ${isRight ? "left-0" : "right-0"}`}
          style={{ color: ms.color, opacity: 0.07 }}
        >
          {ghostYear}
        </span>
      )}

      <div className="relative z-10">

        {/* ── Date range — uniform size, no counter ── */}
        <div className={`flex items-center gap-2 mb-3 ${isRight ? "" : "justify-end"}`}>
          {yearFrom ? (
            <span
              className="text-[13px] font-bold font-mono tracking-wide"
              style={{ color: ms.color }}
            >
              {yearFrom} → {yearTo === "Present" ? "now" : yearTo}
            </span>
          ) : (
            <span
              className="text-[13px] font-bold font-mono tracking-wide"
              style={{ color: ms.color }}
            >
              Now
            </span>
          )}
          {ms.isActive && (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: ms.color }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: ms.color }}
              />
            </span>
          )}
        </div>

        {/* Role title */}
        <h3 className={`text-[1.45rem] sm:text-[1.6rem] font-black text-brand-dark font-[family-name:var(--font-heading)] leading-[1.15] ${isRight ? "text-left" : "text-right"}`}>
          {ms.role}
        </h3>

        {/* GPA */}
        {ms.gpa && (
          <span className={`text-sm font-bold block mt-0.5 ${isRight ? "text-left" : "text-right"}`} style={{ color: ms.color }}>
            GPA {ms.gpa}
          </span>
        )}

        {/* Institution */}
        {ms.label && ms.label.trim() && (
          <p className={`text-xs font-medium text-gray-500 mt-0.5 tracking-wide ${isRight ? "text-left" : "text-right"}`}>
            {ms.label}
          </p>
        )}

        {/* Expand button — right after title block, very visible */}
        {hasDetails && (
          <button
            onClick={onToggle}
            className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-semibold transition-all duration-200 hover:opacity-80 active:scale-95 ${!isRight ? "ml-auto block" : ""}`}
            style={{
              borderColor: `${ms.color}60`,
              color: ms.color,
              backgroundColor: open ? `${ms.color}15` : `${ms.color}08`,
            }}
          >
            <ChevronDown
              className="h-3 w-3 shrink-0 transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            />
            {open ? "hide details" : "full details"}
          </button>
        )}

        {/* Thin accent rule */}
        <div
          className={`mt-4 mb-3.5 h-[2px] w-8 rounded-full ${!isRight ? "ml-auto" : ""}`}
          style={{
            background: `linear-gradient(${isRight ? "90deg" : "270deg"}, ${ms.color} 0%, ${ms.color}20 100%)`,
          }}
        />

        {/* Story — pull-quote feel with thin side border */}
        <div
          className={`text-[15px] leading-[1.9] text-gray-700 ${isRight ? "pl-3 border-l-[1.5px]" : "pr-3 border-r-[1.5px]"}`}
          style={{ borderColor: `${ms.color}38` }}
        >
          {ms.story}
          {ms.collaborator && (
            <span className="block mt-2 text-[13px] italic text-gray-500">
              Co-building with{" "}
              {ms.collaborator.linkedin ? (
                <a
                  href={ms.collaborator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="not-italic font-semibold text-gray-600 hover:text-brand-dark transition-colors underline underline-offset-2 decoration-gray-300"
                >
                  {ms.collaborator.name}
                </a>
              ) : (
                <span className="not-italic font-semibold text-gray-600">
                  {ms.collaborator.name}
                </span>
              )}
            </span>
          )}
        </div>

        {/* Metrics — distinct pill badges */}
        {ms.metrics && ms.metrics.length > 0 && (
          <div className={`mt-4 flex flex-wrap gap-2 ${!isRight ? "justify-end" : ""}`}>
            {ms.metrics.map((m) => (
              <span
                key={m}
                className="text-[12px] font-bold px-3 py-1 rounded-full"
                style={{
                  color: ms.color,
                  backgroundColor: `${ms.color}12`,
                  border: `1px solid ${ms.color}30`,
                }}
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Stack */}
        <div className={`mt-3.5 ${!isRight ? "flex flex-col items-end" : ""}`}>
          <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-gray-400 mb-1.5 block">
            Stack
          </span>
          <div className={`flex flex-wrap gap-1.5 ${!isRight ? "justify-end" : ""}`}>
            {ms.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-[11.5px] font-medium text-gray-500 border border-gray-300/60 bg-white/30 px-2.5 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
            {ms.tech.length > 5 && (
              <span className="text-[10px] text-gray-400 self-center">
                +{ms.tech.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Official Documents */}
        {(ms.transcriptPdf || ms.degreePdf) && (
          <div className={`mt-2.5 flex gap-4 ${!isRight ? "justify-end" : ""}`}>
            {ms.transcriptPdf && (
              <a
                href={ms.transcriptPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-60"
                style={{ color: ms.color }}
              >
                <Paperclip className="h-3 w-3" />
                Official Transcript
              </a>
            )}
            {ms.degreePdf && (
              <a
                href={ms.degreePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-60"
                style={{ color: ms.color }}
              >
                <Paperclip className="h-3 w-3" />
                Degree Certificate
              </a>
            )}
          </div>
        )}

        {/* Expanded details */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-6">

                {ms.coreSubjects && (
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2.5 ${!isRight ? "text-right" : ""}`}>
                      Core Subjects
                    </p>
                    <div className={`flex flex-wrap gap-2 ${!isRight ? "justify-end" : ""}`}>
                      {ms.coreSubjects.map((s) => (
                        <span
                          key={s}
                          className="text-[12px] font-medium text-gray-600 bg-white/60 border border-gray-200/80 px-2.5 py-1 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {ms.courses && (
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2.5 ${!isRight ? "text-right" : ""}`}>
                      Coursework
                    </p>
                    <div className="space-y-2">
                      {ms.courses.map((c) => (
                        <div
                          key={c.name}
                          className={`flex items-baseline gap-3 ${!isRight ? "flex-row-reverse" : "justify-between"}`}
                        >
                          <span className="text-[13px] text-gray-700 leading-snug font-medium">
                            {c.name}
                          </span>
                          <span
                            className="text-[13px] font-bold shrink-0 tabular-nums"
                            style={{ color: ms.color }}
                          >
                            {c.grade}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ms.subRoles && (
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2.5 ${!isRight ? "text-right" : ""}`}>
                      Career Progression
                    </p>
                    <div className="space-y-5">
                      {ms.subRoles.map((sub) => (
                        <div
                          key={sub.title}
                          className={`relative py-1 ${isRight ? "pl-3.5 border-l-2" : "pr-3.5 border-r-2 text-right"}`}
                          style={{ borderColor: `${ms.color}45` }}
                        >
                          <p className="text-[13.5px] font-bold text-brand-dark">
                            {sub.title}
                          </p>
                          <p className="text-[12px] text-gray-500 font-medium mb-2">{sub.period}</p>
                          <ul className="space-y-1.5">
                            {sub.description.map((point) => (
                              <li
                                key={point}
                                className={`flex items-start gap-2 text-[13px] leading-relaxed text-gray-600 ${!isRight ? "flex-row-reverse text-justify" : "text-justify"}`}
                              >
                                <span
                                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: ms.color }}
                                />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ms.endorsers && (
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2.5 ${!isRight ? "text-right" : ""}`}>
                      Endorsements
                    </p>
                    <div className="space-y-5">
                      {ms.endorsers.map((endorser) => (
                        <div key={endorser.name}>
                          <p className="text-[13.5px] font-bold text-brand-dark">
                            {endorser.name}
                          </p>
                          <p className="text-[12px] text-gray-500 font-medium mb-2">{endorser.title}</p>
                          <div className="space-y-2">
                            {endorser.endorsements.map((e) => (
                              <p
                                key={e.quote}
                                className={`text-[13px] italic leading-relaxed text-gray-600 ${isRight ? "pl-3 border-l-2" : "pr-3 border-r-2"}`}
                                style={{ borderColor: `${ms.color}30` }}
                              >
                                &ldquo;{e.quote}&rdquo;
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════ */
export default function JourneySection() {
  /* milestones reversed = most recent (WeatherWise) first */
  const milestones = [...roadmapMilestones].reverse();
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [road, setRoad] = useState({ d: "", w: 0, h: 0 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = milestones.length;

  const toggleMilestone = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  /* Build the bezier S-curve path through measured node centers */
  const measureRoad = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const cRect = el.getBoundingClientRect();
    const pts = nodeRefs.current
      .map((ref) => {
        if (!ref) return null;
        const r = ref.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - cRect.left,
          y: r.top + r.height / 2 - cRect.top,
        };
      })
      .filter(Boolean) as { x: number; y: number }[];
    if (pts.length < 2) return;

    /* Entry straight from top */
    let d = `M ${pts[0].x} ${Math.max(0, pts[0].y - 100)} L ${pts[0].x} ${pts[0].y}`;

    /* Cubic bezier between each pair — pull control points toward the
       far side to create a more dramatic, diagonal-feeling swing */
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const dy = b.y - a.y;
      /* Control points biased toward the destination x, creating an asymmetric
         "lean-in" curve that feels more like a real winding road */
      const cp1x = a.x + (b.x - a.x) * 0.15;
      const cp1y = a.y + dy * 0.55;
      const cp2x = b.x - (b.x - a.x) * 0.15;
      const cp2y = b.y - dy * 0.55;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${b.x} ${b.y}`;
    }

    /* Exit straight at bottom */
    const last = pts[pts.length - 1];
    d += ` L ${last.x} ${last.y + 100}`;
    setRoad({ d, w: cRect.width, h: cRect.height });
  }, []);

  useEffect(() => {
    const timer = setTimeout(measureRoad, 80);
    const observer = new ResizeObserver(() => requestAnimationFrame(measureRoad));
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [measureRoad]);

  /* Re-measure road when a milestone expands/collapses */
  useEffect(() => {
    const timer = setTimeout(measureRoad, 350);
    return () => clearTimeout(timer);
  }, [openIndex, measureRoad]);

  const earliestYear =
    roadmapMilestones[0].year.match(/\d{4}/)?.[0] ?? "";

  return (
    <SectionWrapper
      id="journey"
      className="relative border-b-2 border-black overflow-hidden"
    >
      {/* ══════════════════════════════════════════════════════
          MULTI-ERA GRADIENT BACKGROUND
          Top (most recent — WeatherWise) → warm red/orange
          Scrolling down through time → cooler violet/lavender
      ══════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #fde8e8 0%, #fff3e0 18%, #f0fdf9 38%, #f0f9ff 60%, #f3f0ff 80%, #ede9fe 100%)",
        }}
      />

      {/* Fine dot grid over the gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Era atmospheric blobs at their vertical zones ── */}
      {/* WeatherWise zone (top ~0-20%) */}
      <div className="pointer-events-none absolute top-[1%] right-[6%] h-[22rem] w-[22rem] rounded-full bg-orange-300/20 blur-3xl animate-mesh-drift-1" />
      <div className="pointer-events-none absolute top-[6%] left-[4%] h-64 w-64 rounded-full bg-rose-200/22 blur-3xl animate-mesh-drift-2" />
      {/* GenAI pivot zone (20-38%) */}
      <div className="pointer-events-none absolute top-[22%] right-[4%] h-72 w-72 rounded-full bg-amber-300/18 blur-3xl animate-mesh-drift-3" />
      <div className="pointer-events-none absolute top-[28%] left-[8%] h-56 w-56 rounded-full bg-yellow-200/15 blur-3xl animate-mesh-drift-1" />
      {/* Masters zone (38-60%) */}
      <div className="pointer-events-none absolute top-[42%] left-[5%] h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl animate-mesh-drift-2" />
      <div className="pointer-events-none absolute top-[50%] right-[7%] h-56 w-56 rounded-full bg-teal-200/15 blur-3xl animate-mesh-drift-3" />
      {/* Accenture zone (60-80%) */}
      <div className="pointer-events-none absolute top-[63%] right-[5%] h-72 w-72 rounded-full bg-sky-200/20 blur-3xl animate-mesh-drift-1" />
      <div className="pointer-events-none absolute top-[70%] left-[6%] h-56 w-56 rounded-full bg-cyan-200/15 blur-3xl animate-mesh-drift-2" />
      {/* Bachelors zone (80-100%) */}
      <div className="pointer-events-none absolute bottom-[5%] left-[4%] h-72 w-72 rounded-full bg-violet-200/22 blur-3xl animate-mesh-drift-3" />
      <div className="pointer-events-none absolute bottom-[8%] right-[6%] h-56 w-56 rounded-full bg-purple-200/18 blur-3xl animate-mesh-drift-1" />

      {/* ── Section heading ── */}
      <AnimateOnScroll>
        <div className="relative z-10 mb-20 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-700/50 mb-5 font-mono">
            ← Career Roadmap →
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-brand-dark font-[family-name:var(--font-heading)] leading-[1.05] tracking-tight">
            My Journey
          </h2>
          <p className="mx-auto mt-4 text-lg text-gray-500 font-medium">
            From Engineering to Intelligence
          </p>
          <p className="mt-2 text-[11px] font-medium text-gray-400 tracking-widest uppercase font-mono">
            {total} milestones · {earliestYear} → present
          </p>
        </div>
      </AnimateOnScroll>

      {/* ══════════════════════════════════════════════════════
          DESKTOP — 240px center column, wider panels
      ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <div ref={containerRef} className="relative mx-auto max-w-[1320px]">

          {/* Multi-layer realistic road SVG */}
          {road.d && (
            <svg
              viewBox={`0 0 ${road.w} ${road.h}`}
              className="absolute inset-0 z-0 h-full w-full pointer-events-none"
              fill="none"
              style={{ opacity: road.d ? 1 : 0, transition: "opacity 0.8s" }}
            >
              {/* 1 — long shadow beneath road */}
              <path
                d={road.d}
                stroke="rgba(0,0,0,0.10)"
                strokeWidth="60"
                strokeLinecap="round"
              />
              {/* 2 — sandy gravel shoulder */}
              <path
                d={road.d}
                stroke="#c8b79a"
                strokeWidth="46"
                strokeLinecap="round"
              />
              {/* 3 — dark tarmac surface */}
              <path
                d={road.d}
                stroke="#272420"
                strokeWidth="32"
                strokeLinecap="round"
              />
              {/* 4 — subtle asphalt sheen */}
              <path
                d={road.d}
                stroke="rgba(255,255,255,0.032)"
                strokeWidth="28"
                strokeLinecap="round"
              />
              {/* 5 — white edge-reflector dashes */}
              <path
                d={road.d}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="30"
                strokeDasharray="1 38"
                strokeLinecap="butt"
              />
              {/* 6 — animated amber centre-line dashes */}
              <path
                d={road.d}
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeDasharray="14 10"
                strokeLinecap="round"
                className="roadmap-dashes"
              />
            </svg>
          )}

          {/* Milestone rows — 240px center column, wider content panels */}
          <div className="relative z-10 space-y-20">
            {milestones.map((ms, i) => {
              const isLeft = i % 2 === 0;
              const Icon = iconMap[ms.icon] || Zap;
              const hasDetails = !!(ms.subRoles || ms.courses || ms.coreSubjects || ms.endorsers);

              return (
                <div
                  key={ms.id}
                  className="relative grid items-start"
                  style={{ gridTemplateColumns: "1fr 240px 1fr" }}
                >
                  {/* Subtle local atmosphere glow per milestone */}
                  <div
                    className="pointer-events-none absolute h-48 w-48 rounded-full blur-3xl opacity-50"
                    style={{
                      backgroundColor: `${ms.color}20`,
                      top: -20,
                      ...(isLeft ? { left: 0 } : { right: 0 }),
                    }}
                  />

                  {/* Left content */}
                  <div className={isLeft ? "flex justify-end pr-6 pt-2" : ""}>
                    {isLeft && (
                      <MilestonePanel ms={ms} side="left" open={openIndex === i} onToggle={() => toggleMilestone(i)} />
                    )}
                  </div>

                  {/* Center: road node — clickable to expand/collapse */}
                  <div
                    className="flex pt-2"
                    style={{ justifyContent: isLeft ? "flex-start" : "flex-end" }}
                  >
                    <div
                      ref={(el) => { nodeRefs.current[i] = el; }}
                      onClick={hasDetails ? () => toggleMilestone(i) : undefined}
                      className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white transition-all duration-300 hover:scale-110 ${hasDetails ? "cursor-pointer" : "cursor-default"}`}
                      style={{
                        backgroundColor: ms.color,
                        boxShadow: openIndex === i
                          ? `0 0 0 6px ${ms.color}40, 0 0 0 13px ${ms.color}18, 0 8px 28px ${ms.color}70, 0 2px 8px rgba(0,0,0,0.25)`
                          : `0 0 0 6px ${ms.color}28, 0 0 0 13px ${ms.color}0e, 0 8px 24px ${ms.color}60, 0 2px 8px rgba(0,0,0,0.25)`,
                      }}
                      title={hasDetails ? (openIndex === i ? "Click to collapse" : "Click to expand") : undefined}
                    >
                      <Icon className="h-7 w-7 text-white" />
                      {ms.isActive && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-22"
                          style={{ backgroundColor: ms.color }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Right content */}
                  <div className={!isLeft ? "pl-6 pt-2" : ""}>
                    {!isLeft && (
                      <MilestonePanel ms={ms} side="right" open={openIndex === i} onToggle={() => toggleMilestone(i)} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE — vertical tarmac strip on left, editorial content
      ══════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        <div className="relative ml-6">
          {/* Tarmac strip */}
          <div
            className="absolute left-0 top-0 h-full w-[10px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #c8b79a, #272420 8%, #272420 92%, #c8b79a)",
            }}
          />
          {/* Animated yellow dashes */}
          <div className="absolute left-[3.5px] top-0 h-full w-[3px] overflow-hidden opacity-70">
            <div
              className="roadmap-dashes h-[200%]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #fbbf24 0px, #fbbf24 12px, transparent 12px, transparent 22px)",
              }}
            />
          </div>

          <div className="space-y-10">
            {milestones.map((ms, i) => {
              const Icon = iconMap[ms.icon] || Zap;
              const { from: yearFrom, to: yearTo } = parseYearRange(ms.year);
              const ghostYear = yearFrom ?? (ms.isActive ? "NOW" : null);

              return (
                <div key={ms.id} className="relative pl-10">
                  {/* Node icon */}
                  <div
                    className="absolute -left-[11px] top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-white"
                    style={{
                      backgroundColor: ms.color,
                      boxShadow: `0 0 0 4px ${ms.color}22, 0 4px 12px ${ms.color}45`,
                    }}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.06 }}
                    className="relative pt-1"
                  >
                    {/* Ghost year */}
                    {ghostYear && (
                      <span
                        className="pointer-events-none select-none absolute -top-3 left-0 text-[4rem] font-black leading-none"
                        style={{ color: ms.color, opacity: 0.07 }}
                      >
                        {ghostYear}
                      </span>
                    )}

                    <div className="relative z-10 text-justify">
                      {/* Date — uniform size, no counter */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-[13px] font-bold font-mono tracking-wide"
                          style={{ color: ms.color }}
                        >
                          {yearFrom
                            ? `${yearFrom} → ${yearTo === "Present" ? "now" : yearTo}`
                            : "Now"}
                        </span>
                        {ms.isActive && (
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                              style={{ backgroundColor: ms.color }}
                            />
                            <span
                              className="relative inline-flex h-2 w-2 rounded-full"
                              style={{ backgroundColor: ms.color }}
                            />
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-brand-dark font-[family-name:var(--font-heading)] leading-tight text-left">
                        {ms.role}
                      </h3>
                      {ms.gpa && (
                        <span className="text-xs font-bold" style={{ color: ms.color }}>
                          GPA {ms.gpa}
                        </span>
                      )}
                      {ms.label && ms.label.trim() && (
                        <p className="text-xs text-gray-500 mt-0.5">{ms.label}</p>
                      )}

                      <div
                        className="mt-2.5 mb-2.5 h-[2px] w-7 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${ms.color}, ${ms.color}20)`,
                        }}
                      />

                      <div
                        className="text-[13px] leading-[1.85] text-gray-700 pl-2.5 border-l-[1.5px]"
                        style={{ borderColor: `${ms.color}38` }}
                      >
                        {ms.story}
                      </div>

                      {/* Metrics — distinct pill badges */}
                      {ms.metrics && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {ms.metrics.map((m) => (
                            <span
                              key={m}
                              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                              style={{
                                color: ms.color,
                                backgroundColor: `${ms.color}12`,
                                border: `1px solid ${ms.color}30`,
                              }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-2.5">
                        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-1 block">
                          Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {ms.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] text-gray-400 bg-white/30 border border-gray-200/60 px-1.5 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                          {ms.tech.length > 4 && (
                            <span className="text-[10px] text-gray-400">
                              +{ms.tech.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
