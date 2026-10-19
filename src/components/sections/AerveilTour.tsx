"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface Source {
  src: string;
  type: string;
  // Average bits per second, for the decoder check.
  bitrate: number;
}

// Each size as AV1 (smaller) and H.264 (decodes everywhere). Phones always get 720p: on a small,
// dense screen it looks the same and is a third of the download. Larger screens get 1440p once
// the tour is drawn wider than 1408 device pixels, so 720p is never stretched by more than 10%.
const TIERS: { width: number; height: number; sources: Source[] }[] = [
  {
    width: 1280,
    height: 720,
    sources: [
      { src: "/video/aerveil-tour-720-av1.mp4", type: 'video/mp4; codecs="av01.0.08M.10"', bitrate: 350_000 },
      { src: "/video/aerveil-tour-720-h264.mp4", type: 'video/mp4; codecs="avc1.640020"', bitrate: 530_000 },
    ],
  },
  {
    width: 2560,
    height: 1440,
    sources: [
      { src: "/video/aerveil-tour-1440-av1.mp4", type: 'video/mp4; codecs="av01.0.12M.10"', bitrate: 805_000 },
      { src: "/video/aerveil-tour-1440-h264.mp4", type: 'video/mp4; codecs="avc1.640033"', bitrate: 1_180_000 },
    ],
  },
];

/**
 * Plays AV1 only where this device decodes it in hardware, so playback never competes with
 * scrolling for the CPU. Everywhere else gets H.264, which nearly every device decodes in hardware.
 */
async function pickSource(video: HTMLVideoElement) {
  const wide = window.innerWidth >= 768 && video.clientWidth * window.devicePixelRatio > 1408;
  const tier = wide ? TIERS[1] : TIERS[0];
  const fallback = tier.sources[tier.sources.length - 1];
  for (const source of tier.sources.slice(0, -1)) {
    if (!video.canPlayType(source.type)) continue;
    if (!("mediaCapabilities" in navigator)) return { source, fallback };
    try {
      const info = await navigator.mediaCapabilities.decodingInfo({
        type: "file",
        video: {
          contentType: source.type,
          width: tier.width,
          height: tier.height,
          bitrate: source.bitrate,
          framerate: 60,
        },
      });
      if (info.supported && info.smooth && info.powerEfficient) return { source, fallback };
    } catch {
      // The capability check doesn't know this codec; try the next one.
    }
  }
  return { source: fallback, fallback };
}

const POSTER_SIZES =
  "(min-width: 1408px) 83rem, (min-width: 1024px) calc(100vw - 5rem), (min-width: 640px) calc(100vw - 4rem), 121vw";
const MEDIA_CLASS = "absolute inset-y-0 -left-[15.6%] h-full w-[121%] max-w-none sm:left-0 sm:w-full";
const LEAN_SPRING = { stiffness: 70, damping: 22, mass: 0.7, restDelta: 0.0005 };
const TILT_SPRING = { stiffness: 110, damping: 22, mass: 0.7, restDelta: 0.0005 };
const RING = 2 * Math.PI * 23;

// The floor: vine rows on the ground, seen from just above and looking down the rows. Depth runs
// from NEAR (the canvas's bottom edge) to FAR; the canvas's top edge is the horizon, right at the
// foot of the tour. Rows are far apart and vines close together, so each row reads as a dotted
// line running to the vanishing point.
const NEAR = 3;
const FAR = 18;
const VINE_STEP = 0.3;
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function drawFloor(canvas: HTMLCanvasElement, travel: number, sway: number) {
  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!ctx || !width || !height) return;

  const scale = canvas.width / width;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const rowGap = Math.min(92, Math.max(52, width / 18));
  const first = NEAR - (((travel % VINE_STEP) + VINE_STEP) % VINE_STEP);
  for (let z = first; z < FAR; z += VINE_STEP) {
    const s = NEAR / z;
    const y = height * s;
    const t = y / height;
    // Fades out toward the horizon and again at the near edge, so the field has no hard edges.
    const alpha = 0.36 * smoothstep(0.08, 0.72, t) ** 1.6 * (1 - smoothstep(0.76, 1, t));
    if (alpha < 0.004) continue;

    const gap = rowGap * s;
    const radius = Math.max(0.6, 1.9 * s);
    const shift = sway * rowGap * 0.6 * s;
    const reach = Math.ceil((width / 2 + Math.abs(shift)) / gap) + 1;
    ctx.beginPath();
    for (let k = -reach; k <= reach; k++) {
      const x = width / 2 + k * gap + shift;
      ctx.moveTo(x + radius, y);
      ctx.arc(x, y, radius, 0, Math.PI * 2);
    }
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
    ctx.fill();
  }
}

/**
 * The Aerveil product tour, standing on a field of vine rows drawn from the site's dot grid.
 * It lies back and stands up as it scrolls into view, and leans a little toward the cursor; the
 * rows drift toward the viewer as the page scrolls. Flat and still for reduced motion.
 *
 * The video loads only once the stage is near the screen, plays only while it is on screen, and
 * pauses off screen. With reduced motion or Save-Data it waits for the play button.
 */
export default function AerveilTour({ status }: { status: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const toggleRef = useRef<() => void>(() => {});
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(false);

  // Scroll: `lean` goes from 1 (lying back) to 0 (upright) as the tour arrives at the middle of
  // the screen; `pass` runs 0 to 1 while any of the stage is on screen.
  const { scrollYProgress: arrival } = useScroll({ target: screenRef, offset: ["start end", "center center"] });
  const { scrollYProgress: pass } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const lean = useSpring(useTransform(arrival, [0, 1], [1, 0]), LEAN_SPRING);

  // Pointer position over the stage, -0.5 to 0.5 on each axis.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerX, TILT_SPRING);
  const tiltY = useSpring(pointerY, TILT_SPRING);

  const screenTransform = useTransform(() => {
    const rotateX = lean.get() * 22 - tiltY.get() * 4;
    const rotateY = tiltX.get() * 6;
    // Exactly flat at rest, so the video is drawn pixel for pixel and stays sharp.
    if (Math.abs(rotateX) < 0.05 && Math.abs(rotateY) < 0.05) return "none";
    return `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(${(1 - lean.get() * 0.08).toFixed(4)})`;
  });

  useMotionValueEvent(screenTransform, "change", (transform) => {
    if (screenRef.current && !reduceMotion) screenRef.current.style.transform = transform;
  });

  // Floor: sized to the canvas, redrawn at most once a frame while the scroll or pointer moves.
  useEffect(() => {
    const canvas = floorRef.current;
    if (!canvas) return;
    let frame = 0;
    const draw = () => {
      frame = 0;
      drawFloor(canvas, reduceMotion ? 0 : pass.get() * 2.2, reduceMotion ? 0 : -tiltX.get());
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(canvas.clientWidth * scale);
      canvas.height = Math.round(canvas.clientHeight * scale);
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const offPass = pass.on("change", schedule);
    const offTilt = tiltX.on("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      offPass();
      offTilt();
    };
  }, [reduceMotion, pass, tiltX]);

  // Pointer lean, for mouse and trackpad only.
  useEffect(() => {
    const stage = stageRef.current;
    if (screenRef.current) screenRef.current.style.transform = reduceMotion ? "" : screenTransform.get();
    if (!stage || reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, screenTransform, pointerX, pointerY]);

  // Loading and playback.
  useEffect(() => {
    const video = videoRef.current;
    const screen = screenRef.current;
    if (!video || !screen) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let wantsPlay = !reduceMotion && !connection?.saveData;
    let inView = false;
    let loading: Promise<void> | undefined;
    let fallback: Source | undefined;
    let frame = 0;

    const load = () =>
      (loading ??= pickSource(video).then((picked) => {
        fallback = picked.source === picked.fallback ? undefined : picked.fallback;
        video.src = picked.source.src;
        video.load();
      }));

    const sync = () => {
      if (wantsPlay && inView && document.visibilityState === "visible") {
        load()
          .then(() => video.play())
          // Autoplay refused (iOS Low Power Mode, for one): the play button still works.
          .catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };

    const drawRing = () => {
      if (ringRef.current && video.duration) {
        ringRef.current.style.strokeDashoffset = String(RING * (1 - video.currentTime / video.duration));
      }
      frame = requestAnimationFrame(drawRing);
    };
    const onPlaying = () => {
      setShown(true);
      setPlaying(true);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(drawRing);
    };
    const onPause = () => {
      setPlaying(false);
      cancelAnimationFrame(frame);
    };
    const onError = () => {
      if (!fallback) return;
      video.src = fallback.src;
      fallback = undefined;
      video.load();
      sync();
    };

    toggleRef.current = () => {
      wantsPlay = video.paused;
      if (wantsPlay) inView = true;
      sync();
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        if (wantsPlay) load();
      },
      { rootMargin: "100% 0px" }
    );
    const view = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        sync();
      },
      { threshold: [0, 0.35] }
    );
    near.observe(screen);
    view.observe(screen);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", sync);

    return () => {
      near.disconnect();
      view.disconnect();
      cancelAnimationFrame(frame);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <div ref={stageRef} className="relative mt-8 sm:mt-10 lg:mt-12">
      <div className="relative mx-auto max-w-[88rem] [perspective:clamp(900px,140vw,2200px)] sm:px-8 lg:px-10">
        {/* The floor's horizon sits at the foot of the devices, where the tour's own black fades out. */}
        <canvas
          ref={floorRef}
          aria-hidden
          className="vine-floor absolute left-1/2 top-[91%] h-[clamp(9rem,16vw,14rem)] w-screen -translate-x-1/2"
        />
        {/*
          On phones the tour is drawn 21% larger and only its outer black is cropped: across the
          whole tour the devices stay between 15.5% and 93% of the width, so the crop is centered
          on them and keeps a 3% margin. On larger screens it is capped by the screen's height,
          so the tour and its play control below fit on one screen together.
        */}
        <div
          ref={screenRef}
          className="tour-screen relative mx-auto aspect-[1.469] origin-bottom overflow-hidden will-change-transform sm:aspect-video sm:max-w-[calc((100svh_-_14rem)*16/9)] sm:overflow-visible"
        >
          <picture>
            {/* Held still for reduced motion, so it shows the tour mid-way rather than its opening. */}
            <source
              media="(prefers-reduced-motion: reduce)"
              type="image/avif"
              srcSet="/video/aerveil-tour-still-1280.avif 1280w, /video/aerveil-tour-still-2560.avif 2560w"
              sizes={POSTER_SIZES}
            />
            <source
              media="(prefers-reduced-motion: reduce)"
              type="image/webp"
              srcSet="/video/aerveil-tour-still-1280.webp 1280w, /video/aerveil-tour-still-2560.webp 2560w"
              sizes={POSTER_SIZES}
            />
            {/* Otherwise the tour's first frame, so playback starts without a jump. */}
            <source
              type="image/avif"
              srcSet="/video/aerveil-tour-start-1280.avif 1280w, /video/aerveil-tour-start-2560.avif 2560w"
              sizes={POSTER_SIZES}
            />
            <source
              type="image/webp"
              srcSet="/video/aerveil-tour-start-1280.webp 1280w, /video/aerveil-tour-start-2560.webp 2560w"
              sizes={POSTER_SIZES}
            />
            <img
              src="/video/aerveil-tour-start-1280.webp"
              alt=""
              width={2560}
              height={1440}
              loading="lazy"
              decoding="async"
              className={MEDIA_CLASS}
            />
          </picture>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            width={2560}
            height={1440}
            aria-label="Aerveil product tour"
            className={cn(MEDIA_CLASS, "transition-opacity duration-700", shown ? "opacity-100" : "opacity-0")}
          />
        </div>
      </div>

      <div className="container-page relative flex items-center justify-between gap-6 pt-6 sm:pt-8">
        <p className="flex items-center gap-3 text-[0.9375rem] leading-snug text-mist">
          <span aria-hidden className="status-dot" />
          {status}
        </p>
        <button
          type="button"
          onClick={() => toggleRef.current()}
          aria-label={playing ? "Pause the Aerveil tour" : "Play the Aerveil tour"}
          className="relative grid size-12 shrink-0 place-items-center rounded-full text-white transition-colors duration-200 hover:bg-white/10"
        >
          <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r="23" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1.5" />
            <circle
              ref={ringRef}
              cx="24"
              cy="24"
              r="23"
              fill="none"
              stroke="#fff"
              strokeWidth="1.5"
              strokeDasharray={RING}
              strokeDashoffset={RING}
            />
          </svg>
          {playing ? (
            <Pause aria-hidden className="size-4 fill-current" />
          ) : (
            <Play aria-hidden className="size-4 translate-x-px fill-current" />
          )}
        </button>
      </div>
    </div>
  );
}
