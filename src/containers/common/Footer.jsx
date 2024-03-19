/** @format */

import Link from 'next/link'
import { Typography } from '@/components'
import { useState, useEffect } from 'react'

const Footer = () => {
   const [subdomain, setSubdomain] = useState('')

   useEffect(() => {
     const subdomain = window.location.hostname.split('.')[0]
     setSubdomain(subdomain)
   }, [])
  
  return (
    <>
      <section className='flex justify-center py-16 bg-slate-100 text-gray-700'>
        <Typography variant='p.medium'>
          © {subdomain} 2024.
        </Typography>
        <Typography variant='p.medium'>
          &nbsp; powered by <Link href='https://craaft.com.ng'>craaft.</Link>{' '}
        </Typography>
      </section>
    </>
  )
}

export default Footer
