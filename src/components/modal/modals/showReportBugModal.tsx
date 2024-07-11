import React from 'react'

import ModalRenderer, { MODAL_IDS } from '../ModalRenderer'
import withModalConfig from '../withModalConfig'
import { FooterModalTemplate } from './templates'
import { Link } from '@ui'

export const showReportBugModal = () => {
  const id = MODAL_IDS.reportBug
  const component = withModalConfig({
    modalId: id,
    modalOverlayProps: {
      modalWindow: (
        <FooterModalTemplate
          title='Report a bug'
          text={
            <p>
              See our{' '}
              <Link
                external
                ghost
                text='Bug Bounty Program'
                to='https://aads.com/blog/bug-bounty-program/'
                className='clr-blue'
              />
            </p>
          }
          endpoint='/api/v1/bug_reports'
          submittedUIProps={{
            imgSrc: '/images/report-bug.svg',
            title: 'Your bug has been sent!',
            btnText: 'Report another bug',
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

export default showReportBugModal
