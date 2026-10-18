import type { CSSProperties } from "react";
import RevealList from "@/components/ui/RevealList";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

// Pills in a category reveal in a quick ripple; capped so long lists don't drag on.
const order = (i: number) => ({ "--i": Math.min(i, 10) * 0.45 }) as CSSProperties;

/*
 * Charcoal with the dot grid, between the light Projects and Certifications sections.
 * AI/ML & GenAI, the core of the role, spans the full width; the other categories sit
 * two by two beneath it.
 */
export default function SkillsSection() {
  return (
    <section
      id="skills"
      data-nav-theme="dark"
      className="on-dark section-pad bg-charcoal bg-[radial-gradient(circle,rgb(255_255_255/0.075)_1px,transparent_1.25px)] bg-[length:24px_24px] text-on-night"
    >
      <div className="container-page">
        <h2 className="t-h2 text-white">Skills</h2>

        <div className="mt-10 grid gap-x-12 lg:mt-14 lg:grid-cols-2">
          {skillCategories.map((category, c) => (
            <div
              key={category.title}
              className={cn("border-t border-white/[0.12] pb-9 pt-6", c === 0 && "lg:col-span-2")}
            >
              <h3 className={cn("leading-snug text-white", c === 0 ? "text-[1.75rem]" : "text-[1.375rem]")}>
                {category.title}
              </h3>
              <RevealList className="mt-5 flex flex-wrap gap-2" label={category.title}>
                {category.skills.map((skill, i) => (
                  <li key={skill} style={order(i)} className="reveal-item">
                    {/* Hover styling sits on the inner span so its transition can't replace the reveal's. */}
                    <span
                      className={cn(
                        "block rounded-full border border-white/[0.14] bg-white/[0.03] text-mist transition-colors duration-200 hover:border-white/40 hover:text-white",
                        c === 0 ? "px-3.5 py-2 text-[0.9375rem]" : "px-3 py-1.5 text-[0.875rem]"
                      )}
                    >
                      {skill}
                    </span>
                  </li>
                ))}
              </RevealList>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
