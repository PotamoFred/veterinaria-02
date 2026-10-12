"use client";

import { useEffect, useRef, useState } from "react";

const ADDRESS = "Manzana M, Casa 13, Barrio Las Palmas";
const PHONE_E164 = "573156478656";
// One line for the ticker: the address is the part that overflows on a phone,
// and the number rides along so it can be read there too instead of being
// replaced by the bare word "Llamar".
const TICKER_TEXT = `${ADDRESS} · 315 647 8656`;
const PHONE_HREF = `tel:+${PHONE_E164}`;
const WHATSAPP_HREF = `https://wa.me/${PHONE_E164}`;

// "Experiencias que nos inspiran" is the section heading; the nav uses the
// shorter label so the row does not wrap on medium screens.
const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Experiencias", href: "#testimonios" },
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section is closest to the top of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The ticker has to cover its box at every width, or the loop exposes bare
  // background where a copy has not arrived yet. Two things fall out of that:
  //
  //  - how many copies are needed, which depends on the box width; and
  //  - an even number of copies, because the animation travels -50%. With an
  //    odd count that lands half way through a copy and the loop visibly jumps.
  //
  // The duration is derived from the travel distance so the text moves at the
  // same reading speed whatever the viewport.
  const ticker = useRef<HTMLSpanElement>(null);
  const [loop, setLoop] = useState({ copies: 2, seconds: 20 });

  useEffect(() => {
    const box = ticker.current;
    if (!box) return;
    const first = box.firstElementChild?.firstElementChild as HTMLElement | null;
    if (!first) return;

    const PX_PER_SECOND = 38;

    const measure = () => {
      const w = first.getBoundingClientRect().width;
      const b = box.clientWidth;
      if (w <= 0 || b <= 0) return;

      const needed = Math.ceil(b / w) + 1;
      const copies = Math.max(2, needed % 2 === 0 ? needed : needed + 1);
      // -50% of an even number of copies travels exactly copies / 2 widths.
      const distance = ((copies / 2) * w);
      const seconds = Math.min(34, Math.max(14, distance / PX_PER_SECOND));

      setLoop((prev) =>
        prev.copies === copies && Math.abs(prev.seconds - seconds) < 0.5
          ? prev
          : { copies, seconds }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ro.observe(first);
    return () => ro.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ---- Top alert bar ---- */}
      <div className="bg-[#FFDDC1] text-[#1B004B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-10 py-2 flex items-center justify-between gap-3">
          {/* flex-1 on the paragraph is what lets the ticker span the bar. Left
              to its own width it stayed at 365px on desktop, leaving ~460px of
              empty space and no reason to scroll. */}
          <p className="flex flex-1 items-center gap-2 text-[11px] sm:text-xs font-bold tracking-wide uppercase min-w-0">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {/* Address. When it does not fit it scrolls right to left rather
                than being cut at "Las Pal...". The second copy is what makes
                the loop seamless and is hidden from screen readers, which
                otherwise would read the address twice. */}
            <span ref={ticker} className="alert-ticker min-w-0 flex-1">
              <span
                className="alert-ticker__track"
                style={{ "--ticker-duration": `${loop.seconds}s` } as React.CSSProperties}
              >
                {Array.from({ length: loop.copies }, (_, i) => (
                  <span
                    key={i}
                    aria-hidden={i === 0 ? undefined : "true"}
                    className="pr-8"
                  >
                    {TICKER_TEXT}
                  </span>
                ))}
              </span>
            </span>
          </p>

          {/* Kept outside the ticker on purpose: a link that drifts sideways is
              a bad tap target. The number scrolls so it can be read, this stays
              put so the call can be made. */}
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 shrink-0 text-[11px] sm:text-xs font-black tracking-wide hover:opacity-70 transition-opacity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a2 2 0 01.948.684l1.498 4.493a2 2 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a2 2 0 011.21-.502l4.493 1.498a2 2 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>Llamar</span>
          </a>
        </div>
      </div>

      {/* ---- Main nav bar ---- */}
      <div
        className={`transition-shadow duration-300 ${
          scrolled
            ? "bg-[#1B004B]/95 backdrop-blur-md shadow-lg shadow-[#1B004B]/40"
            : "bg-[#1B004B]/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav className="flex items-center justify-between py-3">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3 shrink-0">
              <span className="w-10 h-10 bg-[#4C007D] border border-[#FFDDC1]/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#FFDDC1]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </span>
              <span className="hidden sm:block">
                <span className="block font-bold text-sm tracking-wide leading-tight text-white">
                  BIENESTAR ANIMAL
                </span>
                <span className="block text-[10px] text-[#AEE2D1] tracking-widest uppercase">
                  Clínica Veterinaria
                </span>
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active === link.href ? "true" : undefined}
                    className={`relative py-1 transition-colors ${
                      active === link.href
                        ? "text-[#AEE2D1]"
                        : "text-white/85 hover:text-[#AEE2D1]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-[#FFDDC1] transition-all duration-300 ${
                        active === link.href ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {/* CTA */}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-[#AEE2D1] hover:bg-[#FFDDC1] text-[#1B004B] px-5 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Agendar cita
              </a>

              {/* Mobile toggle */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-movil"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                className="lg:hidden text-white p-2.5 -mr-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* ---- Mobile sheet ---- */}
      <div
        id="menu-movil"
        hidden={!open}
        className="lg:hidden bg-[#1B004B]/98 backdrop-blur-md border-t border-white/10"
      >
        <ul className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 text-white/90 text-base font-medium border-b border-white/5 last:border-0"
              >
                {link.label}
                <svg
                  className="w-4 h-4 text-[#AEE2D1]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </li>
          ))}
          <li className="mt-4 md:hidden">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#AEE2D1] text-[#1B004B] px-6 py-3.5 rounded-full font-bold"
            >
              Agendar cita por WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}