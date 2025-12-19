import type { SelectedSeat } from '../types/venue';
import { getPriceForTier } from '../lib/utils';

interface SeatDetailsProps {
    seat: SelectedSeat | null;
    position: { x: number; y: number };
}

export function SeatDetails({ seat, position }: SeatDetailsProps) {
    if (!seat) return null;

    return (
        <div
            className="fixed z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl pointer-events-none"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -120%)',
            }}
            role="tooltip"
        >
            <div className="space-y-1">
                <p className="font-semibold text-sm">
                    Section {seat.section} • Row {seat.row} • Seat {seat.col}
                </p>
                <p className="text-xs text-gray-300">
                    Price Tier {seat.priceTier} • ${getPriceForTier(seat.priceTier)}
                </p>
                <p className="text-xs text-gray-300 capitalize">Status: {seat.status}</p>
            </div>
            {/* Arrow */}
            <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45"
                aria-hidden="true"
            />
        </div>
    );
}
