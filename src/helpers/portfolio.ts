import { Holding } from '../types/portfolio'

export const calculateTotalAmount = (holdings: Holding[]) => {
  return holdings.reduce((acc, holding, i) => {
    return acc + holding.amount * holding.currentPrice
  }, 0)
}

export const calculatePercentageofPortfolio = ({ coinId, holdings }: { coinId: string; holdings: Holding[] }) => {
  const totalAmount = calculateTotalAmount(holdings)
  const holdingSpecific = holdings.find((holding) => {
    return holding.id === coinId
  })

  if (totalAmount === 0) {
    return 100
  }

  return holdingSpecific ? ((holdingSpecific?.amount * holdingSpecific?.currentPrice) / totalAmount) * 100 : 0
}
