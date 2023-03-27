import React, { cloneElement } from 'react'

import ModalRenderer from './ModalRenderer'
import ModalOverlay from './ModalOverlay'
import type { ModalId } from './ModalRenderer'
import type { ModalOverlayProps } from './ModalOverlay'

export type WithModalConfigProps = {
  modalId: ModalId
  modalOverlayProps: Omit<ModalOverlayProps, 'onClose'>
}

const withModalConfig = ({
  modalId,
  modalOverlayProps,
}: WithModalConfigProps) => {
  const WrappedModalView = () => {
    const onClose = () => ModalRenderer.close(modalId)
    const modalWindow = cloneElement(
      modalOverlayProps.modalWindow as React.ReactElement,
      {
        onClose,
      }
    )
    modalOverlayProps = { ...modalOverlayProps, onClose, modalWindow }

    return <ModalOverlay {...(modalOverlayProps as ModalOverlayProps)} />
  }

  WrappedModalView.displayName = `${modalId}_withModalConfig`
  return WrappedModalView
}

export default withModalConfig
