import { createContext, ReactNode, useContext, useState } from 'react'

import { EventFormData } from '@/components/event-form'
import { Modal } from '@/components/modal'

interface ProviderProps {
  children: ReactNode
}

type ModalProps = {
  visible: boolean
  data: EventFormData | undefined
}
interface ConfirmationProps {
  openModal: (data?: EventFormData) => void
  closeModal: () => void
}

export const ModalContext = createContext({} as ConfirmationProps)

export const ModalProvider = ({ children }: ProviderProps) => {
  const [modalConfig, setModalConfig] = useState<ModalProps>({
    visible: false,
    data: undefined,
  })

  const openModal = (data?: EventFormData) => {
    setModalConfig(() => {
      return { visible: true, data }
    })
  }

  const closeModal = () => {
    setModalConfig(() => {
      return {
        data: undefined,
        visible: false,
      }
    })
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Modal {...modalConfig} />
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}
