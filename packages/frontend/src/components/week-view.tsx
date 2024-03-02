import { useQuery } from '@tanstack/react-query'
import { format, getHours, isToday } from 'date-fns'

import { listEvents } from '@/_api/list-events'
import { useModal } from '@/hooks/useModal'
import { usePagination } from '@/hooks/usePagination'
import { formatDayShortVersion, getWeekInterval } from '@/utils'

export interface Evento {
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
  eventos: Evento[]
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

  const { openModal } = useModal()

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
          listEventsData.map((e) => (
            <div className="col-span-1 flex flex-col gap-1" key={e.day}>
              {e.eventos.map((e) => (
                <div className="col-span-1" key={e.id}>
                  <button
                    onClick={() => {
                      openModal({
                        description: e.description,
                        endHour: getHours(e.finalizedAt),
                        startHour: getHours(e.startedAt),
                        date: new Date(e.date),
                      })
                    }}
                    className="flex w-full cursor-pointer overflow-ellipsis rounded bg-zinc-800 p-1 transition-all hover:bg-zinc-700"
                  >
                    <p className="truncate text-xs font-medium text-zinc-200">{`${format(e.startedAt, 'HH:mm')} - ${e.description}`}</p>
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
