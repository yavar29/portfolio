"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A list whose `.reveal-item` children fade up in sequence when it scrolls into view.
 * Server HTML is fully visible; the list is hidden only if it starts below the fold,
 * so there is no flash on load and nothing is lost without JavaScript.
 */
export default function RevealList({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);

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
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
