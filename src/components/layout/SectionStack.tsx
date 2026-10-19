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
    // Always the sections as they are now: a section can be re-rendered as a new element, and a
    // stale one measures as nothing, which sent in-page links to the top of the page.
    const sheets = () => Array.from(root.children) as HTMLElement[];
    const marginTop = (sheet: HTMLElement) => parseFloat(getComputedStyle(sheet).marginTop) || 0;
    const marginBottom = (sheet: HTMLElement) => parseFloat(getComputedStyle(sheet).marginBottom) || 0;

    // A sheet pins once the strip the next sheet overlaps has gone below the screen's bottom
    // edge. The sheet's bottom margin (the dwell) then scrolls by behind it, so the next sheet
    // only starts to slide up after that. Sheets no taller than the screen (plus that strip)
    // pin at the top.
    const layout = () => {
      const viewport = window.innerHeight;
      const all = sheets();
      all.forEach((sheet, i) => {
        const next = all[i + 1];
        const overlap = next ? -marginTop(next) : 0;
        sheet.style.setProperty("--sheet-top", `${Math.min(0, viewport + overlap - sheet.offsetHeight)}px`);
      });
    };

    let frame = 0;
    const paint = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const all = sheets();
      for (let i = 0; i < all.length - 1; i++) {
        const nextTop = all[i + 1].getBoundingClientRect().top;
        const cover = Math.min(1, Math.max(0, 1 - nextTop / viewport));
        all[i].style.setProperty("--cover", cover.toFixed(3));
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
    const flowTop = (all: HTMLElement[], index: number) => {
      let top = root.getBoundingClientRect().top + window.scrollY;
      // The dwell (a positive bottom margin) and the overlap (a negative top margin) collapse
      // into one gap, which is their sum.
      for (let j = 0; j < index; j++) top += all[j].offsetHeight + marginBottom(all[j]) + marginTop(all[j + 1]);
      return top;
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const all = sheets();
      const index = all.findIndex((sheet) => `#${sheet.id}` === link.getAttribute("href"));
      if (index < 0) return;
      e.preventDefault();
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: flowTop(all, index), behavior: smooth ? "smooth" : "auto" });
      history.pushState(null, "", link.getAttribute("href"));
    };

    layout();
    paint();
    root.dataset.stack = "on";

    const resize = new ResizeObserver(relayout);
    const watch = () => {
      resize.disconnect();
      for (const sheet of sheets()) resize.observe(sheet);
      relayout();
    };
    watch();
    // Re-measure and re-observe whenever a section is swapped for a new element.
    const mutations = new MutationObserver(watch);
    mutations.observe(root, { childList: true });
    window.addEventListener("resize", relayout);
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutations.disconnect();
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
