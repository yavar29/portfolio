import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="on-dark bg-night text-on-night-2">
      <div className="container-page">
        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {SITE.location}.
          </p>
          <a href="#top" className="link w-fit text-on-night">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
