/** @format */
'use client'

// Import necessary modules
import React, { useState } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { SecondaryNav } from '../../components/UI'
import { ThemeButton } from '../../components/Buttons'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useCart } from '../common/Provider/cartProvider'
import { Button } from '@mui/material'

const Cart = () => {
  const { cart, cartDispatch, addedState } = useCart()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phoneNumber: '',
    note: '',
  })

  const isDisabled =
    !formData.fullName ||
    !formData.email ||
    !formData.address ||
    !formData.phoneNumber

  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(String(item.price)?.replace(/,/g, '')) || 0
    return total + itemPrice
  }, 0)

  const formattedTotalPrice = `₦${totalPrice
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  // Paystack Configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: 'user@example.com',
    amount: totalPrice * 100, // Convert to kobo
    publicKey: 'pk_test_990b84e62bcd13690d07272f933a2080b195ce10',
  }

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
  }

  const onClose = () => {
    // Implementation for whatever you want to do when the Paystack dialog is closed.
    console.log('closed')
  }

  const initializePayment = usePaystackPayment(config)

  const handleRemoveFromCart = (item) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: item })
    addedState[item.id] = false
  }

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  return (
    <div className='pt-24 bg-slate-800 min-h-screen'>
      <SecondaryNav />
      <div className='flex flex-wrap justify-center items-start'>
        {/* Cart Items */}
        <Paper
          sx={{
            borderRadius: '0',
            width: '50%',
            '@media (max-width: 600px)': {
              width: '100%', // Change the width for screens smaller than 600px
            },
          }}
          className='flex flex-col items-center px-5 md:px-14 mx-5 my-10 py-5 border mr-5'>
          <div className='mt-2 mb-5 text-center'>
            <Typography variant='h5' className='text-gray-700'>
              Shopping Cart
            </Typography>
          </div>

          {cart ? (
            <>
              {cart.length > 0 ? (
                <div className='w-full space-y-4'>
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      className='flex items-center border w-full p-4 rounded-md'>
                      <div className='flex-shrink-0'>
                        <img
                          src={`https://hymcbwrcksuwhtfstztz.supabase.co/storage/v1/object/public/${item.uploadedImageUrl}`}
                          alt=''
                          style={{ maxHeight: '50px', maxWidth: '50px' }}
                        />
                      </div>
                      <div className='flex-grow ml-4'>
                        <Typography variant='h6'>{item.name}</Typography>
                        <Typography variant='p'>Size: {item.size}</Typography>
                        <Typography
                          className='text-slate-700'
                          variant='subtitle1'>
                          ₦{Number(item.price).toLocaleString()}
                        </Typography>
                      </div>
                      <div className='flex-shrink-0'>
                        <Typography
                          variant='h6'
                          className='cursor-pointer'
                          onClick={() => handleRemoveFromCart(item)}>
                          ✖
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex flex-col items-center'>
                  <Typography variant='p' className='mb-4'>
                    Cart is Empty
                  </Typography>
                  <ThemeButton
                    linkSrc='/'
                    variant='outlined'
                    className='normal'>
                    Return Home
                  </ThemeButton>
                </div>
              )}
            </>
          ) : (
            <>
              <Typography variant='p'>Cart is Empty</Typography>
              <ThemeButton linkSrc='/' variant='outlined' className='normal'>
                Return Home
              </ThemeButton>
            </>
          )}
        </Paper>

        {/* Checkout Section */}
        <div className='flex flex-col bg-white p-10 m-5'>
          <div className='grid gap-4 mb-4'>
            <Typography variant='h5' className='text-gray-700 mb-2'>
              Checkout
            </Typography>
            {/* Standard Delivery Form */}
            <form className='grid gap-2 md:w-96'>
              <div className='grid gap-2'>
                <label className='text-gray-700'>Full Name</label>
                <input
                  type='text'
                  placeholder='John Doe'
                  className={`border border-gray-300 px-3 py-2 w-full rounded-md `}
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange('fullName', e.target.value)
                  }
                />
              </div>
              <div className='grid gap-2'>
                <label className='text-gray-700'>Email Address</label>
                <input
                  type='email'
                  placeholder='JohnDoe@example.com'
                  className={`border border-gray-300 px-3 py-2 w-full rounded-md `}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className='grid gap-2'>
                <label className='text-gray-700'>Address</label>
                <textarea
                  placeholder='123 Main Street, City, Country'
                  className={`border border-gray-300 px-3 py-2 w-full rounded-md `}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div className='grid gap-2'>
                <label className='text-gray-700'>Phone Number</label>
                <input
                  type='tel'
                  placeholder='123-456-7890'
                  className={`border border-gray-300 px-3 py-2 w-full rounded-md`}
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange('phoneNumber', e.target.value)
                  }
                />
              </div>
              <div className='grid gap-2'>
                <label className='text-gray-700'>Note</label>
                <textarea
                  placeholder='Add any additional notes...'
                  className={`border border-gray-300 px-3 py-2 w-full rounded-md `}
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                />
              </div>
            </form>
            <Typography
              variant='h6'
              className='py-2 font-medium text-slate-800'>
              Total Price: {formattedTotalPrice}
            </Typography>
            {/* Paystack Checkout Button */}
            <Button
              size='medium'
              variant='outlined'
              color='success'
              onClick={() => {
                if (!isDisabled) {
                  initializePayment(onSuccess, onClose)
                }
              }}
              disabled={isDisabled}>
              <ShoppingCartCheckoutIcon sx={{ margin: '10px' }} />
              Checkout Now
            </Button>
          </div>
          <span className='text-center'>
            <Typography variant='p' className='text-green-700'>
              Your order receipt will be emailed to you.
            </Typography>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Cart
