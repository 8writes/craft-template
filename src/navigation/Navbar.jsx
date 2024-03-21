/** @format */

import { Logo } from '@/components'
//import Card from '@mui/material/Card'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useCart } from '@/context/cartContext'
import Image from 'next/image'
import Cart from '../../public/cart.svg'

const Navbar = () => {
  const { itemCount } = useCart()

  return (
    <>
      <section className='hidden md:block bg-white fixed w-full z-50'>
        <div className='flex justify-between p-5 md:p-7'>
          <Logo />
          <div className='flex items-center gap-2 mx-10'>
            <Link className='flex items-center' href='cart'>
              <div className='flex mx-2'>
                <Image src={Cart} alt='' width='27' height='27' />
                <Typography
                  className=' text-md text-slate-800 font-medium hover:text-slate-900'
                  variant='subtitle1'>
                  CART
                </Typography>
              </div>

              <Typography
                className='px-2 text-black border-2 border-slate-300 rounded-full'
                variant='subtitle1'>
                {itemCount}
              </Typography>
            </Link>
          </div>

          {/** <div className='fixed right-10 top-10 z-50'>
            <Card className='flex text-gray-700  gap-2 px-4 py-3 border border-purple-500'>*/}
          {/**   <Link className="hover:text-purple-600" href="#">
                <Typography variant="subtitle1">Login</Typography>
              </Link>
              &nbsp; &#47; &nbsp;*/}
          {/**<Link className='flex' href='cart'>
                <Typography
                  className='hover:text-purple-600'
                  variant='subtitle1'>
                  My Cart
                </Typography>
              </Link>
              <Typography
                className='px-2 text-green-600 border-2 hover:border-green-400  border-green-200 rounded-full'
                variant='subtitle1'>
                {itemCount}
              </Typography>
            </Card>
          </div>*/}
        </div>
      </section>
    </>
  )
}

export default Navbar
