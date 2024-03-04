import { Calendar } from 'lucide-react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface FormContainerProps {
  children: ReactNode
  subtitle: string
  className?: string
}

export const FormContainer = ({
  children,
  subtitle,
  className,
}: FormContainerProps) => {
  return (
    <div
      className={twMerge(
        'w-96 space-y-6 rounded-md p-6 dark:bg-zinc-900',
        className,
      )}
    >
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
