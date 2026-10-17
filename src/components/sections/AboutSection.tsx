import { focusAreas } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="section-pad">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 className="t-h2">About</h2>
          <picture>
            <source
              type="image/avif"
              srcSet="/images/yavar-about-400.avif 400w, /images/yavar-about-720.avif 720w"
              sizes="(min-width: 1024px) 300px, 240px"
            />
            <source
              type="image/webp"
              srcSet="/images/yavar-about-400.webp 400w, /images/yavar-about-720.webp 720w"
              sizes="(min-width: 1024px) 300px, 240px"
            />
            <img
              src="/images/yavar-about-400.webp"
              alt="Yavar Khan standing"
              width={896}
              height={1152}
              loading="lazy"
              decoding="async"
              className="mt-10 hidden h-auto w-full max-w-[18.75rem] rounded-[2rem] bg-gradient-to-b from-violet-wash to-paper-2 lg:block"
            />
          </picture>
        </div>

        <div className="lg:col-span-8 lg:pt-2">
          <p className="max-w-[38ch] font-serif text-[1.5rem] leading-[1.42] text-ink sm:text-[1.75rem]">
            I&apos;m an AI Engineer with 3+ years in software engineering, currently the first engineer at
            Aerveil, building Claude-based decision systems. Before that, at Accenture, I operated 120+
            production APIs for a Fortune 500 pharma client. I hold an M.S. in Computer Science (AI/ML)
            from the University at Buffalo and am a Claude Certified Architect – Professional.
          </p>

          <h3 className="mt-16 font-sans text-base font-semibold tracking-normal text-ink">What I work on</h3>
          <ul className="mt-6 grid gap-10 md:grid-cols-3 md:gap-8">
            {focusAreas.map((area) => (
              <li key={area.title} className="border-t border-ink/15 pt-5">
                <h4 className="text-[1.0625rem] font-semibold leading-snug text-ink">{area.title}</h4>
                <p className="mt-2.5 text-[0.9688rem] leading-relaxed text-ink-2">{area.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-3">{area.tools.join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
