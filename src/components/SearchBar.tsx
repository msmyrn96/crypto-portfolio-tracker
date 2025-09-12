import React, { memo, useEffect, useState } from 'react'

import { Search } from 'lucide-react'
import { CoinParamsType } from '../pages/Dashboard'

type SearchBarPropsType = {
  coinParams: CoinParamsType
  handleSearch: (value: string) => void
  filteredSuggestions: string[]
}

const SearchBar = ({ coinParams, handleSearch, filteredSuggestions }: SearchBarPropsType) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (coinParams.search === '') {
      setIsOpen(false)
    }
  }, [coinParams.search])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search cryptocurrencies..."
        value={coinParams.search}
        onChange={(e) => {
          handleSearch(e.target.value)
          setIsOpen(true)
        }}
        className="w-full max-w-md pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
      />

      {filteredSuggestions && filteredSuggestions.length > 0 && isOpen && (
        <ul className="absolute max-w-md z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                handleSearch(item)
                setIsOpen(false)
              }}
              className="px-4 py-2 cursor-pointer text-white hover:bg-gray-700">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default memo(SearchBar)
