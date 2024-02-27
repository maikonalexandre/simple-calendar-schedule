import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  format,
  getDay,
  startOfDay,
} from 'date-fns'

export function getWeek(start: Date, end: Date) {
  const daysInterval = eachDayOfInterval({
    start,
    end,
  })

  return daysInterval.map((day) => {
    return {
      day: format(day, 'dd'),
      dayOfTheWeek: getDayOfTheWeek(day),
    }
  })
}

function getDayOfTheWeek(data: Date) {
  const daysOfTheWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  return daysOfTheWeek[getDay(data)]
}

export function getAllHoursOfDayFormatted() {
  const date = new Date()
  const start = startOfDay(date)
  const end = endOfDay(date)

  const hoursArray = eachHourOfInterval({ start, end }, { step: 1 })

  const formattedHours = hoursArray.map((hour) => format(hour, 'HH:mm'))

  return formattedHours
}
