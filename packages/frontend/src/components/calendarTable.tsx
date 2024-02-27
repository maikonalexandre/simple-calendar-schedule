import { usePagination } from '@/hooks/usePagination'
import { getWeek } from '@/utils/days'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function CalendarTable() {
  const { page } = usePagination()

  const month = getWeek(page.startDate, page.endDate)

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="flex items-center align-middle">
          <TableHead className="w-8" />
          {month.map((e, i) => (
            <TableHead className="flex-grow" key={`${e.dayOfTheWeek} + ${i}`}>
              <div>
                <span>{e.dayOfTheWeek}</span>
              </div>
              <div>
                <span>{e.day}</span>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((invoice) => (
          <TableRow
            key={invoice}
            className="flex items-center justify-items-center p-0"
          >
            <TableCell className="h-full w-8 p-0 text-xs">{invoice}</TableCell>
            <TableCell className="h-full flex-grow text-xs hover:bg-accent"></TableCell>
            <TableCell className="h-full flex-grow text-xs hover:bg-accent"></TableCell>
            <TableCell className="h-full flex-grow text-xs hover:bg-accent"></TableCell>
            <TableCell className="h-full flex-grow text-xs hover:bg-accent"></TableCell>
            <TableCell className="h-full flex-grow text-xs hover:bg-accent"></TableCell>
            <TableCell className="h-full flex-grow text-xs hover:bg-accent"></TableCell>
            <TableCell className="h-full flex-grow text-xs hover:bg-accent"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
