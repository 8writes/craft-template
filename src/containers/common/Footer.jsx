/** @format */

import Link from 'next/link'
import { Typography } from '@/components'

const Footer = () => {
  return (
    <>
      <section className='flex justify-center py-16 bg-slate-100 text-gray-700'>
        <Typography variant='p.medium'>Copyright © 2023 - 2024.</Typography>
        <Typography variant='p.medium'>
          &nbsp; powered by <Link href='https://craaft.com.ng'>craaft.</Link>{' '}
        </Typography>
      </section>
    </>
  )
}

export default Footer
