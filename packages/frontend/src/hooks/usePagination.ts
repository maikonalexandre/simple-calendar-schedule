import { addDays, subDays } from 'date-fns'
import { useState } from 'react'

interface PaginationProps {
  startDate: Date
  endDate: Date
}

export const usePagination = () => {
  const currentDate = new Date()
  const defaultStartDate = subDays(currentDate, 3)
  const defaultEndDate = addDays(currentDate, 3)

  const [page, setPage] = useState<PaginationProps>({
    endDate: defaultEndDate,
    startDate: defaultStartDate,
  })

  function prevPage() {
    setPage((prev) => {
      return {
        startDate: subDays(prev.startDate, 7),
        endDate: subDays(prev.endDate, 7),
      }
    })
  }

  function nextPage() {
    setPage((prev) => {
      return {
        startDate: addDays(prev.startDate, 7),
        endDate: addDays(prev.endDate, 7),
      }
    })
  }

  return {
    page,
    prevPage,
    nextPage,
  }
}
