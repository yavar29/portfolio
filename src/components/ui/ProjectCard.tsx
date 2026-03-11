"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORY_THEMES: Record<
  string,
  {
    accent: string;
    accentGlow: string;
    badge: string;
    dot: string;
    metric: string;
    hoverWash: string;
    bracketColor: string;
    tagDot: string;
  }
> = {
  GenAI: {
    accent: "from-amber-400 via-orange-500 to-rose-400",
    accentGlow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    badge: "bg-amber-50/80 text-amber-700 border-amber-200/60",
    dot: "bg-amber-500",
    metric:
      "bg-gradient-to-r from-amber-50 to-orange-50/80 text-amber-700 border-amber-200/40",
    hoverWash: "from-amber-100/20",
    bracketColor:
      "border-amber-300/40 group-hover:border-amber-400/60",
    tagDot: "bg-amber-300",
  },
  "ML/DL": {
    accent: "from-indigo-400 via-violet-500 to-purple-400",
    accentGlow: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
    badge: "bg-violet-50/80 text-violet-700 border-violet-200/60",
    dot: "bg-violet-500",
    metric:
      "bg-gradient-to-r from-violet-50 to-indigo-50/80 text-violet-700 border-violet-200/40",
    hoverWash: "from-violet-100/20",
    bracketColor:
      "border-violet-300/40 group-hover:border-violet-400/60",
    tagDot: "bg-violet-300",
  },
};

interface ProjectCardProps {
  title: string;
  description: string;
  metrics: string[];
  tags: string[];
  github: string;
  category?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  metrics,
  tags,
  github,
  category = "ML/DL",
}: ProjectCardProps) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES["ML/DL"];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div
        className={cn(
          "group relative flex h-full overflow-hidden rounded-xl",
          "bg-white/75 backdrop-blur-sm",
          "border border-gray-200/50",
          "transition-all duration-300",
          "hover:shadow-2xl hover:shadow-gray-200/60",
          "hover:border-gray-300/70"
        )}
      >
        {/* Left gradient accent bar */}
        <div
          className={cn(
            "relative w-1.5 shrink-0 bg-gradient-to-b transition-all duration-500",
            theme.accent,
            "group-hover:w-2",
            theme.accentGlow
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-6">
          {/* Hover gradient wash */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-tr via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
              theme.hoverWash
            )}
          />

          {/* Corner brackets */}
          <div
            className={cn(
              "absolute top-3 right-3 w-3.5 h-3.5 border-t-[1.5px] border-r-[1.5px] rounded-tr-sm transition-colors duration-300",
              theme.bracketColor
            )}
          />
          <div
            className={cn(
              "absolute bottom-3 left-3 w-3.5 h-3.5 border-b-[1.5px] border-l-[1.5px] rounded-bl-sm transition-colors duration-300",
              theme.bracketColor
            )}
          />

          {/* Top row: Category + GitHub */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase",
                theme.badge
              )}
            >
              <span
                className={cn("h-1.5 w-1.5 rounded-full", theme.dot)}
              />
              {category}
            </span>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-300 hover:text-white hover:bg-brand-primary transition-all duration-200"
              aria-label={`View ${title} on GitHub`}
            >
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-lg font-bold font-[family-name:var(--font-heading)] text-brand-dark group-hover:text-brand-primary transition-colors duration-200 mb-2.5">
            {title}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-[13px] leading-relaxed text-gray-500 mb-5 flex-1">
            {description}
          </p>

          {/* Metrics */}
          <div className="relative z-10 mb-4 flex flex-wrap gap-2">
            {metrics.map((m) => (
              <span
                key={m}
                className={cn(
                  "inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold",
                  theme.metric
                )}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Tags as inline text with colored dots */}
          <div className="relative z-10 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 text-[11px] text-gray-400 font-medium"
              >
                {i > 0 && (
                  <span
                    className={cn(
                      "h-[3px] w-[3px] rounded-full",
                      theme.tagDot
                    )}
                  />
                )}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
