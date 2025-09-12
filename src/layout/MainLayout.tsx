import React, { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

type LayoutPropsType = {
  children: ReactNode
}

const Layout = ({ children }: LayoutPropsType) => {
  const navigate = useNavigate()
  const isDashBoard = window.location.pathname === '/'

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white w-full">
      <div className="container mb-8">
        <div className="flex gap-2 items-start">
          {!isDashBoard && (
            <button onClick={() => navigate('/')} className="mt-1">
              <ArrowLeft className="w-7 h-7 mr-2 text-white" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Crypto Portfolio Tracker
            </h1>
            <h2 className="text-lg text-gray-400">Track your cryptocurrency investments</h2>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Layout
