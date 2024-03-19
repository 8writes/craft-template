/** @format */
'use client'

// Import necessary modules
import React, { useState } from 'react'
import { SecondaryNav } from '../../components/UI'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useCart } from '../common/Provider/cartProvider'
import logo from '../../../public/logo.svg'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import emailjs from 'emailjs-com'
import Alert from '@mui/material/Alert'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import Image from 'next/image'
const generateUniqueId = require('generate-unique-id')

const Cart = () => {
  // Cart context
  const { cart, cartDispatch, addedState } = useCart()
  const [success, setSuccess] = useState('')
  const [failed, setFailed] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // State for order status
  const [orderStatus, setOrderStatus] = useState(null)

  // State for payment popup
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false)
  const [reference, setReference] = useState(null)

  const banksInNigeria = [
    'Access Bank',
    'Citibank',
    'Diamond Bank',
    'Ecobank Nigeria',
    'Enterprise Bank',
    'Fidelity Bank',
    'First Bank of Nigeria',
    'First City Monument Bank (FCMB)',
    'Guaranty Trust Bank (GTBank)',
    'Heritage Bank',
    'Keystone Bank',
    'Providus Bank',
    'Polaris Bank',
    'Stanbic IBTC Bank',
    'Standard Chartered Bank',
    'Sterling Bank',
    'SunTrust Bank',
    'Union Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Unity Bank',
    'Wema Bank',
    'Zenith Bank',
    'Opay',
    'Kuda Bank',
  ]

  // Open payment popup
  const openPaymentPopup = () => {
    setPaymentPopupOpen(true)
    const id1 = generateUniqueId()
    setReference(id1)
  }

  // Close payment popup
  const closePaymentPopup = () => {
    setPaymentPopupOpen(false)
  }

  // Handle order confirmation
  const handleConfirmOrder = async () => {
    try {
      // await sendEmails()

      await handleUploadForm()
    } catch (error) {
      console.error('Error in handleConfirmOrder:', error)
    } finally {
      setPaymentPopupOpen(false)
    }
  }

  const [senderDetails, setSenderDetails] = useState({
    fullName: '',
    bank: '',
  })

  const isDisabledOrder = !senderDetails.fullName || !senderDetails.bank

  const handleSenderDetailsChange = (field, value) => {
    setSenderDetails({
      ...senderDetails,
      [field]: value,
    })
  }

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
        reference_id: reference,
        message: `Thank you for your order! Your order reference: ${reference}`,
        details: formData,
      }

      // Construct the WhatsApp link
      const whatsappLink = `https://wa.me/+2348155151818?text=Track my order with reference ID: ${reference}`

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
    setIsLoading(true)
    try {
      const currentDate = new Date()
      const date = currentDate.toISOString().split('T')[0]

      // Create order items array
      const orderItems = cart.map((item) => ({
        name: item.name,
        size: item.size,
        color: item.color,
        price: item.price,
        details: senderDetails,
      }))

      const payload = {
        ...formData,
        order_info: orderItems,
        order_date: date,
        reference,
      }

      const response = await axios.post(
        ` https://craftserver.onrender.com/v1/api/insert?store_order_id=teststore_order_partition`,
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
      setIsLoading(false)
      // Additional cleanup or actions if needed
      clearForm()
      clearCart()
      setSuccess(
        `Order placed successfully, check ${formData.email} for details.`
      )
    }
  }

  const clearCart = () => {
    cartDispatch({ type: 'CLEAR_CART' })
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
      <div className='flex flex-wrap justify-center'>
        {/* Checkout Section */}
        {/*  <div className='flex flex-col bg-white w-full lg:w-96 p-5 md:p-10 md:m-5'>
          <div className='grid gap-4 mb-4'>
           <Typography variant='h5' className='text-gray-700 mb-2'>
              Checkout
            </Typography>
             Standard Delivery Form 
            <form className='grid gap-2 w-full lg:w-96'>
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
            </Typography>*/}
        {/* Checkout Cart Button 
            <Button
              size='medium'
              variant='outlined'
              color='success'
              onClick={openPaymentPopup}
              disabled={isDisabled}>
              <ShoppingCartCheckoutIcon sx={{ margin: '10px' }} />
              Checkout Cart
            </Button>
          </div>
        </div>*/}
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
        {/* Cart Items */}
        <div className='flex justify-center flex-col w-full xl:w-1/2 px-5 mt-14 md:px-14 mx-5 '>
          {cart ? (
            <>
              {cart.length > 0 ? (
                <div className='w-full space-y-4'>
                  <p className='text-3xl md:text-4xl mb-5 text-center font-semibold text-slate-600'>
                    My Cart
                  </p>
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      className='flex justify-between items-center border w-full p-4 rounded-md'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <img
                            src={`${item.uploadedImageUrl}`}
                            alt=''
                            style={{ maxHeight: '100px', maxWidth: '100px' }}
                          />
                        </div>
                        <div className='flex-col ml-4'>
                          <Typography
                            variant='h6'
                            sx={{ textTransform: 'uppercase' }}>
                            {item.name}
                          </Typography>
                          <Typography variant='p'>
                            Size: <span className='uppercase'>{item.size}</span>{' '}
                          </Typography>
                          <Typography variant='p'>
                            Color:{' '}
                            <span className='uppercase'>{item.color}</span>{' '}
                          </Typography>
                          <Typography variant='subtitle1'>
                            ₦{Number(item.price).toLocaleString()}
                          </Typography>
                        </div>
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
                  {/* Checkout Cart Button */}
                  <div className='flex justify-center md:justify-end'>
                    <div>
                      <Typography
                        variant='h6'
                        className='py-2 font-medium text-slate-800'>
                        Total Price: {formattedTotalPrice}
                      </Typography>
                      <Button
                        size='medium'
                        variant='outlined'
                        color='success'
                        onClick={openPaymentPopup}>
                        <ShoppingCartCheckoutIcon sx={{ margin: '10px' }} />
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex gap-3 flex-col items-center mt-10'>
                  <p className='text-2xl md:text-4xl font-semibold text-slate-600'>
                    Your cart is empty :(
                  </p>
                  <p className='text-center text-md font-semibold text-slate-700'>
                    Looks like you haven’t added anything to your cart yet.
                  </p>
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
              <Typography variant='p'>Your cart is empty</Typography>
              <Button href='/' variant='outlined' sx={{ borderRadius: '0px' }}>
                Return Home
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Payment Popup */}
      <Dialog
        maxWidth='sm'
        fullWidth
        sx={{ overflow: 'hidden' }}
        open={paymentPopupOpen}
        onClose={closePaymentPopup}>
        <div className='p-5'>
          <p className='text-2xl md:text-3xl mb-5 font-semibold text-slate-600'>
            Shipping Details
          </p>
          <form className='grid gap-2 w-full'>
            <div className='grid gap-2'>
              <label className='text-gray-700'>Full Name</label>
              <input
                type='text'
                placeholder='John Doe'
                className={`border border-gray-300 px-3 py-2 w-full rounded-md `}
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
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
          <div className='flex md:justify-end mt-5'>
            <div className='text-slate-600'>
              <p className='text-xl font-semibold'>Shipping Fee: N/A </p>
              <p className='text-xl font-semibold'>
                Total Price: {formattedTotalPrice}
              </p>
            </div>
          </div>
        </div>
        <DialogActions>
          <div className='flex justify-center md:justify-end px-5 md:px-0'>
            <button
              className='text-red-700 font-semibold mx-4'
              onClick={closePaymentPopup}>
              Cancel
            </button>
            <LoadingButton
              loading={isLoading}
              disabled={isDisabledOrder}
              variant='outlined'
              onClick={handleConfirmOrder}
              color='success'>
              Proceed to payment
            </LoadingButton>{' '}
          </div>
        </DialogActions>
        {/* Order receipt message */}
        <span className='text-center m-3'>
          <p className='text-green-700'>
            Order details / receipt will be sent to your email.
          </p>
        </span>
      </Dialog>
    </div>
  )
}

export default Cart
