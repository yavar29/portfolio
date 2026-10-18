"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1024px) 640px, (min-width: 640px) 420px, 340px";
const HOVER_SPRING = { stiffness: 140, damping: 20, mass: 0.7 };
const LIFT_SPRING = { stiffness: 90, damping: 24, mass: 0.6 };

/**
 * Black panel holding the black-and-white portrait. The portrait stands on the section's
 * bottom edge and breaks past the panel's right edge on wide screens. It opens with a
 * curtain the first time the panel scrolls into view and rises gently with the scroll. On
 * desktop, hovering makes it step forward (a small scale from its feet) and drift toward
 * the cursor. No rotation, so the cut-out never skews and its bottom edge stays planted.
 */
export default function AboutPortrait({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll: 0 when the panel's top meets the bottom of the viewport, 1 when it reaches the top.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start start"] });
  const lift = useSpring(useTransform(scrollYProgress, [0, 1], [48, 0]), LIFT_SPRING);

  // Hover: whether the pointer is over the panel, and where across it (-0.5 to 0.5).
  const hovering = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const smoothHover = useSpring(hovering, HOVER_SPRING);
  const smoothX = useSpring(pointerX, HOVER_SPRING);
  const step = useTransform(
    () => `translate3d(${smoothX.get() * 16}px, 0, 0) scale(${1 + smoothHover.get() * 0.03})`
  );

  useMotionValueEvent(lift, "change", (y) => {
    if (liftRef.current && !reduceMotion) liftRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
  });
  useMotionValueEvent(step, "change", (transform) => {
    if (stepRef.current) stepRef.current.style.transform = transform;
  });

  // Curtain reveal, only when the panel starts below the fold.
  useEffect(() => {
    if (liftRef.current) liftRef.current.style.transform = reduceMotion ? "" : `translate3d(0, ${lift.get()}px, 0)`;
    const stage = stageRef.current;
    if (!stage || reduceMotion || stage.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    stage.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        stage.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [reduceMotion, lift]);

  // Hover step, for mouse and trackpad only.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      hovering.set(1);
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    };
    const onLeave = () => {
      hovering.set(0);
      pointerX.set(0);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, hovering, pointerX]);

  return (
    <div ref={stageRef} className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute inset-y-0 -left-[100vw] -right-[100vw] bg-night bg-[radial-gradient(circle,rgb(255_255_255/0.06)_1px,transparent_1.25px)] bg-[length:24px_24px] lg:right-0"
      />
      <div
        ref={liftRef}
        className="absolute bottom-0 left-1/2 h-[92%] w-max -translate-x-1/2 lg:left-auto lg:-right-[30%] lg:h-[84%] lg:translate-x-0"
      >
        <div ref={stepRef} className="h-full origin-bottom">
          <picture className="curtain block h-full">
            <source
              type="image/avif"
              srcSet="/images/yavar-about-480.avif 480w, /images/yavar-about-720.avif 720w, /images/yavar-about-896.avif 896w"
              sizes={SIZES}
            />
            <source
              type="image/webp"
              srcSet="/images/yavar-about-480.webp 480w, /images/yavar-about-720.webp 720w, /images/yavar-about-896.webp 896w"
              sizes={SIZES}
            />
            <img
              src="/images/yavar-about-720.webp"
              alt="Yavar Khan"
              width={896}
              height={1045}
              loading="lazy"
              decoding="async"
              className="block h-full w-auto max-w-none"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
