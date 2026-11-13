import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  MENU_DISHES,
  SITE_ASSETS,
  type DishItem,
  type PageRoute,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReserve: () => void;
  onSelectDish: (dish: DishItem) => void;
}

export function HomeView({
  onNavigate,
  onOpenReserve,
  onSelectDish,
}: HomeViewProps) {
  const signatureDishes = MENU_DISHES.filter((d) =>
    ['paneer-tikka', 'dal-makhani', 'hyderabadi-biryani'].includes(d.id)
  );

  const scrollToPhilosophy = () => {
    const el = document.getElementById('home-philosophy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 1. Full-Bleed Bright Dining Room Hero */}
      <section
        data-testid="page-hero"
        className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#1A120D]"
      >
        <div className="absolute inset-0">
          <ResilientImage
            src={SITE_ASSETS.heroDiningBright}
            alt="Sunlit and brass-lit dining room at RAVI Restaurant in Khan Market, New Delhi"
            loading="eager"
            className="w-full h-full object-cover object-center brightness-105 contrast-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#140D09]/82 via-[#140D09]/42 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#140D09]/55 via-transparent to-[#140D09]/20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#FF9E2C] drop-shadow-sm">
              MODERN INDIAN KITCHEN · EST. 1987
            </p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02] text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
              <span className="block text-[#FFFFFF]">Come hungry.</span>
              <span className="block text-[#FF991F]">Leave with a story.</span>
            </h1>

            <p className="text-base md:text-lg text-[#FAF4EC] max-w-xl leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
              Old recipes, bright spices, and a table made for sharing. RAVI
              brings the warmth of India to every plate.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-sm font-semibold tracking-tight shadow-lg hover:bg-[#FF991F] hover:text-[#0B0807] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF991F]"
              >
                <span>Explore the menu</span>
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

      {/* 2. Editorial Philosophy Section with Bright Spice Table Backdrop */}
      <section
        id="home-philosophy"
        className="relative overflow-hidden bg-[#18110C] border-t border-white/[0.1]"
      >
        <div className="absolute inset-0">
          <ResilientImage
            src={SITE_ASSETS.philosophySpicesBright}
            alt="Hammered copper bowls filled with vibrant saffron, turmeric, Kashmiri chilies, cardamom, and whole spices in golden sunlight"
            className="w-full h-full object-cover object-center brightness-105 contrast-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#130C08]/80 via-[#130C08]/45 to-[#130C08]/72"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#130C08]/35 via-transparent to-[#130C08]/45"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#FF9E2C] drop-shadow-sm">
              A TABLE WITH A POINT OF VIEW
            </p>

            <p className="text-xl md:text-2xl text-[#FAF4EC] leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              We cook the food we want to remember. Regional recipes, produce at
              its peak, and just enough fire to make you lean in.
            </p>

            <div>
              <button
                type="button"
                onClick={() => onNavigate('story')}
                className="inline-flex items-center gap-3 pb-2.5 border-b border-white/40 text-sm font-semibold text-[#FFFFFF] hover:border-[#FF991F] hover:text-[#FF991F] transition-colors cursor-pointer whitespace-nowrap drop-shadow-sm"
              >
                <span>Meet RAVI</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF991F]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.06] text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
              <span className="block text-[#FFFFFF]">Flavour is a</span>
              <span className="block text-[#FF991F]">feeling.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* 3. Signature Plates Preview */}
      <section className="bg-[#0E0A08] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
                FROM THE KITCHEN
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#FAF7F2]">
                Three plates we’re known for.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 pb-1.5 border-b border-white/20 text-sm font-semibold text-[#FAF7F2] hover:text-[#E6840E] hover:border-[#E6840E] transition-colors self-start sm:self-auto cursor-pointer whitespace-nowrap"
            >
              <span>View full menu</span>
              <ArrowUpRight className="w-4 h-4 text-[#E6840E]" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {signatureDishes.map((dish) => (
              <article
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group bg-[#14100D] border border-white/[0.08] hover:border-[#E6840E]/45 transition-colors duration-150 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1511]">
                  <ResilientImage
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3.5 left-4 font-mono text-xs font-medium text-[#FAF7F2]/90 bg-[#0B0807]/65 px-2 py-0.5">
                    {dish.index}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-2.5 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-[#E6840E] uppercase">
                      {dish.category}
                    </span>
                    <span className="font-mono tabular-nums text-sm font-semibold text-[#E6840E]">
                      ₹{dish.price}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#FAF7F2] group-hover:text-[#E6840E] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-[#A59889] leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Split Reservation Feature (Copper Handi Curry + Crimson Narrative) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch border-t border-white/[0.08]">
        <div className="relative min-h-[340px] lg:min-h-[540px] bg-[#14100D] overflow-hidden">
          <ResilientImage
            src={SITE_ASSETS.curryCopperHandi}
            alt="Hammered copper handi of slow-simmered Dal Makhani at RAVI"
            className="w-full h-full lg:h-full object-cover"
          />
        </div>

        <div className="bg-[#8C1C13] px-8 sm:px-14 md:px-20 py-16 lg:py-24 flex flex-col justify-center">
          <div className="max-w-lg space-y-6">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#F5D6C6]">
              TONIGHT AT RAVI
            </p>

            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.06] text-balance">
              <span className="text-[#FAF7F2]">Come for the </span>
              <span className="text-[#E6840E]">curry. </span>
              <span className="text-[#FAF7F2]">Stay for the conversation.</span>
            </h2>

            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenReserve}
                className="inline-flex items-center justify-between gap-8 pb-3 border-b border-white/30 text-sm font-semibold text-[#FAF7F2] hover:border-[#E6840E] hover:text-[#FDE3BE] transition-colors cursor-pointer whitespace-nowrap min-w-[200px]"
              >
                <span>Find your table</span>
                <ArrowUpRight className="w-4 h-4 text-[#E6840E]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
