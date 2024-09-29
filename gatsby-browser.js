import React from 'react'
import { SearchProvider } from './src/context/SearchContext'
import '/src/styles/main.scss'

export const wrapRootElement = ({ element }) => (
  <SearchProvider>{element}</SearchProvider>
)
