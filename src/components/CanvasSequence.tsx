"use client";

import { useEffect, useRef } from "react";

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

    const frameCount = 50;
    const images: HTMLImageElement[] = [];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `/imagenes/ezgif-frame-${num}.png`;
      img.onload = () => {
        if (i === 1) renderFrame(1);
      };
      images.push(img);
    }

    let currentFrame = 1;
    let targetFrame = 1;
    let animationFrameId = 0;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const renderFrame = (frameIndex: number) => {
      let index = Math.round(frameIndex) - 1;
      index = Math.max(0, Math.min(frameCount - 1, index));

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

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
      const scrolled = -track.getBoundingClientRect().top;
      let fraction = scrollable > 0 ? scrolled / scrollable : 0;
      fraction = Math.max(0, Math.min(1, fraction));

      // Hold the facade, play through the open doors, then hand off to
      // the next section on ezgif-frame-033.png.
      const playStart = 0.06;
      const transitionFrame = 33;
      const doorEnd = 0.52;
      const playEnd = 0.82;

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

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    updateScroll();
    loop();

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
