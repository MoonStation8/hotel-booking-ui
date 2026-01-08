'use client'

import { useBookingsStore } from '@/store/useBookingsStore'
import { formatRange, nightsBetween } from '@/lib/date'
import type { Booking } from '@/types/booking'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

function sortBookings(a: Booking, b: Booking) {
  console.log(a, b)
  // primary: checkIn asc, secondary: createdAt desc
  const aCheck = new Date(a.checkIn).getTime()
  const bCheck = new Date(b.checkIn).getTime()
  if (aCheck !== bCheck) return aCheck - bCheck
  return b.createdAt - a.createdAt
}

export function BookingList() {
  const bookings = useBookingsStore((s) => s.bookings)
  const selectedId = useBookingsStore((s) => s.selectedBookingId)
  const selectBooking = useBookingsStore((s) => s.selectBooking)

  const sorted = [...bookings].sort(sortBookings)

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between gap-0">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            All bookings
          </CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        {sorted.length === 0 ? (
          <div className="p-6">
            <p className="text-sm text-slate-600 mt-1">No bookings yet.</p>
          </div>
        ) : (
          <ul className="max-h-[70vh] overflow-auto">
            {sorted.map((b) => {
              const selected = b.id === selectedId
              const nights = nightsBetween(b.checkIn, b.checkOut)

              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => selectBooking(b.id)}
                    className={[
                      'w-full text-left px-4 py-3 transition',
                      'hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300',
                      selected ? 'bg-slate-50' : 'bg-white'
                    ].join(' ')}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={[
                          'mt-1 h-10 w-1 rounded-full',
                          selected ? 'bg-slate-900' : 'bg-slate-200'
                        ].join(' ')}
                        aria-hidden
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium truncate">
                              {b.guestName}
                            </p>
                            <p className="text-sm text-slate-600 truncate">
                              {b.hotelName}
                            </p>
                          </div>

                          <Badge variant="secondary" className="shrink-0">
                            {b.roomType}
                          </Badge>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Badge variant="outline">
                            {formatRange(b.checkIn, b.checkOut)}
                          </Badge>
                          <Badge variant="outline">
                            {nights} night{nights === 1 ? '' : 's'}
                          </Badge>
                          <Badge variant="outline">
                            {b.guests} guest{b.guests === 1 ? '' : 's'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                  <Separator />
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
