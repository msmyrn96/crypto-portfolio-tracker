import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import PortfolioSummary from '../components/PortfolioSummary'
import UserHoldings from '../components/UserHoldings'
import { usePortfolio } from '../context/PortfolioContext'
import { calculateTotalAmount } from '../helpers/portfolio'
import { useQuery } from '@tanstack/react-query'
import { getAllTheCoins, getMarketCoins } from '../api/coins'
import { useDebounce } from '../hooks/useDebounce'
import MarketCoinsTable from '../components/MarketCoinsTable'
import toast from 'react-hot-toast'

export type CoinParamsType = {
  page: number
  perPage: number
  search: string
  totalPages: number
}

const Dashboard = () => {
  const { holdings } = usePortfolio()
  const [coinParams, setCoinParams] = useState<CoinParamsType>({
    page: 1,
    perPage: 10,
    search: '',
    totalPages: 1,
  })

  const { search, page, perPage } = coinParams

  const handleSearch = useCallback((value: string) => {
    setCoinParams((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }))
  }, [])

  const handlePagination = useCallback((value: number) => {
    setCoinParams((prev) => ({
      ...prev,
      page: value,
    }))
  }, [])

  const debouncedSearch = useDebounce(search, 1000)

  const totalValue = `$${calculateTotalAmount(holdings).toFixed(2)}`
  const portfolioLength = holdings.length
  const highestCoinValue = holdings?.reduce(
    (max, item) => (item.currentPrice > max.currentPrice ? item : max),
    holdings[0]
  )

  const {
    data: allCoins,
    isLoading: isLoadingAllCoins,
    error: allTheCoinsError,
  } = useQuery({
    queryKey: ['allTheCoins'],
    queryFn: () => getAllTheCoins(),
    staleTime: 1000 * 60,
  })

  useEffect(() => {
    if (allCoins) {
      const totalPages = Math.ceil((allCoins?.length ?? 0) / perPage) || 1
      setCoinParams((prev) => ({
        ...prev,
        totalPages,
      }))
    }
  }, [allCoins, perPage])

  const {
    data,
    isLoading: isLoadingMarketCoins,
    error: coinsMarketError,
  } = useQuery({
    queryKey: ['market', page, perPage, debouncedSearch],
    queryFn: () => getMarketCoins({ page, perPage, search: debouncedSearch }),
    staleTime: 1000 * 60,
  })

  const filteredSuggestions = data
    ?.filter((coin) => coin.name.toLowerCase().includes(coinParams.search.toLowerCase()))
    .map((entry) => entry.name)

  useEffect(() => {
    if (allTheCoinsError) {
      toast.error(allTheCoinsError.message)
    }
  }, [allTheCoinsError])

  useEffect(() => {
    if (coinsMarketError) {
      toast.error(coinsMarketError.message)
    }
  }, [coinsMarketError])

  return (
    <div className="relative mb-8">
      <SearchBar coinParams={coinParams} handleSearch={handleSearch} filteredSuggestions={filteredSuggestions ?? []} />

      <MarketCoinsTable
        data={data ?? []}
        coinParams={coinParams}
        handlePagination={handlePagination}
        isLoading={isLoadingAllCoins || isLoadingMarketCoins}
      />

      <PortfolioSummary
        totalValue={totalValue}
        portfolioLength={portfolioLength}
        highestCoinValue={highestCoinValue?.name}
      />

      <UserHoldings holdings={holdings} />
    </div>
  )
}

export default Dashboard
