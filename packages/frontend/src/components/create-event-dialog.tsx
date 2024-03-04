import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { createEvent } from '@/_api/create-event'
import { queryClient } from '@/config/react-query'
import { usePagination } from '@/hooks/usePagination'
import { addMinutesAndHoursToDate } from '@/utils'

import { EventForm, EventFormData } from './event-form'
import { SimpleHeader } from './simple-header'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { GradientBar } from './ui/gradientbar'

export const CreateEventDialog = () => {
  const { week } = usePagination()
  const { mutateAsync: createEventMutation } = useMutation({
    mutationFn: createEvent,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'listEvents',
          { endDate: week.endDate, startedDate: week.startDate },
        ],
      })
    },
  })

  const onSubmit = async ({
    date,
    description,
    endHour,
    name,
    startHour,
  }: EventFormData) => {
    const [startedHours, startedMinutes] = startHour.split(':')
    const [endHours, endMinutes] = endHour.split(':')

    try {
      const response = await createEventMutation({
        date,
        name,
        description,
        finalizedAt: addMinutesAndHoursToDate({
          date,
          hours: Number(endHours),
          minutes: Number(endMinutes),
        }),
        startedAt: addMinutesAndHoursToDate({
          date,
          hours: Number(startedHours),
          minutes: Number(startedMinutes),
        }),
      })

      if (response.status === 201) {
        toast.success('Evento criado com sucesso!')
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return toast.error('Um evento não pode ser sobrescrito!')
      }

      toast.error('Ouve um erro ao criar um evento!')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex w-full bg-zinc-900" variant="ghost">
          Criar novo evento
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <SimpleHeader title="Criar um evento" />
        </DialogHeader>
        <EventForm formId="create-event" onSubmit={onSubmit} />

        <div className="flex justify-end gap-4 py-4">
          <Button
            form="create-event"
            type="submit"
            className="justify-self-end"
          >
            Confirmar
          </Button>
        </div>
        <GradientBar />
      </DialogContent>
    </Dialog>
  )
}
