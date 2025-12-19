import { useState, useCallback } from 'react';
import { SeatingMap } from './components/SeatingMap';
import { BookingSummary } from './components/BookingSummary';
import { SeatDetails } from './components/SeatDetails';
import { useVenueData } from './hooks/useVenueData';
import { useSelection } from './hooks/useSelection';
import type { SelectedSeat } from './types/venue';

function App() {
  const { venue, loading, error } = useVenueData();
  const { selectedSeats, toggleSeat, clearSelection } = useSelection();
  const [focusedSeat, setFocusedSeat] = useState<SelectedSeat | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleSeatFocus = useCallback((seat: SelectedSeat, event?: React.FocusEvent) => {
    setFocusedSeat(seat);
    if (event) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  }, []);

  const handleRemoveSeat = useCallback(
    (seatId: string) => {
      const seat = selectedSeats.find((s) => s.id === seatId);
      if (seat) {
        toggleSeat(seat);
      }
    },
    [selectedSeats, toggleSeat]
  );


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          <p className="mt-4 text-gray-600">Loading venue data...</p>
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Venue</h2>
          <p className="text-gray-600">{error?.message || 'Failed to load venue data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{venue.name}</h1>
          <p className="text-gray-600">Select up to 8 seats for your event</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seating Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] w-full">
              <SeatingMap
                venue={venue}
                selectedSeats={selectedSeats}
                onSeatSelect={toggleSeat}
                onSeatFocus={(seat) => handleSeatFocus(seat)}
              />
            </div>
          </div>

          {/* Booking Summary - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <BookingSummary
              selectedSeats={selectedSeats}
              onClearSelection={clearSelection}
              onRemoveSeat={handleRemoveSeat}
            />
          </div>
        </div>
      </div>

      {/* Seat Details Tooltip */}
      <SeatDetails seat={focusedSeat} position={tooltipPosition} />
    </div>
  );
}

export default App;
