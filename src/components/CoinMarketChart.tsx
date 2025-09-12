import React from 'react'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { CoinMarketChartResponse } from '../types/coins'

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

type CoinMarketChartPropsType = {
  marketStats: CoinMarketChartResponse
}

const CoinMarketChart = ({ marketStats }: CoinMarketChartPropsType) => {
  const chartLabels = marketStats?.prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString())

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Price (USD)',
        data: marketStats.prices.map(([, price]) => price),
        borderColor: '#22c55e',
        backgroundColor: '#22c55e33',
        yAxisID: 'y-left',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Market Cap',
        data: marketStats.market_caps.map(([, cap]) => cap),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f633',
        yAxisID: 'y-right',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Volume',
        data: marketStats.total_volumes.map(([, vol]) => vol),
        borderColor: '#f59e0b',
        backgroundColor: '#f59e0b33',
        yAxisID: 'y-right',
        tension: 0.3,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      'y-left': {
        type: 'linear' as const,
        position: 'left' as const,
        title: { display: true, text: 'Price (USD)' },
      },
      'y-right': {
        type: 'linear' as const,
        position: 'right' as const,
        title: { display: true, text: 'Market Cap / Volume (USD)' },
        grid: { drawOnChartArea: false },
      },
    },
  }

  return <Line data={chartData} options={options} />
}

export default CoinMarketChart
