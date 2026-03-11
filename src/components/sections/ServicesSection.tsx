"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";

/* ── Animated SVG illustrations for each service ── */

function GenAIIllustration() {
  // Interconnected agent nodes with pulsing data flows
  const nodes = [
    { cx: 80, cy: 50, r: 12 },
    { cx: 140, cy: 30, r: 9 },
    { cx: 160, cy: 90, r: 10 },
    { cx: 50, cy: 100, r: 8 },
    { cx: 110, cy: 110, r: 11 },
    { cx: 30, cy: 55, r: 7 },
  ];
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [3, 4], [3, 5], [5, 0],
  ];
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      {/* Pulsing connections */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1.2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
      {/* Data particles flowing along edges */}
      {edges.slice(0, 4).map(([a, b], i) => (
        <motion.circle
          key={`p-${i}`}
          r={2}
          fill="rgba(255,255,255,0.6)"
          animate={{
            cx: [nodes[a].cx, nodes[b].cx],
            cy: [nodes[a].cy, nodes[b].cy],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.cx} cy={n.cy} r={n.r + 4}
            fill="none" stroke="rgba(255,255,255,0.1)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
          <motion.circle
            cx={n.cx} cy={n.cy} r={n.r}
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.5}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
          <motion.circle
            cx={n.cx} cy={n.cy} r={3}
            fill="rgba(255,255,255,0.5)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        </g>
      ))}
    </svg>
  );
}

function MLIllustration() {
  // Neural network layers with flowing signals
  const layers = [
    [25, 30, 55, 80, 110],
    [40, 70, 100],
    [35, 65, 95, 125],
    [55, 85],
  ];
  const xPositions = [30, 80, 130, 175];
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      {/* Connections between layers */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.map((y1, ni) =>
          layers[li + 1].map((y2, mi) => (
            <motion.line
              key={`${li}-${ni}-${mi}`}
              x1={xPositions[li]} y1={y1}
              x2={xPositions[li + 1]} y2={y2}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={0.8}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.2, 0.05] }}
              transition={{
                duration: 2.5,
                delay: (li * 0.3) + (ni * 0.1),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))
        )
      )}
      {/* Signal pulses traveling through layers */}
      {[0, 1, 2].map((li) => (
        <motion.circle
          key={`sig-${li}`}
          r={3}
          fill="rgba(255,255,255,0.5)"
          animate={{
            cx: [xPositions[li], xPositions[li + 1]],
            cy: [layers[li][li % layers[li].length], layers[li + 1][li % layers[li + 1].length]],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1.5,
            delay: li * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Neuron nodes */}
      {layers.map((layer, li) =>
        layer.map((y, ni) => (
          <g key={`n-${li}-${ni}`}>
            <motion.circle
              cx={xPositions[li]} cy={y} r={6}
              fill="rgba(255,255,255,0.12)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1.2}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, delay: li * 0.2 + ni * 0.15, repeat: Infinity }}
              style={{ transformOrigin: `${xPositions[li]}px ${y}px` }}
            />
            <circle cx={xPositions[li]} cy={y} r={2.5} fill="rgba(255,255,255,0.4)" />
          </g>
        ))
      )}
    </svg>
  );
}

function ScalableIllustration() {
  // Cloud architecture with flowing data streams
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      {/* Server blocks */}
      {[
        { x: 20, y: 55, w: 40, h: 25 },
        { x: 20, y: 85, w: 40, h: 25 },
        { x: 140, y: 55, w: 40, h: 25 },
        { x: 140, y: 85, w: 40, h: 25 },
      ].map((s, i) => (
        <g key={i}>
          <motion.rect
            x={s.x} y={s.y} width={s.w} height={s.h} rx={4}
            fill="rgba(255,255,255,0.1)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            style={{ transformOrigin: `${s.x + s.w / 2}px ${s.y + s.h / 2}px` }}
          />
          {/* Status lights */}
          <motion.circle
            cx={s.x + 8} cy={s.y + s.h / 2} r={2}
            fill="rgba(255,255,255,0.5)"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
          <rect x={s.x + 15} y={s.y + s.h / 2 - 1} width={18} height={2} rx={1} fill="rgba(255,255,255,0.15)" />
        </g>
      ))}
      {/* Central hub */}
      <motion.circle
        cx={100} cy={80} r={18}
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={1.2}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 80px" }}
      />
      <motion.circle
        cx={100} cy={80} r={10}
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
      />
      <circle cx={100} cy={80} r={4} fill="rgba(255,255,255,0.4)" />
      {/* Cloud shape at top */}
      <motion.path
        d="M70 30 Q75 15 90 18 Q95 8 110 12 Q120 6 130 16 Q140 14 135 28 Q140 35 130 35 L72 35 Q65 35 70 30Z"
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      />
      {/* Data streams flowing from servers to hub */}
      {[
        { x1: 60, y1: 68, x2: 82, y2: 75 },
        { x1: 60, y1: 98, x2: 82, y2: 88 },
        { x1: 140, y1: 68, x2: 118, y2: 75 },
        { x1: 140, y1: 98, x2: 118, y2: 88 },
        { x1: 100, y1: 62, x2: 100, y2: 35 },
      ].map((l, i) => (
        <g key={`stream-${i}`}>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="3 3" />
          <motion.circle
            r={2}
            fill="rgba(255,255,255,0.6)"
            animate={{
              cx: [l.x1, l.x2],
              cy: [l.y1, l.y2],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}
    </svg>
  );
}

const ILLUSTRATIONS = [GenAIIllustration, MLIllustration, ScalableIllustration];

const THEMES = [
  {
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    tagDot: "bg-violet-400",
    tagStyle: "bg-violet-50/80 text-violet-700 border-violet-200/50",
  },
  {
    gradient: "from-sky-500 via-blue-500 to-cyan-600",
    tagDot: "bg-sky-400",
    tagStyle: "bg-sky-50/80 text-sky-700 border-sky-200/50",
  },
  {
    gradient: "from-teal-500 via-emerald-500 to-green-600",
    tagDot: "bg-teal-400",
    tagStyle: "bg-teal-50/80 text-teal-700 border-teal-200/50",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative lg:min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-2 border-black"
      style={{
        background:
          "linear-gradient(170deg, #E0ECFA 0%, #E8F0FB 25%, #F0F4FB 50%, #E4F2EE 75%, #ECF7F4 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] rounded-full bg-violet-200/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-sky-200/15 blur-3xl" />

      <div className="mx-auto max-w-6xl w-full">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl font-[family-name:var(--font-heading)]">
            What I Build
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            I bring the engineering expertise of deploying scalable, production-ready
            systems with the scientific depth required to build complex AI models.
          </p>
          <motion.div
            className="mx-auto mt-5 h-[2px] w-16 rounded-full bg-gradient-to-r from-violet-400 via-sky-400 to-teal-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Service rows */}
        <div className="relative">
          {/* Vertical connecting thread (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-300/30 via-sky-300/30 to-teal-300/30" />

          <div className="space-y-16 lg:space-y-0">
            {services.map((service, i) => {
              const theme = THEMES[i % THEMES.length];
              const Illustration = ILLUSTRATIONS[i % ILLUSTRATIONS.length];
              const isReversed = i % 2 !== 0;

              return (
                <motion.div
                  key={service.title}
                  className="relative lg:py-14"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {/* Thread node */}
                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                    <div className={`h-3.5 w-3.5 rounded-full bg-gradient-to-br ${theme.gradient} shadow-lg`} />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${theme.gradient} animate-ping opacity-20`} />
                  </div>

                  {/* Row */}
                  <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-16`}>
                    {/* Accent block with animated illustration */}
                    <motion.div
                      className={`relative w-full lg:w-[44%] shrink-0 rounded-2xl bg-gradient-to-br ${theme.gradient} overflow-hidden group cursor-default`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Illustration area */}
                      <div className="relative h-44 sm:h-52 p-6 flex items-center justify-center">
                        <div className="w-full h-full max-w-[240px]">
                          <Illustration />
                        </div>
                      </div>

                      {/* Title bar at bottom */}
                      <div className="relative px-8 pb-7 pt-2">
                        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-white">
                          {service.title}
                        </h3>
                      </div>
                    </motion.div>

                    {/* Content side */}
                    <div className={`flex-1 ${isReversed ? "lg:text-right" : ""}`}>
                      <p className={`text-[15px] sm:text-base leading-[1.85] text-gray-600 mb-6 ${isReversed ? "lg:text-right" : "text-justify"}`}>
                        {service.description}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${isReversed ? "lg:justify-end" : ""}`}>
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold border ${theme.tagStyle} transition-all duration-200 hover:scale-105`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${theme.tagDot} shrink-0`} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile separator */}
                  {i < services.length - 1 && (
                    <div className="lg:hidden mt-16 h-px bg-gradient-to-r from-transparent via-gray-300/40 to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
