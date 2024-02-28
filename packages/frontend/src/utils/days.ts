import {
  addHours,
  eachDayOfInterval,
  eachHourOfInterval,
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
  const currentDate = new Date()
  const start = addHours(startOfDay(currentDate), 6)

  const end = addHours(startOfDay(currentDate), 22)

  const hoursInterval = eachHourOfInterval({
    start,
    end,
  })

  return hoursInterval.map((hour) => format(hour, 'HH:mm'))
}
