"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Check, CheckCircle, Copy, Download, Loader2, MapPin } from "lucide-react";
import { GitHubMark, LinkedInMark } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";
import { RESUME, SITE, SOCIAL_LINKS, TURNSTILE_SITE_KEY } from "@/lib/constants";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const TOPICS = ["Hiring", "Collaboration", "Just saying hi"];
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Underlined fields: quieter than boxes inside the form panel, and the focus state is the line.
const fieldClass =
  "w-full border-b border-white/20 bg-transparent px-0 py-2.5 text-[1rem] text-on-night outline-none transition-colors duration-200 placeholder:text-on-night-2/50 focus:border-white disabled:opacity-50";
const labelClass = "text-[0.8125rem] font-medium text-on-night-2";
const linkPill =
  "inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2.5 text-[0.9375rem] text-on-night transition-colors duration-200 hover:border-white/45";

export default function ContactSection() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context or denied): the mailto link still works.
    }
  }

  // Load the Turnstile script only when the form is about to scroll into view.
  useEffect(() => {
    const container = turnstileRef.current;
    if (!container) return;

    const render = () => {
      if (!window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        size: "flexible",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.turnstile) return render();
        let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
        if (!script) {
          script = document.createElement("script");
          script.src = TURNSTILE_SRC;
          script.async = true;
          document.head.appendChild(script);
        }
        script.addEventListener("load", render, { once: true });
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    if (!formData.get("cf-turnstile-response")) {
      setStatus("error");
      setErrorMessage("Complete the verification check, then send again.");
      return;
    }

    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        setTopic(TOPICS[0]);
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(data?.message || "The message didn't go through. Try again, or email me directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("No connection. Check your network and send again, or email me directly.");
    }

    if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
  }

  const busy = status === "submitting";

  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="on-dark flex min-h-svh flex-col justify-center bg-night bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1.25px)] bg-[length:24px_24px] text-on-night"
    >
      <div className="container-page section-pad grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 className="text-[clamp(3.25rem,2rem+5vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-white">
            Get in touch
          </h2>
          <p className="t-lead mt-6 max-w-[34ch] text-on-night-2">
            Email me directly, or send a message with the form.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={SOCIAL_LINKS.email}
              className="link break-all font-serif text-[1.3125rem] leading-tight text-white sm:text-[2rem]"
            >
              {SITE.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email address copied" : "Copy email address"}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-on-night-2 transition-colors duration-200 hover:border-white/45 hover:text-white"
            >
              {copied ? <Check aria-hidden className="size-4 text-white" /> : <Copy aria-hidden className="size-4" />}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied" : ""}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkPill}>
              <LinkedInMark className="size-[1.125rem]" />
              LinkedIn
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkPill}>
              <GitHubMark className="size-[1.125rem]" />
              GitHub
            </a>
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-mist"
            >
              <Download aria-hidden className="size-4" />
              Download resume
            </a>
          </div>

          <p className="mt-10 inline-flex items-center gap-2 text-sm text-on-night-2">
            <MapPin aria-hidden className="size-4" />
            {SITE.location}
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="rounded-[1.75rem] border border-white/10 bg-charcoal/80 p-6 sm:p-8 lg:col-span-6 lg:p-10"
          aria-describedby="contact-status"
        >
          <input type="hidden" name="_subject" value={`Portfolio contact: ${topic}`} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="category" value={topic} />

          <fieldset>
            <legend className={labelClass}>What is this about?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <label
                  key={t}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-on-night",
                    topic === t
                      ? "border-white bg-white text-ink"
                      : "border-white/15 text-on-night-2 hover:border-white/40 hover:text-on-night"
                  )}
                >
                  <input
                    type="radio"
                    name="topic"
                    value={t}
                    checked={topic === t}
                    onChange={() => setTopic(t)}
                    className="sr-only"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 grid gap-7 sm:grid-cols-2 sm:gap-6">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" disabled={busy} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" disabled={busy} className={fieldClass} />
            </div>
          </div>

          <div className="mt-7">
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea id="message" name="message" required rows={4} disabled={busy} className={cn(fieldClass, "resize-y")} />
          </div>

          <div ref={turnstileRef} className="mt-7 min-h-[65px]" />

          <button
            type="submit"
            disabled={busy}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-mist disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <p id="contact-status" aria-live="polite" className="mt-4 min-h-5 text-sm">
            {status === "success" && (
              <span className="inline-flex items-center gap-2 text-on-night">
                <CheckCircle aria-hidden className="size-4 text-on-night" />
                Message sent. I&apos;ll reply by email.
              </span>
            )}
            {status === "error" && (
              <span className="inline-flex items-center gap-2 text-[#f5b5c0]">
                <AlertCircle aria-hidden className="size-4" />
                {errorMessage}
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
