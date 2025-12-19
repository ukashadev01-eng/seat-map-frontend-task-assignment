// Script to generate a large venue with ~15,000 seats for performance testing
// Run with: node scripts/generateLargeVenue.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const SECTIONS = 10;
const ROWS_PER_SECTION = 50;
const SEATS_PER_ROW = 30;
const SEAT_SPACING = 30;
const ROW_SPACING = 30;
const SECTION_SPACING = 500;

const statuses = ['available', 'available', 'available', 'reserved', 'sold', 'held'];
const priceTiers = [1, 1, 2, 2, 3];

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateVenue() {
    const sections = [];

    for (let s = 0; s < SECTIONS; s++) {
        const sectionX = (s % 5) * SECTION_SPACING;
        const sectionY = Math.floor(s / 5) * (ROWS_PER_SECTION * ROW_SPACING + 200);

        const rows = [];
        for (let r = 1; r <= ROWS_PER_SECTION; r++) {
            const seats = [];
            for (let c = 1; c <= SEATS_PER_ROW; c++) {
                seats.push({
                    id: `${String.fromCharCode(65 + s)}-${r}-${String(c).padStart(2, '0')}`,
                    col: c,
                    x: sectionX + (c * SEAT_SPACING),
                    y: sectionY + (r * ROW_SPACING),
                    priceTier: randomChoice(priceTiers),
                    status: randomChoice(statuses),
                });
            }
            rows.push({ index: r, seats });
        }

        sections.push({
            id: String.fromCharCode(65 + s),
            label: `Section ${String.fromCharCode(65 + s)}`,
            transform: { x: 0, y: 0, scale: 1 },
            rows,
        });
    }

    const venue = {
        venueId: 'arena-large',
        name: 'Metropolis Arena - Large',
        map: {
            width: SECTION_SPACING * 5 + SEAT_SPACING * SEATS_PER_ROW,
            height: (Math.ceil(SECTIONS / 5)) * (ROWS_PER_SECTION * ROW_SPACING + 200),
        },
        sections,
    };

    return venue;
}

const venue = generateVenue();
const totalSeats = SECTIONS * ROWS_PER_SECTION * SEATS_PER_ROW;

console.log(`Generated venue with ${totalSeats} seats`);
console.log(`Map dimensions: ${venue.map.width}x${venue.map.height}`);

const outputPath = path.join(__dirname, '..', 'public', 'venue-large.json');
fs.writeFileSync(outputPath, JSON.stringify(venue, null, 2));

console.log(`Saved to ${outputPath}`);
