import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import AerveilTour from "@/components/sections/AerveilTour";
import RevealList from "@/components/ui/RevealList";
import { InstagramMark, LinkedInMark } from "@/components/ui/BrandIcons";
import { aerveil } from "@/lib/data";

const order = (i: number) => ({ "--i": i * 1.5 }) as CSSProperties;

// Keeps hyphenated words such as "Claude-native" from breaking at the hyphen.
const keepHyphens = (text: string) =>
  text.split(/(\S*-\S*)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-mist";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[0.9375rem] font-medium text-on-night transition-colors duration-200 hover:border-white/55";

/*
 * The centerpiece, set like a launch: the name, the promise and the links centered over the
 * product tour, which stands on a field of vine rows (the site's dot grid, laid down in
 * perspective). Below it the page returns to the site's left-aligned columns for the detail.
 */
export default function AerveilSection() {
  return (
    <section
      id="aerveil"
      data-nav-theme="dark"
      className="on-dark section-pad overflow-x-clip bg-night text-on-night"
    >
      <header className="container-page flex flex-col items-center text-center">
        <h2 className="font-serif text-[clamp(4.75rem,1.5rem+12vw,11rem)] leading-[0.9] tracking-[-0.035em] text-white">
          {aerveil.name}
        </h2>
        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[0.9375rem] sm:text-base">
          <span className="font-medium text-white">{aerveil.role}</span>
          <span aria-hidden className="h-4 w-px bg-white/30" />
          <span className="text-on-night-2">{aerveil.period}</span>
        </p>
        <p className="mt-8 max-w-[38ch] text-balance font-serif text-[clamp(1.4375rem,1rem+1.25vw,2rem)] leading-[1.24] text-white sm:mt-10">
          {aerveil.tagline}
        </p>
        <p className="mt-5 max-w-[44ch] text-balance text-on-night-2 sm:text-[1.0625rem]">{aerveil.roleLine}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a href={aerveil.links.site} target="_blank" rel="noopener noreferrer" className={primaryButton}>
            aerveil.ai
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
          <a
            href={aerveil.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aerveil on LinkedIn"
            className={secondaryButton}
          >
            <LinkedInMark className="size-4" />
            LinkedIn
          </a>
          <a
            href={aerveil.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aerveil on Instagram"
            className="grid size-[2.875rem] place-items-center rounded-full border border-white/20 transition-colors duration-200 hover:border-white/55"
          >
            <InstagramMark className="size-[1.125rem]" />
          </a>
        </div>
      </header>

      <AerveilTour status={aerveil.status} />

      <div className="container-page mt-20 sm:mt-24 lg:mt-28">
        <h3 className="t-h3 text-white">What I work on</h3>
        <RevealList className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-x-10">
          {aerveil.work.map((item, i) => (
            <li
              key={item.title}
              style={order(i)}
              className="reveal-item vine-rule pb-9 pt-6 lg:pb-0"
            >
              <h4 className="font-serif text-[1.5rem] leading-tight text-white">{item.title}</h4>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-on-night-2">{item.detail}</p>
            </li>
          ))}
        </RevealList>
      </div>

      <div className="container-page mt-20 grid gap-8 sm:mt-24 lg:mt-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h3 className="t-h3 max-w-[20ch] text-balance text-white">{keepHyphens(aerveil.practicesTitle)}</h3>
            <p className="mt-6 max-w-[34ch] font-serif text-[1.375rem] leading-[1.42] text-mist sm:text-[1.5625rem]">
              {keepHyphens(aerveil.practicesIntro)}
            </p>
          </div>
        </div>
        <ul className="vine-rule-end lg:col-span-7">
          {aerveil.practices.map((practice) => (
            <li key={practice.title} className="vine-rule py-6 text-[1.0625rem] leading-relaxed">
              <span className="font-medium text-white">{practice.title}:</span>{" "}
              <span className="text-on-night-2">{practice.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page mt-20 grid gap-6 sm:mt-24 lg:mt-32 lg:grid-cols-12 lg:gap-16">
        <h3 className="t-h3 text-white lg:col-span-5">Beyond engineering</h3>
        <ul className="space-y-3 font-serif text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] leading-[1.3] text-white lg:col-span-7">
          {aerveil.beyond.map((item) => (
            <li key={item} className="text-pretty">
              {keepHyphens(item)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
