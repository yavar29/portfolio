"use client";

/* eslint-disable @next/next/no-img-element -- static export ships pre-optimized WebP badges */
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { milestones, type Milestone } from "@/lib/data";

interface RoadStyle {
  width: number;
  swing: number;
  dash: string;
  centerLine: number;
}

const ROAD_WIDE: RoadStyle = { width: 22, swing: 34, dash: "8 10", centerLine: 1.6 };
const ROAD_NARROW: RoadStyle = { width: 12, swing: 5, dash: "5 7", centerLine: 1.1 };
const SAMPLES = 240;

interface Point {
  x: number;
  y: number;
}

interface Layout {
  width: number;
  height: number;
  d: string;
  road: RoadStyle;
  markers: Point[];
}

interface Measured {
  length: number;
  height: number;
  ys: Float32Array;
  markerFractions: number[];
}

// A serpentine road through every milestone marker: each leg bows to alternating sides,
// so the curve crosses the markers diagonally and stays smooth.
function buildRoad(markers: Point[], swing: number) {
  const first = markers[0];
  let d = `M ${first.x} ${first.y - 40} L ${first.x} ${first.y}`;
  for (let i = 1; i < markers.length; i++) {
    const a = markers[i - 1];
    const b = markers[i];
    const dy = b.y - a.y;
    const side = i % 2 === 1 ? 1 : -1;
    d += ` C ${a.x + side * swing} ${a.y + dy * 0.3}, ${b.x + side * swing} ${a.y + dy * 0.7}, ${b.x} ${b.y}`;
  }
  const last = markers[markers.length - 1];
  return `${d} L ${last.x} ${last.y + 28}`;
}

function fractionAtY(m: Measured, y: number) {
  const { ys } = m;
  if (y <= ys[0]) return 0;
  if (y >= ys[SAMPLES]) return 1;
  let lo = 0;
  let hi = SAMPLES;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (ys[mid] < y) lo = mid;
    else hi = mid;
  }
  const t = (y - ys[lo]) / (ys[hi] - ys[lo] || 1);
  return (lo + t) / SAMPLES;
}

export default function JourneySection() {
  const listRef = useRef<HTMLOListElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measuredRef = useRef<Measured | null>(null);
  const arrivedRef = useRef(-1);
  const [layout, setLayout] = useState<Layout | null>(null);
  // -1 means "not tracking": every milestone is shown (before hydration, and for reduced motion).
  const [arrived, setArrived] = useState(-1);
  const reduceMotion = useReducedMotion();
  const maskId = useId();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 65%"] });
  const target = useMotionValue(0);
  const drawn = useSpring(target, { stiffness: 140, damping: 32, restDelta: 0.0005 });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const box = list.getBoundingClientRect();
      const markers = markerRefs.current.map((el) => {
        const r = el!.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      const road = window.matchMedia("(min-width: 768px)").matches ? ROAD_WIDE : ROAD_NARROW;
      setLayout({ width: box.width, height: box.height, d: buildRoad(markers, road.swing), road, markers });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  const paint = useCallback((progress: number) => {
    const m = measuredRef.current;
    const path = maskPathRef.current;
    if (!m || !path) return;
    path.style.strokeDashoffset = String(m.length * (1 - progress));
    const head = headRef.current;
    if (head) {
      const p = path.getPointAtLength(m.length * progress);
      head.style.transform = `translate(${p.x}px, ${p.y}px)`;
      head.style.opacity = progress > 0.002 && progress < 0.995 ? "1" : "0";
    }
    let count = 0;
    for (let i = 0; i < m.markerFractions.length; i++) {
      if (progress >= m.markerFractions[i] - 0.004) count = i + 1;
    }
    if (count !== arrivedRef.current) {
      arrivedRef.current = count;
      setArrived(count);
    }
  }, []);

  useLayoutEffect(() => {
    const path = maskPathRef.current;
    if (!layout || !path) return;
    const length = path.getTotalLength();
    const ys = new Float32Array(SAMPLES + 1);
    for (let i = 0; i <= SAMPLES; i++) ys[i] = path.getPointAtLength((length * i) / SAMPLES).y;
    const measured: Measured = { length, height: layout.height, ys, markerFractions: [] };
    measured.markerFractions = layout.markers.map((p) => fractionAtY(measured, p.y));
    measuredRef.current = measured;
    path.style.strokeDasharray = `${length} ${length}`;

    if (reduceMotion) {
      path.style.strokeDashoffset = "0";
      if (headRef.current) headRef.current.style.opacity = "0";
      return;
    }
    path.style.strokeDashoffset = String(length * (1 - drawn.get()));
    target.set(fractionAtY(measured, scrollYProgress.get() * measured.height));
    const frame = requestAnimationFrame(() => paint(drawn.get()));
    return () => cancelAnimationFrame(frame);
  }, [layout, reduceMotion, target, drawn, scrollYProgress, paint]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const m = measuredRef.current;
    if (!m || reduceMotion) return;
    target.set(fractionAtY(m, p * m.height));
  });

  useMotionValueEvent(drawn, "change", (v) => {
    if (!reduceMotion) paint(v);
  });

  return (
    <section id="journey" className="section-pad overflow-hidden bg-paper-2">
      <div className="container-page">
        <div className="max-w-[44rem]">
          <h2 className="t-h2">Journey</h2>
          <p className="t-lead mt-5 text-ink-2">
            From an IT degree in India to production API engineering at Accenture, graduate study in
            AI/ML in Buffalo, and applied AI at Aerveil.
          </p>
        </div>

        <ol ref={listRef} className="relative mt-16 md:mt-24">
          {layout && (
            <svg
              aria-hidden
              width={layout.width}
              height={layout.height}
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
            >
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse">
                  <path
                    ref={maskPathRef}
                    d={layout.d}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={layout.road.width + 10}
                    strokeLinecap="round"
                  />
                </mask>
              </defs>
              <path
                d={layout.d}
                fill="none"
                stroke="#e3dcee"
                strokeWidth={layout.road.width}
                strokeLinecap="round"
              />
              <g mask={`url(#${maskId})`}>
                <path
                  d={layout.d}
                  fill="none"
                  stroke="#4a4163"
                  strokeWidth={layout.road.width + 3}
                  strokeLinecap="round"
                />
                <path
                  d={layout.d}
                  fill="none"
                  stroke="#2b2440"
                  strokeWidth={layout.road.width}
                  strokeLinecap="round"
                />
                <path
                  d={layout.d}
                  fill="none"
                  stroke="#f4f0fa"
                  strokeWidth={layout.road.centerLine}
                  strokeDasharray={layout.road.dash}
                />
              </g>
            </svg>
          )}

          <span
            ref={headRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-20 -ml-[7px] -mt-[7px] size-3.5 rounded-full bg-violet opacity-0 shadow-[0_0_0_6px_rgba(108,72,197,0.2)]"
          />

          {milestones.map((m, i) => (
            <MilestoneItem
              key={m.id}
              milestone={m}
              side={i % 2 === 0 ? "left" : "right"}
              showYear={i === 0 || milestones[i - 1].year !== m.year}
              arrived={!!reduceMotion || arrived < 0 || i < arrived}
              markerRef={(el) => {
                markerRefs.current[i] = el;
              }}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function MilestoneItem({
  milestone: m,
  side,
  showYear,
  arrived,
  markerRef,
}: {
  milestone: Milestone;
  side: "left" | "right";
  showYear: boolean;
  arrived: boolean;
  markerRef: (el: HTMLSpanElement | null) => void;
}) {
  const left = side === "left";

  return (
    <li className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-16 last:pb-0 md:grid-cols-[1fr_8rem_1fr] md:gap-x-0 md:pb-24">
      <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
        <span
          ref={markerRef}
          data-reached={arrived}
          className="relative z-10 mt-2 block size-[18px] rounded-full border-[3px] border-[#cbc1de] bg-paper-2 transition-[background-color,border-color,box-shadow] duration-500 data-[reached=true]:border-violet data-[reached=true]:bg-violet data-[reached=true]:shadow-[0_0_0_5px_rgba(108,72,197,0.16)]"
        />
      </div>

      {showYear && (
        <div
          aria-hidden
          data-year={m.year}
          className={cn(
            "row-start-1 hidden font-serif text-[5rem] leading-[0.8] text-ink/[0.09] before:content-[attr(data-year)] md:block",
            left ? "md:col-start-3 md:pl-10" : "md:col-start-1 md:pr-10 md:text-right"
          )}
        />
      )}

      <div
        data-arrived={arrived}
        className={cn(
          "col-start-2 row-start-1 min-w-0 transition-[opacity,transform] duration-700 ease-out-quint data-[arrived=false]:translate-y-4 data-[arrived=false]:opacity-0",
          left ? "md:col-start-1 md:max-w-[31rem] md:justify-self-end md:pr-10" : "md:col-start-3 md:max-w-[31rem] md:pl-10"
        )}
      >
        <div className={cn(m.badge && "flex items-start gap-4")}>
          {m.badge && (
            <img
              src={m.badge}
              alt=""
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
              className="size-[72px] shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-violet-deep">{m.period}</p>
            <h3 className="t-h3 mt-1.5 text-ink">{m.title}</h3>
            <p className="mt-1.5 text-ink-2">
              {m.org}
              {m.place && <span className="text-ink-3">, {m.place}</span>}
            </p>
          </div>
        </div>

        {m.summary && <p className="mt-4 text-ink-2">{m.summary}</p>}

        {m.highlights && (
          <ul className="mt-4 space-y-1.5 text-[0.9688rem] text-ink-2">
            {m.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-violet" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {m.links && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
            {m.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="link inline-flex items-center gap-1 text-violet-deep"
              >
                {link.label}
                {link.external && <ArrowUpRight aria-hidden className="size-3.5" />}
              </a>
            ))}
          </div>
        )}

        {m.details && <Details id={m.id} details={m.details} />}
      </div>
    </li>
  );
}

function Details({ id, details }: { id: string; details: NonNullable<Milestone["details"]> }) {
  const [open, setOpen] = useState(false);
  const panelId = `${id}-details`;

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink"
      >
        {open ? "Hide details" : "Show details"}
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <div id={panelId} className="disclosure" data-open={open} inert={!open}>
        <div>
          <div className="space-y-6 pt-5 text-[0.9375rem] text-ink-2">
            {details.subRoles?.map((role) => (
              <div key={role.title}>
                <p className="font-semibold text-ink">{role.title}</p>
                <p className="text-sm text-ink-3">{role.period}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-ink-3">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}

            {details.courses && (
              <div>
                <p className="font-semibold text-ink">Graduate coursework</p>
                <ul className="mt-2 divide-y divide-line border-y border-line">
                  {details.courses.map((course) => (
                    <li key={course.name} className="flex justify-between gap-4 py-1.5">
                      <span>{course.name}</span>
                      <span className="tabular-nums text-ink-3">{course.grade}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.subjects && (
              <div>
                <p className="font-semibold text-ink">Core subjects</p>
                <p className="mt-1">{details.subjects.join(", ")}</p>
              </div>
            )}

            {details.tech && (
              <div>
                <p className="font-semibold text-ink">Tools</p>
                <p className="mt-1">{details.tech.join(", ")}</p>
              </div>
            )}

            {details.endorsers?.map((endorser) => (
              <figure key={endorser.name} className="border-l-2 border-violet/40 pl-4">
                {endorser.quotes.map((quote) => (
                  <blockquote key={quote} className="mt-2 font-serif text-[1.0625rem] leading-relaxed text-ink first:mt-0">
                    “{quote}”
                  </blockquote>
                ))}
                <figcaption className="mt-2 text-sm text-ink-3">
                  {endorser.name}, {endorser.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
