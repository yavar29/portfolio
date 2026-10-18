"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1024px) 520px, (min-width: 640px) 380px, 300px";

/**
 * Black panel holding the black-and-white portrait. The portrait stands on the section's
 * bottom edge and breaks past the panel's right edge on wide screens. It opens with a
 * curtain the first time the panel scrolls into view, then rises gently with the scroll.
 */
export default function AboutPortrait({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 when the panel's top meets the bottom of the viewport, 1 when it reaches the top.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [72, 0]);

  useMotionValueEvent(lift, "change", (y) => {
    if (liftRef.current && !reduceMotion) liftRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
  });

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

  return (
    <div ref={stageRef} className={cn("relative", className)}>
      <div aria-hidden className="absolute inset-y-0 -left-[100vw] -right-[100vw] bg-night lg:right-0" />
      <div
        ref={liftRef}
        className="absolute bottom-0 left-1/2 h-[92%] w-max -translate-x-1/2 lg:left-auto lg:-right-[30%] lg:h-[90%] lg:translate-x-0"
      >
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
            height={1152}
            loading="lazy"
            decoding="async"
            className="block h-full w-auto max-w-none"
          />
        </picture>
      </div>
    </div>
  );
}
