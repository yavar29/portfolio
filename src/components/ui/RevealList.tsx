"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A container whose `.reveal-item` children fade up in sequence when it scrolls into view.
 * Server HTML is fully visible; the container is hidden only if it starts below the fold,
 * so there is no flash on load and nothing is lost without JavaScript.
 */
export default function RevealList({
  children,
  className,
  as: Tag = "ul",
  label,
}: {
  children: ReactNode;
  className?: string;
  as?: "ul" | "ol" | "div" | "figure";
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || list.getBoundingClientRect().top < window.innerHeight * 0.88) return;

    list.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        list.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    // The ref type is widened so one component can render any of the allowed tags.
    <Tag ref={ref as React.RefObject<never>} className={className} aria-label={label}>
      {children}
    </Tag>
  );
}
