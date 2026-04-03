"use client";

import { useState, useRef, useCallback, useEffect, type FormEvent } from "react";
import { Mail, MapPin, Download, Send, FileText, Linkedin, ArrowUpRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { SITE, SOCIAL_LINKS, TURNSTILE_SITE_KEY } from "@/lib/constants";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const CATEGORIES = [
  { label: "Collaboration", value: "Collaboration" },
  { label: "Hiring", value: "Hiring" },
  { label: "Freelance", value: "Freelance" },
  { label: "Just Saying Hi", value: "Just Saying Hi" },
];

export default function ContactSection() {
  const [category, setCategory] = useState("Collaboration");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Explicitly render Turnstile after mount — waits for script to load
  useEffect(() => {
    const container = turnstileRef.current;
    if (!container) return;

    const renderWidget = () => {
      if (!window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        size: "flexible",
      });
    };

    // If script already loaded, render immediately; otherwise poll briefly
    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("submitting");
      setErrorMessage("");

      const formData = new FormData(e.currentTarget);

      // Verify Turnstile token exists
      const turnstileToken = formData.get("cf-turnstile-response");
      if (!turnstileToken) {
        setStatus("error");
        setErrorMessage("Please complete the verification challenge.");
        return;
      }

      // Build JSON payload
      const payload: Record<string, string> = {};
      formData.forEach((value, key) => {
        payload[key] = value.toString();
      });

      try {
        const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setStatus("success");
          formRef.current?.reset();
          setCategory("Collaboration");
        } else {
          const data = await res.json().catch(() => null);
          setStatus("error");
          setErrorMessage(
            data?.message || "Something went wrong. Please try again."
          );
        }
      } catch {
        setStatus("error");
        setErrorMessage(
          "Network error. Please check your connection and try again."
        );
      }

      // Reset Turnstile widget for retry
      if (widgetIdRef.current) {
        window.turnstile?.reset(widgetIdRef.current);
      }
    },
    []
  );

  return (
    <section
      id="contact"
      className="relative lg:min-h-screen flex items-center bg-[#060611] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ── Background ambient effects ── */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[700px] w-[700px] rounded-full bg-brand-primary/[0.07] blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.05] blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Doodle illustrations ── */}
      <img
        src="/images/ai-doodle.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 hidden h-[420px] w-auto select-none opacity-[0.03] invert lg:block"
      />
      <img
        src="/images/contact-illustration.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 hidden h-[400px] w-auto select-none opacity-[0.04] invert lg:block"
      />

      <div className="relative mx-auto max-w-6xl w-full">
        {/* ── Section Header ── */}
        <AnimateOnScroll>
          <div className="mb-16 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-400 tracking-wide">
                Available for Opportunities
              </span>
            </div>

            <h2 className="text-4xl font-extrabold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
              Let&apos;s Build Something
              <br />
              <span className="bg-gradient-to-r from-brand-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-slate-400 leading-relaxed">
              Whether it&apos;s an AI/ML role, a GenAI collaboration, or a conversation about
              intelligent systems — I&apos;d love to hear from you.
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 items-stretch">

          {/* ═══ Left: Contact Info (2/5) ═══ */}
          <AnimateOnScroll className="lg:col-span-2 flex flex-col gap-4">
            {/* Contact links card */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2 backdrop-blur-sm">
              {/* Email */}
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-4 rounded-xl p-3.5 transition-all duration-200 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 ring-1 ring-red-500/15">
                  <Mail size={18} className="text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{SITE.email}</p>
                  <p className="text-[11px] text-slate-500">Email me directly</p>
                </div>
                <ArrowUpRight size={15} className="text-slate-600 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="mx-4 border-t border-white/[0.05]" />

              {/* GitHub */}
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl p-3.5 transition-all duration-200 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500/20 to-slate-600/20 ring-1 ring-slate-500/15">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] text-white">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">github.com/yavar29</p>
                  <p className="text-[11px] text-slate-500">Check my projects</p>
                </div>
                <ArrowUpRight size={15} className="text-slate-600 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="mx-4 border-t border-white/[0.05]" />

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl p-3.5 transition-all duration-200 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 ring-1 ring-blue-500/15">
                  <Linkedin size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">in/yavar-khan29</p>
                  <p className="text-[11px] text-slate-500">Connect on LinkedIn</p>
                </div>
                <ArrowUpRight size={15} className="text-slate-600 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Resume download */}
            <a
              href="/YavarKhan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.05] p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-primary/40 hover:bg-brand-primary/[0.09]"
            >
              <div className="rounded-xl bg-brand-primary/15 p-3 transition-transform duration-300 group-hover:-translate-y-0.5">
                <FileText size={22} className="text-brand-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Download Resume</p>
                <p className="text-xs text-slate-500">PDF &bull; Updated 2026</p>
              </div>
              <Download size={16} className="text-brand-primary/50 transition-colors duration-200 group-hover:text-brand-primary" />
            </a>

            {/* Map tile */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] min-h-[180px] flex-1 transition-[border-color] duration-300 hover:border-brand-primary/30">
              <img
                src="/images/san-jose-map.jpg"
                alt="Map of San Jose, CA"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Radar pulse */}
              <div className="absolute left-[46%] top-[49%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex items-center justify-center">
                  <span className="absolute h-6 w-6 rounded-full border border-brand-primary/50 animate-radar-scan" />
                  <span className="absolute h-12 w-12 rounded-full bg-brand-primary/20 animate-radar-ping" />
                  <span className="absolute h-7 w-7 rounded-full bg-brand-primary/30 animate-radar-ping-sm" />
                  <span className="h-3.5 w-3.5 rounded-full bg-brand-primary shadow-lg shadow-brand-primary/60 border-2 border-white" />
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 backdrop-blur-sm">
                <MapPin size={14} className="text-brand-primary" />
                <span className="text-xs font-semibold tracking-wider text-white uppercase">
                  {SITE.location}
                </span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ═══ Right: Contact Form (3/5) ═══ */}
          <AnimateOnScroll delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
              <h3 className="mb-1 text-xl font-bold text-white font-[family-name:var(--font-heading)]">
                Send a Message
              </h3>
              <p className="mb-7 text-sm text-slate-500">
                I&apos;ll get back to you within 24 hours.
              </p>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="_subject" value={`Portfolio Contact: ${category}`} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="category" value={category} />

                {/* Category selector */}
                <div>
                  <label className="mb-2.5 block text-xs font-medium text-slate-500 uppercase tracking-wider">
                    What brings you here?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={cn(
                          "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer border",
                          category === cat.value
                            ? "bg-brand-primary/15 text-brand-primary border-brand-primary/30 shadow-sm shadow-brand-primary/10"
                            : "bg-white/[0.03] text-slate-400 border-white/[0.08] hover:bg-white/[0.06] hover:text-slate-300"
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      disabled={status === "submitting"}
                      className="w-full rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-brand-primary/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-brand-primary/20 disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={status === "submitting"}
                      className="w-full rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-brand-primary/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-brand-primary/20 disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={status === "submitting"}
                    className="w-full rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-brand-primary/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-brand-primary/20 resize-none disabled:opacity-50"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                {/* Cloudflare Turnstile — explicitly rendered */}
                <div ref={turnstileRef} className="[&_iframe]:rounded-lg [&_iframe]:border [&_iframe]:border-white/[0.08]" />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={cn(
                    "group relative w-full cursor-pointer overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300",
                    status === "submitting"
                      ? "bg-brand-primary/50 cursor-not-allowed shadow-none"
                      : "bg-gradient-to-r from-brand-primary to-violet-500 shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30"
                  )}
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Send Message
                      </>
                    )}
                  </span>
                  {status !== "submitting" && (
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  )}
                </button>
              </form>

              {/* Success message */}
              {status === "success" && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] p-4">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">
                      Message sent successfully!
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Your message has been sent to Yavar. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-3 text-xs font-medium text-emerald-400 underline underline-offset-2 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {/* Error message */}
              {status === "error" && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />
                  <div>
                    <p className="text-sm font-semibold text-red-300">
                      Failed to send message
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
