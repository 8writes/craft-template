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
    <div className='bg-slate-100 p-5 md:p-8'>
      <section className='flex flex-wrap gap-5 justify-between'>
        <div>
          <Link href='/' className='text-slate-600 grid'>
            <Typography variant='h2'>{subdomain}</Typography>
          </Link>
        </div>
        <div className='pr-16 grid w-full md:w-fit'>
          <p className='text-md py-2 text-slate-700 font-semibold uppercase'>
            Useful links
          </p>
          <div className='grid gap-1 text-sm text-slate-700'>
            <p>About Us</p>
            <p>Shipping & Returns </p>
          </div>
        </div>
        <div className='pr-16 grid w-full md:w-fit'>
          <p className='text-md py-2 text-slate-700 font-semibold uppercase'>
            {' '}
            Contact Us
          </p>
          <div className='grid gap-1 text-sm text-slate-700'>
            {' '}
            <p> +234 000-000-000</p>
            <p> vendormail@gmail.com</p>
          </div>
        </div>
      </section>
      <div className='flex justify-center md:justify-start pt-10'>
        <Image src={badge} alt='' width={230} height={200} />
      </div>
      <div className='grid justify-center md:justify-start'>
        <p className='text-sm uppercase  font-medium pt-10 pb-2 text-slate-600'>
          {' '}
          © 2024, {subdomain}.
        </p>
        <p className='text-sm font-medium text-slate-600'>
          &nbsp; Powered by <Link href='https://craaft.com.ng'>Craaft.</Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default Footer
