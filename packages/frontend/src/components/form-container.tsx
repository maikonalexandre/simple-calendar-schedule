import { Calendar } from 'lucide-react'
import { ReactNode } from 'react'

interface FormContainerProps {
  children: ReactNode
  subtitle: string
}

export const FormContainer = ({ children, subtitle }: FormContainerProps) => {
  return (
    <div className="w-96 space-y-6 rounded-md p-6 dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <Calendar />
        <h1>Calendar Schedule</h1>
      </div>
      <span className="inline-block">{subtitle}</span>

      {children}

      <div className="h-1 w-full rounded bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
    </div>
  )
}
