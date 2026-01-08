export function formatDate(iso: string) {
  // iso: yyyy-mm-dd
  if (!iso) return '—'
  const d = new Date(iso)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(d)
}

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0
  const a = new Date(checkIn).getTime()
  const b = new Date(checkOut).getTime()
  const diff = Math.max(0, b - a)
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

export function formatRange(checkIn: string, checkOut: string) {
  return `${formatDate(checkIn)} → ${formatDate(checkOut)}`
}
