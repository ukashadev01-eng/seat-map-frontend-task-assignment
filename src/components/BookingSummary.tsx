import { X } from 'lucide-react';
import type { SelectedSeat } from '../types/venue';
import { getPriceForTier, calculateTotal } from '../lib/utils';

interface BookingSummaryProps {
    selectedSeats: SelectedSeat[];
    onClearSelection: () => void;
    onRemoveSeat: (seatId: string) => void;
}

export function BookingSummary({
    selectedSeats,
    onClearSelection,
    onRemoveSeat,
}: BookingSummaryProps) {
    const total = calculateTotal(selectedSeats);
    const remaining = 8 - selectedSeats.length;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Booking Summary</h2>
                {selectedSeats.length > 0 && (
                    <button
                        onClick={onClearSelection}
                        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                        aria-label="Clear all selections"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Selected Seats:</span>
                    <span className="font-semibold text-gray-900">
                        {selectedSeats.length} / 8
                    </span>
                </div>
                {remaining > 0 && selectedSeats.length > 0 && (
                    <p className="text-xs text-gray-500">
                        You can select {remaining} more {remaining === 1 ? 'seat' : 'seats'}
                    </p>
                )}
            </div>

            {selectedSeats.length > 0 ? (
                <>
                    <div className="border-t border-gray-200 pt-4 space-y-2 max-h-64 overflow-y-auto">
                        {selectedSeats.map((seat) => (
                            <div
                                key={seat.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Section {seat.section} • Row {seat.row} • Seat {seat.col}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Tier {seat.priceTier} • ${getPriceForTier(seat.priceTier)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onRemoveSeat(seat.id)}
                                    className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    aria-label={`Remove seat ${seat.id}`}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold text-gray-900">Total:</span>
                            <span className="text-2xl font-bold text-primary-600">${total}</span>
                        </div>
                        <button
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            aria-label="Proceed to checkout"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-gray-500">No seats selected</p>
                    <p className="text-sm text-gray-400 mt-1">Click on available seats to select</p>
                </div>
            )}

            {/* Legend */}
            <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                        <span className="text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-600" />
                        <span className="text-gray-600">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-60" />
                        <span className="text-gray-600">Reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 opacity-60" />
                        <span className="text-gray-600">Sold</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
