import { EQUIPO } from "@/content";

// The names here are placeholders, not the real team. See src/content.ts before
// publishing: it is the single place to confirm them, and the list of what else
// is still missing lives at the top of that file.
export default function Equipo() {
  return (
    <section
      id="equipo"
      className="relative w-full bg-white py-20 px-4 sm:px-8 overflow-x-clip"
    >
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#AEE2D1]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 text-center sm:text-left">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#4C007D] uppercase mb-3">
            Nuestro equipo
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#4C007D] max-w-2xl leading-tight">
            Cada especialista en{" "}
            <span className="text-[#1B004B]">lo que tu mascota necesita</span>
          </h2>
          <p className="mt-5 text-[#1B004B]/70 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
            Te atendrán personas con formación específica, no una atención
            genérica para todos los casos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EQUIPO.map((persona) => (
            <article
              key={persona.nombre}
              className="group bg-[#F6F4FA] rounded-[2rem] p-7 border border-[#4C007D]/10 hover:border-[#AEE2D1] hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#4C007D] text-[#FFDDC1] flex items-center justify-center font-black text-xl mb-5 ring-4 ring-[#AEE2D1]/40">
                {persona.initials}
              </div>
              <h3 className="text-[#1B004B] font-black text-lg mb-1">
                {persona.nombre}
              </h3>
              <p className="text-[#4C007D] text-xs font-bold tracking-wide uppercase mb-3">
                {persona.cargo}
              </p>
              <p className="text-[#1B004B]/70 text-sm font-medium leading-relaxed">
                {persona.especialidad}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}