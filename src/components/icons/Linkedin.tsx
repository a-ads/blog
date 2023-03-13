import * as React from 'react'
import { SVGProps } from 'react'
const SvgLinkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <circle cx={18} cy={18} r={18} fill='none' />
    <g clipPath='url(#linkedin_svg__a)'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.664 15.161h3.374v1.68c.486-.966 1.733-1.834 3.605-1.834 3.59 0 4.442 1.924 4.442 5.454V27h-3.634v-5.735c0-2.01-.486-3.144-1.723-3.144-1.716 0-2.43 1.222-2.43 3.144V27h-3.634V15.161ZM9.433 26.846h3.634v-11.84H9.433v11.84Zm4.154-15.7a2.297 2.297 0 0 1-.684 1.637 2.354 2.354 0 0 1-3.305 0 2.315 2.315 0 0 1-.683-1.637c0-.615.245-1.203.684-1.638a2.347 2.347 0 0 1 3.304 0c.438.435.684 1.023.684 1.638Z'
        fill='#fff'
      />
    </g>
    <defs>
      <clipPath id='linkedin_svg__a'>
        <path fill='#fff' transform='translate(9 9)' d='M0 0h18v18H0z' />
      </clipPath>
    </defs>
  </svg>
)
export default SvgLinkedin
