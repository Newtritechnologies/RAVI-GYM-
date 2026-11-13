import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_PHOTOS, type GalleryPhoto } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

type GalleryFilter = 'All' | GalleryPhoto['category'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'All',
  'Spaces',
  'Tandoor & Craft',
  'The Table',
];

export function GalleryView() {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visiblePhotos = useMemo(() => {
    if (filter === 'All') return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((photo) => photo.category === filter);
  }, [filter]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, visiblePhotos.length]);

  const activePhoto =
    activeIndex !== null && visiblePhotos[activeIndex]
      ? visiblePhotos[activeIndex]
      : null;

  return (
    <div className="bg-[#0B0807] min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ravi-amber-glow"
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 space-y-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
            INSIDE RAVI
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            <span className="text-[#FAF7F2]">Light, brass, and </span>
            <span className="text-[#E6840E]">ember.</span>
          </h1>
          <p className="text-base md:text-lg text-[#B5A99B] max-w-2xl leading-relaxed">
            Moments from the clay oven, the copper handis, and the candlelit
            tables of Khan Market.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {GALLERY_FILTERS.map((item) => {
              const isActive = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFilter(item);
                    setActiveIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#E6840E] text-[#0B0807] font-semibold'
                      : 'border border-white/15 text-[#D8CEC0] hover:border-white/40 hover:text-[#FAF7F2]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group text-left bg-[#120E0C] border border-white/[0.08] hover:border-[#E6840E]/45 transition-colors overflow-hidden cursor-pointer flex flex-col ${
                photo.aspect === 'wide' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1A1410]">
                <ResilientImage
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between gap-4 text-[11px] font-semibold tracking-[0.18em] text-[#E6840E] uppercase">
                  <span>{photo.category}</span>
                </div>
                <h2 className="font-display text-lg font-bold text-[#FAF7F2]">
                  {photo.title}
                </h2>
                <p className="text-xs text-[#A59889] leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 bg-[#0B0807]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#120E0C] border border-white/15 overflow-hidden"
          >
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0B0807]/80 border border-white/20 text-[#FAF7F2] hover:bg-[#E6840E] hover:text-[#0B0807] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[16/10] bg-[#0B0807]">
              <ResilientImage
                src={activePhoto.image}
                alt={activePhoto.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.08]">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#E6840E] uppercase">
                  {activePhoto.category}
                </p>
                <h3 className="font-display text-xl font-bold text-[#FAF7F2]">
                  {activePhoto.title}
                </h3>
                <p className="text-sm text-[#A59889]">{activePhoto.caption}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null
                        ? null
                        : (prev - 1 + visiblePhotos.length) %
                          visiblePhotos.length
                    )
                  }
                  className="w-10 h-10 border border-white/20 text-[#FAF7F2] hover:border-[#E6840E] hover:text-[#E6840E] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null ? null : (prev + 1) % visiblePhotos.length
                    )
                  }
                  className="w-10 h-10 border border-white/20 text-[#FAF7F2] hover:border-[#E6840E] hover:text-[#E6840E] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
