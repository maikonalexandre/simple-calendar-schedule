import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { Calendar, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useModal } from '@/hooks/useModal'

import { DatePickerDemo } from './date-picker'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Input } from './ui/input'

const schema = z
  .object({
    date: z.date(),
    description: z
      .string({
        required_error: 'Voce precisa fornecer a descrição do evento',
      })
      .min(5, { message: 'A descrição precisa ter pelo menos 5 letras' })
      .max(150, { message: 'A descrição do evento esta muito grande' }),
    startHour: z.coerce
      .number({
        invalid_type_error: 'Precisa ser um numero',
        required_error: 'Voce precisa fornecer uma hora',
      })
      .min(1, { message: 'Voce precisa fornecer uma horário válido' })
      .max(24, { message: 'Voce precisa fornecer uma horário válido' }),
    endHour: z.coerce
      .number({
        invalid_type_error: 'Precisa ser um numero',
      })
      .min(1, { message: 'Voce precisa fornecer uma horário válido' })
      .max(24, { message: 'Voce precisa fornecer uma horário válido' }),
  })
  .refine((data) => !(data.endHour < data.startHour), {
    message: 'Voce precisa fornecer uma horário válido',
    path: ['endHour'],
  })

export type handleModalData = z.infer<typeof schema>

export function Modal({
  visible,
  data,
}: {
  visible: boolean
  data?: handleModalData
}) {
  const fieldState = useForm<handleModalData>({
    resolver: zodResolver(schema),
    values: data,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = fieldState

  const { closeModal } = useModal()

  function handleDelete() {}
  function onSubmit(handleData: handleModalData) {
    console.log('[DATA]', data, 'HALDEDATA', handleData)
    closeModal()
  }

  return (
    <Dialog open={visible}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4 align-middle text-zinc-200">
            <Calendar />
            <span className="unde font-semibold">Detalhes do evento</span>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-2 text-zinc-50"
        >
          <Label className="text-sm font-medium">Data do evento:</Label>
          <DatePickerDemo fieldValues={fieldState} />

          <Label className="text-sm font-medium">Descrição do evento:</Label>
          <Input className="dark:bg-zinc-800" {...register('description')} />
          {errors.description && (
            <p className="text-xs text-red-500" role="alert">
              {errors.description.message}
            </p>
          )}

          <div className="flex justify-between">
            <div>
              <Label className="text-sm font-medium">Hora de inicio:</Label>
              <Input className="dark:bg-zinc-800" {...register('startHour')} />

              {errors.startHour && (
                <p className="text-xs text-red-500" role="alert">
                  {errors.startHour.message}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium">Hora de termino:</Label>
              <Input className="dark:bg-zinc-800" {...register('endHour')} />
              {errors.endHour && (
                <p className="text-xs text-red-500" role="alert">
                  {errors.endHour.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 py-4">
            <Button type="submit" className="justify-self-end">
              Confirmar
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              className="flex"
              variant="destructive"
            >
              <Trash size={20} />
            </Button>
          </div>
          <div className="h-1 w-full rounded bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
        </form>
      </DialogContent>
    </Dialog>
  )
}
