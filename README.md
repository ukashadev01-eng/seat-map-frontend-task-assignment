# Interactive Event Seating Map

A high-performance, accessible React + TypeScript application for interactive event seating selection.

## Features

- **Interactive Seating Map**: SVG-based rendering of venue seats with real-time selection
- **Smart Selection**: Select up to 8 seats with visual feedback and validation
- **Persistent State**: Selections automatically saved to localStorage and restored on page reload
- **Accessibility First**: Full keyboard navigation, ARIA labels, and focus management
- **Responsive Design**: Works seamlessly on desktop and mobile viewports
- **Performance Optimized**: Smooth 60fps rendering even with 15,000+ seats using React.memo and optimized re-renders

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The application will be available at `http://localhost:5173/`

## Architecture & Design Decisions

### Technology Stack

- **React 19** with **TypeScript** (strict mode enabled)
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **SVG** for seat rendering (chosen over Canvas for better accessibility and easier interaction handling)

### Key Architectural Choices

#### 1. SVG vs Canvas

**Decision**: SVG
**Rationale**:

- Better accessibility (individual elements can have ARIA labels and receive focus)
- Easier event handling (native DOM events on each seat)
- Simpler interaction model for keyboard navigation
- CSS-based styling and transitions

**Trade-off**: Canvas might offer slightly better performance for extremely large datasets (50k+ seats), but SVG provides a better developer experience and meets the 15k seat requirement with excellent performance.

#### 2. Component Memoization

All seat components use `React.memo` to prevent unnecessary re-renders. With 15,000 seats, this is critical for maintaining 60fps performance. Only seats affected by selection changes re-render.

#### 3. State Management

**Decision**: React hooks with localStorage persistence
**Rationale**:

- Simple, lightweight solution without external dependencies
- `useSelection` hook encapsulates all selection logic
- localStorage provides persistence without backend complexity

#### 4. Data Structure

Venue data uses absolute positioning (x, y coordinates) for each seat, avoiding complex layout algorithms. This makes rendering straightforward and performant.

### Performance Optimizations

1. **Memoization**: `React.memo` on Seat and SeatingMap components
2. **Callback Optimization**: `useCallback` for event handlers to prevent function recreation
3. **Efficient Re-renders**: Selection state managed to minimize component updates
4. **CSS Transitions**: Hardware-accelerated CSS for hover effects instead of JS

### Accessibility Features

- **Keyboard Navigation**: Tab through available seats, Enter/Space to select
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Focus Management**: Visual focus indicators and proper focus order
- **Screen Reader Support**: Semantic HTML and ARIA attributes
- **Status Announcements**: aria-pressed and aria-disabled states

## Project Structure

```
src/
├── components/
│   ├── Seat.tsx              # Individual seat component (memoized)
│   ├── SeatingMap.tsx        # Main SVG map container
│   ├── BookingSummary.tsx    # Selection summary and checkout
│   └── SeatDetails.tsx       # Tooltip for seat information
├── hooks/
│   ├── useVenueData.ts       # Fetch and manage venue data
│   └── useSelection.ts       # Selection state with localStorage
├── types/
│   └── venue.ts              # TypeScript interfaces
├── lib/
│   └── utils.ts              # Utility functions (pricing, styling)
├── App.tsx                   # Main application component
└── index.css                 # Tailwind directives and base styles

public/
├── venue.json                # Sample venue (64 seats)
└── venue-large.json          # Large venue (15,000 seats)

scripts/
└── generateLargeVenue.js     # Generate test data
```

## Testing

### Manual Testing

1. Open the application in a browser
2. Click on available (green) seats to select them
3. Verify booking summary updates with seat details and total price
4. Try selecting more than 8 seats (should be prevented)
5. Reload the page to verify selections persist
6. Use Tab key to navigate between seats
7. Press Enter or Space to select focused seat

### Performance Testing

To test with 15,000 seats, update `src/hooks/useVenueData.ts` to fetch `venue-large.json`:

```typescript
fetch('/venue-large.json');
```

Then monitor performance:

- Open DevTools Performance tab
- Record interaction (clicking seats, scrolling)
- Verify frame rate stays at ~60fps
- Check for smooth animations and no jank

### Keyboard Navigation Testing

1. Tab to focus on first available seat
2. Use Tab/Shift+Tab to navigate between seats
3. Press Enter or Space to select/deselect
4. Verify focus indicators are visible
5. Test with screen reader (VoiceOver on Mac, NVDA on Windows)

## Features / TODOs

### Implemented ✅

- [x] Load and render venue data
- [x] Seat selection (max 8 seats)
- [x] Keyboard navigation
- [x] Seat details display
- [x] Booking summary with subtotal
- [x] localStorage persistence
- [x] Accessibility (ARIA labels, focus management)
- [x] Responsive design
- [x] Performance optimization for 15k seats

### Stretch Goals (Not Implemented)

- [ ] Live WebSocket updates for seat status changes
- [ ] Heat-map toggle for price tier visualization
- [ ] "Find N adjacent seats" helper
- [ ] Pinch-zoom and pan for mobile touch gestures
- [ ] Dark mode toggle
- [ ] End-to-end tests (Playwright/Cypress)

### Known Limitations

1. **Touch Gestures**: Basic touch support works, but advanced gestures (pinch-zoom, pan) are not implemented
2. **Real-time Updates**: No WebSocket integration for live seat status changes
3. **Seat Finding**: No automated "find best available seats" feature
4. **Testing**: No automated test suite (manual testing only)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
