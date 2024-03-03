import { addHours, addMinutes, eachDayOfInterval, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getWeekInterval(start: Date, end: Date) {
  return eachDayOfInterval({
    start,
    end,
  })
}

export function formatDayShortVersion(date: Date) {
  return format(date, 'EEE', { locale: ptBR }).slice(0, 3)
}

export function addMinutesAndHoursToDate({
  date,
  hours,
  minutes,
}: {
  date: Date
  hours: number
  minutes: number
}) {
  return addMinutes(addHours(date, hours), minutes)
}
