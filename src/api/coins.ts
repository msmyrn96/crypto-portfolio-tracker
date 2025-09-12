import { api } from './axios'
import {
  CoinMarketChartParams,
  CoinMarketChartResponse,
  MarketCoin,
  MarketCoinDetails,
  MarketCoinParams,
} from '../types/coins'

export async function getMarketCoins({ page = 1, perPage = 20, search = '' }: MarketCoinParams): Promise<MarketCoin[]> {
  const res = await api.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: false,
      names: search,
    },
  })
  return res.data
}

export async function getAllTheCoins(): Promise<MarketCoin[]> {
  const res = await api.get('/coins/list')
  return res.data
}

export async function getCoinDetails(id: string): Promise<MarketCoinDetails> {
  const res = await api.get(`/coins/${id}`, {
    params: { localization: false, tickers: false, market_data: true },
  })
  return res.data
}

export async function getCoinMarketChart({ id, days = 7 }: CoinMarketChartParams): Promise<CoinMarketChartResponse> {
  const res = await api.get(`/coins/${id}/market_chart`, {
    params: { vs_currency: 'usd', days },
  })
  return res.data
}
