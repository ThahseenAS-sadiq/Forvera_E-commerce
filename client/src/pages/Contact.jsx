import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets.js'
import NewsLetter from '../components/NewsLetter.jsx'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t' >
      <Title text1={'CONTACT'} text2={'US'} />
    </div>

    <div className="flex flex-col md:flex-row mb-28 my-10 justify-center gap-10 ">
      <img src={assets.contact_img} alt="img" className='w-full md:max-w-[480px]' />
      <div className="flex flex-col gap-6 justify-center items-start">
        <p className='font-bold text-gray-600 text-xl'>Our Store</p>
        <p className='text-gray-500'>24/12 Annai Station <br /> Suize 300, Chennai, India</p>
        <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: Forvera.fashion@gmail.com</p>
        <p className='font-bold text-gray-600 text-xl'>Careers at Forever</p>
        <p className='text-gray-500' >Learn more about our teams and job openings.</p>

        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
    </div>
    <NewsLetter />
    </div>
  )
}

export default Contact;