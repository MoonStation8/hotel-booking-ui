# Hotel Booking UI

Small front-end booking interface built with Next.js (App Router), React, Zustand, Tailwind CSS, and shadcn/ui. Users can create bookings, view a list, inspect details, and delete entries.

## Setup

Prereqs:

- Node.js 18+ recommended
- pnpm (or npm/yarn)

Install and run:

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Usage

- Fill out the booking form at the top of the page.
- Submit to add a booking to the list.
- Select a booking to view details, then delete if needed.

## Assumptions / Trade-offs

- Front-end only; Zustand keeps data in memory (refresh clears bookings).
- Dates are stored as yyyy-mm-dd strings and parsed with the built-in Date API.
- Overlapping bookings are allowed by design (per brief).
- Validation is lightweight: required fields, guest count >= 1, and check-out after check-in.
- No authentication, persistence, or server-side validation.
- No edit flow (create + delete only).

## Time Spent

- ~3 hours
