import { skillCategories } from "@/lib/data";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-pad bg-paper-2">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
        <h2 className="t-h2 lg:col-span-4">Skills</h2>
        <dl className="border-t border-ink/15 lg:col-span-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-[12.5rem_1fr] sm:gap-8"
            >
              <dt className="font-serif text-[1.375rem] leading-snug text-ink">{category.title}</dt>
              <dd className="leading-relaxed text-ink-2">{category.skills.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
