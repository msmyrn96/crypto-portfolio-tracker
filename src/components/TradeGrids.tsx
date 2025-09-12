import { DollarSign, Minus, Plus, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { MarketCoinDetails } from '../types/coins'
import { usePortfolio } from '../context/PortfolioContext'
import toast from 'react-hot-toast'

type TradeGridsPropsType = {
  coin: MarketCoinDetails
}

const TradeGrids = ({ coin }: TradeGridsPropsType) => {
  const [tradeBuyAmount, setTradeBuyAmount] = useState(0)
  const [tradeSellAmount, setTradeSellAmount] = useState(0)
  const { holdings, addCoin, removeCoin } = usePortfolio()
  const { symbol, market_data, name, id: coinId } = coin

  const currentHolding = holdings.find((holding) => {
    return holding.id === coinId
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2" />
          Buy {symbol.toUpperCase()}
        </h3>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {[0.1, 0.5, 1, 2].map((amount) => (
            <button
              key={amount}
              onClick={() => setTradeBuyAmount(amount)}
              className="py-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg text-sm border border-green-600/30">
              {amount} {symbol.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount to buy</label>
            <input
              type="number"
              placeholder="0.0"
              value={tradeBuyAmount}
              onChange={(e) => setTradeBuyAmount(Number.parseFloat(e.target.value))}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 text-white"
              step="0.1"
            />
          </div>

          {tradeBuyAmount > 0 && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Cost:</span>
                <span className="text-xl font-bold text-green-400">
                  {(tradeBuyAmount || 0) * market_data.current_price.usd}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              addCoin({
                name,
                amount: tradeBuyAmount,
                id: coinId,
                symbol,
                currentPrice: market_data.current_price.usd,
                percentOfPortfolio: 0,
              })
              toast.success('Coin amount added successfully!')
              setTradeBuyAmount(0)
            }}
            disabled={!tradeBuyAmount || tradeBuyAmount <= 0}
            className={`w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 ${
              !tradeBuyAmount || tradeBuyAmount <= 0 ? 'cursor-not-allowed opacity-50' : ''
            } rounded-lg font-semibold transition-colors flex items-center justify-center text-lg`}>
            <Plus className="w-5 h-5 mr-2" />
            Buy {tradeBuyAmount || '0'} {symbol.toUpperCase()}
          </button>
        </div>
      </div>

      {currentHolding && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-6 text-red-400 flex items-center">
            <DollarSign className="w-6 h-6 mr-2" />
            Sell {symbol.toUpperCase()}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount to sell
                {currentHolding && (
                  <span className="text-gray-500 ml-2">(Available: {currentHolding.amount.toFixed(2)})</span>
                )}
              </label>
              <input
                type="number"
                placeholder="0.0"
                value={tradeSellAmount}
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-400 text-white"
                max={currentHolding?.amount || 0}
                onChange={(e) => {
                  const inputValue = Number.parseFloat(e.target.value)
                  const maxValue = currentHolding?.amount || 0

                  if (inputValue > maxValue) {
                    setTradeSellAmount(maxValue)
                  } else {
                    setTradeSellAmount(inputValue)
                  }
                }}
                step="0.1"
              />
            </div>

            {tradeSellAmount > 0 && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Proceeds:</span>
                  <span className="text-xl font-bold text-red-400">
                    {(tradeSellAmount || 0) * market_data.current_price.usd}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                removeCoin(coinId, tradeSellAmount)
                toast.success('Coin amount removed successfully!')
                setTradeSellAmount(0)
              }}
              disabled={
                !tradeSellAmount || tradeSellAmount <= 0 || !currentHolding || tradeSellAmount > currentHolding.amount
              }
              className={`w-full py-4 bg-red-600 hover:bg-red-700 ${
                !tradeSellAmount || tradeSellAmount <= 0 || !currentHolding || tradeSellAmount > currentHolding.amount
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              } rounded-lg font-semibold transition-colors flex items-center justify-center text-lg`}>
              <Minus className="w-5 h-5 mr-2" />
              Sell {tradeSellAmount || '0'} {symbol.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TradeGrids
