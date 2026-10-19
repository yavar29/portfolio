import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1024px) 640px, (min-width: 640px) 420px, 340px";

/**
 * Black panel holding the black-and-white portrait. The portrait stands on the section's
 * bottom edge and breaks past the panel's right edge on wide screens. It holds still.
 */
export default function AboutPortrait({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute inset-y-0 -left-[100vw] -right-[100vw] bg-night bg-[radial-gradient(circle,rgb(255_255_255/0.06)_1px,transparent_1.25px)] bg-[length:24px_24px] lg:right-0"
      />
      <div className="absolute bottom-0 left-1/2 h-[92%] w-max -translate-x-1/2 lg:left-auto lg:-right-[30%] lg:h-[84%] lg:translate-x-0">
        <picture className="block h-full">
          <source
            type="image/avif"
            srcSet="/images/yavar-about-480.avif 480w, /images/yavar-about-720.avif 720w, /images/yavar-about-896.avif 896w"
            sizes={SIZES}
          />
          <source
            type="image/webp"
            srcSet="/images/yavar-about-480.webp 480w, /images/yavar-about-720.webp 720w, /images/yavar-about-896.webp 896w"
            sizes={SIZES}
          />
          <img
            src="/images/yavar-about-720.webp"
            alt="Yavar Khan"
            width={896}
            height={1045}
            loading="lazy"
            decoding="async"
            className="block h-full w-auto max-w-none"
          />
        </picture>
      </div>
    </div>
  );
}
