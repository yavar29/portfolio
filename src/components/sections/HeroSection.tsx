/* eslint-disable @next/next/no-img-element -- static export ships pre-optimized AVIF/WebP sources */
import type { CSSProperties } from "react";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { RESUME, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { professionalCert } from "@/lib/data";

const BADGE = "/badges/claude-certified-architect-professional-216.webp";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-3 text-sm font-medium text-on-night transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.08] sm:px-5 sm:text-[0.9375rem]";

export default function HeroSection() {
  return (
    <section id="top" className="on-dark relative overflow-hidden bg-night-deep pb-10 pt-28 text-on-night sm:pt-32 lg:pb-8 lg:pt-28">
      <div className="container-page relative grid items-end gap-12 md:grid-cols-12 md:gap-8 lg:gap-10">
        <div className="md:col-span-7">
          <h1 className="t-display rise text-white">Yavar Khan</h1>
          <p
            className="rise mt-5 text-[1.625rem] font-semibold leading-tight tracking-tight text-[#c7b5ff] sm:text-[1.875rem]"
            style={delay(70)}
          >
            AI Engineer
          </p>
          <div className="rise mt-4" style={delay(140)}>
            <p className="t-lead max-w-[42ch] text-[#d3cbe8]">
              Founding AI Engineer at Aerveil, building LLM agents, evals and decision systems on Claude.
            </p>
            <p className="mt-2 text-[0.9375rem] text-[#9d94bb]">{SITE.location}</p>
          </div>

          <div className="rise mt-7 flex flex-wrap gap-2 sm:gap-3" style={delay(210)}>
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-violet-wash sm:px-5 sm:text-[0.9375rem]"
            >
              <Download aria-hidden className="size-4" />
              Resume
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
              <Github aria-hidden className="size-4" />
              GitHub
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
              <Linkedin aria-hidden className="size-4" />
              LinkedIn
            </a>
          </div>

          {/* The rise animation lives on the wrapper so it can't hold the card's hover transform. */}
          <div className="rise mt-10 w-fit max-w-full" style={delay(280)}>
            <a
              href={professionalCert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="credential group flex items-center gap-4 rounded-[1.375rem] p-3.5 pr-5 sm:gap-5 sm:p-4 sm:pr-7"
            >
              <span className="relative shrink-0">
                <img src={BADGE} alt="" width={108} height={108} className="size-[5.25rem] sm:size-[6.75rem]" />
                <span aria-hidden className="badge-sheen" style={{ "--badge": `url(${BADGE})` } as CSSProperties} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.8125rem] text-[#b3aacb]">Anthropic certification</span>
                <span className="mt-0.5 block text-balance font-semibold leading-snug text-white lg:whitespace-nowrap">
                  {professionalCert.title}
                </span>
                <span className="mt-0.5 block text-sm text-[#b3aacb]">
                  Issued by {professionalCert.issuer} · <span className="whitespace-nowrap">{professionalCert.date}</span>
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#c7b5ff]">
                  Verify
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </a>
          </div>
        </div>

        <div
          className="rise relative -mb-10 mx-auto w-full max-w-[17rem] sm:max-w-[22rem] md:col-span-5 md:mr-0 lg:-mb-8 lg:max-w-[27rem]"
          style={delay(100)}
        >
          {/* Portrait and arch stand on the hero's bottom edge (negative margin cancels its padding). */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 top-[14%] rounded-t-full bg-violet"
            />
            <picture>
              <source
                type="image/avif"
                srcSet="/images/yavar-hero-480.avif 480w, /images/yavar-hero-720.avif 720w, /images/yavar-hero-896.avif 896w"
                sizes="(min-width: 1024px) 432px, (min-width: 640px) 352px, 272px"
              />
              <source
                type="image/webp"
                srcSet="/images/yavar-hero-480.webp 480w, /images/yavar-hero-720.webp 720w, /images/yavar-hero-896.webp 896w"
                sizes="(min-width: 1024px) 432px, (min-width: 640px) 352px, 272px"
              />
              <img
                src="/images/yavar-hero-720.webp"
                alt="Portrait of Yavar Khan"
                width={896}
                height={1152}
                fetchPriority="high"
                decoding="async"
                className="relative h-auto w-full"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
