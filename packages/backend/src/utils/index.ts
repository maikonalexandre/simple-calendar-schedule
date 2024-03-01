import { format, fromUnixTime } from 'date-fns'

export function timestampToDate(timestamp: EpochTimeStamp) {
  return format(fromUnixTime(timestamp), 'yyyy-MM-dd HH:mm:ss')
}
