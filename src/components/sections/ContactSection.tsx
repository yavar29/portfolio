"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import RevealList from "@/components/ui/RevealList";
import { RESUME, SITE, SOCIAL_LINKS } from "@/lib/constants";

const smallLink =
  "group inline-flex items-center gap-1.5 text-ink-2 transition-colors duration-200 hover:text-ink";

/*
 * A quiet, light closing page. The address sits small at the top right; "Get in touch" is set
 * large in the serif as the email link itself, ruled underneath with a line that draws in once.
 * LinkedIn, GitHub, the resume and the location share one line under the rule.
 */
export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context or denied): the mailto links still work.
    }
  }

  return (
    <section id="contact" data-nav-theme="light" className="flex min-h-svh flex-col bg-paper-2 text-ink">
      <RevealList
        as="div"
        className="container-page flex flex-1 flex-col justify-center pb-14 pt-28 [container-type:inline-size] sm:pb-16 sm:pt-32"
      >
        <div className="reveal-item flex items-center gap-2 sm:justify-end">
          <a href={SOCIAL_LINKS.email} className="link text-[1.0625rem] text-ink sm:text-[1.25rem]">
            {SITE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            className="grid size-9 place-items-center rounded-full text-ink-3 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
          >
            {copied ? <Check aria-hidden className="size-4 text-ink" /> : <Copy aria-hidden className="size-4" />}
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
        </div>

        {/*
          Sized so the words and the arrow together span the rule: the words measure 4.78em in
          Newsreader at this tracking and the arrow box 0.72em, its own padding being the gap.
        */}
        <h2 className="mt-24 sm:mt-32 lg:mt-40">
          <a
            href={SOCIAL_LINKS.email}
            aria-label="Get in touch by email"
            className="group flex items-end justify-between font-serif text-[calc(100cqw/5.6)] leading-[0.9] tracking-[-0.04em] text-ink"
          >
            <span className="wipe -ml-[0.04em]">Get in touch</span>
            <ArrowUpRight
              aria-hidden
              strokeWidth={1.1}
              className="mb-[0.06em] size-[0.72em] shrink-0 transition-transform duration-500 ease-out-quint group-hover:-translate-y-[0.06em] group-hover:translate-x-[0.06em]"
            />
          </a>
        </h2>
        <span aria-hidden className="contact-rule mt-5 block h-[3px] bg-ink sm:mt-7" />

        <div className="reveal-item mt-6 flex flex-col gap-4 text-[0.9375rem] sm:mt-7 sm:flex-row sm:items-center sm:justify-between sm:text-base">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            <li>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={smallLink}>
                LinkedIn
                <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={smallLink}>
                GitHub
                <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
            <li>
              <a href={RESUME.href} download={RESUME.filename} className={smallLink}>
                Resume
                <Download aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
            </li>
          </ul>
          <p className="text-ink-3">{SITE.location}</p>
        </div>
      </RevealList>
    </section>
  );
}
