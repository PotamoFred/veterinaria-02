"use client";

import { TESTIMONIOS as testimonials } from "@/content";

// These reviews are invented, names and all. See src/content.ts.


function StarIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#4C007D]"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div
      className="
        flex-shrink-0 w-[300px] sm:w-[340px]
        rounded-2xl border border-[#4C007D]/10
        bg-[#FFDDC1]
        p-6 mx-3
        flex flex-col gap-4
        shadow-sm
      "
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: item.rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[#1B004B]/80 text-sm leading-relaxed flex-1 font-medium">
        &ldquo;{item.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#4C007D]/10 mt-2">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-white border border-[#4C007D]/15 flex items-center justify-center text-xl shadow-sm">
          {item.pet.split(" ").pop()}
        </div>
        <div>
          <p className="text-[#1B004B] text-sm font-black leading-none mb-1.5">
            {item.name}
          </p>
          <p className="text-[#4C007D] text-xs font-semibold">{item.pet.split(" ").slice(0, -1).join(" ")}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsCarousel() {
  // Duplicate items for seamless infinite loop
  const items = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonios"
      className="relative w-full pb-20 pt-8 overflow-x-clip bg-[#F6F4FA]"
    >
      {/* Section header */}
      <div className="text-center mb-12 px-4 relative z-10">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-[#4C007D] uppercase mb-3">
          Lo que dicen nuestros clientes
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-[#4C007D]">
          Experiencias que{" "}
          <span className="text-[#1B004B]">nos inspiran</span>
        </h2>
      </div>

      {/* Carousel track */}
      <div className="relative">
        {/* Left fade mask */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #F6F4FA, transparent)" }}
        />
        {/* Right fade mask */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #F6F4FA, transparent)" }}
        />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {items.map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom separator completely removed for seamless integration */}
    </section>
  );
}
