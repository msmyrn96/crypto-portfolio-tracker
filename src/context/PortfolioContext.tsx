import React, { createContext, useContext, useState, useEffect } from 'react'
import { Holding } from '../types/portfolio'

type PortfolioContextType = {
  holdings: Holding[]
  addCoin: (holding: Holding) => void
  removeCoin: (id: string, amount: number) => void
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stored = localStorage.getItem('portfolio') ? JSON.parse(localStorage.getItem('portfolio') ?? '') : []
  const [holdings, setHoldings] = useState<Holding[]>(stored)

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(holdings))
  }, [holdings])

  const addCoin = (holding: Holding) => {
    setHoldings((prev) => {
      const existing = prev.find((h) => h.id === holding.id)
      if (existing) {
        return prev.map((h) => (h.id === holding.id ? { ...h, amount: h.amount + holding.amount } : h))
      }
      return [...prev, holding]
    })
  }

  const removeCoin = (id: string, amount: number) => {
    setHoldings((prev) => {
      const existing = prev.find((h) => h.id === id)

      if (!existing) {
        return prev
      }

      return prev.map((h) => (h.id === id ? { ...h, amount: h.amount - amount } : h)).filter((h) => h.amount > 0)
    })
  }

  return <PortfolioContext.Provider value={{ holdings, addCoin, removeCoin }}>{children}</PortfolioContext.Provider>
}

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
