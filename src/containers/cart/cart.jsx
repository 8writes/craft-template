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
import emailjs from 'emailjs-com'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { createClient } from '@supabase/supabase-js'

// Set up Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Cart = () => {
  // Cart context
  const { cart, cartDispatch, addedState } = useCart()

  // State for order status
  const [orderStatus, setOrderStatus] = useState(null)
  
  const [orderItemsArray, setOrderItemsArray] = useState([])

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(String(item.price)?.replace(/,/g, '')) || 0
    return total + itemPrice
  }, 0)

  // Format total price for display
  const formattedTotalPrice = `₦${totalPrice
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phoneNumber: '',
    note: '',
    price: formattedTotalPrice,
    status: 'Pending',
  })

  // Check if form is incomplete
  const isDisabled =
    !formData.fullName ||
    !formData.email ||
    !formData.address ||
    !formData.phoneNumber ||
    cart.length === 0

  // Paystack Configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: totalPrice * 100, // Convert to kobo
    publicKey: 'pk_test_990b84e62bcd13690d07272f933a2080b195ce10',
  }

  // Success callback
  const onSuccess = (reference) => {
    console.log(reference)
    clearCart()
    handleUploadForm()
    sendEmails()
    setOrderStatus('Order successful')
  }

  // Close callback
  const onClose = () => {
    console.log('closed')
    clearCart()
    setOrderStatus('failed to place order')
  }

  // Paystack payment initialization
  const initializePayment = usePaystackPayment(config)

  // Clear cart
  const clearCart = () => {
    cartDispatch({ type: 'CLEAR_CART' })
  }

  // Remove item from cart
  const handleRemoveFromCart = (item) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: item })
    addedState[item.id] = false
  }

  // Handle input change in the form
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Create an array of order items for email
  const orderItems = cart.map((item) => ({
    name: item.name,
    size: item.size,
    price: item.price,
  }))

  // Convert orderItems array to a formatted string
  const formattedOrderItems = orderItems
    .map(
      (item) =>
        `${item.name} - Size: ${
          item.size
        }, Price: ₦${item.price.toLocaleString()}`
    )
    .join('\n')

  // Function to send emails using emailjs
  const sendEmails = async () => {
    try {
      // Email template parameters
      const templateParams = {
        to_email: formData.email,
        from_email: 'mailemmanuel00@gmail.com',
        to_name: formData.fullName,
        from_name: 'Royeshoes',
        subject: 'Order Confirmation',
        cart: formattedOrderItems,
        reference_id: config.reference,
        message: `Thank you for your order! Your order reference: ${config.reference}`,
        details: formData,
      }

      // Construct the WhatsApp link
      const whatsappLink = `https://wa.me/+2348155151818?text=Track my order with reference ID: ${config.reference}`

      // Include the WhatsApp link in the templateParams
      templateParams.whatsappLink = whatsappLink

      // Send email to the customer
      await emailjs.send(
        'service_t0o3gpe',
        'template_8g9vtaw',
        templateParams,
        'utKOg67bfZjl-zmSw'
      )

      // Send email to the vendor
      templateParams.to_email = 'mailemmanuel00@gmail.com'
      await emailjs.send(
        'service_t0o3gpe',
        'template_8g9vtaw',
        templateParams,
        'utKOg67bfZjl-zmSw'
      )

      console.log('Emails sent successfully')
    } catch (error) {
      console.error('Error sending emails:', error)
    }
  }

  // Function to handle form data insertion
  const handleUploadForm = async () => {
    try {
      const currentDate = new Date()
      const date = currentDate.toISOString().split('T')[0]

      // Create order items array
      const orderItems = cart.map((item) => ({
        name: item.name,
        size: item.size,
        price: item.price,
      }))

      setOrderItemsArray(orderItems)

      // Insert data into Supabase
      const { data, error } = await supabase.from('royeshoesOrders').insert({
        ...formData,
        orderInfo: orderItemsArray,
        orderDate: date,
        reference: config.reference,
      })

      if (error) {
        console.log(error.message)
      } else {
        console.log('success')
      }
    } catch (error) {
      console.error('Error during data insertion:', error.message)
    } finally {
      // Additional cleanup or actions if needed
      clearForm()
    }
  }

  // Function to clear form fields
  const clearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
      note: '',
    })
  }

  return (
    <div className='pt-24 bg-white min-h-screen'>
      <SecondaryNav />
      <div className='flex flex-wrap justify-center items-start'>
        {/* Cart Items */}
        <Paper
          variant='outlined'
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
                        <Typography
                          variant='h6'
                          sx={{ textTransform: 'uppercase' }}>
                          {item.name}
                        </Typography>
                        <Typography variant='p'>Size: <span className='uppercase'>{item.size}</span> </Typography>
                        <Typography
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
                  <Typography variant='body1'>Cart is Empty</Typography>
                  <Button
                    href='/'
                    variant='outlined'
                    sx={{ borderRadius: '0px', my: '5px' }}>
                    Return Home
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <Typography variant='p'>Cart is Empty</Typography>
              <Button
                href='/'
                variant='outlined'
                sx={{ borderRadius: '0px' }}>
                Return Home
              </Button>
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
          {/* Order receipt message */}
          <span className='text-center'>
            <Typography variant='p' className='text-green-700'>
              Order receipt will be sent to your email.
            </Typography>
          </span>
        </div>
        {/* Order Status Alert */}
        {orderStatus === 'success' && (
          <Alert severity='success' className='fixed bottom-10 right-10'>
            Order Successful! Your order has been placed successfully.
          </Alert>
        )}
        {orderStatus === 'failure' && (
          <Alert severity='error' className='fixed bottom-10 right-10'>
            Order Failed There was an issue placing your order. Please try
            again.
          </Alert>
        )}
      </div>
    </div>
  )
}

export default Cart
