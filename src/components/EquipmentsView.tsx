import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  EQUIPMENT_CATEGORIES,
  GYM_EQUIPMENTS,
  type EquipmentCategory,
  type GymEquipment,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface EquipmentsViewProps {
  onSelectEquipment: (equipment: GymEquipment) => void;
}

export function EquipmentsView({ onSelectEquipment }: EquipmentsViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<EquipmentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return GYM_EQUIPMENTS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (query) {
        const hay = `${item.name} ${item.summary} ${item.targetMuscles} ${item.category}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#0B0807] min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ravi-amber-glow"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12 space-y-4">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#FF991F]">
            THE IRON & MACHINES
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            <span className="text-[#FAF7F2]">Calibrated for </span>
            <span className="text-[#FF991F]">real work.</span>
          </h1>
          <p className="text-base md:text-lg text-[#B5A99B] max-w-2xl leading-relaxed">
            Competition-grade steel, oak lifting platforms, Concept2 ergs, and
            fluid dual-pulley stations inspected daily.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-6 space-y-5 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-2.5">
          {EQUIPMENT_CATEGORIES.map((category) => {
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
              placeholder="Search racks, barbells, sleds..."
              aria-label="Search gym equipment"
              className="w-full pl-10 pr-9 py-2.5 bg-[#14100D] border border-white/12 text-sm text-[#FAF7F2] placeholder:text-[#7B7064] focus:outline-none focus:border-[#FF991F] transition-colors"
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

          <span className="text-xs text-[#8F8375] font-mono tabular-nums whitespace-nowrap">
            {filteredEquipments.length}{' '}
            {filteredEquipments.length === 1 ? 'station group' : 'station groups'}
          </span>
        </div>
      </section>

      {/* Equipment Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 pb-24">
        {filteredEquipments.length === 0 ? (
          <div className="py-20 text-center border border-white/[0.08] bg-[#120E0C] space-y-4">
            <p className="font-display text-xl font-semibold text-[#FAF7F2]">
              No equipment matches that search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer"
            >
              Reset equipment filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEquipments.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectEquipment(item)}
                className="group bg-[#120E0C] border border-white/[0.08] hover:border-[#FF991F]/45 transition-colors duration-150 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1410]">
                  <ResilientImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0B0807]/60 via-transparent to-[#0B0807]/20"
                  />

                  <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] bg-[#0B0807]/70 px-2.5 py-1">
                    {item.index}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEquipment(item);
                    }}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B0807]/80 backdrop-blur-sm border border-white/30 text-xs font-medium text-[#FAF7F2] group-hover:bg-[#FAF7F2] group-hover:text-[#0B0807] group-hover:border-[#FAF7F2] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <span>View details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] font-semibold tracking-[0.2em] text-[#FF991F] uppercase">
                        {item.category}
                      </span>
                      <span className="font-mono tabular-nums text-xs font-semibold text-[#FF991F]">
                        {item.brandSpec}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-[#FAF7F2] tracking-tight">
                      {item.name}
                    </h2>

                    <p className="text-sm text-[#A59889] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-xs text-[#8F8375]">
                    <span>{item.zone}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.unitsCount} units on floor</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
