import React from 'react'
import { Loader2 } from 'lucide-react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
    </div>
  )
}

export default Spinner
