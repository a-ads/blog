import React, { createContext, useState, useContext } from 'react'
import { navigate } from 'gatsby'
import { debounce } from 'lodash-es'

import { Input } from '@ui'
import { SearchIcon } from '@icons'

interface ISearchCtx {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchQueryContext = createContext<ISearchCtx>({
  searchQuery: '',
  setSearchQuery: () => {},
})

const SearchQueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  )
}

const useSearchQuery = () => useContext(SearchQueryContext)

const SearchBar = ({ className }: { className?: string }) => {
  const { searchQuery, setSearchQuery } = useSearchQuery()

  const debounceSearch = debounce((query) => {
    setSearchQuery(query)
  }, 500)

  return (
    <form
      role='search'
      onSubmit={(e) => {
        e.preventDefault()
        navigate(`/search/?q=${searchQuery}`)
      }}
      className='grow ml-auto up-phone:w-[366px]'
    >
      <Input
        variant='contained'
        placeholder='Search Here'
        onChange={(e) => debounceSearch(e.target.value)}
        baseCn='bg-gray-7'
        className={className}
        prepend={<SearchIcon />}
      />
    </form>
  )
}

export { SearchQueryProvider, useSearchQuery, SearchBar }
