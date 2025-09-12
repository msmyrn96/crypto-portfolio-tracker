import React from 'react'

type CoinStatCardPropsType = {
  title: string
  stat: string
  className?: string
  extra?: string
}

const CoinStatCard = ({ title, stat, className = '', extra = '' }: CoinStatCardPropsType) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="text-gray-400 text-sm">{title}</div>
      <div className={`text-2xl font-bold break-all ${className}`}>{stat}</div>
      {extra && <div className="text-sm text-gray-400">{extra}</div>}
    </div>
  )
}

export default CoinStatCard
