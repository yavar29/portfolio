"use client";

import { Brain, Sparkles, Code2, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = { Brain, Sparkles, Code2 };

const CARD_THEMES = [
  {
    accent: "from-violet-500 to-purple-600",
    accentLight: "from-violet-400/20 to-purple-400/10",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-600",
    iconHoverBg: "group-hover:bg-violet-500",
    tagDot: "bg-violet-400",
    tagBg: "bg-violet-50 text-violet-700 border-violet-200/60",
    number: "text-violet-300/10",
    glow: "rgba(139,92,246,0.08)",
  },
  {
    accent: "from-sky-500 to-blue-600",
    accentLight: "from-sky-400/20 to-blue-400/10",
    iconBg: "bg-sky-500/10",
    iconText: "text-sky-600",
    iconHoverBg: "group-hover:bg-sky-500",
    tagDot: "bg-sky-400",
    tagBg: "bg-sky-50 text-sky-700 border-sky-200/60",
    number: "text-sky-300/10",
    glow: "rgba(14,165,233,0.08)",
  },
  {
    accent: "from-teal-500 to-emerald-600",
    accentLight: "from-teal-400/20 to-emerald-400/10",
    iconBg: "bg-teal-500/10",
    iconText: "text-teal-600",
    iconHoverBg: "group-hover:bg-teal-500",
    tagDot: "bg-teal-400",
    tagBg: "bg-teal-50 text-teal-700 border-teal-200/60",
    number: "text-teal-300/10",
    glow: "rgba(20,184,166,0.08)",
  },
];

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  index: number;
}

export default function ServiceCard({ icon, title, description, tags, index }: ServiceCardProps) {
  const Icon = iconMap[icon] || Brain;
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
    >
      <div className="group relative rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 p-8 h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-300/80">
        {/* Gradient left stripe */}
        <div className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b ${theme.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Large faded number */}
        <span className={`absolute -top-3 -right-2 text-[7rem] font-black leading-none ${theme.number} font-[family-name:var(--font-heading)] select-none pointer-events-none group-hover:opacity-100 transition-opacity duration-500`}>
          {num}
        </span>

        {/* Hover glow */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 70%)` }}
        />

        {/* Icon */}
        <div className={`relative z-10 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText} ${theme.iconHoverBg} group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
          <Icon size={24} />
        </div>

        {/* Title */}
        <h3 className="relative z-10 mb-3 text-xl font-bold font-[family-name:var(--font-heading)] text-brand-dark">
          {title}
        </h3>

        {/* Description */}
        <p className="relative z-10 mb-6 text-sm leading-relaxed text-gray-500 text-justify flex-1">
          {description}
        </p>

        {/* Tags with colored dots */}
        <div className="relative z-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium border ${theme.tagBg}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${theme.tagDot} shrink-0`} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
