"use client";

import React from "react";

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Agendar cita", href: "#agendar" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

const socials = [
  {
    name: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const mapsQuery = encodeURIComponent(
    "Manzana M, Casa 13, Barrio Las Palmas, Ibagué, Tolima, Colombia"
  );
  const mapsSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <footer className="relative w-full bg-[#1B004B] text-white overflow-hidden">
      {/* Glows ambientales */}
      <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-[#4C007D]/70 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[420px] h-[420px] bg-[#AEE2D1]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFDDC1]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        {/* -------------------- GRID SUPERIOR -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8 mb-14">
          {/* ============== COLUMNA 1 = Logo + Dirección + Contacto ============== */}
          <div className="xl:col-span-3 space-y-7">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4C007D] border border-[#FFDDC1]/30 rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <svg
                  className="w-6 h-6 text-[#FFDDC1]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg tracking-wide leading-tight">
                  BIENESTAR ANIMAL
                </h4>
                <p className="text-[10px] sm:text-xs text-[#AEE2D1] tracking-widest uppercase">
                  Clínica Veterinaria
                </p>
              </div>
            </div>

            {/* Dirección física */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#FFDDC1]/15 text-[#FFDDC1] flex items-center justify-center border border-[#FFDDC1]/25">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#AEE2D1]">
                  Dirección
                </span>
              </div>
              <p className="text-white/85 font-medium text-sm sm:text-base leading-relaxed pl-9">
                Manzana <span className="text-[#FFDDC1] font-bold">M</span>, Casa{" "}
                <span className="text-[#FFDDC1] font-bold">13</span>
                <br />
                Barrio Las Palmas
                <br />
                Ibagué – Tolima, Colombia
              </p>
            </div>

            {/* Info contacto extra */}
            <div className="space-y-3 pl-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-[#AEE2D1] flex items-center justify-center border border-white/15">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white/80">+57 (8) 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-[#AEE2D1] flex items-center justify-center border border-white/15">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white/80">
                  contacto@bienestaranimal.com
                </span>
              </div>
            </div>
          </div>

          {/* ============== COLUMNA 2 = MAPA GOOGLE MAPS INTEGRADO ============== */}
          <div className="xl:col-span-5 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#FFDDC1]/15 text-[#FFDDC1] flex items-center justify-center border border-[#FFDDC1]/25">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#AEE2D1]">
                Ubícanos en el mapa
              </span>
            </div>

            <div className="relative group">
              {/* Marco decorativo */}
              <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-br from-[#4C007D] via-[#AEE2D1]/60 to-[#FFDDC1] opacity-80 blur-[1px] group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-[1.4rem] border-2 border-white/15 shadow-2xl bg-white/5 backdrop-blur-sm">
                <div className="w-full" style={{ aspectRatio: "4 / 3" }}>
                  <iframe
                    title="Mapa Clínica Bienestar Animal - Ibagué"
                    src={mapsSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full rounded-[1.2rem] border-0 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                    allowFullScreen
                  />
                </div>
                {/* Botón flotante para abrir Google Maps */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 bg-[#FFDDC1] hover:bg-[#AEE2D1] text-[#1B004B] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* ============== COLUMNA 3 = ENLACES RÁPIDOS + REDES ============== */}
          <div className="xl:col-span-4 space-y-8">
            {/* Enlaces rápidos */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-[#FFDDC1]/15 text-[#FFDDC1] flex items-center justify-center border border-[#FFDDC1]/25">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#AEE2D1]">
                  Enlaces rápidos
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pl-1">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-flex items-center gap-2 text-white/75 hover:text-[#FFDDC1] transition-colors text-sm font-medium group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AEE2D1]/40 group-hover:bg-[#FFDDC1] group-hover:scale-150 transition-all duration-300" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Redes sociales */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-[#FFDDC1]/15 text-[#FFDDC1] flex items-center justify-center border border-[#FFDDC1]/25">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#AEE2D1]">
                  Síguenos en redes
                </span>
              </div>
              <div className="flex flex-wrap gap-3 pl-1">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    title={s.name}
                    className="group relative w-11 h-11 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-[#1B004B] hover:bg-[#FFDDC1] hover:border-[#FFDDC1] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,221,193,0.4)]"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* -------------------- SEPARADOR -------------------- */}
        <div className="relative h-px w-full overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFDDC1]/40 to-transparent" />
        </div>

        {/* -------------------- AVISO LEGAL -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 md:flex md:items-center md:justify-between text-xs sm:text-sm">
          {/* Copyright */}
          <div className="text-white/60 font-medium leading-relaxed">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#FFDDC1] font-bold">Bienestar Animal</span> —
            Clínica Veterinaria. Todos los derechos reservados.
          </div>

          {/* Links legales */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/55 font-medium">
            <a href="#" className="hover:text-[#AEE2D1] transition-colors">
              Política de privacidad
            </a>
            <span className="w-1 h-1 rounded-full bg-[#FFDDC1]/40 hidden sm:block" />
            <a href="#" className="hover:text-[#AEE2D1] transition-colors">
              Términos y condiciones
            </a>
            <span className="w-1 h-1 rounded-full bg-[#FFDDC1]/40 hidden sm:block" />
            <a href="#" className="hover:text-[#AEE2D1] transition-colors">
              Aviso legal
            </a>
            <span className="w-1 h-1 rounded-full bg-[#FFDDC1]/40 hidden sm:block" />
            <a href="#" className="hover:text-[#AEE2D1] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
