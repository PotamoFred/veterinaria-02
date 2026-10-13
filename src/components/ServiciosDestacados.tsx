"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assetEncoded } from "@/lib/urls";

// 3D cover flow of the service cards in public/carrusel.
//
// Ported from _referencia-carrusel/script.js. The transform maths is kept as
// it was there -- baseOffset / stepOffset / baseZ / stepZ / rotateAngle per
// breakpoint, then the same translate / translateZ / rotateY / scale / opacity
// / brightness per card -- because that geometry is what produces the effect.
// Only the palette changed, to the clinic's; the original was a black page with
// white type, which would have sat badly on a light section.
//
// The strip is finite, not wrapping: the reference disables the arrows at both
// ends, and that is the right behaviour for thirteen services you might be
// looking for.
type Slide = { file: string; title: string; alt: string };

const SLIDES: Slide[] = [
  {
    file: "24 H",
    title: "Hospitalización 24 horas",
    alt: "Tarjeta de hospitalización 24 horas de Bienestar Animal Ibagué: cuidados, atención y monitoreo constante para su recuperación.",
  },
  {
    file: "Cirugia",
    title: "Cirugía veterinaria",
    alt: "Tarjeta de cirugía veterinaria de Bienestar Animal Ibagué: cuidado y precisión en cada procedimiento quirúrgico.",
  },
  {
    file: "Consulta Medica",
    title: "Consulta médica",
    alt: "Tarjeta de consulta médica de Bienestar Animal Ibagué: atención general para tu mascota.",
  },
  {
    file: "Dermatologia",
    title: "Consulta dermatológica",
    alt: "Tarjeta de consulta dermatológica de Bienestar Animal Ibagué: cuidado de la piel y el pelo para tu mascota.",
  },
  {
    file: "Farmacia",
    title: "Farmacia veterinaria",
    alt: "Tarjeta de la farmacia veterinaria de Bienestar Animal Ibagué: tienda de medicamentos y productos para su bienestar.",
  },
  {
    file: "Imagen",
    title: "Diagnóstico por imagen",
    alt: "Tarjeta de diagnóstico por imagen de Bienestar Animal Ibagué: tecnología avanzada para diagnósticos rápidos y precisos.",
  },
  {
    file: "Laboratorio",
    title: "Laboratorio veterinario",
    alt: "Tarjeta del laboratorio veterinario de Bienestar Animal Ibagué: análisis precisos para un diagnóstico acertado.",
  },
  {
    file: "Odontologia",
    title: "Consulta odontológica",
    alt: "Tarjeta de consulta odontológica de Bienestar Animal Ibagué: cuidado dental para tu mascota.",
  },
  {
    file: "Oftalmologia",
    title: "Consulta oftalmológica",
    alt: "Tarjeta de consulta oftalmológica de Bienestar Animal Ibagué: cuidado de la vista para tu mascota.",
  },
  {
    file: "Oncologia",
    title: "Consulta oncológica",
    alt: "Tarjeta de consulta oncológica de Bienestar Animal Ibagué: esperanza y cuidado especializado contra el cáncer.",
  },
  {
    file: "Ortopedia",
    title: "Cirugía ortopédica",
    alt: "Tarjeta de cirugía ortopédica de Bienestar Animal Ibagué: cuidado, precisión y movilidad en cada procedimiento.",
  },
  {
    file: "Oxigenoterapia",
    title: "Oxigenoterapia",
    alt: "Tarjeta de oxigenoterapia de Bienestar Animal Ibagué: soporte vital, alivio y recuperación en cada respiración.",
  },
  {
    file: "Vacunacion",
    title: "Vacunación y desparasitación",
    alt: "Tarjeta de vacunación y desparasitación de Bienestar Animal Ibagué: protección y prevención para su bienestar.",
  },
];

// Route through the asset helper: a literal "/carrusel/..." is not given the
// base path by Next and 404s when the site is served from a subdirectory.
const src = (file: string) => assetEncoded(`carrusel/${file}.webp`);

// Same breakpoints and numbers as getTransformMetrics() in the reference.
type Metrics = {
  baseOffset: number;
  stepOffset: number;
  baseZ: number;
  stepZ: number;
  rotateAngle: number;
};

function metricsFor(width: number): Metrics {
  if (width <= 600) return { baseOffset: 90, stepOffset: 70, baseZ: -100, stepZ: 50, rotateAngle: 38 };
  if (width <= 900) return { baseOffset: 120, stepOffset: 95, baseZ: -130, stepZ: 65, rotateAngle: 42 };
  return { baseOffset: 150, stepOffset: 125, baseZ: -150, stepZ: 75, rotateAngle: 46 };
}

const DRAG_THRESHOLD = 40;
const WHEEL_DEBOUNCE_MS = 300;

export default function ServiciosDestacados() {
  const [i, setI] = useState(0);
  const [width, setWidth] = useState(1400);
  const viewportRef = useRef<HTMLDivElement>(null);

  const total = SLIDES.length;
  const m = metricsFor(width);

  const goTo = useCallback(
    (index: number) => setI(Math.min(Math.max(0, index), total - 1)),
    [total]
  );
  const prev = useCallback(() => setI((n) => Math.max(0, n - 1)), []);
  const next = useCallback(() => setI((n) => Math.min(total - 1, n + 1)), [total]);

  // Breakpoints drive the transform, so the window width has to be tracked.
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Drag and wheel, both from the reference. Kept in one effect so the mouseup
  // listener, which lives on the window, is removed with it.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let startX = 0;
    let dragging = false;
    let wheelUntil = 0;

    const down = (x: number) => { startX = x; dragging = true; };
    const up = (x: number) => {
      if (!dragging) return;
      dragging = false;
      const diff = x - startX;
      if (diff > DRAG_THRESHOLD) prev();
      else if (diff < -DRAG_THRESHOLD) next();
    };

    const onDown = (e: MouseEvent) => down(e.clientX);
    const onUp = (e: MouseEvent) => up(e.clientX);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length) down(e.touches[0].clientX);
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length) up(e.changedTouches[0].clientX);
    };
    const onWheel = (e: WheelEvent) => {
      // Shift+wheel and horizontal trackpad swipes mean sideways, which is not
      // ours to consume.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const atEnd = dir > 0 ? i >= total - 1 : i <= 0;

      // Release the scroll at either end. A 480px tall element that always
      // swallows the wheel becomes a trap the visitor has to hunt for to get
      // past; this way it consumes the scroll only while it can still move.
      if (atEnd) return;

      // The reference never cancelled the event, which is fine on a page that
      // does not scroll and broken here: both the carousel and the page moved.
      e.preventDefault();

      const now = Date.now();
      if (now < wheelUntil) return;
      wheelUntil = now + WHEEL_DEBOUNCE_MS;
      setI((n) => Math.min(Math.max(0, n + dir), total - 1));
    };

    viewport.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    // Not passive: preventing the default is the whole point of this listener.
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewport.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [i, total, prev, next]);

  return (
    <section
      id="servicios"
      aria-label="Servicios destacados"
      className="relative w-full bg-[#F6F4FA] py-20 sm:py-28 px-4 sm:px-8 overflow-x-clip"
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4C007D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFDDC1]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#4C007D] uppercase mb-4">
            Servicios destacados
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#4C007D] leading-tight">
            Todo lo que tu mascota{" "}
            <span className="text-[#1B004B]">necesita</span>
          </h2>
          <p className="mt-6 text-[#1B004B]/70 text-base sm:text-lg font-medium leading-relaxed">
            Pulsa las flechas, arrastra o usa el teclado para recorrer los trece
            servicios de la clínica.
          </p>
        </div>

        <div className="coverflow">
          <div className="coverflow__viewport" ref={viewportRef}>
            <div className="coverflow__stage">
              {SLIDES.map((s, idx) => {
                const offset = idx - i;
                const abs = Math.abs(offset);
                const active = offset === 0;

                // Same arithmetic as update() in the reference.
                const x = active ? 0 : Math.sign(offset) * (m.baseOffset + (abs - 1) * m.stepOffset);
                const z = active ? 0 : m.baseZ - (abs - 1) * m.stepZ;
                const rot = active ? 0 : -Math.sign(offset) * m.rotateAngle;
                const scale = active ? 1 : Math.max(0.62, 1 - abs * 0.075);
                const opacity = active ? 1 : Math.max(0, 1 - (abs - 1) * 0.22);
                const brightness = active ? 1 : Math.max(0.4, 0.9 - abs * 0.12);

                return (
                  <div
                    key={s.file}
                    className={`coverflow__card ${active ? "is-active" : ""}`}
                    // The standalone build reads this back to drive its own
                    // vanilla copy of the carousel; there is no React there.
                    data-title={s.title}
                    data-index={idx}
                    style={{
                      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
                      zIndex: 50 - abs,
                      opacity,
                      filter: `brightness(${brightness})`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => goTo(idx)}
                      tabIndex={active ? 0 : -1}
                      aria-label={`Ver ${s.title}`}
                      aria-current={active ? "true" : undefined}
                      className="coverflow__hit"
                    >
                      {/* Plain <img> on purpose. next/image wraps the picture in a span
                          of its own, which breaks the absolute positioning the
                          3D transform relies on, and these are already WebP at
                          the size the card renders at. The gallery's <img>
                          escapes the lint rule only because it sits inside a
                          <picture>.

                          Always eager: the cards sit in a 3D-transformed
                          stage, which the browser's lazy heuristic reads
                          badly. Measured, it deferred 11 of the 13 and never
                          fetched them once a card reached the centre, because
                          changing the loading attribute on an element that
                          already exists does not re-trigger the request. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src(s.file)}
                          alt={active ? s.alt : ""}
                          width={800}
                          height={1071}
                          loading="eager"
                          decoding="async"
                          draggable={false}
                          className="coverflow__img"
                        />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caption of the centred card, with the reference's fade swap. */}
          <div className="coverflow__caption">
            <h3 className="coverflow__title" key={i}>
              {SLIDES[i].title}
            </h3>
          </div>

          <nav className="coverflow__nav" aria-label="Controles del carrusel">
            <button
              type="button"
              onClick={prev}
              disabled={i === 0}
              className="coverflow__arrow"
              aria-label="Servicio anterior"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="coverflow__dashes" role="tablist" aria-label="Ir a un servicio">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.file}
                  type="button"
                  role="tab"
                  onClick={() => goTo(idx)}
                  aria-label={`Ir a ${s.title}`}
                  aria-selected={idx === i}
                  className={`coverflow__dash ${idx === i ? "is-active" : ""}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={i === total - 1}
              className="coverflow__arrow"
              aria-label="Servicio siguiente"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </nav>

          <p className="coverflow__hint">
            Arrastra, usa la rueda del ratón o las teclas{" "}
            <span aria-hidden="true">◀</span> <span aria-hidden="true">▶</span>
          </p>
        </div>
      </div>
    </section>
  );
}