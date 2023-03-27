import React from 'react'

import ModalRenderer, { MODAL_IDS } from '../ModalRenderer'
import withModalConfig from '../withModalConfig'
import { FooterModalTemplate } from './templates'

export const showSuggestIdeaModal = () => {
  const id = MODAL_IDS.suggestIdea
  const component = withModalConfig({
    modalId: id,
    modalOverlayProps: {
      modalWindow: (
        <FooterModalTemplate
          title='Suggest your idea!'
          endpoint='/api/v1/idea_suggestions'
          submittedUIProps={{
            imgSrc: '/images/idea-icon.svg',
            title: 'Your idea has been sent!',
            btnText: 'Suggest another idea',
          }}
        />
      ),
    },
  })

  ModalRenderer.open({
    modalId: id,
    component,
  })
}

export default showSuggestIdeaModal
