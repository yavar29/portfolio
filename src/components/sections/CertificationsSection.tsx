/* eslint-disable @next/next/no-img-element -- static export ships pre-optimized WebP badges */
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import RevealList from "@/components/ui/RevealList";
import { certifications } from "@/lib/data";

const order = (i: number) => ({ "--i": i * 1.5 }) as CSSProperties;

/*
 * A full-screen black sheet: the badges are the color on it, set like plaques on a wall,
 * separated by hairlines rather than boxed. Each whole column links to its credential.
 */
export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      data-nav-theme="dark"
      className="on-dark section-pad flex min-h-svh flex-col justify-center bg-night bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1.25px)] bg-[length:24px_24px] text-on-night"
    >
      <div className="container-page">
        <h2 className="t-h2 text-white">Certifications</h2>

        <RevealList className="mt-12 grid sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <li
              key={cert.title}
              style={order(i)}
              className="reveal-item border-t border-white/[0.12] sm:[&:nth-child(odd):not(:last-child)]:border-r lg:border-r lg:last:border-r-0"
            >
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center px-6 pb-10 pt-12 text-center sm:px-8 lg:pb-12 lg:pt-14"
              >
                <img
                  src={cert.badge}
                  srcSet={cert.badgeSet}
                  sizes="(min-width: 1024px) 176px, 144px"
                  alt={`${cert.title} badge`}
                  width={176}
                  height={176}
                  loading="lazy"
                  decoding="async"
                  className="size-36 transition-transform duration-500 ease-out-quint group-hover:-translate-y-1.5 lg:size-44"
                />
                <h3 className="mt-8 max-w-[18ch] text-balance text-[1.375rem] leading-snug text-white">{cert.title}</h3>
                <p className="mt-2 text-on-night-2">
                  {cert.issuer}, {cert.date}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-white">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                    {cert.verifyLabel}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </li>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
