import type { CvEvent } from '~/types/cvfy'

export function orderEvents(arr: CvEvent[]): CvEvent[] {
  return [...arr].sort(
    (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime(),
  )
}
