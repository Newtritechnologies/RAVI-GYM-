import { useEffect, useMemo, useState } from 'react';
import { Calendar, Check, Trash2, X } from 'lucide-react';
import { MENU_DISHES, RESTAURANT_SPACES } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  initialSpace?: string;
  shortlistCounts: Record<string, number>;
  onUpdateShortlist: (dishId: string, delta: number) => void;
  onClearShortlist: () => void;
  onClose: () => void;
}

const TIME_SLOTS = ['12:30', '13:30', '19:00', '20:30', '21:30'];

function getDefaultDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function ReservationModal({
  isOpen,
  initialSpace,
  shortlistCounts,
  onUpdateShortlist,
  onClearShortlist,
  onClose,
}: ReservationModalProps) {
  const [date, setDate] = useState(getDefaultDate);
  const [timeSlot, setTimeSlot] = useState('20:30');
  const [guests, setGuests] = useState(2);
  const [space, setSpace] = useState(
    initialSpace || RESTAURANT_SPACES[0].name
  );
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  useEffect(() => {
    if (initialSpace) {
      setSpace(initialSpace);
    }
  }, [initialSpace]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const shortlistedDishes = useMemo(() => {
    return MENU_DISHES.filter((d) => (shortlistCounts[d.id] || 0) > 0).map(
      (d) => ({
        ...d,
        qty: shortlistCounts[d.id],
      })
    );
  }, [shortlistCounts]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Please enter your name for the reservation.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address for confirmation.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please provide a contact phone number.');
      return;
    }
    setErrorMsg('');
    const code = `RAVI-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationId(code);
  };

  const handleDownloadIcs = () => {
    if (!confirmationId) return;
    const [year, month, day] = date.split('-');
    const [hour, minute] = timeSlot.split(':');
    const startUtc = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String((Number(hour) + 2) % 24).padStart(2, '0');
    const endUtc = `${year}${month}${day}T${endHour}${minute}00`;
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//RAVI Restaurant//Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${confirmationId}@ravirestaurant.in`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:Dinner Table at RAVI Restaurant (${guests} Guests)`,
      `LOCATION:RAVI Restaurant, Khan Market, New Delhi`,
      `DESCRIPTION:Reservation ${confirmationId} · ${space}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ravi-reservation-${confirmationId}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setConfirmationId(null);
    setErrorMsg('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserve-modal-title"
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
          aria-label="Close reservation modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 text-[#FAF7F2] hover:border-[#E6840E] hover:text-[#E6840E] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmationId ? (
          <div className="space-y-6 py-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#E6840E] uppercase">
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>Table Confirmed</span>
            </div>

            <div className="space-y-2">
              <h2
                id="reserve-modal-title"
                className="font-display text-3xl font-bold text-[#FAF7F2]"
              >
                We’re setting a table for you, {guestName}.
              </h2>
              <p className="text-sm text-[#B5A99B]">
                Confirmation sent to <span className="text-[#FAF7F2]">{email}</span>.
                Reference code{' '}
                <span className="font-mono font-semibold text-[#E6840E]">
                  {confirmationId}
                </span>
                .
              </p>
            </div>

            <div className="border border-white/10 bg-[#18120F] p-6 grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-xs text-[#8F8375]">Date & Time</p>
                <p className="font-mono tabular-nums text-[#FAF7F2] mt-1">
                  {date} · {timeSlot}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#8F8375]">Party Size</p>
                <p className="text-[#FAF7F2] mt-1 tabular-nums">
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-[#8F8375]">Seating Room</p>
                <p className="text-[#FAF7F2] mt-1">{space}</p>
              </div>
              {shortlistedDishes.length > 0 && (
                <div className="col-span-2 pt-3 border-t border-white/[0.08]">
                  <p className="text-xs text-[#8F8375] mb-2">
                    Notes for the Kitchen (Shortlisted Plates)
                  </p>
                  <ul className="space-y-1 text-xs text-[#D8CEC0]">
                    {shortlistedDishes.map((d) => (
                      <li key={d.id}>
                        {d.qty}× {d.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#E6840E] transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add to calendar</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium text-[#D8CEC0] hover:border-white/45 hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                Modify booking
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
              <p className="text-xs font-semibold tracking-[0.22em] text-[#E6840E]">
                RESERVATIONS · KHAN MARKET
              </p>
              <h2
                id="reserve-modal-title"
                className="font-display text-3xl font-bold text-[#FAF7F2] tracking-tight"
              >
                Find your table.
              </h2>
              <p className="text-sm text-[#A59889]">
                Open daily 12:00 — 23:00. For parties larger than 12, please note
                Courtyard Verandah below.
              </p>
            </div>

            {/* Date, Guests, Space */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">Date</span>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] font-mono focus:outline-none focus:border-[#E6840E]"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  Guests
                </span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#E6840E]"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  Seating Space
                </span>
                <select
                  value={space}
                  onChange={(e) => setSpace(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#E6840E]"
                >
                  {RESTAURANT_SPACES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[#C8B9A6]">
                Preferred Seating Time
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
                          ? 'bg-[#E6840E] text-[#0B0807] font-semibold'
                          : 'border border-white/15 text-[#D8CEC0] hover:border-white/40'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guest Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#C8B9A6]">
                  Full Name
                </span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Aarav Mehta"
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#E6840E]"
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
                  placeholder="aarav@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#E6840E]"
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
                  placeholder="+91 98100 12345"
                  className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#E6840E]"
                />
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-[#C8B9A6]">
                Dietary notes or occasion (optional)
              </span>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anniversary dinner, nut allergy, mild spice preference..."
                className="w-full px-3.5 py-2.5 bg-[#18120F] border border-white/15 text-sm text-[#FAF7F2] placeholder:text-[#6E6358] focus:outline-none focus:border-[#E6840E]"
              />
            </label>

            {/* Shortlisted Dishes Summary */}
            {shortlistedDishes.length > 0 && (
              <div className="border border-white/10 bg-[#18120F] p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold tracking-wider text-[#E6840E] uppercase">
                    Shortlisted Plates for the Kitchen
                  </span>
                  <button
                    type="button"
                    onClick={onClearShortlist}
                    className="inline-flex items-center gap-1 text-xs text-[#A59889] hover:text-[#FAF7F2] cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" aria-hidden="true" />
                    <span>Clear</span>
                  </button>
                </div>
                <div className="space-y-1.5">
                  {shortlistedDishes.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between text-xs text-[#D8CEC0]"
                    >
                      <span>
                        {d.qty}× {d.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono tabular-nums text-[#C8B9A6]">
                          ₹{d.price * d.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateShortlist(d.id, -d.qty)}
                          aria-label={`Remove ${d.name}`}
                          className="text-[#8F8375] hover:text-[#FAF7F2] cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                className="px-6 py-3 rounded-full bg-[#FAF7F2] text-[#0B0807] text-xs font-semibold hover:bg-[#E6840E] transition-colors cursor-pointer"
              >
                Confirm reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
