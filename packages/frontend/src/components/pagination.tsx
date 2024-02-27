import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  currentDate: Date
}

export function Pagination({ currentDate }: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <div className="text-sm font-medium">
            {currentDate.toDateString()}
          </div>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
