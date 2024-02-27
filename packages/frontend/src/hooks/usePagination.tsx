import { addDays, subDays } from 'date-fns'
import { createContext, ReactNode, useContext, useState } from 'react'

interface PaginationProps {
  startDate: Date
  endDate: Date
}

interface PaginationContextProps {
  page: {
    startDate: Date
    endDate: Date
  }

  prevPage: () => void
  nextPage: () => void
}

const PaginationContext = createContext({} as PaginationContextProps)

export const PaginationContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const currentDate = new Date()
  const defaultStartDate = subDays(currentDate, 2)
  const defaultEndDate = addDays(currentDate, 4)

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

  return (
    <PaginationContext.Provider value={{ page, nextPage, prevPage }}>
      {children}
    </PaginationContext.Provider>
  )
}

export const usePagination = () => {
  return useContext(PaginationContext)
}
