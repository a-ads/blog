import { useMediaQuery } from 'react-responsive'

export const useDesktopMediaQuery = function () {
  return useMediaQuery({
    query: `(min-width: 1200px)`,
  })
}

export const useTabletMediaQuery = function () {
  return useMediaQuery({
    query: `
      (max-width: 1200px) and
      (min-width: 769px)
    `,
  })
}

export const usePhoneMediaQuery = function () {
  return useMediaQuery({
    query: `(max-width: 768px)`,
  })
}
