/* eslint-disable @next/next/no-img-element -- static export ships pre-optimized AVIF/WebP sources */
import type { CSSProperties } from "react";
import { Download, Github, Linkedin } from "lucide-react";
import { RESUME, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { professionalCert } from "@/lib/data";

const BADGE = "/badges/claude-certified-architect-professional-600.webp";
// The sheen only needs the silhouette, so it masks with the small file every screen already loads.
const BADGE_MASK = "/badges/claude-certified-architect-professional.webp";
const BADGE_SET =
  "/badges/claude-certified-architect-professional.webp 320w, /badges/claude-certified-architect-professional-600.webp 600w";
const BADGE_SIZES = "(min-width: 1280px) 256px, 168px";
const PORTRAIT_SIZES = "(min-width: 1280px) 620px, (min-width: 768px) 384px, 320px";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-mist sm:px-5 sm:text-[0.9375rem] xl:px-3.5 xl:text-sm";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-3 text-sm font-medium text-on-night transition-colors duration-200 hover:border-white/55 sm:px-5 sm:text-[0.9375rem] xl:px-3.5 xl:text-sm";

/*
 * Magazine cover, one screen tall. The name fills the width; from xl (1280px) the black-and-white
 * portrait stands centered on the bottom edge and rises in front of the name, with who he
 * is on the left and the Professional badge (the only color on the screen) on the right.
 */
export default function HeroSection() {
  return (
    <section
      id="top"
      className="hero on-dark relative flex min-h-[min(100svh,60rem)] flex-col overflow-hidden bg-night text-on-night"
    >
      <div className="container-page relative pt-24 sm:pt-28">
        <h1 className="hero-name rise -ml-[0.04em] text-white">Yavar Khan</h1>
      </div>

      <div className="container-page relative z-10 mt-8 grid flex-1 gap-10 sm:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-x-10 xl:pb-10">
        <div className="xl:max-w-[21.5rem]">
          <p
            className="rise text-[1.625rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.875rem]"
            style={delay(140)}
          >
            AI Engineer
          </p>
          <div className="rise mt-3" style={delay(200)}>
            <p className="t-lead max-w-[38ch] text-mist xl:text-lg">
              AI Engineer at Aerveil, building LLM agents, evals and decision systems on Claude.
            </p>
            <p className="mt-2 text-[0.9375rem] text-on-night-2">{SITE.location}</p>
          </div>

          <div className="rise mt-7 flex flex-wrap gap-2 sm:gap-3 xl:gap-2" style={delay(260)}>
            <a href={RESUME.href} download={RESUME.filename} className={primaryButton}>
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
        </div>

        {/* The rise animation lives on the wrapper so it can't hold the link's hover transform. */}
        <div className="rise justify-self-center md:justify-self-end" style={delay(320)}>
          <a
            href={professionalCert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${professionalCert.title}, issued by ${professionalCert.issuer}. Verify on Credly`}
            className="badge-link relative block rounded-3xl"
          >
            <img
              src={BADGE}
              srcSet={BADGE_SET}
              sizes={BADGE_SIZES}
              alt=""
              width={256}
              height={256}
              className="block size-[10.5rem] xl:size-[clamp(11rem,17vw,16rem)]"
            />
            <span aria-hidden className="badge-sheen" style={{ "--badge": `url(${BADGE_MASK})` } as CSSProperties} />
          </a>
        </div>
      </div>

      {/*
        Below 1280px the portrait follows the content. From xl it is taken out of flow,
        centered on the bottom edge and as tall as the screen allows, so its head sits in
        front of the name.
      */}
      <div className="mt-10 flex justify-center px-5 xl:absolute xl:inset-x-0 xl:bottom-0 xl:top-[calc(7rem+var(--name-size)*0.11)] xl:mt-0 xl:px-0">
        <div className="rise xl:h-full" style={delay(80)}>
          <picture className="block xl:h-full">
            <source
              type="image/avif"
              srcSet="/images/yavar-hero-480.avif 480w, /images/yavar-hero-720.avif 720w, /images/yavar-hero-896.avif 896w"
              sizes={PORTRAIT_SIZES}
            />
            <source
              type="image/webp"
              srcSet="/images/yavar-hero-480.webp 480w, /images/yavar-hero-720.webp 720w, /images/yavar-hero-896.webp 896w"
              sizes={PORTRAIT_SIZES}
            />
            <img
              src="/images/yavar-hero-720.webp"
              alt="Portrait of Yavar Khan"
              width={896}
              height={1152}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full max-w-[20rem] md:max-w-[24rem] contrast-[1.06] grayscale xl:h-full xl:w-auto xl:max-w-none"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
