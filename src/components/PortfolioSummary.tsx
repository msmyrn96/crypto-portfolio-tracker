import React from 'react'

type PortfolioSummaryPropsType = {
  totalValue: string
  portfolioLength: number
  highestCoinValue: string
}

const PortfolioSummary = ({ totalValue, portfolioLength, highestCoinValue }: PortfolioSummaryPropsType) => {
  return (
    <div className="space-y-6 mt-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Total Value</div>
            <div className="text-2xl font-bold text-green-400">{totalValue}</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Holdings</div>
            <div className="text-2xl font-bold">{portfolioLength}</div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-gray-400 text-sm">Highest Value Coin</div>
            <div className="text-2xl font-bold text-blue-400">{highestCoinValue ?? '--'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioSummary
