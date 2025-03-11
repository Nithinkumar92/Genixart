import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3'>
       <Link to={'/'}>
      <img src='./GenixAilogopng.png' alt='logo' className='w-28 sm:w-32 lg:w-40'/>
      </Link>
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
        Copyright @Nithinkumar | All right reserved.
      </p>
      <div className='flex gap-5'>
        <img src={assets.facebook_icon} width={35} alt='facebook icon'/>
        <img src={assets.twitter_icon} width={35} alt='facebook icon'/>
        <img src={assets.instagram_icon} width={35} alt='facebook icon'/>

      </div>
    </div>
  )
}

export default Footer
