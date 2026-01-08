import { create } from 'zustand'
import type { Booking, NewBooking } from '@/types/booking'

type State = {
  bookings: Booking[]
  selectedBookingId: string | null
}

type Actions = {
  addBooking: (data: NewBooking) => void
  deleteBooking: (id: string) => void
  selectBooking: (id: string) => void
}

export const useBookingsStore = create<State & Actions>((set) => ({
  bookings: [],
  selectedBookingId: null,

  addBooking: (data) =>
    set((state) => {
      const booking: Booking = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: Date.now()
      }
      return {
        bookings: [...state.bookings, booking],
        selectedBookingId: booking.id
      }
    }),

  deleteBooking: (id) =>
    set((state) => {
      const bookings = state.bookings.filter((b) => b.id !== id)
      const selectedBookingId =
        state.selectedBookingId === id ? bookings[0]?.id ?? null : state.selectedBookingId
      return { bookings, selectedBookingId }
    }),

  selectBooking: (id) => set({ selectedBookingId: id })
}))
