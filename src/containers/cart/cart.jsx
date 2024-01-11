/** @format */
'use client'

// Import necessary modules
import React, { useState } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { SecondaryNav } from '../../components/UI'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useCart } from '../common/Provider/cartProvider'
import { Button, Grid } from '@mui/material'
import emailjs from 'emailjs-com'
import Alert from '@mui/material/Alert'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import axios from 'axios'

const Cart = () => {
  // Cart context
  const { cart, cartDispatch, addedState } = useCart()
  const [success, setSuccess] = useState('')
  const [failed, setFailed] = useState('')

  // State for order status
  const [orderStatus, setOrderStatus] = useState(null)

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
    full_name: '',
    email: '',
    address: '',
    phone_number: '',
    note: '',
    price: formattedTotalPrice,
    status: 'Pending',
  })

  // Check if form is incomplete
  const isDisabled =
    !formData.full_name ||
    !formData.email ||
    !formData.address ||
    !formData.phone_number ||
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
    //  sendEmails()
    setSuccess(
      `Order placed successfully, check ${formData.email} for details.`
    )
  }

  // Close callback
  const onClose = () => {
    setFailed('Failed to place order')
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
    setFailed('Item removed from cart')
  }

  // Reset success and failure after a delay
  setTimeout(() => {
    setFailed('')
  }, 2000)

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
        to_name: formData.full_name,
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

      const payload = {
        ...formData,
        order_info: orderItems,
        order_date: date,
        reference: config.reference,
      }

      const response = await axios.post(
        `https://craftserver.onrender.com/v1/api/insert?store_order_id=teststore_order_partition`,
        {
          payload,
        }
      )

      const { error } = response.data

      if (error) {
        console.log('An unexpected error occurred:', error)
      }
    } catch (error) {
    } finally {
      // Additional cleanup or actions if needed
      clearForm()
    }
  }

  // Function to clear form fields
  const clearForm = () => {
    setFormData({
      full_name: '',
      email: '',
      address: '',
      phone_number: '',
      note: '',
    })
  }

  return (
    <div className='pt-24 bg-white min-h-screen'>
      {success && (
        <Grid
          item
          xs={7}
          sx={{ m: 3, position: 'fixed', top: 0, right: 0, zIndex: 55 }}>
          <Alert
            variant='filled'
            severity='success'
            sx={{ '& a': { fontWeight: 500 } }}>
            <span className='text-white'>{success}</span>
          </Alert>
        </Grid>
      )}
      {failed && (
        <Grid
          item
          xs={7}
          sx={{ m: 3, position: 'fixed', top: 50, right: 0, zIndex: 55 }}>
          <Alert
            variant='filled'
            severity='error'
            sx={{ '& a': { fontWeight: 500 } }}>
            <span className='text-white'>{failed}</span>
            <CloseRoundedIcon
              className=' cursor-pointer  mx-2'
              onClick={() => setFailed('')}
            />
          </Alert>
        </Grid>
      )}
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
                          src={`${item.uploadedImageUrl}`}
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
                        <Typography variant='p'>
                          Size: <span className='uppercase'>{item.size}</span>{' '}
                        </Typography>
                        <Typography variant='subtitle1'>
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
              <Button href='/' variant='outlined' sx={{ borderRadius: '0px' }}>
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
                  value={formData.full_name}
                  onChange={(e) =>
                    handleInputChange('full_name', e.target.value)
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
                  value={formData.phone_number}
                  onChange={(e) =>
                    handleInputChange('phone_number', e.target.value)
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
