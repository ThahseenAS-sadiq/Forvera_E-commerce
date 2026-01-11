import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>
        <div>
            <img src={assets.exchange_icon} alt="exchange_icon" className='w-12 m-auto mb-5' />
            <p className='font-semibold' >Easy Exchange Policy</p>
            <p>We offer hassle-free exchange</p>
        </div>

        <div>
            <img src={assets.quality_icon} alt="quality_icon" className='w-12 m-auto mb-5' />
            <p className='font-semibold' >7 Days Return Policy</p>
            <p>We provide a 7-day return policy for all purchases.</p>
        </div>

        <div>
            <img src={assets.support_img} alt="support_img_icon" className='w-12 m-auto mb-5' />
            <p className='font-semibold' >Best Customer Support</p>
            <p>24/7 dedicated Customer support.</p>
        </div>
    </div>
  )
}

export default OurPolicy