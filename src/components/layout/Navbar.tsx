"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, RESUME } from "@/lib/constants";

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || open
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-serif text-[1.375rem] leading-none tracking-tight text-ink">
          Yavar Khan
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-[0.9375rem] transition-colors duration-200 hover:text-ink",
                    isActive ? "text-ink" : "text-ink-3"
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={RESUME.href}
            download={RESUME.filename}
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors duration-200 hover:bg-violet-deep sm:inline-flex"
          >
            <Download aria-hidden className="size-4" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid size-11 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </nav>

      <div id="mobile-nav" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="container-page py-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-serif text-2xl text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-3 border-t border-line pt-5 sm:hidden">
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9375rem] font-medium text-paper"
            >
              <Download aria-hidden className="size-4" />
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
