"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Code2, Brain, Database, Cloud, Wrench } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const SKILL_THEMES = [
  {
    icon: Code2,
    gradient: "from-violet-500 to-indigo-500",
    iconBg: "bg-violet-100",
    iconText: "text-violet-600",
    badge: "bg-violet-50 text-violet-700 border border-violet-200/60",
    glow: "group-hover:shadow-violet-200/50",
  },
  {
    icon: Brain,
    gradient: "from-fuchsia-500 to-purple-600",
    iconBg: "bg-fuchsia-100",
    iconText: "text-fuchsia-600",
    badge: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200/60",
    glow: "group-hover:shadow-fuchsia-200/50",
  },
  {
    icon: Database,
    gradient: "from-teal-500 to-emerald-500",
    iconBg: "bg-teal-100",
    iconText: "text-teal-600",
    badge: "bg-teal-50 text-teal-700 border border-teal-200/60",
    glow: "group-hover:shadow-teal-200/50",
  },
  {
    icon: Cloud,
    gradient: "from-sky-500 to-blue-500",
    iconBg: "bg-sky-100",
    iconText: "text-sky-600",
    badge: "bg-sky-50 text-sky-700 border border-sky-200/60",
    glow: "group-hover:shadow-sky-200/50",
  },
  {
    icon: Wrench,
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100",
    iconText: "text-amber-600",
    badge: "bg-amber-50 text-amber-700 border border-amber-200/60",
    glow: "group-hover:shadow-amber-200/50",
  },
];

interface SkillCategoryProps {
  title: string;
  skills: string[];
  index: number;
}

export default function SkillCategoryCard({ title, skills, index }: SkillCategoryProps) {
  const theme = SKILL_THEMES[index % SKILL_THEMES.length];
  const Icon = theme.icon;

  return (
    <AnimateOnScroll delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300",
          theme.glow
        )}
      >
        {/* Gradient header strip */}
        <div className={cn("h-1.5 w-full bg-gradient-to-r", theme.gradient)} />

        <div className="flex flex-col gap-4 p-6">
          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", theme.iconBg)}>
              <Icon size={20} className={theme.iconText} />
            </div>
            <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-brand-dark">
              {title}
            </h3>
          </div>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-105",
                  theme.badge
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimateOnScroll>
  );
}
