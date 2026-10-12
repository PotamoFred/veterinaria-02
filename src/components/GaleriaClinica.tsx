"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Sorted numerically rather than alphabetically: the folder mixes "01.webp"
// with "2.webp", so a plain sort is only accidentally right here. Dropping a JPG
// or PNG into public/imagenes2 or public/imagenes3 makes build/gen-assets.mjs
// produce the .webp siblings.
const slideNumber = (src: string) => {
  const m = src.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
};

// Two art-directed sets of the same five designs. Wide below is the 4:1 banner
// (2064x512); narrow below is the 4:5 portrait (928x1152). The portrait exists
// because a 4:1 banner is only 85px tall in a 390px viewport, which reads as a
// stripe rather than a slide; the portrait fills the same box at 426px.
//
// The two folders number their files differently (imagenes3 has 01, imagenes2
// has 1), so the pairing is spelled out rather than derived.
const SLIDES = [
  {
    wide: "/imagenes3/01.webp",
    narrow: "/imagenes2/1.webp",
    alt: "Consulta médica en Bienestar Animal Ibagué: lunes a viernes de 8:00 a. m. a 9:00 p. m. en $49.000, sábados de 8:00 a. m. a 6:00 p. m. en $49.000, y domingos y festivos de 9:00 a. m. a 6:00 p. m. en $67.000",
  },
  {
    wide: "/imagenes3/2.webp",
    narrow: "/imagenes2/2.webp",
    alt: "Jornadas de esterilización de felinos mestizos todos los viernes, con ayuno de 8 horas: gato macho $57.000 y gato hembra $60.000, medicamentos incluidos y retiro de puntos sin costo",
  },
  {
    wide: "/imagenes3/3.webp",
    narrow: "/imagenes2/3.webp",
    alt: "Jornada especial de esterilización canina para perros mestizos según peso: de 0 a 5 kg $65.000, de 6 a 10 kg $75.000, de 11 a 15 kg $80.000 y de 16 a 20 kg $85.000",
  },
  {
    wide: "/imagenes3/4.webp",
    narrow: "/imagenes2/4.webp",
    alt: "Jornadas de esterilización para perros y gatos mestizos todos los viernes: felinos desde $57.000 y caninos de $65.000 a $85.000 según peso. A los caninos se les realiza cuadro hemático por recomendación médica y el retiro de puntos es sin costo",
  },
  {
    wide: "/imagenes3/5.webp",
    narrow: "/imagenes2/5.webp",
    alt: "Nuestra historia: fundación de Bienestar Animal en 2011, evolución a centro médico veterinario en 2020, consolidación como clínica en 2022 y en la actualidad servicios de dermatología, oftalmología, odontología, oncología, cirugía y hospitalización 24 horas",
  },
]
  .sort((a, b) => slideNumber(a.wide) - slideNumber(b.wide))
  .map((s) => ({ src: s.wide, srcSmall: s.narrow, alt: s.alt }));

const AUTO_MS = 5200;

export default function GaleriaClinica() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = SLIDES.length;
  const go = useCallback(
    (next: number) => setI(((next % total) + total) % total),
    [total]
  );

  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Auto-advance, paused on hover/focus and skipped entirely for visitors who
  // asked for reduced motion.
  useEffect(() => {
    if (paused || reduced.current) return;
    timer.current = setTimeout(() => go(i + 1), AUTO_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [i, paused, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(i - 1);
    }
  };

  return (
    <section
      id="nosotros"
      aria-roledescription="carrusel"
      aria-label="Tarifas, jornadas de esterilización e historia de la clínica"
      className="relative w-full bg-[#F6F4FA] py-24 sm:py-32 px-4 sm:px-8 overflow-x-clip"
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4C007D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFDDC1]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#4C007D] uppercase mb-4">
            Tarifas y novedades
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#4C007D] leading-tight">
            Todo lo que necesitas saber,{" "}
            <span className="text-[#1B004B]">a un vistazo</span>
          </h2>
          <p className="mt-6 text-[#1B004B]/70 text-base sm:text-lg font-medium leading-relaxed">
            Horarios de consulta, jornadas de esterilización y los servicios que
            vas a encontrar cuando llegues. Sin llamadas de por medio.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative overflow-hidden rounded-[2rem] border border-[#4C007D]/10 shadow-xl bg-[#1B004B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE2D1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F4FA]"
          >
            <div
              className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {SLIDES.map((s, idx) => (
                <figure
                  key={s.src}
                  className="w-full shrink-0 aspect-[4/5] md:aspect-[2064/512]"
                  aria-hidden={idx !== i}
                >
                  {/* The box fixes the ratio per breakpoint rather than letting
                      the intrinsic size decide, because the two <source>
                      elements have different ratios and the width/height
                      attributes can only describe one of them. */}
                  <picture>
                    <source media="(max-width: 767.98px)" srcSet={s.srcSmall} />
                    {/* No loading="lazy": these sit in an overflow:hidden track,
                        so the browser never sees them enter the viewport and
                        they stay blank when you navigate to them. */}
                    <img
                      src={s.src}
                      alt={s.alt}
                      width={2064}
                      height={512}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover block"
                    />
                  </picture>
                </figure>
              ))}
            </div>

            {/* Arrows. No fill and no border: the slides are pale flyers, so any
                background circle reads as a blob over the artwork. The chevron
                carries a dark drop-shadow to stay legible on light slides. */}
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Imagen anterior"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-transparent text-white flex items-center justify-center transition-opacity hover:opacity-60 focus-visible:opacity-70"
            >
              <svg
                className="w-6 h-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Imagen siguiente"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-transparent text-white flex items-center justify-center transition-opacity hover:opacity-60 focus-visible:opacity-70"
            >
              <svg
                className="w-6 h-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots. The visual dot stays small but the tap target is padded out to a
            comfortable size, otherwise it is ~10px tall and nearly unusable
            with a finger. */}
          <div className="mt-4 flex items-center justify-center gap-1">
            {SLIDES.map((s, idx) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(idx)}
                aria-label={`Ir a la imagen ${idx + 1}`}
                aria-current={idx === i}
                className="min-w-11 min-h-11 p-3 -m-1 rounded-full flex items-center justify-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    idx === i
                      ? "w-8 bg-[#1B004B]"
                      : "w-2.5 bg-[#4C007D]/25 hover:bg-[#4C007D]/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
