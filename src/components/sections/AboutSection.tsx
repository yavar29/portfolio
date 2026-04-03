"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "~3", label: "Years", detail: "at Accenture" },
  { value: "3.87", label: "GPA", detail: "MS in CS" },
  { value: "8+", label: "Projects", detail: "Shipped" },
];

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative lg:min-h-screen flex items-center py-16 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-2 border-black"
      style={{
        background:
          "linear-gradient(160deg, #F5F0FF 0%, #EDE6F7 25%, #F7F3FB 50%, #EFF6FF 75%, #F0FDFA 100%)",
      }}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-lavender-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full bg-teal-100/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-100/15 blur-3xl" />

      <div className="mx-auto max-w-7xl w-full">
        <div className="grid items-stretch gap-0 lg:grid-cols-[auto_1fr]">
          {/* ── Left: Vertical "ABOUT" + Photo ── */}
          <motion.div
            className="flex items-center gap-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Large vertical "ABOUT" text — upright letters */}
            <div className="hidden lg:flex items-center justify-center shrink-0 relative">
              <motion.h2
                className="font-[family-name:var(--font-display)] text-[5rem] xl:text-[7rem] font-bold whitespace-nowrap leading-[0.75]"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  letterSpacing: "-0.05em",
                  background: "linear-gradient(to bottom, #35215F, #5A3BA6, #8B6FC0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: 0.15,
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.15, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                ABOUT
              </motion.h2>
            </div>

            {/* Animated vertical accent line */}
            <motion.div
              className="hidden lg:block w-[2px] self-stretch mx-5 rounded-full shrink-0"
              style={{
                background: "linear-gradient(to bottom, transparent, #6C48C5, #0EA5E9, #14B8A6, transparent)",
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* Photo — clean with highlight glow */}
            <div className="relative mx-auto w-80 sm:w-[22rem] lg:w-[22rem] xl:w-[28rem] flex items-end justify-center self-center">
              {/* Soft radial highlight behind photo for depth */}
              <div
                className="absolute bottom-[8%] left-1/2 -translate-x-1/2 h-[50%] w-[65%] rounded-full blur-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(108,72,197,0.1) 0%, rgba(14,165,233,0.06) 50%, transparent 80%)",
                }}
              />
              {/* Warm rim light — bottom edge glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[20%] w-[70%] rounded-full blur-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(245,230,210,0.35) 0%, transparent 70%)",
                }}
              />

              {/* Corner brackets */}
              <motion.div
                className="absolute top-2 left-2 z-20 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="h-8 w-8 border-l-2 border-t-2 border-brand-primary/25 rounded-tl-sm" />
              </motion.div>
              <motion.div
                className="absolute top-2 right-2 z-20 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="h-8 w-8 border-r-2 border-t-2 border-brand-primary/25 rounded-tr-sm" />
              </motion.div>
              <motion.div
                className="absolute bottom-2 left-2 z-20 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="h-8 w-8 border-l-2 border-b-2 border-teal-400/25 rounded-bl-sm" />
              </motion.div>
              <motion.div
                className="absolute bottom-2 right-2 z-20 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="h-8 w-8 border-r-2 border-b-2 border-teal-400/25 rounded-br-sm" />
              </motion.div>

              {/* Floating geometric accents */}
              <motion.div
                className="absolute top-6 right-8 h-3.5 w-3.5 rounded-full bg-brand-primary/25 z-20"
                animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-12 -left-1 h-3 w-3 rotate-45 bg-sky-400/25 z-20"
                animate={{ y: [0, -8, 0], rotate: [45, 90, 45] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-[40%] -right-3 h-4 w-4 rounded-full border-2 border-teal-400/30 z-20"
                animate={{ y: [0, 8, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-16 left-3 z-20"
                animate={{ y: [0, 6, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="h-0 w-0"
                  style={{
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderBottom: "9px solid rgba(108, 72, 197, 0.2)",
                  }}
                />
              </motion.div>
              <motion.div
                className="absolute top-[30%] -left-4 z-20 text-sky-400/25 text-lg font-light"
                animate={{ y: [0, -6, 0], rotate: [0, 90, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                +
              </motion.div>
              <motion.div
                className="absolute bottom-20 right-4 h-2 w-2 rounded-full bg-amber-400/25 z-20"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              <Image
                src="/images/YavarPersonalPhoto2.png"
                alt="Yavar Khan"
                width={680}
                height={816}
                className="relative z-10 h-auto w-full object-contain photo-cutout lg:max-h-[60vh] xl:max-h-none"
              />
            </div>
          </motion.div>

          {/* ── Right: Bio content ── */}
          <motion.div
            className="lg:pl-14 pt-10 lg:pt-0 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Greeting */}
            <motion.h2
              custom={0}
              variants={paragraphVariants}
              className="text-4xl font-extrabold text-brand-dark sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] font-[family-name:var(--font-display)] leading-tight mb-2"
            >
              Hi, I&apos;m <span className="text-brand-primary">Yavar</span>
            </motion.h2>

            {/* Accent line */}
            <motion.div
              custom={0.5}
              variants={paragraphVariants}
              className="h-[2px] w-12 rounded-full bg-gradient-to-r from-brand-primary via-sky-400 to-teal-400 mb-7"
            />

            {/* ── Bio paragraphs ── */}
            <div className="space-y-3 lg:space-y-2 xl:space-y-4 text-[15px] sm:text-base lg:text-sm xl:text-base leading-[1.8] lg:leading-[1.7] text-gray-600 text-justify">
              <motion.p custom={1} variants={paragraphVariants}>
                During my 3 years at{" "}
                <a href="#journey" className="font-semibold text-brand-dark underline decoration-brand-primary/30 underline-offset-2 hover:decoration-brand-primary/60 transition-colors">
                  Accenture
                </a>
                , I built a strong foundation in developing and maintaining
                reliable, production-grade systems at scale.
                I went on to earn an{" "}
                <a href="#journey" className="font-semibold text-brand-dark underline decoration-brand-primary/30 underline-offset-2 hover:decoration-brand-primary/60 transition-colors">
                  MS in Computer Science (AI/ML track)
                </a>{" "}
                from{" "}
                <span className="font-semibold text-brand-dark">
                  SUNY Buffalo
                </span>
                , focusing on the development and optimization of machine
                learning and deep learning models.
              </motion.p>

              <motion.p custom={1.5} variants={paragraphVariants}>
                Since graduating, I have been expanding my skillset in
                Generative AI and putting it to work, building
                end-to-end AI applications using frameworks like
                LangChain, LangGraph, and PyTorch, from RAG pipelines
                to multi-agent architectures.
              </motion.p>

              <motion.p custom={2} variants={paragraphVariants}>
                Currently, I am building{" "}
                <a href="#featured" className="font-semibold text-brand-dark underline decoration-brand-primary/30 underline-offset-2 hover:decoration-brand-primary/60 transition-colors">
                  WeatherWise.ai
                </a>
                , a conversational multi-agent system designed to translate user
                queries into clear understanding backed by raw meteorological and
                atmospheric data and APIs. It delivers physics-grounded reasoning
                and actionable insights, helping users decode the complexity
                behind real-world weather phenomena.
              </motion.p>
            </div>

            {/* ── Stats row ── */}
            <motion.div
              custom={2.5}
              variants={paragraphVariants}
              className="flex gap-6 sm:gap-8 mt-6 lg:mt-4 xl:mt-9 pt-5 lg:pt-4 xl:pt-7 border-t border-lavender-200/60"
            >
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-start gap-6 sm:gap-8">
                  {i > 0 && (
                    <div className="w-px self-stretch bg-lavender-300/40 shrink-0" />
                  )}
                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-brand-dark font-[family-name:var(--font-heading)] leading-none">
                      {s.value}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mt-1.5">
                      {s.label} <span className="text-gray-350">· {s.detail}</span>
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── Resume CTA ── */}
            <motion.div custom={3} variants={paragraphVariants} className="mt-7">
              <a
                href="/YavarKhan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-dark transition-colors font-[family-name:var(--font-heading)]"
              >
                <span className="h-px w-6 bg-brand-primary/50" />
                View Full Resume
                <span className="text-brand-primary/40">&rarr;</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
