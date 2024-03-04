import { zodResolver } from '@hookform/resolvers/zod'
import { isAfter } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { addMinutesAndHoursToDate } from '@/utils'

import { DatePicker } from './ui/date-picker'
import { Input } from './ui/input'
import { Label } from './ui/label'

const schema = z
  .object({
    date: z.date(),
    name: z
      .string()
      .min(5, { message: 'O nome do evento precisa ter pelo menos 5 letras' }),
    description: z
      .string({
        required_error: 'Voce precisa fornecer a descrição do evento',
      })
      .min(5, { message: 'A descrição precisa ter pelo menos 5 letras' })
      .max(150, { message: 'A descrição do evento esta muito grande' }),
    startHour: z.string(),
    endHour: z.string(),
  })
  .refine(
    ({ endHour, startHour, date }) => {
      // input type time data format 00:00
      const [startedHours, startedMinutes] = startHour.split(':')
      const [endHours, endMinutes] = endHour.split(':')

      const finalizedAt = addMinutesAndHoursToDate({
        date,
        hours: Number(endHours),
        minutes: Number(endMinutes),
      })
      const startedAt = addMinutesAndHoursToDate({
        date,
        hours: Number(startedHours),
        minutes: Number(startedMinutes),
      })

      return isAfter(finalizedAt, startedAt)
    },
    {
      message: 'Horário invalido',
      path: ['endHour'],
    },
  )

export type EventFormData = z.infer<typeof schema>

export function EventForm({
  formId,
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: EventFormData) => void
  defaultValues?: EventFormData
  formId: string
}) {
  const fieldState = useForm<EventFormData>({
    resolver: zodResolver(schema),
    values: defaultValues,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = fieldState

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-2 text-zinc-50"
    >
      <Label className="text-sm font-medium">Data do evento:</Label>
      <DatePicker fieldValues={fieldState} />

      <Label className="text-sm font-medium">Nome do evento</Label>
      <Input className=" dark:bg-zinc-800" {...register('name')} />
      {errors.name && (
        <p className="text-xs text-red-500" role="alert">
          {errors.name.message}
        </p>
      )}

      <Label className="text-sm font-medium">Descrição do evento:</Label>
      <Input className="dark:bg-zinc-800" {...register('description')} />
      {errors.description && (
        <p className="text-xs text-red-500" role="alert">
          {errors.description.message}
        </p>
      )}

      <div className="flex gap-10">
        <div>
          <Label className="text-sm font-medium">Hora de inicio:</Label>
          <Input
            type="time"
            className="w-32 dark:bg-zinc-800"
            {...register('startHour')}
          />

          {errors.startHour && (
            <p className="text-xs text-red-500" role="alert">
              {errors.startHour.message}
            </p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium">Hora de termino:</Label>
          <Input
            type="time"
            className="w-32 dark:bg-zinc-800"
            {...register('endHour')}
          />
          {errors.endHour && (
            <p className="text-xs text-red-500" role="alert">
              {errors.endHour.message}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
