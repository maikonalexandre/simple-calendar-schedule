import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { Calendar, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useModal } from '@/hooks/useModal'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { Input } from '../ui/input'

const schema = z.object({
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

export type handleModalData = z.infer<typeof schema>

export function Modal({
  visible,
  data,
}: {
  visible: boolean
  data?: handleModalData
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleModalData>({
    resolver: zodResolver(schema),
    values: data,
  })

  const { closeModal } = useModal()

  function handleDelete() {}
  function onSubmit(data: handleModalData) {
    console.log(data)
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
          className="grid gap-4 py-4 text-zinc-50"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Descrição do evento</Label>
            <div className="col-span-3">
              <Input {...register('description')} />
              {errors.description && (
                <p className="text-xs text-red-500" role="alert">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 align-middle">
            <Label className="text-right">Hora de inicio</Label>
            <div className="col-span-3">
              <Input {...register('startHour')} />

              {errors.startHour && (
                <p className="text-xs text-red-500" role="alert">
                  {errors.startHour.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Hora de termino</Label>
            <div className="col-span-3">
              <Input {...register('endHour')} />
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
