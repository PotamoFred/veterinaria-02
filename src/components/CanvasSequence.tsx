"use client";

import { useEffect, useRef } from "react";

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameCount = 50;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `/imagenes/ezgif-frame-${num}.png`;
      img.onload = () => {
        loadedCount++;
        // Render the first frame as soon as it's loaded to avoid blank screen
        if (i === 1) {
          renderFrame(1);
        }
      };
      images.push(img);
    }

    let currentFrame = 1;
    let targetFrame = 1;
    let animationFrameId: number;
    let resizeTimeout: NodeJS.Timeout;

    const renderFrame = (frameIndex: number) => {
      // Ensure index is within bounds
      let index = Math.round(frameIndex) - 1;
      index = Math.max(0, Math.min(frameCount - 1, index));
      
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      const targetWidth = Math.floor(rect.width * dpr);
      const targetHeight = Math.floor(rect.height * dpr);

      // Only resize canvas buffer if size changes, to avoid flicker
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.scale(dpr, dpr);
      }

      // Draw background to blend perfectly
      ctx.fillStyle = "#000000"; // Black background
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Cover logic (like object-fit: cover)
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
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      
      let fraction = maxScroll > 0 ? scrollY / maxScroll : 0;
      fraction = Math.max(0, Math.min(1, fraction));
      
      targetFrame = 1 + fraction * (frameCount - 1);
      
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
        // Smooth lerp interpolation
        currentFrame += (targetFrame - currentFrame) * 0.08;
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
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
        {/* Left-to-right dark gradient: darkens left side for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
        {/* Top vignette: blends navbar into the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
