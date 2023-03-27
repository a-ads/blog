import React from 'react'

export type ModalOverlayProps = {
  modalWindow: React.ReactElement
  onClose: () => void
  isStatic?: boolean
} & UnknownObject

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  modalWindow,
  onClose,
  isStatic,
  ...props
}) => (
  <div
    className='fixed top-0 left-0 flex-center h-screen w-screen transition-all z-modal'
    {...props}
  >
    <div
      className='absolute top-0 left-0 size-full z-modal bg-[#00000099]'
      onClick={isStatic ? () => null : onClose}
    />
    <div className='flex flex-col w-[31.25rem] z-modal'>{modalWindow}</div>
  </div>
)

export default ModalOverlay
