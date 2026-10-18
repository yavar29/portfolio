/* eslint-disable @next/next/no-img-element -- static export ships pre-built SVG logos and a WebP badge */
import type { CSSProperties } from "react";
import RevealList from "@/components/ui/RevealList";
import AboutPortrait from "./AboutPortrait";
import { aboutIntro, professionalCert, profileHighlights } from "@/lib/data";
import { cn } from "@/lib/utils";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

// Hyphenated words ("end-to-end", "high-stakes", "mission-critical") never break at the hyphen.
const introParts = aboutIntro.split(/(\S*-\S*)/);

const item = "reveal-item border-t border-white/[0.12] pb-9 pt-5";
// A fixed label row keeps titles aligned across a row (the badge needs the height).
const labelRow = "flex items-start justify-between gap-4 text-[0.8125rem] text-on-night-2 sm:h-10";
const titleText = "mt-2 block font-serif text-[1.5rem] leading-[1.2] text-white";
const detailText = "mt-2 block max-w-[34ch] text-[0.9375rem] leading-relaxed text-on-night-2";

/*
 * Charcoal section with a black panel for the portrait: the black carries on from the
 * hero, the charcoal sets this section apart. Highlights read as an editorial list
 * divided by hairlines rather than boxed cards.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      data-nav-theme="dark"
      className="on-dark relative overflow-hidden border-t border-white/10 bg-charcoal text-on-night"
    >
      <div className="container-page grid lg:grid-cols-12 lg:gap-x-12">
        {/* On tablets the panel follows the text so it is not stacked right under the hero portrait. */}
        <AboutPortrait className="h-[27rem] sm:h-[34rem] md:order-last lg:order-none lg:col-span-5 lg:h-auto" />

        <div className="py-16 sm:py-20 lg:col-span-7 lg:py-[clamp(4.5rem,3.5rem+4vw,7.5rem)] lg:pl-6">
          <h2 className="t-h2 text-white">About</h2>
          <p className="mt-6 max-w-[38ch] font-serif text-[clamp(1.5rem,1.15rem+1.2vw,2.125rem)] leading-[1.3] text-white">
            {introParts.map((part, i) =>
              i % 2 ? (
                <span key={i} className="whitespace-nowrap">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>

          <RevealList className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:mt-14">
            {profileHighlights.map((highlight, i) => (
              <li key={highlight.label} className={item} style={order(i)}>
                <p className={labelRow}>
                  {highlight.label}
                  <img
                    src={highlight.logo.src}
                    alt=""
                    width={highlight.logo.width}
                    height={highlight.logo.height}
                    loading="lazy"
                    decoding="async"
                    className={cn("-mt-1 w-auto", highlight.logo.size)}
                  />
                </p>
                <p className={titleText}>{highlight.title}</p>
                <p className={detailText}>{highlight.detail}</p>
              </li>
            ))}
            <li className={item} style={order(profileHighlights.length)}>
              <a
                href={professionalCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${professionalCert.title}, ${professionalCert.issuer}. Verify on Credly`}
                className="group block"
              >
                <span className={labelRow}>
                  Certification
                  <img
                    src="/badges/claude-certified-architect-professional.webp"
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="-mt-1.5 size-10 transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                </span>
                {/* Non-breaking space keeps the dash at the end of a line, never at the start. */}
                <span className={titleText}>
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                    {professionalCert.title.replace(" – ", " – ")}
                  </span>
                </span>
                <span className={detailText}>{professionalCert.issuer}</span>
              </a>
            </li>
          </RevealList>
        </div>
      </div>
    </section>
  );
}
