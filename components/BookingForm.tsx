'use client'

import * as React from 'react'
import type { NewBooking } from '@/types/booking'
import { useBookingsStore } from '@/store/useBookingsStore'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/hooks/use-toast'

type Errors = Partial<Record<keyof NewBooking, string>>

const ROOM_TYPES: NewBooking['roomType'][] = ['Standard', 'Deluxe', 'Suite']

function isAfter(a: string, b: string) {
  return new Date(a).getTime() > new Date(b).getTime()
}

function validate(v: NewBooking): Errors {
  const e: Errors = {}

  if (!v.guestName.trim()) e.guestName = 'Guest name is required.'
  if (!v.hotelName.trim()) e.hotelName = 'Hotel name is required.'
  if (!v.checkIn) e.checkIn = 'Check-in date is required.'
  if (!v.checkOut) e.checkOut = 'Check-out date is required.'

  if (v.checkIn && v.checkOut && !isAfter(v.checkOut, v.checkIn)) {
    e.checkOut = 'Check-out must be after check-in.'
  }

  if (!Number.isFinite(v.guests) || v.guests < 1) {
    e.guests = 'Guests must be at least 1.'
  }

  return e
}

export function BookingForm() {
  const addBooking = useBookingsStore((s) => s.addBooking)
  const { toast } = useToast()

  const [value, setValue] = React.useState<NewBooking>({
    guestName: '',
    hotelName: '',
    roomType: 'Standard',
    checkIn: '',
    checkOut: '',
    guests: 2
  })

  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const errors = React.useMemo(() => validate(value), [value])
  const isValid = React.useMemo(
    () => Object.keys(errors).length === 0,
    [errors]
  )

  function resetForm() {
    setTouched({})
    setIsSubmitting(false)
    setValue({
      guestName: '',
      hotelName: '',
      roomType: 'Standard',
      checkIn: '',
      checkOut: '',
      guests: 2
    })
  }

  function markTouched<K extends keyof NewBooking>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }))
  }

  function onChange<K extends keyof NewBooking>(key: K, next: NewBooking[K]) {
    setValue((v) => ({ ...v, [key]: next }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({
      guestName: true,
      hotelName: true,
      roomType: true,
      checkIn: true,
      checkOut: true,
      guests: true
    })

    if (!isValid) return

    setIsSubmitting(true)

    // Tiny “real app” feel :)
    await new Promise((r) => setTimeout(r, 1300))

    const guestName = value.guestName.trim()
    const hotelName = value.hotelName.trim()

    addBooking({
      ...value,
      guestName,
      hotelName
    })

    toast({
      variant: 'success',
      title: 'Booking created',
      description: `${guestName} at ${hotelName}`
    })

    setIsSubmitting(false)
    resetForm()
  }

  const showError = <K extends keyof NewBooking>(key: K) =>
    touched[key] && errors[key]

  return (
    <Card id="booking-form">
      <CardHeader>
        <CardTitle className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          New booking
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Guest name */}
            <div className="space-y-2">
              <Label htmlFor="guestName">Guest name</Label>
              <Input
                id="guestName"
                value={value.guestName}
                onChange={(e) => onChange('guestName', e.target.value)}
                onBlur={() => markTouched('guestName')}
                placeholder="e.g. John Doe"
                aria-invalid={!!showError('guestName')}
              />
              {showError('guestName') ? (
                <p className="text-sm text-red-600">{errors.guestName}</p>
              ) : null}
            </div>

            {/* Hotel name */}
            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel</Label>
              <Input
                id="hotelName"
                value={value.hotelName}
                onChange={(e) => onChange('hotelName', e.target.value)}
                onBlur={() => markTouched('hotelName')}
                placeholder="e.g. Harbour Grand"
                aria-invalid={!!showError('hotelName')}
              />
              {showError('hotelName') ? (
                <p className="text-sm text-red-600">{errors.hotelName}</p>
              ) : null}
            </div>

            {/* Room type */}
            <div className="space-y-2">
              <Label>Room type</Label>
              <Select
                value={value.roomType}
                onValueChange={(v) =>
                  onChange('roomType', v as NewBooking['roomType'])
                }
              >
                <SelectTrigger
                  onBlur={() => markTouched('roomType')}
                  className="w-full"
                >
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_TYPES.map((rt) => (
                    <SelectItem key={rt} value={rt}>
                      {rt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Input
                id="guests"
                type="number"
                min={1}
                value={value.guests}
                onChange={(e) => onChange('guests', Number(e.target.value))}
                onBlur={() => markTouched('guests')}
                aria-invalid={!!showError('guests')}
              />
              {showError('guests') ? (
                <p className="text-sm text-red-600">{errors.guests}</p>
              ) : null}
            </div>

            {/* Check-in */}
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in</Label>
              <Input
                id="checkIn"
                type="date"
                value={value.checkIn}
                onChange={(e) => onChange('checkIn', e.target.value)}
                onBlur={() => markTouched('checkIn')}
                aria-invalid={!!showError('checkIn')}
              />
              {showError('checkIn') ? (
                <p className="text-sm text-red-600">{errors.checkIn}</p>
              ) : null}
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out</Label>
              <Input
                id="checkOut"
                type="date"
                value={value.checkOut}
                onChange={(e) => onChange('checkOut', e.target.value)}
                onBlur={() => markTouched('checkOut')}
                aria-invalid={!!showError('checkOut')}
              />
              {showError('checkOut') ? (
                <p className="text-sm text-red-600">{errors.checkOut}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Clear
            </Button>

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Creating...
                </span>
              ) : (
                'Create booking'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
