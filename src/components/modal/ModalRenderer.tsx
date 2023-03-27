import React from 'react'

// If you want to create a modal, you need to add its id here
export enum MODAL_IDS {
  reportBug = 'reportBug',
  suggestIdea = 'suggestIdea',
}
export type ModalId = keyof typeof MODAL_IDS

export type ModalItemState = {
  id: ModalId
  component: React.ComponentClass<any> | React.FC<any>
  isVisible: boolean
}
type State = Readonly<Record<ModalId, ModalItemState>>

interface IModalRenderer {
  open: (args: {
    component: ModalItemState['component']
    modalId: ModalId
  }) => void
  close: (id: ModalId) => void
}

export default class ModalRenderer extends React.Component<
  UnknownObject,
  State
> {
  static ref? = null as ModalRenderer | null
  readonly state = {} as State

  componentDidMount() {
    ModalRenderer.ref = this
  }

  componentWillUnmount() {
    delete ModalRenderer.ref
  }

  static open: IModalRenderer['open'] = ({ modalId, component }) => {
    const reference = ModalRenderer.ref
    const id = modalId

    if (reference) {
      reference.setState((prevState) => ({
        ...prevState,
        [id]: { component, id, isVisible: true },
      }))
    }
  }

  static close: IModalRenderer['close'] = (id) => {
    const reference = ModalRenderer.ref
    if (reference && id) {
      reference.setState((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], isVisible: false },
      }))
    }
  }

  render() {
    const state = ModalRenderer.ref?.state
    const modalIds = state && (Object.keys(state) as ModalId[])

    return (
      <>
        {state && modalIds?.length
          ? modalIds.map((modalId) => {
              const { component: Modal, isVisible, id } = state[modalId]
              return isVisible && <Modal key={id} />
            })
          : null}
      </>
    )
  }
}
