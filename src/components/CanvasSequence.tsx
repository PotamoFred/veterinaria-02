"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/urls";

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const track = canvas.closest("main") ?? wrapper;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // The hero sequence changes between exports, so the exact filenames come
    // from the manifest written by build/gen-assets.mjs.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isReady = (img?: HTMLImageElement): boolean =>
      !!img && img.complete && img.naturalWidth > 0;

    const images: HTMLImageElement[] = [];

    const start = async () => {
      type Frame = { webp: string; small?: string };
      let sources: Frame[];

      // Decoding costs RAM proportional to pixel count, and a phone only paints
      // the canvas at ~400 CSS px wide. Small screens take the half-size frames.
      const wantSmall = window.matchMedia("(max-width: 768px)").matches;

      try {
        const res = await fetch(asset("imagenes/frames.json"), { cache: "no-store" });
        const manifest = (await res.json()) as { files?: Frame[] };
        if (!manifest.files?.length) throw new Error("empty manifest");
        sources = manifest.files;
      } catch {
        // Fallback if the manifest is missing: assume a 0-based run of frames.
        sources = Array.from({ length: 13 }, (_, i) => {
          const num = String(i).padStart(3, "0");
          return {
            webp: `ezgif-frame-${num}.webp`,
            small: `ezgif-frame-${num}-sm.webp`,
          };
        });
      }

      sources.forEach((frame, i) => {
        const img = new Image();
        const preferred =
          wantSmall && frame.small ? frame.small : frame.webp;
        // Fall back to the full-size frame if the mobile variant is refused.
        img.onerror = () => {
          if (preferred !== frame.webp && frame.webp) {
            img.src = asset(`imagenes/${frame.webp}`);
          }
        };
        img.onload = () => {
          if (i === 0) renderFrame(1);
        };
        img.src = asset(`imagenes/${preferred}`);
        images.push(img);
      });

      updateScroll();
      play();
    };

    start();

    let currentFrame = 1;
    let targetFrame = 1;
    let animationFrameId = 0;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const renderFrame = (frameIndex: number) => {
      let index = Math.round(frameIndex) - 1;
      // Clamp against the frames actually queued, which is not known until the
      // manifest resolves, hence the guard.
      index = Math.max(0, Math.min(Math.max(1, images.length) - 1, index));

      // Fall back to the nearest earlier frame that actually decoded, so a
      // missing or still-loading image never freezes the canvas.
      while (index > 0 && !isReady(images[index])) index--;

      const img = images[index];
      if (!isReady(img)) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      const targetWidth = Math.floor(rect.width * dpr);
      const targetHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.fillStyle = "#1B004B";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (rect.width - img.width * ratio) / 2;
      const centerShift_y = (rect.height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    const updateScroll = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      const rect = track.getBoundingClientRect();
      const scrolled = -rect.top;
      let fraction = scrollable > 0 ? scrolled / scrollable : 0;
      fraction = Math.max(0, Math.min(1, fraction));

      // Hold the facade, play through the open doors, then hand off to
      // the next section on the last available frame.
      // doorEnd sits late in the range on purpose: the animation finishes
      // close to the end of the hero, which is what removes the dead scroll
      // between the last frame and the next section. playEnd follows shortly
      // after so the overlay hands off almost immediately.
      const playStart = 0.06;
      const transitionFrame = Math.max(1, images.length);
      const doorEnd = 0.76;
      const playEnd = 0.81;

      let overlayProgress = 0;

      if (fraction <= playStart) {
        targetFrame = 1;
      } else if (fraction < doorEnd) {
        const t = (fraction - playStart) / (doorEnd - playStart);
        targetFrame = 1 + t * (transitionFrame - 1);
      } else if (fraction < playEnd) {
        const t = (fraction - doorEnd) / (playEnd - doorEnd);
        targetFrame = transitionFrame;
        overlayProgress = t;
      } else {
        targetFrame = transitionFrame;
        overlayProgress = 1;
      }

      document.documentElement.style.setProperty(
        "--hero-progress",
        overlayProgress.toFixed(4)
      );

      if (prefersReducedMotion) {
        currentFrame = targetFrame;
      }

      // Park the loop while the hero is far off-screen. Driven from the rect we
      // already measured instead of an IntersectionObserver, so play/pause
      // stays in one place and needs no extra listener.
      const inView =
        rect.bottom > -200 && rect.top < window.innerHeight + 200;
      if (inView) play();
      else pause();
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        renderFrame(currentFrame);
      }, 50);
    };

    const loop = () => {
      if (!prefersReducedMotion) {
        const delta = targetFrame - currentFrame;
        const catchUp = Math.abs(delta) > 8 ? 0.22 : 0.14;
        currentFrame += delta * catchUp;
      }

      renderFrame(currentFrame);
      animationFrameId = requestAnimationFrame(loop);
    };

    // Redrawing 60 times a second while the hero is far off-screen is wasted
    // work and drains the battery. updateScroll owns play/pause from here on.
    const play = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };
    const pause = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      document.documentElement.style.removeProperty("--hero-progress");
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#1B004B]">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="hero-image-scrim absolute inset-0 pointer-events-none" />
        <div className="hero-nav-vignette absolute inset-0 pointer-events-none" />
      </div>
    </div>
  );
}
