import React from 'react'

function Loading() {
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 font-medium text-gray-600 tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loading