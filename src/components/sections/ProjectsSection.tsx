import { ArrowUpRight, Github, Play } from "lucide-react";
import { earlierProjects, featuredProjects, type ProjectLink } from "@/lib/data";
import { cn } from "@/lib/utils";
import ArchitectureFlow from "./ArchitectureFlow";

const linkIcon = (link: ProjectLink) =>
  link.label === "GitHub" ? Github : link.label.startsWith("Demo") ? Play : ArrowUpRight;

/*
 * Each featured project pairs its write-up with a black panel showing how the system
 * works; the panels alternate sides down the page. Earlier work follows as a compact list.
 */
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-pad bg-paper bg-[radial-gradient(circle,rgb(0_0_0/0.08)_1px,transparent_1.25px)] bg-[length:24px_24px]"
    >
      <div className="container-page">
        <div className="max-w-[44rem]">
          <h2 className="t-h2">Projects</h2>
          <p className="t-lead mt-5 text-ink-2">
            Agent and retrieval systems I&apos;ve designed and built, followed by earlier machine
            learning work.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          {featuredProjects.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={project.title}
                className="grid items-center gap-10 border-t border-ink/12 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16"
              >
                <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
                  <p className="text-sm font-medium text-ink-3">{project.kind}</p>
                  <h3 className="mt-2 text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] leading-[1.02] text-ink">
                    {project.title}
                  </h3>

                  <ul className="mt-6 space-y-3 text-ink-2">
                    {project.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-ink" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul aria-label="Built with" className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-ink/12 bg-paper px-2.5 py-1 text-[0.8125rem] text-ink-2"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {project.links.map((link, l) => {
                      const Icon = linkIcon(link);
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                            l === 0
                              ? "bg-ink text-paper hover:bg-ink-2"
                              : "border border-ink/20 bg-paper text-ink hover:border-ink/50"
                          )}
                        >
                          <Icon aria-hidden className="size-4" />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>

                  {project.collaborator && (
                    <p className="mt-5 text-sm text-ink-3">
                      Built together with{" "}
                      <a
                        href={project.collaborator.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-ink-2"
                      >
                        {project.collaborator.name}
                      </a>
                      .
                    </p>
                  )}
                </div>

                <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
                  <ArchitectureFlow title={project.title} flow={project.flow} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="border-t border-ink/12 pt-12 lg:pt-16">
          <h3 className="font-sans text-xl font-semibold tracking-normal text-ink">Earlier machine learning work</h3>
          <ul className="mt-6 grid md:grid-cols-2 md:gap-x-12">
            {earlierProjects.map((project) => (
              <li key={project.title} className="border-b border-ink/10">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-6 py-5"
                >
                  <span className="min-w-0">
                    <span className="block font-serif text-[1.25rem] leading-snug text-ink">{project.title}</span>
                    <span className="mt-1 block text-[0.9375rem] text-ink-2">{project.description}</span>
                  </span>
                  <span className="mt-1.5 inline-flex shrink-0 items-center gap-1 text-sm text-ink-3 transition-colors group-hover:text-ink">
                    {project.linkLabel}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
