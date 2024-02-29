import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Controller, FieldValues } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DatePicker({ fieldValues }: { fieldValues: FieldValues }) {
  const { control, watch } = fieldValues
  const date = watch('date')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'text-med w-full justify-start bg-zinc-800 text-left font-normal',
            !date && 'text-zinc-50 dark:bg-zinc-800',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP', { locale: ptBR })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Controller
          name="date"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <Calendar
                locale={ptBR}
                mode="single"
                selected={value}
                onSelect={onChange}
                initialFocus
              />
            )
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
