import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { usePagination } from '@/hooks/usePagination'

import { Button } from './ui/button'

export function Pagination() {
  const pagination = usePagination()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button
            onClick={pagination.prevPage}
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <div className="text-sm font-medium">
            {format(pagination.page.startDate, 'MMM dd')} -{' '}
            {format(pagination.page.endDate, 'dd MMM')} ,{' '}
            {format(pagination.page.startDate, 'yyyy')}
          </div>
          <Button
            onClick={pagination.nextPage}
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
