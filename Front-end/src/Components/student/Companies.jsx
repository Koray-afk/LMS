import React from 'react'
import { assets } from '../../assets/assets'

function Companies() {
  return (
    <div className='pt-16'>
       <p className='text-gray-600'>Trusted by Learners</p>
       <div className='flex flex-wrap items-center justify-center gap-6  md:gap-16 mt-5 md:mt-10  '>
        <img className='w-20 md:w-28' src={assets.microsoft_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.walmart_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.accenture_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.paypal_logo} alt="" />
        <img className='w-20 md:w-28' src={assets.adobe_logo} alt="" />
       </div>
    </div>
  )
}

export default Companies
