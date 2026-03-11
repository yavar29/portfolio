"use client";

import Badge from "./Badge";
import AnimateOnScroll from "./AnimateOnScroll";

interface TimelineItemProps {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  index: number;
  isLast: boolean;
}

export default function TimelineItem({
  period,
  title,
  subtitle,
  description,
  highlights,
  index,
  isLast,
}: TimelineItemProps) {
  return (
    <AnimateOnScroll delay={index * 0.15}>
      <div className="relative pl-8 pb-12 last:pb-0">
        {/* Vertical line */}
        {!isLast && (
          <div className="absolute left-[7px] top-3 h-full w-0.5 bg-gray-200" />
        )}
        {/* Dot */}
        <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-[3px] border-teal-500 bg-white" />

        <div className="rounded-xl bg-gray-50 p-6 shadow-sm border border-gray-200">
          <span className="mb-1 inline-block text-xs font-semibold tracking-wider text-teal-600 uppercase">
            {period}
          </span>
          <h3 className="mb-1 text-lg font-bold font-[family-name:var(--font-heading)] text-brand-dark">
            {title}
          </h3>
          <p className="mb-3 text-sm font-medium text-gray-500">{subtitle}</p>
          <p className="mb-4 text-sm leading-relaxed text-gray-500">{description}</p>
          <div className="flex flex-wrap gap-2">
            {highlights.map((h) => (
              <Badge key={h} variant="metric">{h}</Badge>
            ))}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
