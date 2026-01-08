'use client'

import * as React from 'react'
import { useBookingsStore } from '@/store/useBookingsStore'
import { formatDate, formatRange, nightsBetween } from '@/lib/date'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-2">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="col-span-2 text-sm">{value}</div>
    </div>
  )
}

export function BookingDetails() {
  const selectedId = useBookingsStore((s) => s.selectedBookingId)
  const booking = useBookingsStore(
    (s) => s.bookings.find((b) => b.id === selectedId) ?? null
  )
  const deleteBooking = useBookingsStore((s) => s.deleteBooking)
  const { toast } = useToast()
  const isEmpty = !booking

  function handleDelete() {
    if (!booking) return
    const guestName = booking.guestName
    const hotelName = booking.hotelName
    deleteBooking(booking.id)
    toast({
      variant: 'destructive',
      title: 'Booking deleted',
      description: `${guestName} at ${hotelName}`
    })
  }

  return (
    <Card
      className={
        isEmpty
          ? 'md:col-span-2 transition-opacity opacity-50'
          : 'md:col-span-2 transition-opacity'
      }
    >
      <CardHeader>
        <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Booking details
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        {!booking ? (
          <div className="min-h-64">
            <span className="sr-only">Select a booking to view details.</span>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold tracking-tight truncate">
                  {booking.guestName}
                </h2>
                <p className="text-sm text-slate-600 truncate">
                  {booking.hotelName}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge>{booking.roomType}</Badge>
                <Badge variant="secondary">
                  {nightsBetween(booking.checkIn, booking.checkOut)} nights
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <Row
                label="Date range"
                value={formatRange(booking.checkIn, booking.checkOut)}
              />
              <Row label="Check-in" value={formatDate(booking.checkIn)} />
              <Row label="Check-out" value={formatDate(booking.checkOut)} />
              <Row
                label="Guests"
                value={`${booking.guests} guest${
                  booking.guests === 1 ? '' : 's'
                }`}
              />
              <Row
                label="Created"
                value={new Intl.DateTimeFormat(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(new Date(booking.createdAt))}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-end">
        {!isEmpty ? (
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete this booking
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
