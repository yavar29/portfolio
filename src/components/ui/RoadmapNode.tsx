"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Zap,
  Rocket,
  ChevronDown,
  Paperclip,
  Quote,
} from "lucide-react";
import Badge from "./Badge";
import type { RoadmapMilestone } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Briefcase,
  BookOpen,
  Zap,
  Rocket,
};

interface RoadmapNodeProps {
  milestone: RoadmapMilestone;
  index: number;
  side: "left" | "right";
}

export default function RoadmapNode({ milestone, index, side }: RoadmapNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(new Set());
  const Icon = iconMap[milestone.icon] || Zap;

  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDropdowns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Card */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="group w-full cursor-pointer text-left focus:outline-none"
      >
        <div
          className="relative overflow-hidden rounded-2xl border transition-all duration-300"
          style={{
            borderColor: expanded ? milestone.color : "rgba(0,0,0,0.09)",
            background: "linear-gradient(145deg, #faf8f5 0%, #f4f1ec 100%)",
            boxShadow: expanded
              ? `0 20px 50px -10px ${milestone.color}30, 0 6px 20px rgba(0,0,0,0.08)`
              : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Active pulse indicator */}
          {milestone.isActive && (
            <div className="absolute top-3 right-3 z-10">
              <span className="relative flex h-3 w-3">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: milestone.color }}
                />
                <span
                  className="relative inline-flex h-3 w-3 rounded-full"
                  style={{ backgroundColor: milestone.color }}
                />
              </span>
            </div>
          )}

          {/* Color accent bar — gradient that fades out */}
          <div
            className="h-[3px] w-full"
            style={{
              background: `linear-gradient(90deg, ${milestone.color} 0%, ${milestone.color}80 60%, transparent 100%)`,
            }}
          />

          <div className="p-5">
            {/* Header row */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                style={{
                  backgroundColor: milestone.color,
                  boxShadow: `0 4px 12px ${milestone.color}50`,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {milestone.isActive ? (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${milestone.color}15`, color: milestone.color }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                          style={{ backgroundColor: milestone.color }}
                        />
                        <span
                          className="relative inline-flex h-2 w-2 rounded-full"
                          style={{ backgroundColor: milestone.color }}
                        />
                      </span>
                      {milestone.year}
                    </span>
                  ) : (
                    <span
                      className="text-xs font-bold tracking-wider uppercase"
                      style={{ color: milestone.color }}
                    >
                      {milestone.year}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-brand-dark font-[family-name:var(--font-heading)] leading-tight">
                  {milestone.role}
                </h3>
                {milestone.label && (
                  <p className="text-sm font-medium text-gray-500">{milestone.label}</p>
                )}
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                } group-hover:text-gray-500`}
              />
            </div>

            {/* GPA badge (Masters) */}
            {milestone.gpa && (
              <div className="mt-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold text-white"
                  style={{
                    backgroundColor: milestone.color,
                    boxShadow: `0 2px 8px ${milestone.color}50`,
                  }}
                >
                  GPA: {milestone.gpa}
                </span>
              </div>
            )}

          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className="border-t px-5 pt-5 pb-6"
                  style={{
                    borderColor: `${milestone.color}20`,
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(249,247,244,0.9))",
                  }}
                >
                  {/* Story */}
                  <p className="mb-5 text-[14px] leading-[1.8] text-gray-600 text-justify">
                    {milestone.story}
                  </p>

                  {/* Collaborator */}
                  {milestone.collaborator && (
                    <div
                      className="mb-4 flex items-start gap-2.5 rounded-xl px-4 py-3.5 border"
                      style={{
                        background: `linear-gradient(135deg, ${milestone.color}08 0%, transparent 100%)`,
                        borderColor: `${milestone.color}22`,
                      }}
                    >
                      <span
                        className="mt-1.5 flex h-2.5 w-2.5 shrink-0 rotate-45 rounded-[2px]"
                        style={{ backgroundColor: milestone.color }}
                      />
                      <p className="text-[13px] leading-relaxed text-gray-500">
                        Co-building with{" "}
                        {milestone.collaborator.linkedin ? (
                          <a
                            href={milestone.collaborator.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-bold text-brand-dark hover:underline decoration-brand-primary/40 underline-offset-2 transition-colors"
                          >
                            {milestone.collaborator.name}
                          </a>
                        ) : (
                          <span className="font-bold text-brand-dark">{milestone.collaborator.name}</span>
                        )}
                        <span className="mx-1 text-gray-300">—</span>
                        <span className="italic text-gray-400">{milestone.collaborator.context}</span>
                      </p>
                    </div>
                  )}

                  {/* Sub-roles for Accenture */}
                  {milestone.subRoles && (
                    <div className="mb-4 space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2 mb-2.5">
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to right, ${milestone.color}40, transparent)` }} />
                        Career Progression
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to left, ${milestone.color}40, transparent)` }} />
                      </h4>
                      {milestone.subRoles.map((sub) => {
                        const isSubOpen = expandedDropdowns.has(sub.title);
                        return (
                          <div
                            key={sub.title}
                            className="relative rounded-xl border overflow-hidden"
                            style={{ borderColor: `${milestone.color}20`, background: "rgba(255,255,255,0.65)" }}
                          >
                            <div
                              className="absolute left-0 top-0 h-full w-[3px]"
                              style={{ background: `linear-gradient(to bottom, ${milestone.color}, ${milestone.color}60)` }}
                            />
                            <div
                              className="flex items-center justify-between p-3 pl-5 cursor-pointer hover:bg-stone-50/80 transition-colors"
                              onClick={(e) => toggleDropdown(sub.title, e)}
                            >
                              <div>
                                <p className="text-sm font-bold text-brand-dark">
                                  {sub.title}
                                </p>
                                <p className="text-xs text-gray-400">{sub.period}</p>
                              </div>
                              <ChevronDown
                                className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isSubOpen ? "rotate-180" : ""}`}
                              />
                            </div>
                            <AnimatePresence>
                              {isSubOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <ul className="space-y-2 px-5 pb-3.5 pt-2" style={{ borderTop: `1px solid ${milestone.color}15` }}>
                                    {sub.description.map((point) => (
                                      <li key={point} className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-500">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: milestone.color }} />
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Courses with grades (Masters) */}
                  {milestone.courses && (
                    <div className="mb-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2 mb-2.5">
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to right, ${milestone.color}40, transparent)` }} />
                        Coursework
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to left, ${milestone.color}40, transparent)` }} />
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {milestone.courses.map((c, ci) => (
                          <div
                            key={c.name}
                            className="flex items-center justify-between rounded-lg px-3 py-2"
                            style={{ background: ci % 2 === 0 ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.30)" }}
                          >
                            <span className="text-xs text-gray-600">{c.name}</span>
                            <span
                              className="ml-2 text-xs font-bold"
                              style={{ color: milestone.color }}
                            >
                              {c.grade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transcript button (Masters) */}
                  {milestone.transcriptPdf && (
                    <a
                      href={milestone.transcriptPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mb-4 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all border"
                      style={{
                        color: milestone.color,
                        borderColor: `${milestone.color}35`,
                        background: `${milestone.color}08`,
                      }}
                    >
                      <Paperclip className="h-3.5 w-3.5" />
                      View Transcript
                    </a>
                  )}

                  {/* Core subjects (Bachelors) */}
                  {milestone.coreSubjects && (
                    <div className="mb-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2 mb-2.5">
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to right, ${milestone.color}40, transparent)` }} />
                        Core Subjects
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to left, ${milestone.color}40, transparent)` }} />
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {milestone.coreSubjects.map((s) => (
                          <Badge key={s} variant="tech">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Endorsements */}
                  {milestone.endorsers && (
                    <div className="mb-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2 mb-2.5">
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to right, ${milestone.color}40, transparent)` }} />
                        Technical Endorsements
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to left, ${milestone.color}40, transparent)` }} />
                      </h4>
                      <div className="space-y-2">
                        {milestone.endorsers.map((endorser) => {
                          const isOpen = expandedDropdowns.has(endorser.name);
                          return (
                            <div
                              key={endorser.name}
                              className="rounded-xl border overflow-hidden"
                              style={{ borderColor: `${milestone.color}20`, background: "rgba(255,255,255,0.65)" }}
                            >
                              <div
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-stone-50/80 transition-colors"
                                onClick={(e) => toggleDropdown(endorser.name, e)}
                              >
                                <div>
                                  <p className="text-sm font-bold text-brand-dark">{endorser.name}</p>
                                  <p className="text-[11px] text-gray-400">{endorser.title}</p>
                                </div>
                                <ChevronDown
                                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                              </div>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="space-y-2.5 px-3.5 pb-3.5 pt-2" style={{ borderTop: `1px solid ${milestone.color}15` }}>
                                      {endorser.endorsements.map((e) => (
                                        <div key={e.quote} className="flex gap-2">
                                          <Quote className="mt-0.5 h-3 w-3 shrink-0 text-gray-300" />
                                          <p className="text-xs italic leading-relaxed text-gray-500">
                                            {e.quote}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {milestone.metrics && (
                    <div className="mb-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2 mb-2.5">
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to right, ${milestone.color}40, transparent)` }} />
                        Key Highlights
                        <span className="h-px flex-1" style={{ background: `linear-gradient(to left, ${milestone.color}40, transparent)` }} />
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {milestone.metrics.map((m) => (
                          <Badge key={m} variant="metric">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2 mb-2.5">
                      <span className="h-px flex-1" style={{ background: `linear-gradient(to right, ${milestone.color}40, transparent)` }} />
                      Tech Stack
                      <span className="h-px flex-1" style={{ background: `linear-gradient(to left, ${milestone.color}40, transparent)` }} />
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {milestone.tech.map((t) => (
                        <Badge key={t} variant="tech">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  );
}
