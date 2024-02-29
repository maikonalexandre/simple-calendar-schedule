import { eachDayOfInterval, format } from 'date-fns'
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

// export function getAllHoursOfDayFormatted() {
//   const currentDate = new Date()
//   const start = addHours(startOfDay(currentDate), 6)

//   const end = addHours(startOfDay(currentDate), 18)

//   const hoursInterval = eachHourOfInterval({
//     start,
//     end,
//   })

//   return hoursInterval.map((hour) => format(hour, 'HH:mm'))
// }
