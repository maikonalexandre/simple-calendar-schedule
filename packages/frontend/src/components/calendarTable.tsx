// import { getDate } from 'date-fns'

import { usePagination } from '@/hooks/usePagination'
import { getAllHoursOfDayFormatted, getWeek } from '@/utils/index'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function CalendarTable() {
  const { week } = usePagination()
  const month = getWeek(week.startDate, week.endDate)

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="flex items-center rounded border-none align-middle">
          <TableHead className="w-[64px]" />
          {month.map((e, i) => (
            <TableHead
              className="flex-grow border-none "
              key={`${e.dayOfTheWeek} + ${i}`}
            >
              <div>
                <span>{e.dayOfTheWeek}</span>
              </div>
              {
                // TODO: CORRIGIR BUG MENSAL
              }
              <div
                // data-today={Number(e.day) === getDate(new Date())}
                className="flex h-5 w-5 items-center  justify-center rounded-full data-[today=true]:bg-sky-700"
              >
                <span>{e.day}</span>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="h-full overflow-hidden">
        {getAllHoursOfDayFormatted().map((hour) => (
          <TableRow
            key={hour}
            className="flex items-center justify-items-center rounded border-none"
          >
            <TableHead className="h-full w-[64px] text-xs font-light">
              {hour}
            </TableHead>
            {Array.from({ length: 7 }).map((_, i) => (
              <TableCell
                key={i}
                className="hover:bg-accent h-full flex-grow rounded-md text-xs hover:bg-zinc-700"
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
