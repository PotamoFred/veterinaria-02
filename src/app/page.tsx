import CanvasSequence from "@/components/CanvasSequence";
import Equipo from "@/components/Equipo";
import GaleriaClinica from "@/components/GaleriaClinica";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ServiciosDestacados from "@/components/ServiciosDestacados";
import Footer from "@/components/Footer";
import { REDES, REDES_LISTAS } from "@/content";

export default function Home() {
  return (
    <>
    <main
      id="inicio"
      className="relative bg-[#1B004B] text-white font-sans h-[320vh]"
    >
      {/* Frame sequence driven by scroll position */}
      <CanvasSequence />

      {/* Sticky container so the copy stays pinned while the frames play */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col z-10 pointer-events-none">
        <div className="pointer-events-auto w-full h-full flex flex-col relative overflow-x-hidden">
          {/* Hero Content. Padding clears the fixed header + alert bar. */}
          <div className="hero-copy max-w-7xl mx-auto px-6 sm:px-12 pt-36 sm:pt-44 pb-32 flex flex-col justify-center grow w-full">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 sm:w-12 h-[3px] bg-[#AEE2D1] shadow-lg"></div>
                <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FFDDC1] uppercase [text-shadow:_0_2px_10px_rgb(27_0_75_/_100%)]">
                  Tu mascota, nuestra prioridad
                </p>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-7xl font-black leading-none mb-6 tracking-tight">
                <span className="block text-white mb-2 [text-shadow:_0_4px_30px_rgb(27_0_75_/_100%)]">BIENESTAR</span>
                <span className="block text-[#AEE2D1] [text-shadow:_0_4px_30px_rgb(27_0_75_/_100%)]">ANIMAL</span>
              </h1>

              {/* Subtitle */}
              <p className="text-white font-medium text-base sm:text-xl mb-10 leading-relaxed max-w-lg [text-shadow:_0_2px_15px_rgb(27_0_75_/_100%)]">
                Brindamos cuidado y salud integral a tus mascotas con un equipo
                profesional, instalaciones adecuadas y un trato lleno de amor.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16 sm:mb-24">
                <a
                  href="https://wa.me/573156478656"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#4C007D] hover:bg-[#FFDDC1] hover:text-[#1B004B] text-white px-8 py-4 rounded-full font-semibold transition-colors shadow-md"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Agendar cita
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="#servicios"
                  className="flex items-center justify-center gap-3 border border-white/40 hover:bg-white/10 hover:text-[#AEE2D1] text-white px-8 py-4 rounded-full font-semibold transition-colors bg-transparent"
                >
                  Conocer servicios
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              {/* Social icons. Only the ones with a real URL are drawn: an
                anchor to "#" looks like a link and does nothing. Fill them in
                src/content.ts. */}
              {REDES_LISTAS.length > 0 && (
                <div className="flex items-center gap-6">
                  <a
                    href={REDES.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white hover:text-[#FFDDC1] transition-colors bg-white/10 p-2.5 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href={REDES.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white hover:text-[#FFDDC1] transition-colors bg-white/10 p-2.5 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href={REDES.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="text-white hover:text-[#FFDDC1] transition-colors bg-white/10 p-2.5 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blend into the next section once the last frame is on screen */}
      <div className="absolute bottom-0 left-0 w-full h-[28vh] bg-gradient-to-b from-transparent to-[#F6F4FA] pointer-events-none z-20" />
    </main>
    <TestimonialsCarousel />
    <GaleriaClinica />
    <ServiciosDestacados />
    <Equipo />
    <Footer />
    </>
  );
}
