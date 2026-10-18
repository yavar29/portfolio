"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Copy, Download, FileText, Mail, MapPin } from "lucide-react";
import { GitHubMark, LinkedInMark } from "@/components/ui/BrandIcons";
import RevealList from "@/components/ui/RevealList";
import { RESUME, SITE, SOCIAL_LINKS } from "@/lib/constants";

const order = (i: number) => ({ "--i": i * 1.5 }) as CSSProperties;

// "in/yavar-khan29" and "github.com/yavar29", read from the links so they can't drift apart.
const handle = (url: string, withHost = false) => {
  const { hostname, pathname } = new URL(url);
  const path = pathname.replace(/^\/|\/$/g, "");
  return withHost ? `${hostname}/${path}` : path;
};

const pacificTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-mist";
const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[0.9375rem] font-medium text-on-night transition-colors duration-200 hover:border-white/55";

/*
 * The closing bookend to the hero: where the hero sets the name across the page, this sets
 * "Get in touch" the same way. The email address and its two actions sit under it, and the other
 * ways to reach him run along the bottom in vine-row columns, with his local time so a reader
 * knows when he'll reply.
 */
export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>();

  // Local time renders only in the browser, so the static HTML never shows a stale clock.
  useEffect(() => {
    const tick = () => setTime(pacificTime.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context or denied): the mailto links still work.
    }
  }

  const directory = [
    {
      label: "LinkedIn",
      detail: handle(SOCIAL_LINKS.linkedin),
      href: SOCIAL_LINKS.linkedin,
      icon: <LinkedInMark className="size-[1.125rem]" />,
    },
    {
      label: "GitHub",
      detail: handle(SOCIAL_LINKS.github, true),
      href: SOCIAL_LINKS.github,
      icon: <GitHubMark className="size-[1.125rem]" />,
    },
    {
      label: "Resume",
      detail: "Download PDF",
      href: RESUME.href,
      download: RESUME.filename,
      icon: <FileText aria-hidden className="size-[1.125rem] text-white" />,
    },
  ];

  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="on-dark flex min-h-svh flex-col bg-night bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1.25px)] bg-[length:24px_24px] text-on-night"
    >
      <RevealList
        as="div"
        className="container-page flex flex-1 flex-col pb-10 pt-28 [container-type:inline-size] sm:pb-12 sm:pt-32 lg:pb-14 lg:pt-36"
      >
        {/* Sized like the hero name, so it spans the column: it measures 4.84em in Newsreader. */}
        <h2 className="wipe -ml-[0.04em] font-serif text-[calc(100cqw/4.9)] leading-[0.9] tracking-[-0.04em] text-white">
          Get in touch
        </h2>

        <div
          className="reveal-item my-auto flex flex-col gap-6 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between"
          style={order(2)}
        >
          <a
            href={SOCIAL_LINKS.email}
            className="email-link w-fit font-serif text-[clamp(1.5rem,1rem+2vw,2.75rem)] leading-tight tracking-[-0.01em] text-white"
          >
            {SITE.email}
          </a>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <a href={SOCIAL_LINKS.email} className={primaryButton}>
              <Mail aria-hidden className="size-4" />
              Email me
            </a>
            <button type="button" onClick={copyEmail} className={secondaryButton}>
              {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied" : ""}
            </span>
          </div>
        </div>

        <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {directory.map((item, i) => (
            <li key={item.label} style={order(i + 3)} className="reveal-item vine-rule">
              <a
                href={item.href}
                {...(item.download
                  ? { download: item.download }
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex items-start justify-between gap-4 py-5"
              >
                <span>
                  <span className="flex items-center gap-2.5 text-[1.0625rem] font-medium text-white">
                    {item.icon}
                    {item.label}
                  </span>
                  <span className="mt-1.5 block text-on-night-2 transition-colors duration-200 group-hover:text-white">
                    {item.detail}
                  </span>
                </span>
                {item.download ? (
                  <Download
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-on-night-2 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-white"
                  />
                ) : (
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-on-night-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                )}
              </a>
            </li>
          ))}
          <li style={order(6)} className="reveal-item vine-rule py-5">
            <span className="flex items-center gap-2.5 text-[1.0625rem] font-medium text-white">
              <MapPin aria-hidden className="size-[1.125rem]" />
              {SITE.location}
            </span>
            <span className="mt-1.5 block min-h-[1.5em] text-on-night-2">{time}</span>
          </li>
        </ul>
      </RevealList>
    </section>
  );
}
