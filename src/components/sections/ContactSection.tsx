"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle, Download, Loader2 } from "lucide-react";
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

const fieldClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[0.9688rem] text-on-night outline-none transition-colors duration-200 placeholder:text-on-night-2/60 focus:border-white/60 focus:bg-white/[0.06] disabled:opacity-50";

export default function ContactSection() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

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
    <section id="contact" data-nav-theme="dark" className="on-dark bg-night text-on-night">
      <div className="container-page section-pad grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="t-h2">Get in touch</h2>
          <p className="t-lead mt-5 max-w-[34ch] text-on-night-2">
            Email me directly, or send a message with the form.
          </p>
          <a
            href={SOCIAL_LINKS.email}
            className="link mt-10 inline-block break-all font-serif text-[1.5rem] leading-tight text-on-night sm:text-[1.875rem]"
          >
            {SITE.email}
          </a>
          <ul className="mt-8 space-y-3 text-[0.9688rem]">
            <li>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1 text-on-night"
              >
                LinkedIn
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1 text-on-night"
              >
                GitHub
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </li>
          </ul>
          <a
            href={RESUME.href}
            download={RESUME.filename}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-on-night px-5 py-3 text-[0.9375rem] font-medium text-night transition-colors duration-200 hover:bg-white"
          >
            <Download aria-hidden className="size-4" />
            Download resume
          </a>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 lg:col-span-7"
          aria-describedby="contact-status"
        >
          <input type="hidden" name="_subject" value={`Portfolio contact: ${topic}`} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="category" value={topic} />

          <fieldset>
            <legend className="text-sm font-medium text-on-night-2">What is this about?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <label
                  key={t}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-on-night",
                    topic === t
                      ? "border-on-night bg-white/10 text-on-night"
                      : "border-white/12 text-on-night-2 hover:border-white/30"
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

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-on-night-2">
                Name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" disabled={busy} className={cn(fieldClass, "mt-2")} />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-on-night-2">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" disabled={busy} className={cn(fieldClass, "mt-2")} />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-on-night-2">
              Message
            </label>
            <textarea id="message" name="message" required rows={5} disabled={busy} className={cn(fieldClass, "mt-2 resize-y")} />
          </div>

          <div ref={turnstileRef} className="min-h-[65px]" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-mist disabled:opacity-60"
            >
              {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
              {busy ? "Sending…" : "Send message"}
            </button>
            <p id="contact-status" aria-live="polite" className="text-sm">
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
          </div>
        </form>
      </div>
    </section>
  );
}
