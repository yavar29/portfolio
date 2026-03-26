"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

/* ─── Tag size system ─── */
const SIZE_CLS: Record<string, string> = {
  sm: "px-3 py-1 text-[10px]",
  md: "px-4 py-1.5 text-xs",
  lg: "px-5 py-2 text-[13px]",
};

interface FloatingTag {
  label: string;
  x: string;
  y: string;
  delay: number;
  size: "sm" | "md" | "lg";
}

const floatingTags: FloatingTag[] = [
  // Top row — spread wide
  { label: "LangChain",     x: "5%",  y: "14%", delay: 0,   size: "lg" },
  { label: "PyTorch",        x: "82%", y: "12%", delay: 0.6, size: "lg" },
  // Upper-mid — staggered left/right
  { label: "MCP",            x: "20%", y: "30%", delay: 0.4, size: "md" },
  { label: "Pinecone",       x: "80%", y: "28%", delay: 1.3, size: "sm" },
  // Mid row — offset from center, not too close to photo
  { label: "AWS",            x: "4%",  y: "44%", delay: 0.9, size: "md" },
  { label: "LangSmith",      x: "85%", y: "42%", delay: 1.0, size: "sm" },
  // Lower-mid — spread wide
  { label: "GCP",            x: "18%", y: "56%", delay: 0.7, size: "md" },
  { label: "LangGraph",      x: "78%", y: "54%", delay: 1.5, size: "md" },
  // Bottom row — wide and low
  { label: "RAG Pipelines",  x: "3%",  y: "68%", delay: 1.2, size: "md" },
  { label: "Claude Code",   x: "8%",  y: "78%", delay: 0.8, size: "md" },
  { label: "Multi-Agent AI", x: "75%", y: "66%", delay: 0.3, size: "lg" },
  { label: "LLMOps",         x: "86%", y: "76%", delay: 0.5, size: "md" },
];

/* Spring-like cubic bezier for premium entrance feel */
const EASE_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden pt-16 border-b-2 border-black"
    >
      {/* ── Dot grid pattern overlay ── */}
      <div className="pointer-events-none absolute inset-0 hero-dots opacity-[0.3]" />

      {/* ── Animated gradient blobs ── */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[700px] w-[700px] rounded-full bg-lavender-400/30 blur-3xl animate-mesh-drift-1" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[550px] w-[550px] rounded-full bg-teal-300/35 blur-3xl animate-mesh-drift-2" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-violet-300/35 blur-3xl animate-mesh-drift-3" />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-amber-200/30 blur-3xl animate-mesh-drift-1"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="pointer-events-none absolute top-[15%] left-[10%] h-[250px] w-[250px] rounded-full bg-rose-200/25 blur-3xl animate-mesh-drift-2"
        style={{ animationDelay: "-5s" }}
      />

      {/* ── Floating accent nodes ── */}
      <div className="pointer-events-none absolute top-[15%] right-[12%] h-2.5 w-2.5 rounded-full bg-brand-primary/25 animate-float-gentle shadow-[0_0_10px_rgba(108,72,197,0.15)]" />
      <div
        className="pointer-events-none absolute top-[65%] left-[8%] h-2 w-2 rounded-full bg-teal-400/20 animate-float-gentle-alt"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="pointer-events-none absolute bottom-[20%] right-[6%] h-2 w-2 rounded-full bg-amber-400/20 animate-float-gentle"
        style={{ animationDelay: "2.5s" }}
      />

      {/* ── Pulse ring ── */}
      <div className="pointer-events-none absolute top-[25%] left-[15%] hidden lg:block">
        <div className="relative h-3 w-3">
          <span className="absolute inset-0 rounded-full bg-lavender-400/20 animate-pulse-ring" />
          <span className="absolute inset-[4px] rounded-full bg-lavender-400/35" />
        </div>
      </div>

      {/* ── Floating tech tags (desktop only) ── */}
      {floatingTags.map((tag) => (
        <motion.div
          key={tag.label}
          className="hidden lg:block absolute z-20 pointer-events-none"
          style={{ left: tag.x, top: tag.y }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: tag.delay + 1.0, duration: 0.5, ease: EASE_SPRING }}
        >
          <motion.div
            className={`
              rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60
              shadow-lg text-gray-600
              font-semibold font-[family-name:var(--font-heading)]
              ${SIZE_CLS[tag.size]}
            `}
            animate={{
              y: [0, -(8 + tag.delay * 4), 0],
              x: [0, tag.delay % 2 === 0 ? 5 : -5, 0],
              rotate: [0, tag.delay % 2 === 0 ? 1.5 : -1.5, 0],
            }}
            transition={{
              duration: 5 + tag.delay * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {tag.label}
          </motion.div>
        </motion.div>
      ))}

      {/* ── Left social sidebar ── */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-5">
        <div className="h-16 w-px bg-gray-300" />
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#333] hover:scale-110 transition-transform"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0A66C2] hover:scale-110 transition-transform"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={SOCIAL_LINKS.email}
          className="text-[#EA4335] hover:scale-110 transition-transform"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
        <div className="h-16 w-px bg-gray-300" />
      </div>

      {/* ── Centered stacked content ── */}
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        {/* ── Photo with multi-ring system ── */}
        <motion.div
          className="relative mx-auto mb-4 lg:mb-6 w-52 sm:w-[16rem] lg:w-[20rem] xl:w-[26rem] flex items-end justify-center"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_SPRING }}
        >
          {/* Dashed boundary ring */}
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 h-[15rem] w-[15rem] sm:h-[18rem] sm:w-[18rem] lg:h-[22rem] lg:w-[22rem] xl:h-[28rem] xl:w-[28rem] rounded-full border-2 border-dashed border-lavender-400/40 pointer-events-none" />

          {/* Single colored circle behind photo */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-44 w-44 sm:h-52 sm:w-52 lg:h-[17rem] lg:w-[17rem] xl:h-[22rem] xl:w-[22rem] rounded-full bg-gradient-to-br from-lavender-300 via-brand-primary/20 to-teal-200/50" />

          <Image
            src="/images/YavarPersonalPhoto1.png"
            alt="Yavar Khan"
            width={680}
            height={874}
            priority
            className="relative z-10 h-auto w-full object-contain photo-cutout lg:max-h-[40vh] xl:max-h-none"
          />
        </motion.div>

        {/* ── Name ── */}
        <motion.h1
          className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-8xl font-[family-name:var(--font-display)]"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #1a1a2e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_SPRING }}
        >
          Yavar Khan
        </motion.h1>

        {/* ── Gradient accent line ── */}
        <motion.div
          className="mx-auto mb-3 lg:mb-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-brand-primary via-teal-400 to-amber-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        />

        {/* ── Subtitle ── */}
        <motion.p
          className="mb-3 lg:mb-5 text-sm font-bold tracking-[0.3em] uppercase sm:text-base lg:text-lg font-[family-name:var(--font-heading)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_SPRING }}
        >
          <span className="text-brand-primary">AI Engineer</span>
          <span className="mx-3 inline-flex items-center">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-lavender-400 to-teal-400" />
          </span>
          <span className="text-teal-600">Software Engineer</span>
        </motion.p>

        {/* ── Status badge ── */}
        <motion.div
          className="inline-flex items-center gap-2.5 rounded-full border border-lavender-300/50 bg-gradient-to-r from-lavender-100/60 via-lavender-50/40 to-teal-50/50 backdrop-blur-sm px-5 py-2.5 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-primary" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-brand-dark/80 font-[family-name:var(--font-heading)]">
            Building WeatherWise.ai
            <span className="mx-1.5 text-lavender-400">|</span>
            Available for Opportunities
          </span>
        </motion.div>
      </div>

    </section>
  );
}
