import { format, isToday } from 'date-fns'

import { weekends } from '@/_types'
import { useModal } from '@/hooks/useModal'
import { usePagination } from '@/hooks/usePagination'
import { formatDayShortVersion, getWeekInterval } from '@/utils/index'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function EventsTable() {
  const { week } = usePagination()
  const weekInterval = getWeekInterval(week.startDate, week.endDate)

  const { openModal } = useModal()

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="pointer-events-none grid grid-cols-7 border-none">
          {weekInterval.map((e, i) => (
            <TableHead className="border-none" key={`${e} + ${i}`}>
              <div className="flex flex-col">
                <span>{formatDayShortVersion(e)}</span>
                <span
                  data-today={isToday(e)}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-sm data-[today=true]:bg-sky-900"
                >
                  {format(e, 'dd')}
                </span>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="grid h-full grid-cols-7 gap-2">
        {weekends.map((row, i) => {
          return (
            <TableRow
              key={`${row}-${i}`}
              className="flex flex-col items-center justify-items-center border-none dark:hover:bg-zinc-900"
            >
              {weekends[i]?.eventos?.map((e, i) => {
                return (
                  <TableCell
                    title="Ver detalhes"
                    onClick={() => {
                      openModal({
                        description: e.description,
                        endHour: 10,
                        startHour: 9,
                      })
                    }}
                    className="m-1 h-7 w-full cursor-pointer items-center justify-center overflow-hidden overflow-ellipsis rounded-lg bg-zinc-800 py-2 text-xs font-medium"
                    key={`-${i}-${e.id}`}
                  >
                    <p className="truncate text-xs font-medium text-zinc-200">{`${format(e.start, 'HH:mm')} - ${e.description}`}</p>
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
