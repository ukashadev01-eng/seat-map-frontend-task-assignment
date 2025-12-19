import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Price tier mapping
export const PRICE_TIERS: Record<number, number> = {
    1: 150,
    2: 100,
    3: 75,
};

export function getPriceForTier(tier: number): number {
    return PRICE_TIERS[tier] || 50;
}

export function calculateTotal(seats: Array<{ priceTier: number }>): number {
    return seats.reduce((sum, seat) => sum + getPriceForTier(seat.priceTier), 0);
}
