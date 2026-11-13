import { useEffect } from 'react';
import { ArrowUpRight, Minus, Plus, X } from 'lucide-react';
import type { DishItem } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface DishDetailModalProps {
  dish: DishItem | null;
  quantity: number;
  onClose: () => void;
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onReserveWithDish: () => void;
}

export function DishDetailModal({
  dish,
  quantity,
  onClose,
  onUpdateQuantity,
  onReserveWithDish,
}: DishDetailModalProps) {
  useEffect(() => {
    if (!dish) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0B0807]/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#120E0C] border border-white/15 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dish details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0B0807]/80 border border-white/25 text-[#FAF7F2] hover:bg-[#E6840E] hover:text-[#0B0807] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-[#1A1410]">
            <ResilientImage
              src={dish.image}
              alt={dish.name}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] bg-[#0B0807]/70 px-2.5 py-1">
              {dish.index}
            </span>
          </div>

          <div className="md:col-span-6 p-7 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 pr-8">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#E6840E] uppercase">
                  {dish.category}
                </span>
                <span className="font-mono tabular-nums text-lg font-bold text-[#E6840E]">
                  ₹{dish.price}
                </span>
              </div>

              <h2
                id="dish-modal-title"
                className="font-display text-3xl font-bold text-[#FAF7F2] tracking-tight"
              >
                {dish.name}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#C8B9A6]">
                <span>{dish.dietary}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {dish.spiceLevel === 'No heat'
                    ? 'Zero spice'
                    : `${dish.spiceLevel} spice`}
                </span>
                {dish.signature && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#E6840E]">House Signature</span>
                  </>
                )}
              </div>

              <p className="text-sm text-[#D8CEC0] leading-relaxed pt-1">
                {dish.tastingNotes}
              </p>

              <div className="pt-3 border-t border-white/[0.08] space-y-2.5 text-xs text-[#A59889]">
                <p>
                  <span className="text-[#FAF7F2] font-medium">Pairing: </span>
                  {dish.pairing}
                </p>
                <p>
                  <span className="text-[#FAF7F2] font-medium">Kitchen note: </span>
                  {dish.prepNote}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                {quantity === 0 ? (
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(dish.id, 1)}
                    className="w-full px-5 py-3 rounded-full border border-white/25 text-xs font-semibold text-[#FAF7F2] hover:border-[#E6840E] hover:text-[#E6840E] transition-colors cursor-pointer"
                  >
                    Add to table shortlist
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between px-4 py-2 rounded-full border border-[#E6840E]/60 bg-[#E6840E]/10">
                    <span className="text-xs font-medium text-[#FAF7F2]">
                      Shortlisted for your table
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(dish.id, -1)}
                        className="w-7 h-7 rounded-full border border-white/20 text-[#FAF7F2] hover:border-[#E6840E] flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono tabular-nums text-sm font-semibold text-[#E6840E] w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(dish.id, 1)}
                        className="w-7 h-7 rounded-full border border-white/20 text-[#FAF7F2] hover:border-[#E6840E] flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onReserveWithDish}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#E6840E] transition-colors cursor-pointer"
              >
                <span>Reserve a table</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
