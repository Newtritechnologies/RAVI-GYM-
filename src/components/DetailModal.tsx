import { useEffect } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import type {
  GymEquipment,
  GymFacility,
  GymOffer,
  GymTrainer,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

export type DetailSelection =
  | { type: 'offer'; data: GymOffer }
  | { type: 'equipment'; data: GymEquipment }
  | { type: 'trainer'; data: GymTrainer }
  | { type: 'facility'; data: GymFacility }
  | null;

interface DetailModalProps {
  selection: DetailSelection;
  onClose: () => void;
  onProceedAction: (payload: {
    intent: 'offer' | 'trial' | 'trainer' | 'tour';
    label: string;
  }) => void;
}

export function DetailModal({
  selection,
  onClose,
  onProceedAction,
}: DetailModalProps) {
  useEffect(() => {
    if (!selection) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selection, onClose]);

  if (!selection) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gym-detail-title"
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
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0B0807]/80 border border-white/25 text-[#FAF7F2] hover:bg-[#FF991F] hover:text-[#0B0807] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {selection.type === 'offer' && (
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-[#1A1410]">
              <ResilientImage
                src={selection.data.image}
                alt={selection.data.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] bg-[#0B0807]/70 px-2.5 py-1">
                {selection.data.index}
              </span>
            </div>

            <div className="md:col-span-7 p-7 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 pr-8">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#FF991F] uppercase">
                    {selection.data.category} Offer
                  </span>
                  <div className="flex items-baseline gap-2">
                    {selection.data.originalPrice && (
                      <span className="font-mono tabular-nums text-xs text-[#7B7064] line-through">
                        ₹{selection.data.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="font-mono tabular-nums text-xl font-bold text-[#FF991F]">
                      ₹{selection.data.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <h2
                  id="gym-detail-title"
                  className="font-display text-3xl font-bold text-[#FAF7F2] tracking-tight"
                >
                  {selection.data.title}
                </h2>

                <p className="text-xs text-[#C8B9A6]">
                  {selection.data.billingLabel} · {selection.data.validityNote}
                </p>

                <p className="text-sm text-[#D8CEC0] leading-relaxed">
                  {selection.data.details}
                </p>

                <ul className="pt-3 border-t border-white/[0.08] space-y-2">
                  {selection.data.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-2.5 text-xs text-[#D8CEC0]"
                    >
                      <Check
                        className="w-3.5 h-3.5 text-[#FF991F] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() =>
                  onProceedAction({
                    intent: 'offer',
                    label: selection.data.title,
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer"
              >
                <span>Claim this membership offer</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {selection.type === 'equipment' && (
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-[#1A1410]">
              <ResilientImage
                src={selection.data.image}
                alt={selection.data.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] bg-[#0B0807]/70 px-2.5 py-1">
                {selection.data.index}
              </span>
            </div>

            <div className="md:col-span-6 p-7 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 pr-8">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#FF991F] uppercase">
                    {selection.data.category}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#FF991F]">
                    {selection.data.unitsCount} units
                  </span>
                </div>

                <h2
                  id="gym-detail-title"
                  className="font-display text-3xl font-bold text-[#FAF7F2] tracking-tight"
                >
                  {selection.data.name}
                </h2>

                <p className="text-xs text-[#C8B9A6]">
                  {selection.data.brandSpec} · {selection.data.zone}
                </p>

                <p className="text-sm text-[#D8CEC0] leading-relaxed">
                  {selection.data.fullSpecs}
                </p>

                <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs text-[#A59889]">
                  <p>
                    <span className="text-[#FAF7F2] font-medium">
                      Target focus:{' '}
                    </span>
                    {selection.data.targetMuscles}
                  </p>
                  <p>
                    <span className="text-[#FAF7F2] font-medium">
                      Coach tip:{' '}
                    </span>
                    {selection.data.coachingTip}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onProceedAction({
                    intent: 'trial',
                    label: `Floor intro: ${selection.data.name}`,
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer"
              >
                <span>Try this zone with a free pass</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {selection.type === 'trainer' && (
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-[#1A1410]">
              <ResilientImage
                src={selection.data.image}
                alt={selection.data.name}
                loading="eager"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] bg-[#0B0807]/70 px-2.5 py-1">
                {selection.data.index}
              </span>
            </div>

            <div className="md:col-span-7 p-7 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 pr-8">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#FF991F] uppercase">
                    {selection.data.specialty}
                  </span>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#FF991F]">
                    ₹{selection.data.sessionPrice.toLocaleString('en-IN')}/hr
                  </span>
                </div>

                <div>
                  <h2
                    id="gym-detail-title"
                    className="font-display text-3xl font-bold text-[#FAF7F2] tracking-tight"
                  >
                    {selection.data.name}
                  </h2>
                  <p className="text-sm text-[#FF991F] mt-1">
                    {selection.data.role} · {selection.data.experienceYears} years
                    coaching
                  </p>
                </div>

                <p className="text-sm text-[#D8CEC0] leading-relaxed">
                  {selection.data.bio}
                </p>

                <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs text-[#A59889]">
                  <p>
                    <span className="text-[#FAF7F2] font-medium">
                      Credentials:{' '}
                    </span>
                    {selection.data.certifications.join(' · ')}
                  </p>
                  <p>
                    <span className="text-[#FAF7F2] font-medium">
                      Floor hours:{' '}
                    </span>
                    <span className="font-mono">{selection.data.availability}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onProceedAction({
                    intent: 'trainer',
                    label: selection.data.name,
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer"
              >
                <span>Book 1-on-1 session with {selection.data.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {selection.type === 'facility' && (
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-[#1A1410]">
              <ResilientImage
                src={selection.data.image}
                alt={selection.data.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#FAF7F2] bg-[#0B0807]/70 px-2.5 py-1">
                {selection.data.index}
              </span>
            </div>

            <div className="md:col-span-6 p-7 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 pr-8">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#FF991F] uppercase">
                    Facility Zone
                  </span>
                  <span className="font-mono text-xs text-[#C8B9A6]">
                    {selection.data.hours}
                  </span>
                </div>

                <div>
                  <h2
                    id="gym-detail-title"
                    className="font-display text-3xl font-bold text-[#FAF7F2] tracking-tight"
                  >
                    {selection.data.name}
                  </h2>
                  <p className="text-xs text-[#C8B9A6] mt-1">
                    {selection.data.areaOrCapacity}
                  </p>
                </div>

                <p className="text-sm text-[#D8CEC0] leading-relaxed">
                  {selection.data.details}
                </p>

                <ul className="pt-3 border-t border-white/[0.08] space-y-2">
                  {selection.data.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-xs text-[#D8CEC0]"
                    >
                      <Check
                        className="w-3.5 h-3.5 text-[#FF991F] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() =>
                  onProceedAction({
                    intent: 'tour',
                    label: selection.data.name,
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer"
              >
                <span>Schedule a facility tour</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
