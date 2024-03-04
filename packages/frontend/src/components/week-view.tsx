import { useQuery } from '@tanstack/react-query'
import { format, isToday } from 'date-fns'

import { listEvents } from '@/_api/list-events'
import { usePagination } from '@/hooks/usePagination'
import { formatDayShortVersion, getWeekInterval } from '@/utils'

import { EventDetailsDialog } from './event-details-dialog'

export interface Event {
  id: string
  name: string
  date: string
  startedAt: string
  finalizedAt: string
  userId: string
  description: string
}

export interface Root {
  day: string
  events: Event[]
}

export function WeekView() {
  const { week } = usePagination()
  const weekInterval = getWeekInterval(week.startDate, week.endDate)

  const { data: listEventsData, isFetching } = useQuery<Root[]>({
    queryKey: [
      'listEvents',
      { endDate: week.endDate, startedDate: week.startDate },
    ],
    queryFn: () =>
      listEvents({ endDate: week.endDate, startedDate: week.startDate }),
  })

  return (
    <div
      data-isfetching={isFetching}
      className="flex transition-all data-[isfetching=true]:animate-pulse"
    >
      <div className="grid w-full grid-cols-7 gap-1 text-sm font-medium">
        {weekInterval.map((e, i) => (
          <div className="col-span-1 m-1 p-1 text-zinc-200" key={`${e} + ${i}`}>
            <span>{formatDayShortVersion(e)}</span>
            <span
              data-today={isToday(e)}
              className="flex h-5 w-5 items-center justify-center rounded-full text-sm data-[today=true]:bg-sky-700"
            >
              {format(e, 'dd')}
            </span>
          </div>
        ))}

        {listEventsData &&
          listEventsData.map((e) => {
            return (
              <div className="col-span-1 flex flex-col gap-1" key={e.day}>
                {e.events.map((event) => (
                  <div className="col-span-1" key={event.id}>
                    <EventDetailsDialog event={event} />
                  </div>
                ))}
              </div>
            )
          })}
      </div>
    </div>
  )
}
