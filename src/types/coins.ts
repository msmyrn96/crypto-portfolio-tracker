export type MarketCoinParams = {
  page: number
  perPage: number
  search: string
}

export interface MarketCoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation?: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply?: number | null
  max_supply?: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi?: string | null
  last_updated: string
}

export type MarketCoinDetails = {
  id: string
  symbol: string
  name: string
  image: {
    thumb: string
    small: string
    large: string
  }
  market_cap_rank: number
  market_data: {
    current_price: { usd: number }
    ath: { usd: number }
    ath_change_percentage: { usd: number }
    ath_date: { usd: string }
    atl: { usd: number }
    atl_change_percentage: { usd: number }
    atl_date: { usd: string }
    market_cap: { usd: number }
    fully_diluted_valuation: { usd: number }
    total_volume: { usd: number }
    high_24h: { usd: number }
    low_24h: { usd: number }
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
  }
  description: {
    en: string
  }
}

export type CoinMarketChartParams = {
  id: string
  days?: number
}

export type CoinMarketChartResponse = {
  prices: number[][]
  market_caps: number[][]
  total_volumes: number[][]
}
