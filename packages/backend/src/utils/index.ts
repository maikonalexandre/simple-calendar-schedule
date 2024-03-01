import { format, fromUnixTime, eachDayOfInterval } from 'date-fns'

export function timestampToDate(timestamp: EpochTimeStamp) {
  return format(fromUnixTime(timestamp), 'yyyy-MM-dd HH:mm:ss')
}

export function getWeekInterval(start: Date, end: Date) {
  return eachDayOfInterval({
    start,
    end,
  })
}
