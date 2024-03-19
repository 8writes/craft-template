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
    <div className='bg-slate-100 pb-5'>
      <div className='flex justify-center pt-10 pb-5 text-gray-700'>
        <p className='text-sm uppercase'> © 2024, {subdomain} .</p>
      </div>
      <Typography variant='p.medium'>
        &nbsp; Powered by <Link href='https://craaft.com.ng'>Craaft.</Link>{' '}
      </Typography>
    </div>
  )
}

export default Footer
