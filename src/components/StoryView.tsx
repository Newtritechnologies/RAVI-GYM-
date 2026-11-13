import { ArrowUpRight } from 'lucide-react';
import {
  SITE_ASSETS,
  STORY_MILESTONES,
  type PageRoute,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface StoryViewProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReserve: () => void;
}

export function StoryView({ onNavigate, onOpenReserve }: StoryViewProps) {
  return (
    <div className="bg-[#0B0807] min-h-screen">
      {/* Hero Banner matching Screenshot 5 */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ravi-story-glow"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 space-y-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
            OUR STORY
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.04] text-balance">
            <span className="text-[#FAF7F2]">Made with </span>
            <span className="text-[#E6840E]">memory.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#C8B9A6] max-w-2xl leading-relaxed">
            RAVI is a love letter to the Indian table — generous, curious, and
            always better with one more chair.
          </p>
        </div>
      </section>

      {/* Kitchen & Craft Two-Column Split */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 aspect-[16/10] bg-[#14100D] border border-white/[0.08] overflow-hidden">
          <ResilientImage
            src={SITE_ASSETS.kitchenTandoorFire}
            alt="Chef pulling fresh blistered naan from the charcoal clay tandoor at RAVI"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
            KHAN MARKET · SINCE 1987
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#FAF7F2] text-balance">
            Slow embers, whole spices, and zero shortcuts.
          </h2>
          <p className="text-base text-[#B5A99B] leading-relaxed">
            Every morning at six, the tandoor is lit with hardwood charcoal. Our
            whole spices—green cardamom from Idukki, Kashmiri chilies from
            Pampore, black peppercorns from Malabar—are dry-roasted in cast iron
            and ground fresh before service.
          </p>
          <p className="text-base text-[#B5A99B] leading-relaxed">
            Nothing arrives in a hurry. The Dal Makhani rests on dying coals for
            twelve hours; paneer is pressed in-house each dawn; and every naan
            is slapped onto clay walls seconds before it reaches your table.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 pb-1.5 border-b border-white/25 text-sm font-semibold text-[#FAF7F2] hover:text-[#E6840E] hover:border-[#E6840E] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Browse the menu</span>
              <ArrowUpRight className="w-4 h-4 text-[#E6840E]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenReserve}
              className="inline-flex items-center gap-2 pb-1.5 border-b border-white/25 text-sm font-semibold text-[#FAF7F2] hover:text-[#E6840E] hover:border-[#E6840E] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Reserve a table</span>
              <ArrowUpRight className="w-4 h-4 text-[#E6840E]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Three-Chapter Timeline */}
      <section className="border-t border-white/[0.08] bg-[#0E0A08]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 space-y-12">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
              THREE CHAPTERS
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#FAF7F2]">
              From twelve tables to today.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORY_MILESTONES.map((item) => (
              <div
                key={item.year}
                className="bg-[#14100D] border border-white/[0.08] p-8 space-y-4"
              >
                <p className="font-mono text-2xl font-bold text-[#E6840E] tabular-nums">
                  {item.year}
                </p>
                <h3 className="font-display text-xl font-bold text-[#FAF7F2]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A59889] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
