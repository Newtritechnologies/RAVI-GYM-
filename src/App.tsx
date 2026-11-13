import { useCallback, useEffect, useState } from 'react';
import { BookingModal, type BookingIntent } from './components/BookingModal';
import { DetailModal, type DetailSelection } from './components/DetailModal';
import { EquipmentsView } from './components/EquipmentsView';
import { FacilitiesView } from './components/FacilitiesView';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { Navbar } from './components/Navbar';
import { OffersView } from './components/OffersView';
import { TrainersView } from './components/TrainersView';
import type { GymPageRoute } from './data/gymData';

const VALID_PAGES: GymPageRoute[] = [
  'home',
  'offers',
  'equipments',
  'trainers',
  'facilities',
];

function getInitialPage(): GymPageRoute {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (VALID_PAGES.includes(hash as GymPageRoute)) {
    return hash as GymPageRoute;
  }
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<GymPageRoute>(getInitialPage);
  const [detailSelection, setDetailSelection] = useState<DetailSelection>(null);
  const [bookingState, setBookingState] = useState<{
    open: boolean;
    intent: BookingIntent;
    label?: string;
  }>({
    open: false,
    intent: 'trial',
  });

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((page: GymPageRoute) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      const nextHash = page === 'home' ? '#/' : `#/${page}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const openBooking = useCallback(
    (intent: BookingIntent = 'trial', label?: string) => {
      setBookingState({ open: true, intent, label });
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0807] text-[#F5EFE6]">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenBooking={() => openBooking('trial')}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={() => openBooking('trial')}
            onInspectOffer={(offer) =>
              setDetailSelection({ type: 'offer', data: offer })
            }
            onInspectEquipment={(equipment) =>
              setDetailSelection({ type: 'equipment', data: equipment })
            }
            onInspectTrainer={(trainer) =>
              setDetailSelection({ type: 'trainer', data: trainer })
            }
          />
        )}

        {activePage === 'offers' && (
          <OffersView
            onSelectOffer={(offer) =>
              setDetailSelection({ type: 'offer', data: offer })
            }
            onClaimOffer={(offer) => openBooking('offer', offer.title)}
          />
        )}

        {activePage === 'equipments' && (
          <EquipmentsView
            onSelectEquipment={(equipment) =>
              setDetailSelection({ type: 'equipment', data: equipment })
            }
          />
        )}

        {activePage === 'trainers' && (
          <TrainersView
            onSelectTrainer={(trainer) =>
              setDetailSelection({ type: 'trainer', data: trainer })
            }
            onBookTrainer={(trainer) => openBooking('trainer', trainer.name)}
          />
        )}

        {activePage === 'facilities' && (
          <FacilitiesView
            onSelectFacility={(facility) =>
              setDetailSelection({ type: 'facility', data: facility })
            }
            onBookTour={(facilityName) => openBooking('tour', facilityName)}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => openBooking('trial')}
      />

      <DetailModal
        selection={detailSelection}
        onClose={() => setDetailSelection(null)}
        onProceedAction={({ intent, label }) => {
          setDetailSelection(null);
          openBooking(intent, label);
        }}
      />

      <BookingModal
        isOpen={bookingState.open}
        initialIntent={bookingState.intent}
        initialSelectionLabel={bookingState.label}
        onClose={() =>
          setBookingState((prev) => ({ ...prev, open: false }))
        }
      />
    </div>
  );
}
