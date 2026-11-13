import type { PageRoute } from '../data/restaurantData';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReserve: () => void;
}

export function Footer({ onNavigate, onOpenReserve }: FooterProps) {
  return (
    <footer className="bg-[#0B0807] border-t border-white/[0.08] text-[#B5A99B]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left: Brand Lockup & Location */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl font-extrabold tracking-tight text-[#FAF7F2]">
              RAVI
            </span>
            <span className="text-sm font-semibold text-[#E6840E]">
              restaurant
            </span>
          </div>
          <p className="text-sm text-[#A59889]">Good food, shared slowly.</p>
          <p className="text-sm text-[#8F8375]">Khan Market · New Delhi</p>
        </div>

        {/* Center: Site Navigation */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-col md:items-center gap-3 text-sm"
        >
          <button
            type="button"
            onClick={() => onNavigate('menu')}
            className="text-left md:text-center text-[#C8B9A6] hover:text-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap"
          >
            Menu
          </button>
          <button
            type="button"
            onClick={() => onNavigate('story')}
            className="text-left md:text-center text-[#C8B9A6] hover:text-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap"
          >
            Our Story
          </button>
          <button
            type="button"
            onClick={() => onNavigate('facilities')}
            className="text-left md:text-center text-[#C8B9A6] hover:text-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap"
          >
            Facilities
          </button>
          <button
            type="button"
            onClick={() => onNavigate('gallery')}
            className="text-left md:text-center text-[#C8B9A6] hover:text-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap"
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={onOpenReserve}
            className="text-left md:text-center text-[#E6840E] hover:text-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap"
          >
            Reservations
          </button>
        </nav>

        {/* Right: Hours & Copyright */}
        <div className="md:text-right space-y-3 text-sm">
          <p className="text-[#FAF7F2] font-medium">Open daily</p>
          <p className="font-mono tabular-nums text-[#C8B9A6]">12:00 — 23:00</p>
          <p className="pt-2 text-xs text-[#7B7064]">© 2026 RAVI</p>
        </div>
      </div>
    </footer>
  );
}
