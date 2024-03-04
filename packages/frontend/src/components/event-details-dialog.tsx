import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import { deleteUser } from '@/_api/remove-event'
import { updateEvent } from '@/_api/update-event'
import { queryClient } from '@/config/react-query'
import { usePagination } from '@/hooks/usePagination'
import { addMinutesAndHoursToDate } from '@/utils'

import { EventForm, EventFormData } from './event-form'
import { SimpleHeader } from './simple-header'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'
import { GradientBar } from './ui/gradientbar'

export interface Event {
  id: string
  name: string
  date: string
  startedAt: string
  finalizedAt: string
  userId: string
  description: string
}

interface onSubmitEventFormData extends EventFormData {
  id: string
}

export const EventDetailsDialog = ({ event }: { event: Event }) => {
  const { week } = usePagination()

  const { mutateAsync: updateEventMutation } = useMutation({
    mutationFn: updateEvent,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'listEvents',
          { endDate: week.endDate, startedDate: week.startDate },
        ],
      })
    },
  })

  const { mutateAsync: deleteEventMutation } = useMutation({
    mutationFn: deleteUser,
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
    id,
  }: onSubmitEventFormData) => {
    const [startedHours, startedMinutes] = startHour.split(':')
    const [endHours, endMinutes] = endHour.split(':')

    try {
      const response = await updateEventMutation({
        id,
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

      if (response.status === 200) {
        toast.success('Evento atualizado com sucesso!')
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return toast.error('O evento não foi encontrado!')
      }

      toast.error('Ouve um erro ao atualizar um evento!')
    }
  }

  const onDelete = async (id: string) => {
    try {
      const response = await deleteEventMutation({ id })

      if (response.status === 204) {
        toast.success('Evento excluído com sucesso!')
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return toast.error('O evento não foi encontrado!')
      }

      toast.error('Ouve um erro ao deletar um evento!')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => {}}
          className="flex w-full cursor-pointer overflow-ellipsis rounded bg-zinc-800 p-1 transition-all hover:bg-zinc-700"
        >
          <p className="truncate text-xs font-medium text-zinc-200">{`${format(event.startedAt, 'HH:mm')} - ${event.name}`}</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <SimpleHeader title="Detalhes do evento" />
        </DialogHeader>
        <EventForm
          formId={event.id}
          defaultValues={{
            name: event.name,
            date: new Date(event.date),
            description: event.description,
            endHour: format(event.finalizedAt, 'HH:mm'),
            startHour: format(event.startedAt, 'HH:mm'),
          }}
          onSubmit={async (data: EventFormData) =>
            onSubmit({
              id: event.id,
              name: data.name,
              date: data.date,
              description: data.description,
              endHour: data.endHour,
              startHour: data.startHour,
            })
          }
        />

        <div className="flex justify-end gap-4 py-4">
          <Button form={event.id} type="submit" className="justify-self-end">
            Confirmar
          </Button>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onDelete(event.id)
              }}
              className="flex"
              variant="destructive"
            >
              <Trash size={20} />
            </Button>
          </DialogClose>
        </div>
        <GradientBar />
      </DialogContent>
    </Dialog>
  )
}
