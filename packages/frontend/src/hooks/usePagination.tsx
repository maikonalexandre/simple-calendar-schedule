import { addDays, subDays } from 'date-fns'
import { createContext, ReactNode, useContext, useState } from 'react'

interface WeekProps {
  startDate: Date
  endDate: Date
}

interface PaginationContextProps {
  week: {
    startDate: Date
    endDate: Date
  }
  prevWeek: () => void
  nextWeek: () => void
  goToSpecificWeek: (date: Date) => void
}

const PaginationContext = createContext({} as PaginationContextProps)

const getSevenDaysInterval = (date: Date) => {
  // subtraímos 2 e adicionamos 4 para o dia em questão ficar na 3 posição ta tabela
  const startDate = subDays(date, 2)
  const endDate = addDays(date, 4)

  return { startDate, endDate }
}

export const PaginationContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const currentDate = new Date()
  const { endDate, startDate } = getSevenDaysInterval(currentDate)

  const [week, setWeek] = useState<WeekProps>({
    endDate,
    startDate,
  })

  const prevWeek = () => {
    setWeek((prev) => {
      return {
        startDate: subDays(prev.startDate, 7),
        endDate: subDays(prev.endDate, 7),
      }
    })
  }

  const nextWeek = () => {
    setWeek((prev) => {
      return {
        startDate: addDays(prev.startDate, 7),
        endDate: addDays(prev.endDate, 7),
      }
    })
  }

  const goToSpecificWeek = (date: Date) => {
    const { endDate, startDate } = getSevenDaysInterval(date)
    setWeek(() => {
      return {
        endDate,
        startDate,
      }
    })
  }

  return (
    <PaginationContext.Provider
      value={{ week, nextWeek, prevWeek, goToSpecificWeek }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePagination = () => {
  return useContext(PaginationContext)
}
