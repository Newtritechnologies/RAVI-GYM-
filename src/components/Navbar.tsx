import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageRoute } from '../data/restaurantData';

interface NavbarProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenReserve: () => void;
}

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'story', label: 'Our Story' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'gallery', label: 'Gallery' },
];

export function Navbar({ activePage, onNavigate, onOpenReserve }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (page: PageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0807]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="font-display text-xl font-extrabold tracking-tight text-[#FAF7F2] hover:text-[#E6840E] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6840E]"
        >
          RAVI
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6840E] ${
                  isActive
                    ? 'text-[#FAF7F2]'
                    : 'text-[#B5A99B] hover:text-[#FAF7F2]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#E6840E]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenReserve}
            className="px-4 py-2 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold tracking-tight hover:bg-[#E6840E] hover:text-[#0B0807] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6840E]"
          >
            Reserve a table
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#FAF7F2] hover:text-[#E6840E] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-[#0B0807] border-t border-white/[0.08] px-6 py-4 flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left py-3 text-base font-medium border-b border-white/[0.06] last:border-b-0 transition-colors cursor-pointer ${
                  isActive ? 'text-[#E6840E]' : 'text-[#E5D7C6] hover:text-[#FAF7F2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
