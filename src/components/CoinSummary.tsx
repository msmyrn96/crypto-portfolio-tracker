import React from 'react'
import { CoinMarketChartResponse, MarketCoinDetails } from '../types/coins'
import CoinStatCard from './CoinStatCard'
import CoinMarketChart from './CoinMarketChart'
import TradeGrids from './TradeGrids'

type CoinSummaryPropsType = {
  coin: MarketCoinDetails
  marketStats: CoinMarketChartResponse
}

const CoinSummary = ({ coin, marketStats }: CoinSummaryPropsType) => {
  const { name, market_data, description } = coin

  const cardsStats = [
    { title: 'Current Price', stat: `$${market_data.current_price.usd.toLocaleString()}` },
    { title: 'Market Cap', stat: `$${market_data.market_cap.usd.toLocaleString()}` },
    { title: 'Rank', stat: `#${coin.market_cap_rank}` },
    {
      title: '24h Change',
      stat: `${market_data.price_change_percentage_24h.toFixed(2)}%`,
      className: `${market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`,
    },
    { title: '24h High', stat: `$${market_data.high_24h.usd.toLocaleString()}`, className: 'text-green-400' },
    { title: '24h Low', stat: `$${market_data.low_24h.usd.toLocaleString()}`, className: 'text-red-400' },
    {
      title: 'All Time High',
      stat: `$${market_data.ath.usd.toLocaleString()}`,
      extra: new Date(market_data.ath_date.usd).toLocaleDateString(),
      className: 'text-green-400',
    },
    {
      title: 'All Time Low',
      stat: `$${market_data.ath.usd.toLocaleString()}`,
      extra: new Date(market_data.ath_date.usd).toLocaleDateString(),
      className: 'text-red-400',
    },
    { title: '24h Volume', stat: `$${market_data.total_volume.usd.toLocaleString()}` },
  ]

  return (
    <div className="space-y-6 mt-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <div className="bg-gray-700 p-4 rounded-lg">{description.en}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
          {cardsStats.map((cardStat) => {
            const { title, stat, className, extra } = cardStat
            return <CoinStatCard key={title} title={title} stat={stat} className={className} extra={extra} />
          })}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <CoinMarketChart marketStats={marketStats} />
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mt-6">
          <TradeGrids coin={coin} />
        </div>
      </div>
    </div>
  )
}

export default CoinSummary
