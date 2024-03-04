import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

import { createEvent } from '@/_api/create-event'
import { EventForm, EventFormData } from '@/components/event-form'
import { Pagination } from '@/components/pagination'
import { SimpleHeader } from '@/components/simple-header'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { GradientBar } from '@/components/ui/gradientbar'
import { WeekView } from '@/components/week-view'
import { queryClient } from '@/config/react-query'
import { usePagination } from '@/hooks/usePagination'
import { addMinutesAndHoursToDate } from '@/utils'

export function Dashboard() {
  const { goToSpecificWeek, week } = usePagination()

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
    <div className="flex flex-col gap-2 px-3 sm:flex-row">
      <div className="flex flex-col items-center space-y-2 sm:flex">
        <div className="flex w-full items-center justify-center rounded bg-zinc-900">
          <Calendar
            onDayClick={(e) => goToSpecificWeek(e)}
            className="rounded dark:bg-zinc-900"
            locale={ptBR}
          />
        </div>

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

        <Button
          onClick={() => goToSpecificWeek(new Date())}
          className="flex w-full bg-zinc-900"
          variant="ghost"
        >
          Voltar para semana atual
        </Button>
      </div>

      <div className="flex w-full flex-col gap-4 rounded p-4 dark:bg-zinc-900">
        <Pagination />

        <WeekView />
      </div>
    </div>
  )
}
