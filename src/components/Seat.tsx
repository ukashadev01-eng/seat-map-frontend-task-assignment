import { memo } from 'react';
import type { Seat as SeatType, SeatStatus } from '../types/venue';
import { cn } from '../lib/utils';

interface SeatProps {
    seat: SeatType;
    section: string;
    row: number;
    isSelected: boolean;
    onSelect: () => void;
    onFocus: () => void;
}

const STATUS_COLORS: Record<SeatStatus, string> = {
    available: 'fill-green-500 hover:fill-green-600 cursor-pointer',
    reserved: 'fill-yellow-500 cursor-not-allowed opacity-60',
    sold: 'fill-red-500 cursor-not-allowed opacity-60',
    held: 'fill-orange-500 cursor-not-allowed opacity-60',
};

function SeatComponent({ seat, section, row, isSelected, onSelect, onFocus }: SeatProps) {
    const isClickable = seat.status === 'available';
    const seatColor = isSelected
        ? 'fill-blue-600 hover:fill-blue-700'
        : STATUS_COLORS[seat.status];

    const handleClick = () => {
        if (isClickable) {
            onSelect();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect();
        }
    };

    return (
        <circle
            cx={seat.x}
            cy={seat.y}
            r={12}
            className={cn(
                'transition-all duration-150',
                seatColor,
                isSelected && 'stroke-blue-800 stroke-2',
                isClickable && 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
            onClick={handleClick}
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
            tabIndex={isClickable ? 0 : -1}
            role="button"
            aria-label={`Section ${section}, Row ${row}, Seat ${seat.col}, ${seat.status}, Price tier ${seat.priceTier}, ${isSelected ? 'selected' : 'not selected'}`}
            aria-pressed={isSelected}
            aria-disabled={!isClickable}
        />
    );
}

export const Seat = memo(SeatComponent);
