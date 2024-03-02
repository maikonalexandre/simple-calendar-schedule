import { ptBR } from 'date-fns/locale'

import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { WeekView } from '@/components/week-view'
import { usePagination } from '@/hooks/usePagination'

export function Dashboard() {
  const { goToSpecificWeek } = usePagination()

  return (
    <div className="flex flex-col gap-2 px-3 sm:flex-row">
      <div className="flex flex-col items-center space-y-2 sm:flex">
        <div className="flex w-full items-center justify-center rounded bg-zinc-900">
          <Calendar
            onDayClick={(e) => goToSpecificWeek(e)}
            className="rounded dark:bg-zinc-900"
            locale={ptBR}
          />
        </div>
        <Button
          onClick={() => {}}
          className="flex w-full bg-zinc-900"
          variant="ghost"
        >
          Criar novo evento
        </Button>
      </div>

      <div className="flex w-full flex-col gap-4 rounded p-4 dark:bg-zinc-900">
        <Pagination />
        {/* <EventsTable /> */}
        <WeekView />
      </div>
    </div>
  )
}
