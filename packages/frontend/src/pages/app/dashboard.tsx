import { ptBR } from 'date-fns/locale'

import { CalendarTable } from '@/components/calendarTable'
import { Pagination } from '@/components/pagination'
import { Calendar } from '@/components/ui/calendar'
import { usePagination } from '@/hooks/usePagination'

export function Dashboard() {
  const { goToSpecificWeek } = usePagination()

  return (
    <div className="flex gap-2 px-3">
      <div className="space-y-2">
        <Calendar
          onDayClick={(e) => goToSpecificWeek(e)}
          className="rounded dark:bg-zinc-900"
          locale={ptBR}
        />
      </div>

      <div className=" flex w-full flex-col gap-4 rounded p-4 dark:bg-zinc-900">
        <Pagination />
        <CalendarTable />
      </div>
    </div>
  )
}
