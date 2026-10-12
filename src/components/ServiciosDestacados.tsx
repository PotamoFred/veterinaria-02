"use client";

import React, { useMemo } from "react";

/* -------------------------------------------------------------------------- */
/*                             IMÁGENES TEXT-TO-IMAGE                         */
/*  (estilo isométrico 2.5D vectorial IGUAL que la infografía de referencia) */
/* -------------------------------------------------------------------------- */
const enc = (s: string) => encodeURIComponent(s);

const IMG = {
  centro: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?image_size=square_hd&prompt=${enc(
    "Centro de Gestión Veterinaria, nodo futurista circular con anillos luminosos azules y panel de control. Ilustración isométrica 2.5D vectorial estilo dibujo limpio, colores claros, sin texto, vista cenital 3/4"
  )}`,
  consulta: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?image_size=square_hd&prompt=${enc(
    "Veterinario con bata blanca y estetoscopio revisando a un perro feliz sobre una mesa de exploración verde. A su lado historial médico y monitor cardíaco. Ilustración isométrica 2.5D vectorial, dibujo limpio, colores pastel claros, sin texto"
  )}`,
  vacunacion: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?image_size=square_hd&prompt=${enc(
    "Veterinaria femenina con uniforme verde aplicando vacuna a un gato atigrado naranja. A su lado calendario de vacunación y frasco de medicina azul. Ilustración isométrica 2.5D vectorial, dibujo limpio, colores suaves, sin texto"
  )}`,
  cirugia: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?image_size=square_hd&prompt=${enc(
    "Quirófano veterinario: mesa de operaciones turquesa, lámpara quirúrgica circular, monitor de signos vitales, equipo de anestesia y bisturíes. Ilustración isométrica 2.5D vectorial, dibujo limpio, ambiente esterilizado blanco, sin texto"
  )}`,
  laboratorio: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?image_size=square_hd&prompt=${enc(
    "Veterinaria de bata blanca en laboratorio analizando muestras con microscopio, tubos de ensayo en gradilla, resultados de análisis de sangre. Ilustración isométrica 2.5D vectorial, dibujo limpio, tonos turquesa, sin texto"
  )}`,
  diagnostico: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?image_size=square_hd&prompt=${enc(
    "Radiografía veterinaria: pantalla grande con placa de rayos X de pulmones de mascota, monitor de ultrasonido. Ilustración isométrica 2.5D vectorial, dibujo limpio, tonos naranja y gris clínico, sin texto"
  )}`,
  farmacia: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?image_size=square_hd&prompt=${enc(
    "Mostrador de farmacia veterinaria con estantes llenos de frascos de medicamentos, cajas y suplementos. Veterinaria atendiendo detrás del mostrador turquesa. Ilustración isométrica 2.5D vectorial, dibujo limpio, tonos naranja claros, sin texto"
  )}`,
};

/* -------------------------------------------------------------------------- */
/*                                  DATOS                                      */
/* -------------------------------------------------------------------------- */
type Servicio = {
  titulo: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  img: string;
  iconoBadge: React.ReactNode;
  iconosFlotantes: React.ReactNode[];
};

const servicios: Servicio[] = [
  {
    titulo: "CONSULTA GENERAL",
    color: "#7CC98A",
    badgeBg: "#3F8A4B",
    badgeText: "#FFFFFF",
    img: IMG.consulta,
    iconoBadge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5 sm:w-6 sm:h-6">
        <circle cx="12" cy="8" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4 1.57 4 3.5v2.5H8v-2.5C8 13.57 9.79 12 12 12z" />
        <path strokeLinecap="round" d="M10 4h4" />
      </svg>
    ),
    iconosFlotantes: [
      <svg key="c1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
      </svg>,
      <svg key="c2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
      <svg key="c3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>,
    ],
  },
  {
    titulo: "VACUNACIÓN Y DESPARASITACIÓN",
    color: "#3B82F6",
    badgeBg: "#1E90E5",
    badgeText: "#FFFFFF",
    img: IMG.vacunacion,
    iconoBadge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    iconosFlotantes: [
      <svg key="v1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>,
      <svg key="v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <ellipse cx="12" cy="12" rx="7" ry="9" />
        <path strokeLinecap="round" d="M17 6a5 5 0 00-3 7" />
      </svg>,
      <svg key="v3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>,
    ],
  },
  {
    titulo: "CIRUGÍA",
    color: "#8B5CF6",
    badgeBg: "#7C3AED",
    badgeText: "#FFFFFF",
    img: IMG.cirugia,
    iconoBadge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    iconosFlotantes: [
      <svg key="ci1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>,
      <svg key="ci2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
    ],
  },
  {
    titulo: "FARMACIA",
    color: "#F97316",
    badgeBg: "#FB923C",
    badgeText: "#FFFFFF",
    img: IMG.farmacia,
    iconoBadge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5 sm:w-6 sm:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" d="M12 8v8m-4-4h8" />
      </svg>
    ),
    iconosFlotantes: [
      <svg key="f1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>,
      <svg key="f2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>,
    ],
  },
  {
    titulo: "DIAGNÓSTICO",
    color: "#F59E0B",
    badgeBg: "#EA8C1C",
    badgeText: "#FFFFFF",
    img: IMG.diagnostico,
    iconoBadge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5 sm:w-6 sm:h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
      </svg>
    ),
    iconosFlotantes: [
      <svg key="d1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>,
      <svg key="d2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>,
    ],
  },
  {
    titulo: "LABORATORIO",
    color: "#0EA5A5",
    badgeBg: "#0F766E",
    badgeText: "#FFFFFF",
    img: IMG.laboratorio,
    iconoBadge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5 sm:w-6 sm:h-6">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    iconosFlotantes: [
      <svg key="l1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M9 3v18M3 12h18" />
      </svg>,
      <svg key="l2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 sm:w-5 sm:h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
      </svg>,
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               KEYFRAMES CSS                                */
/* -------------------------------------------------------------------------- */
const cssKeyframes = `
  @keyframes orbit-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes orbit-spin-reverse {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }
  @keyframes hub-pulse {
    0%, 100% { filter: drop-shadow(0 0 0 rgba(30,144,229,0.45)) drop-shadow(0 20px 40px rgba(30,144,229,0.35)); }
    50%      { filter: drop-shadow(0 0 30px rgba(30,144,229,0.60)) drop-shadow(0 30px 60px rgba(30,144,229,0.50)); }
  }
  @keyframes connector-flow {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  .orbit-carrier {
    animation: orbit-spin 80s linear infinite;
    will-change: transform;
  }
  .orbit-carrier:has(.station-wrap:hover) {
    animation-play-state: paused;
  }
  .station-keep-upright {
    animation: orbit-spin-reverse 80s linear infinite;
    will-change: transform;
  }
  .orbit-carrier:has(.station-wrap:hover) .station-keep-upright {
    animation-play-state: paused;
  }
  .hub-img { animation: hub-pulse 3.5s ease-in-out infinite; }
  .connector-flow {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(30,144,229,0.7) 30%,
      #ffffff 50%,
      rgba(30,144,229,0.7) 70%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: connector-flow 4s linear infinite;
    box-shadow: 0 0 14px rgba(30, 144, 229, 0.50);
  }
`;

/* -------------------------------------------------------------------------- */
/*                             ESTACIÓN / NODO                                 */
/* -------------------------------------------------------------------------- */
function Station({
  s,
  angle,
}: {
  s: Servicio;
  angle: number;
}) {
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(0)` }}
    >
      <div className="station-keep-upright">
        <div className="station-wrap group relative flex flex-col items-center select-none">
          {/* BADGE CÁPSULA ALARGADA  (igual que la infografía de ref) */}
          <div
            className="relative z-30 flex items-center gap-3 px-5 py-3 rounded-3xl shadow-xl mb-3 group-hover:scale-105 transition-transform duration-500"
            style={{
              background: `linear-gradient(135deg, ${s.badgeBg} 0%, ${s.color} 100%)`,
              color: s.badgeText,
            }}
          >
            {/* circulo del icono izquierdo (doble borde estilo ref) */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: s.badgeText,
                color: s.badgeBg,
                boxShadow: `0 0 0 3px ${s.badgeBg}, 0 0 0 4px #FFFFFF80`,
              }}
            >
              {s.iconoBadge}
            </div>
            <span className="font-black text-xs sm:text-sm md:text-base tracking-[0.05em] whitespace-nowrap pr-1">
              {s.titulo}
            </span>
          </div>

          {/* PLATAFORMA CIRCULAR 3D  + ILUSTRACIÓN */}
          <div className="relative z-20">
            {/* Plataforma exterior (borde) */}
            <div
              className="relative rounded-full"
              style={{
                width: "clamp(230px, 24vw, 320px)",
                height: "clamp(230px, 24vw, 320px)",
                background: `linear-gradient(180deg, ${s.color}EE 0%, ${s.badgeBg} 100%)`,
                boxShadow: `inset 0 4px 0 #FFFFFF40, inset 0 -8px 0 rgba(0,0,0,0.15), 0 30px 60px ${s.color}33`,
              }}
            >
              {/* Aro interior claro (platforma superior) */}
              <div
                className="absolute inset-[10%] rounded-full overflow-hidden flex items-end justify-center"
                style={{
                  background: `linear-gradient(180deg, #EAF4FE 0%, #F0F7FF 100%)`,
                  boxShadow: `inset 0 2px 6px rgba(0,0,0,0.05)`,
                }}
              >
                <img
                  src={s.img}
                  alt={s.titulo}
                  className="w-[96%] h-[96%] object-contain object-bottom translate-y-1 group-hover:scale-105 transition-transform duration-500"
                  draggable={false}
                />
              </div>
              {/* Brillo superior */}
              <div className="absolute inset-x-[22%] top-[4%] h-[10%] rounded-full bg-white/40 blur-md" />
            </div>

            {/* SOMBRA INFERIOR 3D (como en la referencia) */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 rounded-[50%] blur-sm"
              style={{ backgroundColor: `${s.color}55` }}
            />

            {/* ICONOS FLOTANTES alrededor de la plataforma */}
            <div
              className="absolute -top-2 -left-3 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-lg border z-30"
              style={{ borderColor: `${s.color}55`, color: s.badgeBg }}
            >
              {s.iconosFlotantes[0]}
            </div>
            <div
              className="absolute top-6 -right-5 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-lg border z-30"
              style={{ borderColor: `${s.color}55`, color: s.badgeBg }}
            >
              {s.iconosFlotantes[1]}
            </div>
            {s.iconosFlotantes[2] && (
              <div
                className="absolute -bottom-1 -right-1 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-lg border z-30"
                style={{ borderColor: `${s.color}55`, color: s.badgeBg }}
              >
                {s.iconosFlotantes[2]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               COMPONENTE FINAL                             */
/* -------------------------------------------------------------------------- */
export default function ServiciosDestacados() {
  const stationsData = useMemo(
    () =>
      servicios.map((s, i) => ({
        s,
        /* -90 = empezar arriba. Cada 60° clockwise. */
        angle: i * 60 - 90,
      })),
    []
  );

  return (
    <section className="relative w-full bg-[#F6F4FA] py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
      <style>{cssKeyframes}</style>

      {/* Glows ambientales CONTINUOS con BentoGrid (mismo fondo sin división) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4C007D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFDDC1]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1E90E5]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ------------------ ENCABEZADO ------------------ */}
        <div className="mb-10 sm:mb-16 text-center sm:text-left">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#4C007D] uppercase mb-3">
            Servicios Destacados
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#4C007D] max-w-3xl leading-tight">
            Todo lo que tu mascota{" "}
            <span className="text-[#1B004B]">necesita</span>
          </h2>
          <p className="mt-5 text-[#1B004B]/70 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
            Un centro de gestión veterinaria completo con registro unificado de
            paciente y flujo de atención integrado.
          </p>
        </div>

        {/* ------------------ INFOGRAFÍA ORBITAL ------------------ */}
        <div className="relative mx-auto" style={{ width: "min(100%, 1180px)" }}>
          {/* Aspect-ratio cuadrado para que la órbita sea circular perfecta */}
          <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
            {/* ANILLO DECORATIVO PUNTEADO (rota también) */}
            <div className="absolute inset-[3%] pointer-events-none">
              <div className="orbit-carrier absolute inset-0 rounded-full border-2 border-dashed border-[#4C007D]/15 opacity-80" />
            </div>

            {/* ==== CONECTOR + NODO intermedio (estáticos fuera de órbita) ==== */}
            <div className="absolute inset-0 pointer-events-none">
              {stationsData.map(({ s, angle }, i) => (
                <React.Fragment key={`cx-${i}`}>
                  {/* Línea conectora */}
                  <div
                    className="absolute top-1/2 left-1/2 origin-left rounded-full"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle + 90}deg) translateY(-1.5px)`,
                      width: "34%",
                      height: "3px",
                    }}
                  >
                    <div className="connector-flow w-full h-full rounded-full" />
                  </div>
                  {/* Nodo pequeño intermedio */}
                  <div
                    className="absolute top-1/2 left-1/2 rounded-full bg-white shadow-lg border-2 z-10 flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      borderColor: s.color,
                      color: s.badgeBg,
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(34vw) rotate(-${angle}deg)`,
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                      <circle cx="12" cy="12" r="3.5" />
                      <path strokeLinecap="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* ==== CARRIEL ORBITAL (rotando) ==== */}
            <div className="orbit-carrier absolute inset-0">
              {stationsData.map(({ s, angle }, i) => (
                <Station key={i} s={s} angle={angle} />
              ))}
            </div>

            {/* ==== NODO CENTRAL  (estático, NO rota) ==== */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <div className="relative">
                {/* Halo exterior difuminado */}
                <div className="absolute -inset-10 rounded-full bg-[#1E90E5]/12 blur-3xl" />
                <div className="absolute -inset-6 rounded-full bg-[#4C007D]/8 blur-2xl" />

                {/* Plataforma central 3D + imagen */}
                <div
                  className="relative rounded-full"
                  style={{
                    width: "clamp(240px, 28vw, 360px)",
                    height: "clamp(240px, 28vw, 360px)",
                    background:
                      "linear-gradient(180deg, #1E90E5 0%, #0A5CA3 100%)",
                    boxShadow:
                      "inset 0 6px 0 #FFFFFF55, inset 0 -10px 0 rgba(0,0,0,0.20), 0 30px 80px rgba(30,144,229,0.45)",
                  }}
                >
                  <div className="absolute inset-[6%] rounded-full overflow-hidden border-4 border-[#1E90E5]/30 bg-gradient-to-br from-[#EAF6FF] via-[#DCEEFF] to-[#C8E4FF]">
                    <img
                      src={IMG.centro}
                      alt="Centro de Gestión Veterinaria"
                      className="hub-img w-full h-full object-contain object-center"
                      draggable={false}
                    />
                    {/* Overlay de texto ENCIMA de la imagen */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/75 backdrop-blur-sm text-[#1E90E5] flex items-center justify-center mb-2 sm:mb-3 border border-[#1E90E5]/20 shadow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="font-black leading-none text-[#1B004B] text-2xl sm:text-3xl md:text-4xl drop-shadow-sm">
                        CENTRO DE
                      </h3>
                      <h3 className="font-black leading-none mt-1 text-[#1E90E5] text-2xl sm:text-3xl md:text-4xl drop-shadow-sm">
                        GESTIÓN
                      </h3>
                      <h3 className="font-black leading-none mt-1 text-[#4C007D] text-2xl sm:text-3xl md:text-4xl drop-shadow-sm">
                        VETERINARIA
                      </h3>
                      <div className="my-2 sm:my-3 w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#1E90E5] to-transparent" />
                      <p className="text-[10px] sm:text-xs md:text-sm font-bold text-[#1B004B]/80 uppercase tracking-[0.10em] leading-relaxed">
                        Un registro completo,
                        <br />
                        un flujo de atención
                        <br />
                        unificado.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sombra 3D bajo el hub */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 rounded-[50%] blur-md bg-[#1E90E5]/45" />

                {/* NODO inferior (punto de salida de la línea principal, como la ref) */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#1E90E5] shadow-xl flex items-center justify-center text-[#1E90E5]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
           SOBREESCRIBIR "translateX(0)" de Station con radio real según
           breakpoint (nth-child para cada una de las 6 estaciones).
          ================================================================ */}
      <style>{`
        @media (min-width: 1280px) {
          ${stationsData
            .map(
              ({ angle }, i) => `
            .orbit-carrier > div:nth-of-type(${i + 1}) {
              transform: translate(-50%, -50%) rotate(${angle}deg) translateX(500px) !important;
            }`
            )
            .join("\n")}
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          ${stationsData
            .map(
              ({ angle }, i) => `
            .orbit-carrier > div:nth-of-type(${i + 1}) {
              transform: translate(-50%, -50%) rotate(${angle}deg) translateX(420px) !important;
            }`
            )
            .join("\n")}
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          ${stationsData
            .map(
              ({ angle }, i) => `
            .orbit-carrier > div:nth-of-type(${i + 1}) {
              transform: translate(-50%, -50%) rotate(${angle}deg) translateX(310px) !important;
            }`
            )
            .join("\n")}
        }
        @media (max-width: 640px) {
          ${stationsData
            .map(
              ({ angle }, i) => `
            .orbit-carrier > div:nth-of-type(${i + 1}) {
              transform: translate(-50%, -50%) rotate(${angle}deg) translateX(210px) !important;
            }`
            )
            .join("\n")}
        }
        /* Corregir nodo intermedio: convertir 34vw a valor fijo por breakpoint */
        @media (min-width: 1280px) {
          section > div > div:nth-child(3) > div > div.pointer-events-none > div > div:nth-child(even) {
            transform: translate(-50%, -50%) rotate(var(--a,0deg)) translateX(420px) rotate(calc(-1*var(--a,0deg))) !important;
          }
        }
      `}</style>
    </section>
  );
}
