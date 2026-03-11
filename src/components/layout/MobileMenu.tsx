"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: string;
}

export default function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
              <span className="text-lg font-bold font-[family-name:var(--font-heading)] text-brand-dark">
                Menu
              </span>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-brand-dark hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="mt-4 space-y-1 px-4">
              {NAV_ITEMS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        active === sectionId
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-brand-dark/70 hover:bg-gray-50 hover:text-brand-primary"
                      )}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
