import { useEffect, useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { GYM_OFFERS, GYM_TRAINERS } from '../data/gymData';

export type BookingIntent = 'trial' | 'offer' | 'trainer' | 'tour';

interface BookingModalProps {
  isOpen: boolean;
  initialIntent?: BookingIntent;
  initialSelectionLabel?: string;
  onClose: () => void;
}

const TIME_SLOTS = ['06:30', '09:00', '12:30', '17:30', '19:30'];

function getDefaultDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function BookingModal({
  isOpen,
  initialIntent = 'trial',
  initialSelectionLabel,
  onClose,
}: BookingModalProps) {
  const [intent, setIntent] = useState<BookingIntent>(initialIntent);
  const [selectedOption, setSelectedOption] = useState(
    initialSelectionLabel || '3-Day All-Access Free Trial'
  );
  const [date, setDate] = useState(getDefaultDate);
  const [timeSlot, setTimeSlot] = useState('09:00');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goalNote, setGoalNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  useEffect(() => {
    setIntent(initialIntent);
    if (initialSelectionLabel) {
      setSelectedOption(initialSelectionLabel);
    } else if (initialIntent === 'trial') {
      setSelectedOption('3-Day All-Access Free Trial');
    } else if (initialIntent === 'offer') {
      setSelectedOption(GYM_OFFERS[0].title);
    } else if (initialIntent === 'trainer') {
      setSelectedOption(GYM_TRAINERS[0].name);
    } else {
      setSelectedOption('Full Gym & Recovery Tour');
    }
    setConfirmationId(null);
    setErrorMsg('');
  }, [initialIntent, initialSelectionLabel, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    setErrorMsg('');
    const code = `RAVIGYM-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationId(code);
  };

  const handleDownloadIcs = () => {
    if (!confirmationId) return;
    const [year, month, day] = date.split('-');
    const [hour, minute] = timeSlot.split(':');
    const startUtc = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String((Number(hour) + 1) % 24).padStart(2, '0');
    const endUtc = `${year}${month}${day}T${endHour}${minute}00`;
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//RAVI GYM//Pass//EN',
      'BEGIN:VEVENT',
      `UID:${confirmationId}@ravigym.in`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:RAVI GYM — ${selectedOption}`,
      `LOCATION:RAVI GYM, Khan Market, New Delhi`,
      `DESCRIPTION:Pass ${confirmationId} · ${selectedOption}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ravi-gym-${confirmationId}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0B0807]/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#120E0C] border border-white/15 p-7 md:p-10 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 text-[#FAF7F2] hover:border-[#FF991F] hover:text-[#FF991F] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmationId ? (
          <div className="space-y-6 py-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#FF991F] uppercase">
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>Pass Confirmed</span>
            </div>

            <div className="space-y-2">
              <h2
                id="booking-modal-title"
                className="font-display text-3xl font-bold text-[#FAF7F2]"
              >
                You’re locked in, {fullName}.
              </h2>
              <p className="text-sm text-[#B5A99B]">
                Pass details sent to{' '}
                <span className="text-[#FAF7F2]">{email}</span>. Reference code{' '}
                <span className="font-mono font-semibold text-[#FF991F]">
                  {confirmationId}
                </span>
                .
              </p>
            </div>

            <div className="border border-white/10 bg-[#18120F] p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-xs text-[#8F8375]">Selected Pass / Session</p>
                <p className="text-[#FAF7F2] font-medium mt-1">
                  {selectedOption}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#8F8375]">First Visit</p>
                <p className="font-mono tabular-nums text-[#FAF7F2] mt-1">
                  {date} · {timeSlot}
                </p>
              </div>
              {goalNote && (
                <div className="sm:col-span-2 pt-3 border-t border-white/[0.08]">
                  <p className="text-xs text-[#8F8375]">Training Goal Note</p>
                  <p className="text-[#D8CEC0] mt-1">{goalNote}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add to calendar</span>
              </button>
              <button
                type="button"
                onClick={() => setConfirmationId(null)}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium text-[#D8CEC0] hover:border-white/45 hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                Edit details
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium text-[#A59889] hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 pr-10">
              <p className="text-xs font-semibold tracking-[0.22em] text-[#FF991F]">
                RAVI GYM · KHAN MARKET
              </p>
              <h2
                id="booking-modal-title"
                className="font-display text-3xl font-bold text-[#FAF7F2] tracking-tight"
              >
                Book your visit.
              </h2>
              <p className="text-sm text-[#A59889]">
                Open daily 05:30 — 22:30. Bring flat training shoes; towels and
                lockers are on us.
              </p>
            </div>

            {/* Intent Tabs */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'trial', label: '3-Day Free Trial' },
                  { id: 'offer', label: 'Claim Offer' },
                  { id: 'trainer', label: '1-on-1 Coaching' },
                  { id: 'tour', label: 'Facility Tour' },
                ] as { id: BookingIntent; label: string }[]
              ).map((tab) => {
                const isActive = intent === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setIntent(tab.id);
                      if (tab.id === 'trial') {
                        setSelectedOption('3-Day All-Access Free Trial');
                      } else if (tab.id === 'offer') {
                        setSelectedOption(GYM_OFFERS[0].title);
                      } else if (tab.id === 'trainer') {
                        setSelectedOption(GYM_TRAINERS[0].name);
                      } else {
                        setSelectedOption('Full Gym & Recovery Tour');
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#FF991F] text-[#0B0807] font-semibold'
                        : 'border border-white/15 text-[#D8CEC0] hover:border-white/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Specific Selection & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  {intent === 'trainer'
                    ? 'Select Coach'
                    : intent === 'offer'
                      ? 'Select Membership Offer'
                      : 'Selected Pass / Visit'}
                </span>
                {intent === 'offer' ? (
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#FF991F]"
                  >
                    {GYM_OFFERS.map((offer) => (
                      <option key={offer.id} value={offer.title}>
                        {offer.title} (₹{offer.price.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                ) : intent === 'trainer' ? (
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#FF991F]"
                  >
                    {GYM_TRAINERS.map((trainer) => (
                      <option key={trainer.id} value={trainer.name}>
                        {trainer.name} — {trainer.specialty}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#FF991F]"
                  />
                )}
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  Start / Visit Date
                </span>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] font-mono focus:outline-none focus:border-[#FF991F]"
                />
              </label>
            </div>

            {/* Preferred Time Slot */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[#C8B9A6]">
                Preferred Arrival Window
              </span>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isActive = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`px-4 py-2 font-mono tabular-nums text-xs rounded-full transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#FF991F] text-[#0B0807] font-semibold'
                          : 'border border-white/15 text-[#D8CEC0] hover:border-white/40'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  Full Name
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Rohan Sharma"
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#FF991F]"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohan@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#FF991F]"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  Phone
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98100 54321"
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#FF991F]"
                />
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-[#C8B9A6]">
                Training goals or injury history (optional)
              </span>
              <input
                type="text"
                value={goalNote}
                onChange={(e) => setGoalNote(e.target.value)}
                placeholder="Strength foundation, marathon conditioning, shoulder mobility..."
                className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#FF991F]"
              />
            </label>

            {errorMsg && (
              <p
                role="alert"
                className="text-xs font-medium text-[#F87171] bg-[#7F1D1D]/25 border border-[#F87171]/30 px-3.5 py-2.5"
              >
                {errorMsg}
              </p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium text-[#A59889] hover:text-[#FAF7F2] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#FF991F] transition-colors cursor-pointer"
              >
                Confirm pass
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
