import { ptBR } from 'date-fns/locale'

import { EventsTable } from '@/components/events-table'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
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
        <EventsTable />
      </div>
    </div>
  )
}
