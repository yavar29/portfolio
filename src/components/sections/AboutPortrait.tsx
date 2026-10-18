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
const TILT_SPRING = { stiffness: 120, damping: 16, mass: 0.6 };

/**
 * Black panel holding the black-and-white portrait. The portrait stands on the section's
 * bottom edge and breaks past the panel's right edge on wide screens. It opens with a
 * curtain the first time the panel scrolls into view, rises gently with the scroll, and
 * on desktop leans a few degrees toward the cursor, pivoting on its bottom edge.
 */
export default function AboutPortrait({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll: 0 when the panel's top meets the bottom of the viewport, 1 when it reaches the top.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [72, 0]);

  // Pointer position over the panel, -0.5 to 0.5 on each axis, smoothed by springs.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, TILT_SPRING);
  const smoothY = useSpring(pointerY, TILT_SPRING);
  const tilt = useTransform(
    () =>
      `perspective(1200px) rotateY(${smoothX.get() * 7}deg) rotateX(${smoothY.get() * -4}deg) translate3d(${smoothX.get() * 14}px, 0, 0)`
  );

  useMotionValueEvent(lift, "change", (y) => {
    if (liftRef.current && !reduceMotion) liftRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
  });
  useMotionValueEvent(tilt, "change", (transform) => {
    if (tiltRef.current) tiltRef.current.style.transform = transform;
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

  // Hover tilt, for mouse and trackpad only.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, pointerX, pointerY]);

  return (
    <div ref={stageRef} className={cn("relative", className)}>
      <div aria-hidden className="absolute inset-y-0 -left-[100vw] -right-[100vw] bg-night lg:right-0" />
      <div
        ref={liftRef}
        className="absolute bottom-0 left-1/2 h-[92%] w-max -translate-x-1/2 lg:left-auto lg:-right-[30%] lg:h-[84%] lg:translate-x-0"
      >
        <div ref={tiltRef} className="h-full origin-bottom will-change-transform">
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
