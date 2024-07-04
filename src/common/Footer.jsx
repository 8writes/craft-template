/** @format */

import { Typography } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import badge from '../../public/paystack-ii.webp'

const Footer = () => {
  const [subdomain, setSubdomain] = useState('')

  useEffect(() => {
    const subdomain = window.location.hostname.split('.')[0]
    setSubdomain(subdomain)
  }, [])

  return (
    <div className='bg-gray-500 p-5 md:p-8'>
      <section className='flex flex-wrap gap-5 py-20 justify-between'>
        <div>
          
        </div>
        <div className='pr-16 grid w-full md:w-fit'>
          <p className=' text-lg py-2 text-white font-semibold uppercase'>
            Useful links
          </p>
          <div className='grid gap-1 text-base text-white'>
            <p>About Us</p>
            <p>Shipping & Returns </p>
          </div>
        </div>
        <div className='pr-16 grid w-full md:w-fit'>
          <p className='text-lg py-2 text-white font-semibold uppercase'>
            {' '}
            Contact Us
          </p>
          <div className='grid gap-1 text-base text-white'>
            {' '}
            <p> +234 000-000-000</p>
            <p className='hover:underline'> vendormail@gmail.com</p>
          </div>
        </div>
      </section>
      <div className='grid justify-center'>
        <p className='text-xs md:text-sm font-medium text-white'>
          © 2024, {subdomain} Powered by{' '}
          <Link className='hover:underline' href='https://craaft.com.ng'>Craaft.</Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default Footer
