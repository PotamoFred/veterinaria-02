"use client";

export default function BentoGrid() {
  return (
    <section className="relative w-full bg-[#F6F4FA] py-20 px-4 sm:px-8 overflow-x-clip">
      {/* Subtle ambient glows using Durazno Cálido and Púrpura Clínico */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4C007D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFDDC1]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <div className="mb-14 text-center sm:text-left">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#4C007D] uppercase mb-3">
            ¿Por qué elegirnos?
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#4C007D] max-w-2xl leading-tight">
            Tu mascota en las <span className="text-[#1B004B]">mejores manos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left: 4 Cards in 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Card 1: Atención integral */}
            <div className="bg-white rounded-[2rem] p-7 border border-[#4C007D]/10 shadow-sm flex flex-col justify-between group hover:border-[#AEE2D1] hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#AEE2D1]/20 rounded-bl-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="w-12 h-12 rounded-2xl bg-[#AEE2D1]/20 text-[#4C007D] flex items-center justify-center mb-6 relative z-10 border border-[#AEE2D1]/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#1B004B] font-black text-lg sm:text-xl mb-2">Atención integral</h3>
                <p className="text-[#1B004B]/70 text-sm font-medium leading-relaxed">Todo lo que tu mascota necesita en un mismo lugar.</p>
              </div>
            </div>

            {/* Card 2: Profesionales especializados */}
            <div className="bg-white rounded-[2rem] p-7 border border-[#4C007D]/10 shadow-sm flex flex-col justify-between group hover:border-[#FFDDC1] hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFDDC1]/30 rounded-bl-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="w-12 h-12 rounded-2xl bg-[#FFDDC1]/40 text-[#4C007D] flex items-center justify-center mb-6 relative z-10 border border-[#FFDDC1]/60">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#1B004B] font-black text-lg sm:text-xl mb-2">Profesionales especializados</h3>
                <p className="text-[#1B004B]/70 text-sm font-medium leading-relaxed">Atención enfocada en las necesidades de cada paciente.</p>
              </div>
            </div>

            {/* Card 3: Tecnología y diagnóstico */}
            <div className="bg-[#1B004B] rounded-[2rem] p-7 border border-[#4C007D]/20 shadow-md flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4C007D]/50 rounded-bl-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="w-12 h-12 rounded-2xl bg-[#4C007D] text-[#AEE2D1] flex items-center justify-center mb-6 relative z-10 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-black text-lg sm:text-xl mb-2">Tecnología y diagnóstico</h3>
                <p className="text-[#F6F4FA]/70 text-sm font-medium leading-relaxed">Herramientas para apoyar una atención veterinaria adecuada.</p>
              </div>
            </div>

            {/* Card 4: Trato cercano */}
            <div className="bg-white rounded-[2rem] p-7 border border-[#4C007D]/10 shadow-sm flex flex-col justify-between group hover:border-[#4C007D]/30 hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4C007D]/10 rounded-bl-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="w-12 h-12 rounded-2xl bg-[#F6F4FA] text-[#4C007D] flex items-center justify-center mb-6 relative z-10 border border-[#4C007D]/15">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#1B004B] font-black text-lg sm:text-xl mb-2">Trato cercano</h3>
                <p className="text-[#1B004B]/70 text-sm font-medium leading-relaxed">Acompañamiento para tutores y mascotas durante el proceso.</p>
              </div>
            </div>

          </div>

          {/* Right: Large Photo */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-full min-h-[400px] lg:min-h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-[#4C007D]/10 group">
             {/* Usamos la imagen local subida por el usuario */}
             <img 
                src="/imagenes2/01.jpg" 
                alt="Perro feliz siendo atendido por profesional veterinario" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             {/* Gradiente sutil SOLO en la parte inferior para legibilidad del texto */}
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1B004B] via-[#1B004B]/40 to-transparent pointer-events-none" />
             
             {/* Overlay Text */}
             <div className="absolute bottom-8 left-8 right-8 z-10">
               <p className="text-[#AEE2D1] text-xs font-black tracking-widest uppercase mb-2 drop-shadow-md">
                 Nuestra filosofía
               </p>
               <p className="text-white font-medium text-lg sm:text-xl leading-snug drop-shadow-lg max-w-sm">
                 Cada mascota es única, y su bienestar es nuestro compromiso absoluto.
               </p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
