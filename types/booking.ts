export type Booking = {
  id: string
  guestName: string
  hotelName: string
  roomType: 'Standard' | 'Deluxe' | 'Suite'
  checkIn: string // yyyy-mm-dd
  checkOut: string // yyyy-mm-dd
  guests: number
  createdAt: number
}

export type NewBooking = Omit<Booking, 'id' | 'createdAt'>
