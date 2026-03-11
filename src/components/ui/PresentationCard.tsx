"use client";

import { useState } from "react";
import { FileText, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PresentationCardProps {
  title: string;
  course: string;
  institution: string;
  description: string;
  highlights: string[];
  tags: string[];
  pdfUrl: string;
  index: number;
}

export default function PresentationCard({
  title,
  description,
  highlights,
  tags,
  pdfUrl,
}: PresentationCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="group relative flex h-full overflow-hidden rounded-xl bg-white/75 backdrop-blur-sm border border-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/60 hover:border-gray-300/70">
        {/* Left gradient accent bar */}
        <div className="relative w-1.5 shrink-0 bg-gradient-to-b from-amber-400 via-orange-500 to-rose-400 transition-all duration-500 group-hover:w-2 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-6">
          {/* Hover gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Corner brackets */}
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-[1.5px] border-r-[1.5px] rounded-tr-sm border-amber-300/40 group-hover:border-amber-400/60 transition-colors duration-300" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-[1.5px] border-l-[1.5px] rounded-bl-sm border-amber-300/40 group-hover:border-amber-400/60 transition-colors duration-300" />

          {/* Top row: Badge + PDF link */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-md border bg-amber-50/80 text-amber-700 border-amber-200/60 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
              <FileText size={11} />
              Presentation
            </span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-300 hover:text-white hover:bg-brand-primary transition-all duration-200"
              aria-label={`View ${title} PDF`}
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

          {/* Expandable highlights */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative z-10 mb-3 flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
          >
            Key Highlights
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 mb-4 space-y-1.5 overflow-hidden"
              >
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs text-gray-500"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {h}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Tags as inline text with colored dots */}
          <div className="relative z-10 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 text-[11px] text-gray-400 font-medium"
              >
                {i > 0 && (
                  <span className="h-[3px] w-[3px] rounded-full bg-amber-300" />
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
