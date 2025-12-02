import React from 'react'
import { assets } from '../../assets/assets'

function CallToAction() {
  return (
    <div className="flex flex-col items-center gap-3 pt-16 pb-24 px-6 md:px-20 text-center">


      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug">
        Learn anything, anytime, anywhere
      </h1>


      <p className="text-gray-600 max-w-xl text-sm md:text-base">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id 
        veniam aliqua proident excepteur commodo do ea.
      </p>


      <div className="flex items-center gap-4 mt-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 cursor-pointer">
          Get Started
        </button>

      
        <button className="flex items-center gap-2 border border-gray-400 px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200 cursor-pointer">
          Learn more 
          <img 
            src={assets.arrow_icon} 
            alt="arrow" 
            className="w-4 h-4"
          />
        </button>

      </div>
    </div>
  )
}

export default CallToAction