import { RiFacebookCircleFill, RiGithubFill, RiTwitterXFill } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative py-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9333ea]/20 via-pink-500/10 to-blue-500/20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <Link to="/">
              <img className="w-40 m-auto md:m-0" src="/logo-primary.svg" alt="logo" />
            </Link>
          </div>
          <p className='text-center'>© {new Date().getFullYear()} CityFix. All rights reserved.</p>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="facebook.com" target='_blank' className="text-darkGray hover:text-primary">
              <RiFacebookCircleFill />
            </a>
            <a href="x.com" target='_blank' className="text-darkGray hover:text-primary">
              <RiTwitterXFill />
            </a>
            <a href="https://github.com/mtalhas960/city-fix" target='_blank' className="text-darkGray hover:text-primary">
              <RiGithubFill />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer