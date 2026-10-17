// Layout only. Every block marked "Placeholder" waits for approved Aerveil copy and visuals.

function Placeholder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-dashed border-white/25 p-4 ${className ?? ""}`}>
      <p className="mb-1 text-xs font-semibold text-on-night-2">Placeholder</p>
      <div className="flex flex-1 flex-col text-on-night-2">{children}</div>
    </div>
  );
}

export default function AerveilSection() {
  return (
    <section id="aerveil" className="on-dark section-pad bg-night text-on-night">
      <div className="container-page">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="t-h2">Aerveil</h2>
          <p className="text-on-night-2">AI Engineer, March 2026 – present. San Jose, CA.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <Placeholder>
              <p className="font-serif text-[1.75rem] leading-snug text-on-night">Headline about Aerveil</p>
            </Placeholder>
            <Placeholder>
              <p>Two or three sentences on what Aerveil does and what you own there.</p>
            </Placeholder>
          </div>
          <div className="lg:col-span-7">
            <Placeholder className="flex aspect-[16/10] flex-col">
              <p className="grid flex-1 place-items-center text-center">Product visual or diagram</p>
            </Placeholder>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {["First highlight", "Second highlight", "Third highlight"].map((label) => (
            <li key={label}>
              <Placeholder>
                <p className="font-semibold text-on-night">{label}</p>
                <p className="mt-1 text-sm">One line on what was built and the result.</p>
              </Placeholder>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
