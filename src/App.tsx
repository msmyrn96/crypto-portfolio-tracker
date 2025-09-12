import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CoinDetails from './pages/CoinDetails'
import NotFound from './pages/NotFound'
import MainLayout from './layout/MainLayout'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/coin/:id"
          element={
            <MainLayout>
              <CoinDetails />
            </MainLayout>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}
