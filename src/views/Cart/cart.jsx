/** @format */
'use client'

import React, { useState } from 'react'
import { SecondaryNav } from '../../components/UI'
import Typography from '@mui/material/Typography'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useCart } from '../../context/cartContext'
import { Button, Dialog, DialogActions, Grid } from '@mui/material'
import emailjs from 'emailjs-com'
import Alert from '@mui/material/Alert'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
const generateUniqueId = require('generate-unique-id')

const Cart = () => {
  const { cart, cartDispatch, addedState } = useCart()
  const [success, setSuccess] = useState('')
  const [failed, setFailed] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [orderStatus, setOrderStatus] = useState(null)
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

  const openPaymentPopup = () => {
    setPaymentPopupOpen(true)
    const id1 = generateUniqueId()
    setReference(id1)
  }

  const closePaymentPopup = () => {
    setPaymentPopupOpen(false)
  }

  const handleConfirmOrder = async () => {
    try {
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

  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(String(item.price)?.replace(/,/g, '')) || 0
    return total + itemPrice
  }, 0)

  const formattedTotalPrice = `₦${totalPrice
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    address: '',
    phone_number: '',
    note: '',
    price: formattedTotalPrice,
    status: 'Pending',
  })

  const isDisabled =
    !formData.full_name ||
    !formData.email ||
    !formData.address ||
    !formData.phone_number ||
    cart.length === 0

  const handleRemoveFromCart = (item) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: item })
    addedState[item.id] = false
    setFailed('Item removed from cart')
  }

  setTimeout(() => {
    setFailed('')
  }, 2000)

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const orderItems = cart.map((item) => ({
    name: item.name,
    size: item.size,
    price: item.price,
  }))

  const formattedOrderItems = orderItems
    .map(
      (item) =>
        `${item.name} - Size: ${
          item.size
        }, Price: ₦${item.price.toLocaleString()}`
    )
    .join('\n')

  const sendEmails = async () => {
    try {
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

      const whatsappLink = `https://wa.me/+2348155151818?text=Track my order with reference ID: ${reference}`
      templateParams.whatsappLink = whatsappLink

      await emailjs.send(
        'service_t0o3gpe',
        'template_8g9vtaw',
        templateParams,
        'utKOg67bfZjl-zmSw'
      )

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

  const handleUploadForm = async () => {
    setIsLoading(true)
    try {
      const currentDate = new Date()
      const date = currentDate.toISOString().split('T')[0]

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
        `https://craftserver.onrender.com/v1/api/insert?store_order_id=teststore_order_partition`,
        { payload }
      )

      const { error } = response.data

      if (error) {
        console.log('An unexpected error occurred:', error)
      }
    } catch (error) {
      console.error('Error uploading form:', error)
    } finally {
      setIsLoading(false)
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
              className='cursor-pointer mx-2'
              onClick={() => setFailed('')}
            />
          </Alert>
        </Grid>
      )}
      <SecondaryNav />
      <div className='flex flex-wrap justify-center'>
        {orderStatus === 'success' && (
          <Alert severity='success' className='fixed bottom-10 right-10'>
            Order Successful! Your order has been placed successfully.
          </Alert>
        )}
        {orderStatus === 'failure' && (
          <Alert severity='error' className='fixed bottom-10 right-10'>
            Order Failed. There was an issue placing your order. Please try
            again.
          </Alert>
        )}
        <div className='flex justify-center flex-col w-full xl:w-1/2 px-5 mt-14 md:px-14 mx-5'>
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
                        src={item.uploadedImageUrl}
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
                      <Typography variant='subtitle1' color='text.secondary'>
                        Size: {item.size}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary'>
                        Color: {item.color}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary'>
                        ₦{item.price.toLocaleString()}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <button
                      className='px-3 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-md shadow-md'
                      onClick={() => handleRemoveFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <Typography variant='h6' sx={{ textAlign: 'center', mt: 5 }}>
                Total: {formattedTotalPrice}
              </Typography>
              <div className='mt-6'>
                <p className='text-xl md:text-2xl text-center mb-2 font-semibold text-slate-600'>
                  Sender Details
                </p>
                <form className='grid md:grid-cols-2 gap-4'>
                  <input
                    type='text'
                    placeholder='Sender Full Name'
                    value={senderDetails.fullName}
                    onChange={(e) =>
                      handleSenderDetailsChange('fullName', e.target.value)
                    }
                    className='border border-gray-300 p-2 rounded-md'
                  />
                  <select
                    value={senderDetails.bank}
                    onChange={(e) =>
                      handleSenderDetailsChange('bank', e.target.value)
                    }
                    className='border border-gray-300 p-2 rounded-md'>
                    <option value=''>Select Bank</option>
                    {banksInNigeria.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
              <div className='flex justify-center mt-10'>
                <button
                  className={`px-4 py-2 rounded-md shadow-md text-white ${
                    isDisabledOrder
                      ? 'bg-gray-400'
                      : 'bg-teal-500 hover:bg-teal-600'
                  }`}
                  onClick={openPaymentPopup}
                  disabled={isDisabledOrder}>
                  Confirm Order
                </button>
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center w-full h-64'>
              <Typography variant='h6'>Your cart is empty</Typography>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={paymentPopupOpen}
        onClose={closePaymentPopup}
        maxWidth='md'
        fullWidth>
        <div className='p-8'>
          <Typography variant='h6' gutterBottom>
            Order Information
          </Typography>
          <form className='grid grid-cols-1 gap-4'>
            <input
              type='text'
              placeholder='Full Name'
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              className='border border-gray-300 p-2 rounded-md'
            />
            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className='border border-gray-300 p-2 rounded-md'
            />
            <input
              type='text'
              placeholder='Address'
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className='border border-gray-300 p-2 rounded-md'
            />
            <input
              type='text'
              placeholder='Phone Number'
              value={formData.phone_number}
              onChange={(e) =>
                handleInputChange('phone_number', e.target.value)
              }
              className='border border-gray-300 p-2 rounded-md'
            />
            <textarea
              placeholder='Note (Optional)'
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              className='border border-gray-300 p-2 rounded-md'
            />
          </form>
          <div className='flex justify-center mt-10'>
            <LoadingButton
              onClick={handleConfirmOrder}
              loading={isLoading}
              variant='contained'
              color='primary'
              disabled={isDisabled}>
              Confirm and Proceed
            </LoadingButton>
          </div>
        </div>
        <DialogActions>
          <Button onClick={closePaymentPopup} color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Cart
