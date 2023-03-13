import React, { useEffect, useRef, useState } from 'react'
import SlickSlider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { Settings } from 'react-slick'

import { Button } from '@ui'
import { Chevron } from '@icons'
import * as styles from './styles.module.css'
import type { DefaultProps } from '../types'

export type SliderProps = DefaultProps & Settings

const Slider: React.FC<SliderProps> = ({ children, ...props }) => {
  const ref = useRef<any>(null)
  const [buttons, setButtons] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    const { current } = ref

    const arrowProps = {
      className: 'bg-gradient rounded-full flex-center',
      ['aria-label']: 'Slider Arrow Button',
    }

    setButtons(
      <div className='absolute top-20 right-0'>
        <div className='flex justify-end gap-7 mb-10'>
          <Button {...arrowProps} onClick={() => current.slickPrev()}>
            <Chevron className='' />
          </Button>
          <Button {...arrowProps} onClick={() => current.slickNext()}>
            <Chevron className='rotate-180' />
          </Button>
        </div>
      </div>
    )
  }, [])

  return (
    <>
      {buttons}
      <SlickSlider
        ref={ref}
        className={styles.slider}
        slidesToScroll={1}
        slidesToShow={3}
        dots={false}
        arrows={false}
        responsive={[
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
        ]}
        {...props}
      >
        {children}
      </SlickSlider>
    </>
  )
}

export default Slider
