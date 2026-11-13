import { ArrowUpRight } from 'lucide-react';
import { RESTAURANT_SPACES } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface FacilitiesViewProps {
  onBookSpace: (spaceName: string) => void;
}

export function FacilitiesView({ onBookSpace }: FacilitiesViewProps) {
  return (
    <div className="bg-[#0B0807] min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ravi-amber-glow"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 space-y-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
            FACILITIES & SPACES
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            <span className="text-[#FAF7F2]">Rooms made to </span>
            <span className="text-[#E6840E]">linger.</span>
          </h1>
          <p className="text-base md:text-lg text-[#B5A99B] max-w-2xl leading-relaxed">
            Four distinct settings under one roof in Khan Market—from the warmth
            of the main walnut dining hall to private courtyard feasts under
            brass lanterns.
          </p>
        </div>
      </section>

      {/* Spaces Showcase */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 space-y-16">
        {RESTAURANT_SPACES.map((space, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <article
              key={space.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-[#120E0C] border border-white/[0.08]"
            >
              <div
                className={`lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[380px] bg-[#1A1410] overflow-hidden ${
                  isEven ? 'lg:order-2' : ''
                }`}
              >
                <ResilientImage
                  src={space.image}
                  alt={space.name}
                  className="w-full h-full lg:h-full object-cover"
                />
              </div>

              <div
                className={`lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6 ${
                  isEven ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <span className="font-mono font-semibold text-[#E6840E]">
                      {space.index}
                    </span>
                    <span className="text-[#A59889]">{space.capacity}</span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                      {space.name}
                    </h2>
                    <p className="text-sm text-[#E6840E] mt-1">
                      {space.subtitle}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-[#B5A99B] leading-relaxed">
                    {space.description}
                  </p>

                  <ul className="pt-2 space-y-2 border-t border-white/[0.06]">
                    {space.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-xs md:text-sm text-[#C8B9A6] leading-relaxed"
                      >
                        — {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/[0.06]">
                  <span className="font-mono text-xs text-[#8F8375] tabular-nums">
                    {space.hours}
                  </span>
                  <button
                    type="button"
                    onClick={() => onBookSpace(space.name)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#E6840E] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Book this space</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
