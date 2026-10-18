/* eslint-disable @next/next/no-img-element -- static export ships a pre-optimized WebP badge */
import type { CSSProperties } from "react";
import RevealList from "@/components/ui/RevealList";
import { aboutIntro, professionalCert, profileHighlights } from "@/lib/data";
import { cn } from "@/lib/utils";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

// Keep the compound word on one line instead of breaking at its hyphen.
const KEEP_TOGETHER = "mission-critical";
const [introStart, introEnd] = aboutIntro.split(KEEP_TOGETHER);

const card = "flex h-full flex-col rounded-2xl border border-white/[0.08] bg-graphite-2 p-6 xl:p-7";
// A fixed label row keeps titles aligned across a row (the badge card needs the height).
const labelRow = "flex items-start justify-between gap-4 text-[0.8125rem] text-on-night-2 sm:h-12";
const titleText = "mt-3 block font-serif text-[1.5rem] leading-[1.2] text-white lg:text-[1.375rem] xl:text-[1.5rem]";
const detailText = "mt-auto block pt-6 text-[0.9375rem] leading-relaxed text-on-night-2";

/*
 * Graphite continues the black hero; the hairline on top is the floor the hero
 * portrait stands on. One intro line, then four highlights in equal cards whose
 * titles and bottom lines align across the row.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      data-nav-theme="dark"
      className="on-dark section-pad border-t border-white/10 bg-graphite text-on-night"
    >
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-10">
          <h2 className="t-h2 text-white lg:col-span-4">About</h2>
          <p className="max-w-[40ch] font-serif text-[clamp(1.5rem,1.15rem+1.2vw,2.125rem)] leading-[1.3] text-white lg:col-span-8 lg:pt-2">
            {introStart}
            <span className="whitespace-nowrap">{KEEP_TOGETHER}</span>
            {introEnd}
          </p>
        </div>

        <RevealList className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {profileHighlights.map((item, i) => (
            <li key={item.label} className="reveal-item" style={order(i)}>
              <div className={card}>
                <p className={labelRow}>{item.label}</p>
                <p className={titleText}>{item.title}</p>
                <p className={detailText}>{item.detail}</p>
              </div>
            </li>
          ))}
          <li className="reveal-item" style={order(profileHighlights.length)}>
            <a
              href={professionalCert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${professionalCert.title}, ${professionalCert.issuer}. Verify on Credly`}
              className={cn(card, "transition-colors duration-300 hover:border-white/25 hover:bg-[#1c1c1c]")}
            >
              <span className={labelRow}>
                Certification
                <img
                  src="/badges/claude-certified-architect-professional.webp"
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="-mt-1 size-12"
                />
              </span>
              {/* Non-breaking space keeps the dash at the end of a line, never at the start. */}
              <span className={titleText}>{professionalCert.title.replace(" – ", "\u00a0– ")}</span>
              <span className={detailText}>{professionalCert.issuer}</span>
            </a>
          </li>
        </RevealList>
      </div>
    </section>
  );
}
