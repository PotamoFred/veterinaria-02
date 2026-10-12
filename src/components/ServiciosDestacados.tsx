"use client";

import { useCallback, useEffect, useRef, useState, type Ref } from "react";

type ServicioNodo = {
  id: string;
  titulo: string;
  src: string;
  /** 0° = arriba, sentido horario */
  angle: number;
};

const SERVICIOS: ServicioNodo[] = [
  { id: "vacunacion", titulo: "Vacunación y desparasitación", src: "/imagenes-servicios/02.jpg", angle: 0 },
  { id: "cirugia", titulo: "Cirugía", src: "/imagenes-servicios/03.jpg", angle: 60 },
  { id: "farmacia", titulo: "Farmacia veterinaria", src: "/imagenes-servicios/04.jpg", angle: 120 },
  { id: "diagnostico", titulo: "Diagnóstico", src: "/imagenes-servicios/05.jpg", angle: 180 },
  { id: "laboratorio", titulo: "Laboratorio", src: "/imagenes-servicios/06.jpg", angle: 240 },
  { id: "consulta", titulo: "Consulta general", src: "/imagenes-servicios/01.jpg", angle: 300 },
];

type Line = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function nodePosition(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + Math.sin(rad) * 38}%`,
    top: `${50 - Math.cos(rad) * 36}%`,
  };
}

export default function ServiciosDestacados() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLButtonElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<Line[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hubActive, setHubActive] = useState(false);

  const updateLines = useCallback(() => {
    const stage = stageRef.current;
    const hub = hubRef.current;
    if (!stage || !hub) return;

    const stageBox = stage.getBoundingClientRect();
    const hubBox = hub.getBoundingClientRect();
    const x1 = hubBox.left + hubBox.width / 2 - stageBox.left;
    const y1 = hubBox.top + hubBox.height / 2 - stageBox.top;

    const next: Line[] = SERVICIOS.map((servicio) => {
      const node = nodeRefs.current[servicio.id];
      if (!node) {
        return { id: servicio.id, x1, y1, x2: x1, y2: y1 };
      }
      const box = node.getBoundingClientRect();
      return {
        id: servicio.id,
        x1,
        y1,
        x2: box.left + box.width / 2 - stageBox.left,
        y2: box.top + box.height / 2 - stageBox.top,
      };
    });

    setLines(next);
  }, []);

  useEffect(() => {
    updateLines();
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(() => updateLines());
    observer.observe(stage);
    window.addEventListener("resize", updateLines);

    const images = stage.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", updateLines);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLines);
      images.forEach((img) => img.removeEventListener("load", updateLines));
    };
  }, [updateLines]);

  return (
    <section
      id="servicios"
      className="relative w-full bg-[#F6F4FA] py-16 sm:py-24 px-4 sm:px-8 overflow-hidden"
    >
      <style>{cssAnimations}</style>

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4C007D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFDDC1]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1E90E5]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#4C007D] uppercase mb-3">
            Servicios Destacados
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#4C007D] max-w-3xl leading-tight">
            Todo lo que tu mascota{" "}
            <span className="text-[#1B004B]">necesita</span>
          </h2>
          <p className="mt-5 text-[#1B004B]/70 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
            Un centro de gestión veterinaria completo: elija un servicio para
            ver cómo se conecta con el flujo de atención.
          </p>
        </div>

        {/* Layout móvil: hub + tarjetas */}
        <div className="lg:hidden space-y-6">
          <Hub
            active={hubActive}
            onToggle={() => {
              setHubActive((v) => !v);
              setActiveId(null);
            }}
            floating={false}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICIOS.map((servicio, i) => (
              <button
                key={servicio.id}
                type="button"
                onClick={() =>
                  setActiveId((id) => (id === servicio.id ? null : servicio.id))
                }
                className={`group relative rounded-3xl overflow-hidden bg-white shadow-lg ring-2 transition-all duration-300 text-left ${
                  activeId === servicio.id
                    ? "ring-[#1E90E5] scale-[1.02]"
                    : "ring-transparent hover:ring-[#1E90E5]/40"
                }`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <img
                  src={servicio.src}
                  alt={servicio.titulo}
                  className="w-full h-auto block"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Layout desktop: infografía orbital */}
        <div
          ref={stageRef}
          className="relative hidden lg:block mx-auto w-full max-w-[1180px] aspect-square"
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hub-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4DC8FF" />
                <stop offset="50%" stopColor="#1E90E5" />
                <stop offset="100%" stopColor="#AEE2D1" />
              </linearGradient>
              <filter id="hub-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {lines.map((line) => {
              const highlighted =
                hubActive || activeId === null || activeId === line.id;
              return (
                <g key={line.id} filter="url(#hub-glow)">
                  <line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#1E90E5"
                    strokeWidth="2"
                    strokeOpacity={highlighted ? 0.28 : 0.08}
                    className="transition-opacity duration-300"
                  />
                  <line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="url(#hub-line)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="10 22"
                    className={highlighted ? "energy-flow" : ""}
                    opacity={highlighted ? 1 : 0.15}
                  />
                  <circle
                    cx={(line.x1 + line.x2) / 2}
                    cy={(line.y1 + line.y2) / 2}
                    r="7"
                    fill="#FFFFFF"
                    stroke="#1E90E5"
                    strokeWidth="2.5"
                    opacity={highlighted ? 1 : 0.35}
                  />
                </g>
              );
            })}
          </svg>

          <Hub
            ref={hubRef}
            active={hubActive}
            onToggle={() => {
              setHubActive((v) => !v);
              setActiveId(null);
            }}
            floating
          />

          {SERVICIOS.map((servicio, i) => {
            const pos = nodePosition(servicio.angle);
            const isActive = activeId === servicio.id;
            const dimmed = activeId !== null && !isActive && !hubActive;

            return (
              <button
                key={servicio.id}
                type="button"
                ref={(el) => {
                  nodeRefs.current[servicio.id] = el;
                }}
                onClick={() =>
                  setActiveId((id) => (id === servicio.id ? null : servicio.id))
                }
                onMouseEnter={() => setActiveId(servicio.id)}
                onMouseLeave={() => setActiveId(null)}
                className="absolute z-10 w-[min(30%,280px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
                style={{ left: pos.left, top: pos.top }}
                aria-pressed={isActive}
              >
                <span
                  className={`block node-float rounded-[2rem] overflow-hidden shadow-[0_18px_40px_rgba(30,144,229,0.18)] ring-2 transition-all duration-300 ${
                    isActive
                      ? "ring-[#1E90E5] scale-105"
                      : dimmed
                        ? "ring-transparent opacity-55"
                        : "ring-white/70 hover:ring-[#1E90E5]/50 hover:scale-[1.03]"
                  }`}
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  <img
                    src={servicio.src}
                    alt={servicio.titulo}
                    className="w-full h-auto block pointer-events-none select-none"
                    draggable={false}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Hub({
  ref,
  active,
  onToggle,
  floating,
}: {
  ref?: Ref<HTMLButtonElement>;
  active: boolean;
  onToggle: () => void;
  floating: boolean;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`hub-core relative z-20 mx-auto flex flex-col items-center justify-center text-center cursor-pointer border-0 ${
        floating
          ? "absolute left-1/2 top-1/2 w-[min(34%,340px)] aspect-square -translate-x-1/2 -translate-y-1/2"
          : "w-[min(100%,320px)] aspect-square"
      }`}
    >
      <span
        className={`absolute inset-[8%] rounded-full bg-[#4DC8FF]/25 blur-2xl ${
          floating ? "hub-pulse" : ""
        }`}
      />
      <span
        className={`relative flex h-full w-full flex-col items-center justify-center rounded-full px-6 transition-transform duration-300 ${
          floating ? "node-float" : ""
        } ${active ? "scale-105" : "hover:scale-[1.03]"}`}
        style={{
          background:
            "radial-gradient(circle at 50% 32%, #FFFFFF 0%, #E8F6FF 48%, #C5E8FF 100%)",
          boxShadow:
            "inset 0 8px 0 rgba(255,255,255,0.65), inset 0 -14px 0 rgba(30,144,229,0.12), 0 0 0 10px rgba(77,200,255,0.18), 0 28px 60px rgba(30,144,229,0.28)",
        }}
      >
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-[#1E90E5] shadow-md">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0117 8.414V19a2 2 0 01-2 2z" />
          </svg>
        </span>
        <span className="font-black leading-none text-[#1B004B] text-xl sm:text-2xl">
          CENTRO DE
        </span>
        <span className="font-black leading-none mt-1 text-[#1E90E5] text-xl sm:text-2xl">
          GESTIÓN
        </span>
        <span className="font-black leading-none mt-1 text-[#4C007D] text-xl sm:text-2xl">
          VETERINARIA
        </span>
      </span>
    </button>
  );
}

const cssAnimations = `
  @keyframes node-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes energy-flow {
    to { stroke-dashoffset: -64; }
  }
  @keyframes hub-pulse {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.08); }
  }
  .node-float {
    animation: node-float 4.6s ease-in-out infinite;
    will-change: transform;
  }
  .energy-flow {
    animation: energy-flow 1.15s linear infinite;
  }
  .hub-pulse {
    animation: hub-pulse 3.2s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .node-float,
    .energy-flow,
    .hub-pulse {
      animation: none;
    }
  }
`;
