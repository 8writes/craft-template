/** @format */

import { Logo } from '@/components'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useCart } from '@/containers/common/Provider/cartProvider'
import Image from 'next/image'
import Cart from '../../../public/cart.svg'

const MobileNavbar = () => {
  const { itemCount } = useCart()

  return (
    <>
      <section className='flex md:hidden justify-between p-5 bg-white fixed w-full z-50'>
        <div className='flex justify-between'>
          <Logo />
        </div>
        <div className='flex items-center text-gray-700 gap-4'>
          <Link
            className='flex gap-1 hover:text-slate-500 items-center'
            href='cart'>
            <Image src={Cart} alt='' width='30' height='30' />
            <Typography
              className='px-2 border-2 hover:border-slate-900  border-slate-600 rounded-full'
              variant='subtitle1'>
              {itemCount}
            </Typography>
          </Link>
        </div>
        {/**
        <div className=' bg-white fixed right-5 top-16 z-50'>
          <div className='flex text-gray-700 gap-2 px-3 py-3'>
            <Link className='flex' href='cart'>
              <Image src={Cart} alt='' width='30' height='30' />
              <Typography className='hover:text-green-600' variant='subtitle1'>
                My Cart
              </Typography>
            </Link>
            <Typography
              className='px-2  text-green-600 border-2 hover:border-green-400  border-green-200 rounded-full'
              variant='subtitle1'>
              {itemCount}
            </Typography>
          </div>
        </div>*/}
      </section>
    </>
  )
}

export default MobileNavbar
