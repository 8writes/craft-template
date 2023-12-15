/** @format */

'use client'
import { SecondaryNav } from '../../components/UI'
import { ThemeButton } from '../../components/Buttons'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useCart } from '../common/Provider/cartProvider'

const Cart = () => {
  const { cart, cartDispatch, addedState } = useCart()

  const totalPrice = cart.reduce((total, item) => {
    // Remove commas and convert to a number
    const itemPrice = parseFloat(String(item.price)?.replace(/,/g, '')) || 0
    return total + itemPrice
  }, 0)

  const formattedTotalPrice = `₦${totalPrice
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  const handleRemoveFromCart = (item) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: item })
    addedState[item.id] = false
  }

  const formatCartForWhatsApp = () => {
    return cart.map((item, index) => {
      return `${index + 1}. ${item.description} size:${item.size} - ₦${
        item.price
      } ID:${item.id} \n`
    })
  }

  const message = `https://wa.me/?text=${encodeURIComponent(
    `
                  
--//  SEND PAYMENT SLIP TO CONFIRM ORDER  //--

CHECKOUT MY CART:

${formatCartForWhatsApp()}

Total Price: ${formattedTotalPrice}

--//  KINDLY MAKE PAYMENT TO: 2191185098, ZENITH BANK, OKONKWO RITA NNEKA  //--
`
  )}`

  return (
    <div className='pt-24 bg-slate-800 min-h-screen'>
      <SecondaryNav />
      <div className='grid justify-center justify-items-center my-10'>
        <div className='grid text-center'>
          <span className='text-red-600'>
            <Typography variant='p'>
              Closing this tab will clear your data !!
            </Typography>
          </span>

          <span className='text-green-600'>
            <Typography variant='p.medium'>
              Install whatsapp for checkout !!
            </Typography>
          </span>
        </div>
        <Paper className='px-5 md:px-14 mx-5 py-5 border border-purple-500'>
          <div className='mt-2 mb-5'>
            <Typography variant='h4' className='text-gray-700'>
              Shopping Cart
            </Typography>
          </div>

          {cart ? (
            <>
              {cart.length > 0 ? (
                <ul>
                  {cart.map((item, index) => (
                    <>
                      <span className='flex my-4'>
                        <Typography variant='h6'>{index + 1}.</Typography>
                        <img
                          src={`https://hymcbwrcksuwhtfstztz.supabase.co/storage/v1/object/public/${item.uploadedImageUrl1}`}
                          alt=''
                          className='rounded-md mx-2'
                          width={50}
                          height={50}
                        />
                        <li
                          className='py-1 flex-1 flex justify-between my-auto'
                          key={item.id}>
                          <Typography className='px-2' variant='h6'>
                            {item.name}
                          </Typography>
                          <Typography className='px-2' variant='h6'>
                            ₦{Number(item.price).toLocaleString()}
                          </Typography>
                        </li>
                        <span className='my-auto'>
                          <Typography
                            variant='h6'
                            className=' cursor-pointer mx-2  '
                            onClick={() => handleRemoveFromCart(item)}>
                            ✖
                          </Typography>{' '}
                        </span>
                      </span>
                    </>
                  ))}
                  <div className='grid justify-center pt-10'>
                    <Typography variant='p' className='py-2 font-medium'>
                      Total Price: {formattedTotalPrice}
                    </Typography>
                    <ThemeButton
                      linkSrc={message}
                      variant='outlined'
                      className='normal'>
                      Checkout Now
                    </ThemeButton>
                    <span className='pt-5 text-center'>
                      <Typography variant='p' className='text-green-600'>
                        You will be redirected to Whatsapp with your cart.
                      </Typography>
                    </span>
                  </div>
                </ul>
              ) : (
                <Typography variant='h6'>Cart is Empty 😥</Typography>
              )}
            </>
          ) : (
            <>
              <Typography variant='h6'>Cart is Empty 😥</Typography>
              <ThemeButton linkSrc='/' variant='outlined' className='normal'>
                Return Home
              </ThemeButton>
            </>
          )}
        </Paper>
      </div>
    </div>
  )
}

export default Cart
