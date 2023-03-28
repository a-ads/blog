import React, { useEffect, useRef, useState, lazy } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { Settings } from 'react-slick'

import { Button } from '@ui'
import { Chevron } from '@icons'
import type { DefaultProps } from '../types'

const LazySlickSlider = lazy(() => import('react-slick'))

export type SliderProps = DefaultProps & Settings

const Slider: React.FC<SliderProps> = ({ children, className, ...props }) => {
  const ref = useRef<any>(null)
  const [buttons, setButtons] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    const { current } = ref

    const arrowProps = {
      className: 'bg-gradient rounded-full flex-center',
      ['aria-label']: 'Slider Arrow Button',
    }

    setButtons(
      <div className='absolute top-20 right-[1rem]'>
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
      <LazySlickSlider
        ref={ref}
        className={className}
        slidesToScroll={1}
        slidesToShow={3}
        dots={false}
        arrows={false}
        responsive={[
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
        ]}
        {...props}
      >
        {children}
      </LazySlickSlider>
    </>
  )
}

export default Slider
