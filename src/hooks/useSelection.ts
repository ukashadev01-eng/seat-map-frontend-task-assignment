import { useState, useEffect, useCallback } from 'react';
import type { SelectedSeat } from '../types/venue';

const STORAGE_KEY = 'seating-selection';

export function useSelection() {
    const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSeats));
        } catch (error) {
            console.error('Failed to save selection to localStorage:', error);
        }
    }, [selectedSeats]);

    const toggleSeat = useCallback((seat: SelectedSeat) => {
        setSelectedSeats((prev) => {
            const exists = prev.find((s) => s.id === seat.id);
            if (exists) {
                return prev.filter((s) => s.id !== seat.id);
            }
            if (prev.length >= 8) {
                return prev;
            }
            return [...prev, seat];
        });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedSeats([]);
    }, []);

    const isSelected = useCallback(
        (seatId: string) => {
            return selectedSeats.some((s) => s.id === seatId);
        },
        [selectedSeats]
    );

    return {
        selectedSeats,
        toggleSeat,
        clearSelection,
        isSelected,
    };
}
