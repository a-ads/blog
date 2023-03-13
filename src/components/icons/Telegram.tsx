import * as React from 'react'
import { SVGProps } from 'react'
const SvgTelegram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <circle cx={18} cy={18} r={18} fill='none' />
    <path
      d='M25.21 9.405s1.942-.758 1.78 1.082c-.053.757-.54 3.408-.917 6.276l-1.295 8.495s-.108 1.244-1.08 1.46c-.97.217-2.428-.757-2.697-.973-.216-.162-4.048-2.597-5.397-3.788-.377-.324-.81-.974.054-1.731l5.666-5.41c.648-.65 1.295-2.165-1.403-.325l-7.554 5.14s-.864.54-2.483.054l-3.507-1.082s-1.295-.812.917-1.623c5.396-2.543 12.034-5.14 17.916-7.575Z'
      fill='#fff'
    />
  </svg>
)
export default SvgTelegram
