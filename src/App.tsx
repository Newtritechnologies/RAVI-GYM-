import { useCallback, useEffect, useState } from 'react';
import { DishDetailModal } from './components/DishDetailModal';
import { FacilitiesView } from './components/FacilitiesView';
import { Footer } from './components/Footer';
import { GalleryView } from './components/GalleryView';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { Navbar } from './components/Navbar';
import { ReservationModal } from './components/ReservationModal';
import { StoryView } from './components/StoryView';
import type { DishItem, PageRoute } from './data/restaurantData';

const VALID_PAGES: PageRoute[] = [
  'home',
  'menu',
  'story',
  'facilities',
  'gallery',
];

function getInitialPage(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (VALID_PAGES.includes(hash as PageRoute)) {
    return hash as PageRoute;
  }
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageRoute>(getInitialPage);
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [preferredSpace, setPreferredSpace] = useState<string | undefined>(
    undefined
  );
  const [shortlistCounts, setShortlistCounts] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((page: PageRoute) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      const nextHash = page === 'home' ? '#/' : `#/${page}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleOpenReserve = useCallback((spaceName?: string) => {
    setPreferredSpace(spaceName);
    setReserveOpen(true);
  }, []);

  const handleUpdateShortlist = useCallback((dishId: string, delta: number) => {
    setShortlistCounts((prev) => {
      const nextQty = Math.max(0, (prev[dishId] || 0) + delta);
      if (nextQty === 0) {
        const copy = { ...prev };
        delete copy[dishId];
        return copy;
      }
      return { ...prev, [dishId]: nextQty };
    });
  }, []);

  const handleClearShortlist = useCallback(() => {
    setShortlistCounts({});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0807] text-[#F5EFE6]">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenReserve={() => handleOpenReserve()}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenReserve={() => handleOpenReserve()}
            onSelectDish={setSelectedDish}
          />
        )}

        {activePage === 'menu' && (
          <MenuView
            onSelectDish={setSelectedDish}
            shortlistCounts={shortlistCounts}
            onOpenReserve={() => handleOpenReserve()}
          />
        )}

        {activePage === 'story' && (
          <StoryView
            onNavigate={handleNavigate}
            onOpenReserve={() => handleOpenReserve()}
          />
        )}

        {activePage === 'facilities' && (
          <FacilitiesView
            onBookSpace={(spaceName) => handleOpenReserve(spaceName)}
          />
        )}

        {activePage === 'gallery' && <GalleryView />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenReserve={() => handleOpenReserve()}
      />

      <DishDetailModal
        dish={selectedDish}
        quantity={selectedDish ? shortlistCounts[selectedDish.id] || 0 : 0}
        onClose={() => setSelectedDish(null)}
        onUpdateQuantity={handleUpdateShortlist}
        onReserveWithDish={() => {
          setSelectedDish(null);
          handleOpenReserve();
        }}
      />

      <ReservationModal
        isOpen={reserveOpen}
        initialSpace={preferredSpace}
        shortlistCounts={shortlistCounts}
        onUpdateShortlist={handleUpdateShortlist}
        onClearShortlist={handleClearShortlist}
        onClose={() => setReserveOpen(false)}
      />
    </div>
  );
}
