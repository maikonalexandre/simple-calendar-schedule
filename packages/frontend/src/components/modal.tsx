import { useModal } from '@/hooks/useModal'

import { EventForm, EventFormData } from './event-form'
import { SimpleHeader } from './simple-header'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'

export function Modal({
  visible,
  data,
}: {
  visible: boolean
  data?: EventFormData
}) {
  const { closeModal } = useModal()

  function onSubmit(handleData: EventFormData) {
    console.log('[DATA]', handleData, data)
    closeModal()
  }

  return (
    <Dialog open={visible}>
      <DialogContent>
        <DialogHeader>
          <SimpleHeader title="Detalhes do evento" />
        </DialogHeader>

        <EventForm
          formId="teste-hook-modal"
          onSubmit={onSubmit}
          defaultValues={data}
        />
      </DialogContent>
    </Dialog>
  )
}
