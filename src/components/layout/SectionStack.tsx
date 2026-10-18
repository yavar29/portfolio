"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lays the page sections out as stacked sheets: each section holds still once it is fully
 * in view, and the next one slides up over it while it dims.
 * The rounded, overlapping edges are plain CSS; this component only adds the sticky offsets
 * (which depend on each section's height) and the dimming.
 */
export default function SectionStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const sheets = Array.from(root.children) as HTMLElement[];

    // A sheet pins once the strip the next sheet overlaps has gone below the screen's bottom
    // edge, so the next sheet only comes into view as it slides up. Sheets no taller than the
    // screen (plus that strip) pin at the top.
    const layout = () => {
      const viewport = window.innerHeight;
      sheets.forEach((sheet, i) => {
        const next = sheets[i + 1];
        const overlap = next ? -parseFloat(getComputedStyle(next).marginTop) || 0 : 0;
        sheet.style.setProperty("--sheet-top", `${Math.min(0, viewport + overlap - sheet.offsetHeight)}px`);
      });
    };

    let frame = 0;
    const paint = () => {
      frame = 0;
      const viewport = window.innerHeight;
      for (let i = 0; i < sheets.length - 1; i++) {
        const nextTop = sheets[i + 1].getBoundingClientRect().top;
        const cover = Math.min(1, Math.max(0, 1 - nextTop / viewport));
        sheets[i].style.setProperty("--cover", cover.toFixed(3));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const relayout = () => {
      layout();
      schedule();
    };

    // A pinned section reports where it is stuck, not where it sits in the page, so in-page
    // links would land in the wrong place. Scroll to the section's place in the flow instead.
    const flowTop = (index: number) => {
      let top = root.getBoundingClientRect().top + window.scrollY;
      for (let j = 0; j < index; j++) {
        top += sheets[j].offsetHeight + parseFloat(getComputedStyle(sheets[j + 1]).marginTop);
      }
      return top;
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const index = link ? sheets.findIndex((sheet) => `#${sheet.id}` === link.getAttribute("href")) : -1;
      if (!link || index < 0) return;
      e.preventDefault();
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: flowTop(index), behavior: smooth ? "smooth" : "auto" });
      history.pushState(null, "", link.getAttribute("href"));
    };

    layout();
    paint();
    root.dataset.stack = "on";

    const observer = new ResizeObserver(relayout);
    for (const sheet of sheets) observer.observe(sheet);
    window.addEventListener("resize", relayout);
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", relayout);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("click", onClick);
      delete root.dataset.stack;
    };
  }, []);

  return (
    <div ref={ref} className="section-stack">
      {children}
    </div>
  );
}
