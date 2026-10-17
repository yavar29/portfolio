"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useSpring } from "motion/react";

// Furthest the color field travels, in px, when the cursor reaches a viewport edge.
const PARALLAX = 14;
const SPRING = { stiffness: 36, damping: 18 };

/**
 * Slow violet color field behind the hero. The drift is a CSS animation so it
 * runs before hydration; this component only pauses it off-screen and adds a
 * faint cursor parallax on desktop.
 */
export default function HeroAmbient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const paint = () => {
    if (layerRef.current) {
      layerRef.current.style.transform = `translate3d(${x.get()}px, ${y.get()}px, 0)`;
    }
  };
  useMotionValueEvent(x, "change", paint);
  useMotionValueEvent(y, "change", paint);

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.parentElement;
    if (!root || !hero) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const onMove = (e: PointerEvent) => {
      x.set((0.5 - e.clientX / window.innerWidth) * PARALLAX * 2);
      y.set((0.5 - e.clientY / window.innerHeight) * PARALLAX * 2);
    };

    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) window.addEventListener("pointermove", onMove, { passive: true });
      else window.removeEventListener("pointermove", onMove);
    };

    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute("data-paused", !entry.isIntersecting);
      listen(entry.isIntersecting && finePointer.matches && !reduceMotion);
    });
    observer.observe(hero);

    return () => {
      observer.disconnect();
      listen(false);
    };
  }, [reduceMotion, x, y]);

  return (
    <div ref={rootRef} aria-hidden className="hero-ambient">
      <div ref={layerRef} className="hero-ambient-layer">
        <span className="hero-blob hero-blob-a" />
        <span className="hero-blob hero-blob-b" />
        <span className="hero-blob hero-blob-c" />
        <span className="hero-blob hero-blob-d" />
      </div>
      <div className="hero-grain" />
    </div>
  );
}
