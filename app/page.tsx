'use client'

import { BookingList } from '@/components/BookingList'
import { BookingDetails } from '@/components/BookingDetails'
import { BookingForm } from '@/components/BookingForm'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 pb-12 pt-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl  font-extrabold tracking-tight uppercase text-primary">
            Hotel Bookings
          </h1>
          <p className="text-xs font-semibold tracking-[0.38em] text-slate-500 uppercase">
            Create. Review. Book.
          </p>
        </div>
      </header>

      <div className="mb-6">
        <BookingForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BookingList />
        <BookingDetails />
      </div>
    </main>
  )
}
