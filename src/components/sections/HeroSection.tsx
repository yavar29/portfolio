/* eslint-disable @next/next/no-img-element -- static export ships pre-optimized AVIF/WebP sources */
import type { CSSProperties } from "react";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { RESUME, SOCIAL_LINKS } from "@/lib/constants";
import { professionalCert } from "@/lib/data";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink-3 sm:px-5 sm:text-[0.9375rem]";

export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pb-6 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_30%,#eee8fa_0%,rgba(251,250,254,0)_70%)]"
      />

      <div className="container-page relative grid items-end gap-14 md:grid-cols-12 md:gap-8 lg:gap-10">
        <div className="md:col-span-7">
          <h1 className="t-display rise text-ink">Yavar Khan</h1>
          <p
            className="rise mt-5 text-[1.625rem] font-semibold leading-tight tracking-tight text-violet-deep sm:text-[1.875rem]"
            style={delay(80)}
          >
            AI Engineer
          </p>
          <p className="t-lead rise mt-4 max-w-[36ch] text-ink-2" style={delay(160)}>
            Building Claude-based decision systems as the first engineer at Aerveil.
          </p>

          <div className="rise mt-8 flex flex-wrap gap-2 sm:gap-3" style={delay(240)}>
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-violet-deep sm:px-5 sm:text-[0.9375rem]"
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

          <a
            href={professionalCert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rise group mt-12 flex max-w-[30rem] items-center gap-4 rounded-[1.25rem] border border-line bg-white/80 p-3 pr-5 transition-colors duration-200 hover:border-violet/40"
            style={delay(360)}
          >
            <img
              src="/badges/claude-certified-architect-professional-144.webp"
              alt=""
              width={72}
              height={72}
              className="size-[72px] shrink-0"
            />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-snug text-ink">{professionalCert.title}</span>
              <span className="mt-0.5 block text-sm text-ink-3">
                Issued by {professionalCert.issuer}, {professionalCert.date}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-violet-deep">
              <span className="sr-only sm:not-sr-only">Verify</span>
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </div>

        <div className="rise relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] md:col-span-5 md:mr-0 lg:max-w-[27rem]" style={delay(120)}>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-[14%] rounded-t-full bg-gradient-to-b from-violet-wash to-paper-2"
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
    </section>
  );
}
