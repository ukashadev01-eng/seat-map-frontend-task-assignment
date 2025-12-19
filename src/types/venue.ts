export type SeatStatus = 'available' | 'reserved' | 'sold' | 'held';

export interface Seat {
    id: string;
    col: number;
    x: number;
    y: number;
    priceTier: number;
    status: SeatStatus;
}

export interface Row {
    index: number;
    seats: Seat[];
}

export interface Transform {
    x: number;
    y: number;
    scale: number;
}

export interface Section {
    id: string;
    label: string;
    transform: Transform;
    rows: Row[];
}

export interface VenueMap {
    width: number;
    height: number;
}

export interface Venue {
    venueId: string;
    name: string;
    map: VenueMap;
    sections: Section[];
}

export interface SelectedSeat extends Seat {
    section: string;
    row: number;
}
