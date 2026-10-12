"use client";

export default function BentoGrid() {
  return (
    <section className="relative w-full bg-[#05030f] py-20 px-4 sm:px-8 overflow-hidden">
      {/* Cosmic background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-700/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-violet-400 uppercase mb-3">
            ¿Por qué elegirnos?
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Todo lo que tu mascota <span className="text-violet-400">necesita</span>
          </h2>
        </div>

        {/* ─── BENTO GRID ─── */}
        {/*
          Layout (3 cols, 3 rows):
          [A: tagline tall] [B: hero large 2-row] [C: toggle small]
          [A: tagline tall] [B: hero large 2-row] [D: stat 10+ años]
          [E: stat 500+  ] [F: feature1] [G: feature2] [H: services]
          Adapted to CSS grid-areas
        */}
        <div
          className="
            grid gap-3
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[1fr_1.9fr_1fr]
            lg:grid-rows-[auto_auto_auto]
          "
          style={{
            gridTemplateAreas: `
              'A B C'
              'A B D'
              'E F G'
            `,
          }}
        >
          {/* ── A: Tagline card (tall left) ── */}
          <div
            className="
              lg:[grid-area:A]
              rounded-3xl border border-white/10
              bg-gradient-to-br from-violet-900/40 to-[#0d0720]/80
              backdrop-blur-xl p-7 flex flex-col justify-between
              min-h-[260px] lg:min-h-[340px]
              relative overflow-hidden
            "
          >
            {/* Glow blob */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
            <div>
              {/* Logo mark */}
              <div className="w-10 h-10 rounded-xl bg-violet-500/30 border border-violet-400/30 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white leading-tight">
                Atención<br />
                <span className="text-violet-400">Profesional</span><br />
                Garantizada
              </h3>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Horario extendido</p>
              <p className="text-white/60 text-sm font-medium">Lun – Sáb · 8am – 7pm</p>
            </div>
          </div>

          {/* ── B: Hero center card (large) ── */}
          <div
            className="
              lg:[grid-area:B]
              rounded-3xl border border-violet-500/30
              bg-gradient-to-br from-violet-800/50 via-purple-900/60 to-[#100820]/90
              backdrop-blur-xl p-8 flex flex-col justify-between
              min-h-[340px]
              relative overflow-hidden
            "
          >
            {/* Glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Badge */}
            <div className="flex items-center gap-2 text-violet-300 text-xs font-semibold tracking-widest uppercase">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Bienestar Animal
            </div>

            {/* Headline */}
            <div className="relative z-10 text-center py-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                Salud Integral<br />
                para tu <span className="text-violet-300">Mascota</span>
              </h2>
              <p className="text-white/50 text-sm max-w-sm mx-auto">
                Cuidado veterinario de primer nivel con tecnología avanzada y un equipo lleno de amor.
              </p>
            </div>

            {/* Center paw glow orb */}
            <div className="relative flex justify-center items-center my-2">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/40 to-rose-500/30 blur-2xl animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-600/60 to-purple-800/80 border border-violet-400/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-violet-200 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V8h2v9zm4 0h-2V8h2v9z"/>
                    <circle cx="8" cy="6" r="1.5"/>
                    <circle cx="12" cy="4.5" r="1.5"/>
                    <circle cx="16" cy="6" r="1.5"/>
                    <path d="M12 8c-2.5 0-4.5 2-4.5 4.5 0 3 4.5 6.5 4.5 6.5s4.5-3.5 4.5-6.5C16.5 10 14.5 8 12 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── C: Toggle / available card (top right small) ── */}
          <div
            className="
              lg:[grid-area:C]
              rounded-3xl border border-white/10
              bg-[#0e0a1f]/80 backdrop-blur-xl p-5
              flex items-center justify-between
              min-h-[100px]
              relative overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent" />
            <div className="relative z-10">
              <p className="text-white/40 text-xs mb-1">Estado</p>
              <p className="text-white font-bold text-sm">Disponible</p>
            </div>
            {/* Toggle pill */}
            <div className="relative z-10 w-14 h-7 bg-violet-500 rounded-full flex items-center px-1 cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full shadow-md ml-auto" />
            </div>
          </div>

          {/* ── D: Stat — Años de experiencia (right mid) ── */}
          <div
            className="
              lg:[grid-area:D]
              rounded-3xl border border-white/10
              bg-gradient-to-br from-[#12082a]/80 to-[#0e0a1f]/90
              backdrop-blur-xl p-6
              flex flex-col justify-center
              min-h-[130px]
              relative overflow-hidden
            "
          >
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-violet-600/20 rounded-full blur-2xl" />
            <p className="text-5xl font-black text-white relative z-10">10+</p>
            <div className="flex items-center gap-2 mt-1 relative z-10">
              <div className="w-6 h-[2px] bg-violet-500" />
              <p className="text-white/50 text-xs tracking-wide">años de experiencia</p>
            </div>
          </div>

          {/* ── E: Stat — Mascotas atendidas (bottom left) ── */}
          <div
            className="
              lg:[grid-area:E]
              rounded-3xl border border-white/10
              bg-[#0e0a1f]/80 backdrop-blur-xl p-6
              flex flex-col justify-between
              min-h-[200px]
              relative overflow-hidden
            "
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-lavender-500/10 bg-rose-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-4xl font-black text-white">500+</p>
              <p className="text-white/50 text-sm mt-1">mascotas atendidas</p>
            </div>
            {/* Fake avatars */}
            <div className="flex items-center gap-2 relative z-10">
              <div className="flex -space-x-2">
                {["🐕","🐈","🐇"].map((pet, i) => (
                  <div key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 border-2 border-[#0e0a1f] flex items-center justify-center text-sm">
                    {pet}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0e0a1f] flex items-center justify-center text-white text-[10px] font-bold">+</div>
              </div>
            </div>
            <button className="relative z-10 self-start flex items-center gap-2 bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-200 text-xs font-semibold px-4 py-2.5 rounded-full transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar cita
            </button>
          </div>

          {/* ── F: Feature — Consulta Rápida ── */}
          <div
            className="
              lg:[grid-area:F]
              rounded-3xl border border-white/10
              bg-gradient-to-br from-violet-900/30 to-[#0e0a1f]/80
              backdrop-blur-xl p-6
              flex flex-col justify-between
              min-h-[180px]
              relative overflow-hidden
            "
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl" />
            <div className="w-9 h-9 rounded-xl bg-violet-500/25 border border-violet-400/20 flex items-center justify-center mb-4">
              <svg className="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Consulta Express</h4>
              <p className="text-white/40 text-xs leading-relaxed">
                Revisión rápida con diagnóstico inmediato para tu mascota.
              </p>
            </div>
          </div>

          {/* ── G: Feature — Seguimiento ── */}
          <div
            className="
              lg:[grid-area:G]
              rounded-3xl border border-white/10
              bg-gradient-to-br from-rose-900/20 to-[#0e0a1f]/80
              backdrop-blur-xl p-6
              flex flex-col justify-between
              min-h-[180px]
              relative overflow-hidden
            "
          >
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl" />
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/20 flex items-center justify-center mb-4">
              <svg className="w-4 h-4 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Historial Clínico</h4>
              <p className="text-white/40 text-xs leading-relaxed">
                Seguimiento completo de la salud de tu mascota en cada visita.
              </p>
            </div>
          </div>

        </div>

        {/* ── Bottom row: wide services card ── */}
        <div className="mt-3 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0e0a1f]/90 via-violet-900/20 to-[#0e0a1f]/90 backdrop-blur-xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Nuestros servicios</p>
            <p className="text-white font-bold text-lg">Todo bajo un mismo techo</p>
          </div>
          <div className="flex flex-wrap gap-2 relative z-10">
            {["Vacunación","Cirugía","Dermatología","Oncología","Ecografía","Farmacia","Odontología"].map((s) => (
              <span key={s}
                className="text-xs text-violet-300 border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
