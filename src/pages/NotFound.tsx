import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-2 text-lg text-gray-400">Page not found</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
        Return to Dashboard
      </Link>
    </div>
  )
}

export default NotFound
