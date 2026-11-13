import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_DISHES,
  type DishItem,
  type MenuCategory,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface MenuViewProps {
  onSelectDish: (dish: DishItem) => void;
  shortlistCounts: Record<string, number>;
  onOpenReserve: () => void;
}

export function MenuView({
  onSelectDish,
  shortlistCounts,
  onOpenReserve,
}: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalShortlisted = useMemo(
    () => Object.values(shortlistCounts).reduce((sum, qty) => sum + qty, 0),
    [shortlistCounts]
  );

  const filteredDishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_DISHES.filter((dish) => {
      if (selectedCategory !== 'All' && dish.category !== selectedCategory) {
        return false;
      }
      if (vegOnly && dish.dietary !== 'Vegetarian') {
        return false;
      }
      if (query) {
        const hay = `${dish.name} ${dish.description} ${dish.category}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [selectedCategory, vegOnly, searchQuery]);

  return (
    <div className="bg-[#0B0807] min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ravi-amber-glow"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
                THE KITCHEN
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
                <span className="text-[#FAF7F2]">Fire, spice, and </span>
                <span className="text-[#E6840E]">patience.</span>
              </h1>
              <p className="text-base text-[#B5A99B] leading-relaxed">
                Cooked to order from whole spices roasted each morning in Khan
                Market. Select any plate for tasting notes and pairings.
              </p>
            </div>

            {totalShortlisted > 0 && (
              <button
                type="button"
                onClick={onOpenReserve}
                className="self-start md:self-end inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#191310] border border-[#E6840E]/45 text-sm font-medium text-[#FAF7F2] hover:bg-[#E6840E] hover:text-[#0B0807] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="tabular-nums">
                  {totalShortlisted} {totalShortlisted === 1 ? 'plate' : 'plates'} shortlisted for table
                </span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-6 space-y-5 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-2.5">
          {MENU_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6840E] ${
                  isActive
                    ? 'bg-[#E6840E] text-[#0B0807] font-semibold'
                    : 'bg-transparent border border-white/15 text-[#D8CEC0] hover:border-white/40 hover:text-[#FAF7F2]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="relative max-w-sm w-full">
            <Search
              className="w-4 h-4 text-[#8F8375] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              aria-label="Search menu dishes"
              className="w-full pl-10 pr-9 py-2.5 bg-[#14100D] border border-white/12 text-sm text-[#FAF7F2] placeholder:text-[#7B7064] focus:outline-none focus:border-[#E6840E] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8F8375] hover:text-[#FAF7F2] p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setVegOnly((prev) => !prev)}
              aria-pressed={vegOnly}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                vegOnly
                  ? 'border-[#E6840E] bg-[#E6840E]/15 text-[#FAF7F2]'
                  : 'border-white/15 text-[#B5A99B] hover:text-[#FAF7F2]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Vegetarian only</span>
            </button>

            <span className="text-xs text-[#8F8375] font-mono tabular-nums whitespace-nowrap">
              {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
            </span>
          </div>
        </div>
      </section>

      {/* 2-Column Editorial Dish Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 pb-24">
        {filteredDishes.length === 0 ? (
          <div className="py-20 text-center border border-white/[0.08] bg-[#120E0C] space-y-4">
            <p className="font-display text-xl font-semibold text-[#FAF7F2]">
              No dishes match your filter.
            </p>
            <p className="text-sm text-[#A59889]">
              Try clearing your search or switching back to all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setVegOnly(false);
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#E6840E] transition-colors cursor-pointer"
            >
              Reset menu filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredDishes.map((dish) => {
              const countInShortlist = shortlistCounts[dish.id] || 0;
              return (
                <article
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="group bg-[#120E0C] border border-white/[0.08] hover:border-[#E6840E]/45 transition-colors duration-150 cursor-pointer flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1410]">
                    <ResilientImage
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0B0807]/70 via-transparent to-[#0B0807]/30"
                    />

                    {/* Top-Left Editorial Index */}
                    <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] tracking-wider">
                      {dish.index}
                    </span>

                    {/* Bottom-Right View Details Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDish(dish);
                      }}
                      className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B0807]/80 backdrop-blur-sm border border-white/30 text-xs font-medium text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#0B0807] group-hover:border-[#FAF7F2] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                    >
                      <span>View details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-[#E6840E] uppercase">
                          {dish.category}
                        </span>
                        <span className="font-mono tabular-nums text-base font-bold text-[#E6840E]">
                          ₹{dish.price}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="font-display text-2xl font-bold text-[#FAF7F2] tracking-tight">
                          {dish.name}
                        </h2>
                        {countInShortlist > 0 && (
                          <span className="text-xs font-mono tabular-nums text-[#E6840E]">
                            {countInShortlist} selected
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-[#A59889] leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 text-xs text-[#8F8375]">
                      <span>{dish.dietary}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dish.spiceLevel === 'No heat' ? 'Zero spice' : `${dish.spiceLevel} spice`}</span>
                      {dish.signature && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#C8B9A6]">House Signature</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
