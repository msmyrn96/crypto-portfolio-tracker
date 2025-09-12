import React, { useEffect } from 'react'
import CoinSummary from '../components/CoinSummary'
import { useParams } from 'react-router'
import { getCoinDetails, getCoinMarketChart } from '../api/coins'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

const CoinDetails = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: coin,
    isLoading: isLoadingCoinDetails,
    error: coinDetailsError,
  } = useQuery({
    queryKey: ['coin', id],
    queryFn: () => getCoinDetails(id!),
    enabled: !!id,
  })

  const {
    data: marketStats,
    isLoading: isLoadingCoinMarketChart,
    error: marketStatsError,
  } = useQuery({
    queryKey: ['marketStats', id],
    queryFn: () => getCoinMarketChart({ id: id! }),
    enabled: !!id,
  })

  useEffect(() => {
    if (coinDetailsError) {
      toast.error(coinDetailsError.message)
    }
  }, [coinDetailsError])

  useEffect(() => {
    if (marketStatsError) {
      toast.error(marketStatsError.message)
    }
  }, [marketStatsError])

  return (
    <div className="p-6 space-y-6">
      {isLoadingCoinDetails || isLoadingCoinMarketChart ? (
        <Spinner />
      ) : (
        coin && marketStats && <CoinSummary coin={coin} marketStats={marketStats} />
      )}
    </div>
  )
}

export default CoinDetails
