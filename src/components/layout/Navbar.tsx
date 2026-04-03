"use client";

import { useState, useEffect } from "react";
import { Menu, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import useActiveSection from "@/hooks/useActiveSection";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-black",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-white"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Spacer for balance on desktop */}
          <div className="hidden md:block w-32" />

          {/* Desktop nav – centered */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-bold transition-colors",
                      active === sectionId
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-brand-dark/70 hover:text-brand-primary"
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Download CV button */}
          <a
            href="/YavarKhan_Resume.pdf"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-dark text-white px-5 py-2 text-sm font-semibold hover:bg-brand-dark/85 transition-colors"
          >
            Download CV
            <Download size={14} />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="ml-auto rounded-lg p-2 text-brand-dark hover:bg-gray-100 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} active={active} />
    </>
  );
}
