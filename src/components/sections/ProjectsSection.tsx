import { ArrowUpRight } from "lucide-react";
import { earlierProjects, featuredProjects } from "@/lib/data";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link inline-flex items-center gap-1 text-violet-deep"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5" />
    </a>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-pad">
      <div className="container-page">
        <div className="max-w-[44rem]">
          <h2 className="t-h2">Projects</h2>
          <p className="t-lead mt-5 text-ink-2">
            Agent and retrieval systems I&apos;ve designed and built, followed by earlier machine
            learning work.
          </p>
        </div>

        <ul className="mt-14 border-t border-ink/15">
          {featuredProjects.map((project) => (
            <li
              key={project.title}
              className="grid gap-6 border-b border-line py-10 md:py-14 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-5">
                <h3 className="t-h3 text-ink">{project.title}</h3>
                <p className="mt-2 text-ink-2">{project.kind}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
                  {project.links.map((link) => (
                    <ExternalLink key={link.href} href={link.href}>
                      {link.label}
                    </ExternalLink>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <ul className="space-y-3 text-ink-2">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-violet" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-ink-3">Built with {project.stack.join(", ")}.</p>
                {project.collaborator && (
                  <p className="mt-1 text-sm text-ink-3">
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
            </li>
          ))}
        </ul>

        <h3 className="mt-20 font-sans text-xl font-semibold tracking-normal text-ink">
          Earlier machine learning work
        </h3>
        <ul className="mt-6 border-t border-ink/15">
          {earlierProjects.map((project) => (
            <li
              key={project.title}
              className="grid gap-1 border-b border-line py-4 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <p className="font-medium text-ink md:col-span-4">{project.title}</p>
              <p className="text-[0.9688rem] text-ink-2 md:col-span-6">{project.description}</p>
              <p className="text-[0.9375rem] md:col-span-2 md:text-right">
                <ExternalLink href={project.href}>{project.linkLabel}</ExternalLink>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
