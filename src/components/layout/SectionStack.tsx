"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lays the page sections out as stacked sheets: each section holds still once it is fully
 * in view, and the next one slides up over it while it dims.
 * The rounded, overlapping edges and the sticky offsets are CSS; this component only measures
 * each sheet's height for that CSS and drives the dimming.
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

    // The sticky offset is worked out in CSS against the large viewport (100lvh), which does not
    // change when a phone's browser bars slide in and out. All it needs is each sheet's height,
    // measured here only when a sheet itself changes size.
    const heights = new WeakMap<HTMLElement, number>();
    const measure = () => {
      for (const sheet of sheets()) {
        const h = sheet.offsetHeight;
        if (heights.get(sheet) === h) continue;
        heights.set(sheet, h);
        sheet.style.setProperty("--sheet-h", `${h}px`);
      }
    };

    // Each sheet dims under a layer of its own whose opacity is the only thing that changes,
    // so scrolling never restyles a section's content.
    const covers = new WeakMap<HTMLElement, HTMLElement>();
    const opacities = new WeakMap<HTMLElement, string>();
    const ensureCovers = () => {
      for (const sheet of sheets()) {
        if (covers.get(sheet)?.parentElement === sheet) continue;
        const cover = document.createElement("div");
        cover.className = "sheet-cover";
        cover.setAttribute("aria-hidden", "true");
        sheet.appendChild(cover);
        covers.set(sheet, cover);
        opacities.delete(sheet);
      }
    };

    let frame = 0;
    const paint = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const all = sheets();
      // Read every position first, then write, so the browser lays out once.
      const tops = all.map((sheet) => sheet.getBoundingClientRect().top);
      for (let i = 0; i < all.length - 1; i++) {
        const cover = Math.min(1, Math.max(0, 1 - tops[i + 1] / viewport));
        const opacity = (cover * 0.5).toFixed(3);
        if (opacities.get(all[i]) === opacity) continue;
        opacities.set(all[i], opacity);
        const layer = covers.get(all[i]);
        if (layer) layer.style.opacity = opacity;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
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

    const resize = new ResizeObserver(() => {
      measure();
      schedule();
    });
    const watch = () => {
      ensureCovers();
      resize.disconnect();
      for (const sheet of sheets()) resize.observe(sheet);
      measure();
      schedule();
    };
    watch();
    root.dataset.stack = "on";
    // Re-measure and re-observe whenever a section is swapped for a new element.
    const mutations = new MutationObserver(watch);
    mutations.observe(root, { childList: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("click", onClick);
      delete root.dataset.stack;
      for (const sheet of sheets()) covers.get(sheet)?.remove();
    };
  }, []);

  return (
    <div ref={ref} className="section-stack">
      {children}
    </div>
  );
}
