import { ArrowUpRight } from 'lucide-react';
import { GYM_FACILITIES, type GymFacility } from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface FacilitiesViewProps {
  onSelectFacility: (facility: GymFacility) => void;
  onBookTour: (facilityName: string) => void;
}

export function FacilitiesView({
  onSelectFacility,
  onBookTour,
}: FacilitiesViewProps) {
  return (
    <div className="bg-[#0B0807] min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ravi-amber-glow"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 space-y-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#FF991F]">
            FACILITIES & RECOVERY
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            <span className="text-[#FAF7F2]">Four floors built for </span>
            <span className="text-[#FF991F]">focus.</span>
          </h1>
          <p className="text-base md:text-lg text-[#B5A99B] max-w-2xl leading-relaxed">
            Sunlit lifting platforms, a 40-meter conditioning turf, combat &
            mobility studio, and a thermal cedar sauna & cold plunge lounge.
          </p>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 space-y-16">
        {GYM_FACILITIES.map((facility, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <article
              key={facility.id}
              onClick={() => onSelectFacility(facility)}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-[#120E0C] border border-white/[0.08] hover:border-[#FF991F]/40 transition-colors cursor-pointer"
            >
              <div
                className={`lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] bg-[#1A1410] overflow-hidden ${
                  isEven ? 'lg:order-2' : ''
                }`}
              >
                <ResilientImage
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full lg:h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFacility(facility);
                  }}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B0807]/80 backdrop-blur-sm border border-white/30 text-xs font-medium text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#0B0807] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>View details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div
                className={`lg:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6 ${
                  isEven ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <span className="font-mono font-semibold text-[#FF991F]">
                      {facility.index}
                    </span>
                    <span className="text-[#A59889]">{facility.areaOrCapacity}</span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                      {facility.name}
                    </h2>
                    <p className="text-sm text-[#FF991F] mt-1">
                      {facility.subtitle}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-[#B5A99B] leading-relaxed">
                    {facility.summary}
                  </p>

                  <ul className="pt-2 space-y-2 border-t border-white/[0.06]">
                    {facility.highlights.map((highlight) => (
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
                    {facility.hours}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookTour(facility.name);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Book a tour</span>
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
