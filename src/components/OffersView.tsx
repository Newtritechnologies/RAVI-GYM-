import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  GYM_OFFERS,
  OFFER_CATEGORIES,
  type GymOffer,
  type OfferCategory,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface OffersViewProps {
  onSelectOffer: (offer: GymOffer) => void;
  onClaimOffer: (offer: GymOffer) => void;
}

export function OffersView({ onSelectOffer, onClaimOffer }: OffersViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<OfferCategory>('All');

  const filteredOffers = useMemo(() => {
    if (selectedCategory === 'All') return GYM_OFFERS;
    return GYM_OFFERS.filter((offer) => offer.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-[#0B0807] min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ravi-amber-glow"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12 space-y-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#FF991F]">
            MEMBERSHIP & SEASONAL OFFERS
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            <span className="text-[#FAF7F2]">Train on your </span>
            <span className="text-[#FF991F]">terms.</span>
          </h1>
          <p className="text-base md:text-lg text-[#B5A99B] max-w-2xl leading-relaxed">
            Transparent plans with zero hidden joining fees. Every pass
            includes a complimentary movement screen during your first week.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-3">
            {OFFER_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF991F] text-[#0B0807] font-semibold'
                      : 'border border-white/15 text-[#D8CEC0] hover:border-white/40 hover:text-[#FAF7F2]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredOffers.map((offer) => (
            <article
              key={offer.id}
              onClick={() => onSelectOffer(offer)}
              className="group bg-[#120E0C] border border-white/[0.08] hover:border-[#FF991F]/45 transition-colors duration-150 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1410]">
                <ResilientImage
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0B0807]/65 via-transparent to-[#0B0807]/20"
                />

                <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] bg-[#0B0807]/70 px-2.5 py-1">
                  {offer.index}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOffer(offer);
                  }}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B0807]/80 backdrop-blur-sm border border-white/30 text-xs font-medium text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#0B0807] group-hover:border-[#FAF7F2] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                >
                  <span>View details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#FF991F] uppercase">
                      {offer.category}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {offer.originalPrice && (
                        <span className="font-mono tabular-nums text-xs text-[#7B7064] line-through">
                          ₹{offer.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="font-mono tabular-nums text-lg font-bold text-[#FF991F]">
                        ₹{offer.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-[#FAF7F2] tracking-tight">
                    {offer.title}
                  </h2>

                  <p className="text-sm text-[#A59889] leading-relaxed">
                    {offer.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                  <span className="text-xs text-[#8F8375]">
                    {offer.billingLabel} · {offer.inclusions.length} perks
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClaimOffer(offer);
                    }}
                    className="text-xs font-semibold text-[#FAF7F2] hover:text-[#FF991F] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Claim offer</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF991F]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
