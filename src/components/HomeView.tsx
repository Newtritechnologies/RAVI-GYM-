import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  GYM_ASSETS,
  GYM_EQUIPMENTS,
  GYM_OFFERS,
  GYM_TRAINERS,
  type GymEquipment,
  type GymOffer,
  type GymPageRoute,
  type GymTrainer,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  onNavigate: (page: GymPageRoute) => void;
  onOpenBooking: () => void;
  onInspectOffer: (offer: GymOffer) => void;
  onInspectEquipment: (eq: GymEquipment) => void;
  onInspectTrainer: (trainer: GymTrainer) => void;
}

export function HomeView({
  onNavigate,
  onOpenBooking,
  onInspectOffer,
  onInspectEquipment,
  onInspectTrainer,
}: HomeViewProps) {
  const featuredOffer = GYM_OFFERS[1];
  const featuredEquipment = GYM_EQUIPMENTS[0];
  const featuredTrainer = GYM_TRAINERS[0];

  const scrollToPhilosophy = () => {
    const el = document.getElementById('gym-philosophy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 1. Bright Sunlit Strength Floor Hero */}
      <section
        data-testid="page-hero"
        className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#1A120D]"
      >
        <div className="absolute inset-0">
          <ResilientImage
            src={GYM_ASSETS.heroFloor}
            alt="Sunlit Olympic lifting platforms, sprint turf, and power racks inside RAVI GYM"
            loading="eager"
            className="w-full h-full object-cover object-center brightness-105 contrast-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#120B08]/82 via-[#120B08]/40 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#120B08]/55 via-transparent to-[#120B08]/20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#FF9E2C] drop-shadow-sm">
              STRENGTH & CONDITIONING · EST. 2012
            </p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02] text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
              <span className="block text-[#FFFFFF]">Train hard.</span>
              <span className="block text-[#FF991F]">Leave stronger.</span>
            </h1>

            <p className="text-base md:text-lg text-[#FAF4EC] max-w-xl leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
              Olympic lifting platforms, 40-meter conditioning turf, and
              certified coaching built for measurable progress at RAVI GYM.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('offers')}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-sm font-semibold tracking-tight shadow-lg hover:bg-[#FF991F] hover:text-[#0B0807] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF991F]"
              >
                <span>Explore membership offers</span>
                <ArrowUpRight className="w-4 h-4 text-[#E6840E]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToPhilosophy}
          className="absolute bottom-7 right-6 md:right-10 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0807]/55 backdrop-blur-sm text-[11px] font-medium tracking-[0.2em] text-[#FAF7F2] hover:bg-[#0B0807]/80 transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </section>

      {/* 2. Bright Editorial Philosophy Section */}
      <section
        id="gym-philosophy"
        className="relative overflow-hidden bg-[#18110C] border-t border-white/[0.1]"
      >
        <div className="absolute inset-0">
          <ResilientImage
            src={GYM_ASSETS.philosophyKettlebells}
            alt="Cast-iron kettlebells, Olympic barbell, and wooden chalk stand on sunlit athletic turf"
            className="w-full h-full object-cover object-center brightness-105 contrast-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#120B08]/80 via-[#120B08]/45 to-[#120B08]/72"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#120B08]/30 via-transparent to-[#120B08]/45"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#FF9E2C] drop-shadow-sm">
              A FLOOR BUILT FOR PROGRESS
            </p>

            <p className="text-xl md:text-2xl text-[#FAF4EC] leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              We train the way strength lasts. Calibrated iron, attentive
              coaches, and room to move without waiting in line.
            </p>

            <div>
              <button
                type="button"
                onClick={() => onNavigate('trainers')}
                className="inline-flex items-center gap-3 pb-2.5 border-b border-white/40 text-sm font-semibold text-[#FFFFFF] hover:border-[#FF991F] hover:text-[#FF991F] transition-colors cursor-pointer whitespace-nowrap drop-shadow-sm"
              >
                <span>Meet our trainers</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF991F]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.06] text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
              <span className="block text-[#FFFFFF]">Strength is a</span>
              <span className="block text-[#FF991F]">habit.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* 3. Inside RAVI GYM: Offer, Equipment & Coach Highlights */}
      <section className="bg-[#0E0A08] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.22em] text-[#FF991F]">
                EVERYTHING UNDER ONE ROOF
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#FAF7F2]">
                Explore offers, iron, and coaching.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('equipments')}
              className="inline-flex items-center gap-2 pb-1.5 border-b border-white/20 text-sm font-semibold text-[#FAF7F2] hover:text-[#FF991F] hover:border-[#FF991F] transition-colors self-start sm:self-auto cursor-pointer whitespace-nowrap"
            >
              <span>Browse all equipment</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF991F]" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Highlight 1: Featured Offer */}
            <article
              onClick={() => onInspectOffer(featuredOffer)}
              className="group bg-[#14100D] border border-white/[0.08] hover:border-[#FF991F]/45 transition-colors duration-150 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1511]">
                <ResilientImage
                  src={featuredOffer.image}
                  alt={featuredOffer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#0B0807]/75 backdrop-blur-sm border border-white/25 text-xs font-medium text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#0B0807] transition-colors">
                  <span>View details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
              <div className="p-6 space-y-2 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-[#FF991F] uppercase">
                    Featured Offer
                  </span>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#FF991F]">
                    ₹{featuredOffer.price}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#FAF7F2]">
                  {featuredOffer.title}
                </h3>
                <p className="text-sm text-[#A59889] leading-relaxed">
                  {featuredOffer.summary}
                </p>
              </div>
            </article>

            {/* Highlight 2: Featured Equipment */}
            <article
              onClick={() => onInspectEquipment(featuredEquipment)}
              className="group bg-[#14100D] border border-white/[0.08] hover:border-[#FF991F]/45 transition-colors duration-150 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1511]">
                <ResilientImage
                  src={featuredEquipment.image}
                  alt={featuredEquipment.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#0B0807]/75 backdrop-blur-sm border border-white/25 text-xs font-medium text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#0B0807] transition-colors">
                  <span>View details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
              <div className="p-6 space-y-2 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-[#FF991F] uppercase">
                    Equipments
                  </span>
                  <span className="font-mono tabular-nums text-xs font-medium text-[#C8B9A6]">
                    {featuredEquipment.unitsCount} Stations
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#FAF7F2]">
                  {featuredEquipment.name}
                </h3>
                <p className="text-sm text-[#A59889] leading-relaxed">
                  {featuredEquipment.summary}
                </p>
              </div>
            </article>

            {/* Highlight 3: Featured Trainer */}
            <article
              onClick={() => onInspectTrainer(featuredTrainer)}
              className="group bg-[#14100D] border border-white/[0.08] hover:border-[#FF991F]/45 transition-colors duration-150 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1511]">
                <ResilientImage
                  src={featuredTrainer.image}
                  alt={featuredTrainer.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#0B0807]/75 backdrop-blur-sm border border-white/25 text-xs font-medium text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#0B0807] transition-colors">
                  <span>View details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
              <div className="p-6 space-y-2 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-[#FF991F] uppercase">
                    {featuredTrainer.role}
                  </span>
                  <span className="font-mono tabular-nums text-xs font-medium text-[#C8B9A6]">
                    {featuredTrainer.experienceYears} yrs exp
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#FAF7F2]">
                  {featuredTrainer.name}
                </h3>
                <p className="text-sm text-[#A59889] leading-relaxed">
                  {featuredTrainer.summary}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Split Conversion Feature (Olympic Coaching + Crimson Narrative) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch border-t border-white/[0.08]">
        <div className="relative min-h-[340px] lg:min-h-[540px] bg-[#14100D] overflow-hidden">
          <ResilientImage
            src={GYM_ASSETS.olympicCoaching}
            alt="Strength coach guiding barbell setup on a sunlit wooden lifting platform at RAVI GYM"
            className="w-full h-full lg:h-full object-cover"
          />
        </div>

        <div className="bg-[#8C1C13] px-8 sm:px-14 md:px-20 py-16 lg:py-24 flex flex-col justify-center">
          <div className="max-w-lg space-y-6">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#F5D6C6]">
              START THIS WEEK AT RAVI GYM
            </p>

            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.06] text-balance">
              <span className="text-[#FAF7F2]">Come for the </span>
              <span className="text-[#FF991F]">iron. </span>
              <span className="text-[#FAF7F2]">Stay for the results.</span>
            </h2>

            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-between gap-8 pb-3 border-b border-white/30 text-sm font-semibold text-[#FAF7F2] hover:border-[#FF991F] hover:text-[#FDE3BE] transition-colors cursor-pointer whitespace-nowrap min-w-[220px]"
              >
                <span>Claim your 3-day free trial</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF991F]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
