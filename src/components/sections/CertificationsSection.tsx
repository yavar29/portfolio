/* eslint-disable @next/next/no-img-element -- static export ships pre-optimized WebP badges */
import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-pad bg-paper-2 pt-0">
      <div className="container-page">
        <div className="border-t border-ink/15 pt-[clamp(4.5rem,3.5rem+4vw,7.5rem)]">
          <h2 className="t-h2">Certifications</h2>
          <ul className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-14 lg:grid-cols-3 lg:gap-10">
            {certifications.map((cert) => (
              <li key={cert.title} className="flex items-start gap-5 sm:block">
                <img
                  src={cert.badge}
                  alt={`${cert.title} badge`}
                  width={128}
                  height={128}
                  loading="lazy"
                  decoding="async"
                  className="size-20 shrink-0 sm:size-32"
                />
                <div>
                  <h3 className="font-sans text-lg font-semibold leading-snug tracking-normal text-ink sm:mt-6">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-ink-3">
                    {cert.issuer}, {cert.date}
                  </p>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-3 inline-flex items-center gap-1 text-[0.9375rem] text-ink"
                  >
                    {cert.verifyLabel}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
