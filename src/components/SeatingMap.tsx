import { memo, useState } from 'react';
import type { Venue, SelectedSeat } from '../types/venue';
import { Seat } from './Seat';

interface SeatingMapProps {
    venue: Venue;
    selectedSeats: SelectedSeat[];
    onSeatSelect: (seat: SelectedSeat) => void;
    onSeatFocus: (seat: SelectedSeat) => void;
}

function SeatingMapComponent({ venue, selectedSeats, onSeatSelect, onSeatFocus }: SeatingMapProps) {
    const [viewBox] = useState(`0 0 ${venue.map.width} ${venue.map.height}`);

    const isSelected = (seatId: string) => {
        return selectedSeats.some((s) => s.id === seatId);
    };

    return (
        <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <svg
                viewBox={viewBox}
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                aria-label={`Seating map for ${venue.name}`}
            >
                {/* Stage indicator */}
                <rect
                    x={venue.map.width / 2 - 200}
                    y={20}
                    width={400}
                    height={40}
                    fill="#1f2937"
                    rx={4}
                />
                <text
                    x={venue.map.width / 2}
                    y={45}
                    textAnchor="middle"
                    fill="white"
                    fontSize="20"
                    fontWeight="bold"
                >
                    STAGE
                </text>

                {/* Render all sections */}
                {venue.sections.map((section) => (
                    <g
                        key={section.id}
                        transform={`translate(${section.transform.x}, ${section.transform.y}) scale(${section.transform.scale})`}
                    >
                        {/* Section label */}
                        <text
                            x={section.rows[0]?.seats[0]?.x || 0}
                            y={(section.rows[0]?.seats[0]?.y || 0) - 20}
                            fill="#374151"
                            fontSize="16"
                            fontWeight="600"
                        >
                            {section.label}
                        </text>

                        {/* Render all rows */}
                        {section.rows.map((row) =>
                            row.seats.map((seat) => {
                                const selectedSeat: SelectedSeat = {
                                    ...seat,
                                    section: section.id,
                                    row: row.index,
                                };

                                return (
                                    <Seat
                                        key={seat.id}
                                        seat={seat}
                                        section={section.id}
                                        row={row.index}
                                        isSelected={isSelected(seat.id)}
                                        onSelect={() => onSeatSelect(selectedSeat)}
                                        onFocus={() => onSeatFocus(selectedSeat)}
                                    />
                                );
                            })
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}

export const SeatingMap = memo(SeatingMapComponent);
