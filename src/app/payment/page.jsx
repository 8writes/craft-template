/** @format */
'use client'

import React, { useState, useEffect } from 'react'

const PaymentForm = () => {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    const paymentForm = document.getElementById('paymentForm')
    paymentForm.addEventListener('submit', payWithPaystack, false)

    return () => {
      paymentForm.removeEventListener('submit', payWithPaystack, false)
    }
  }, [])

  const validateForm = () => {
    // Add your form validation logic here
    if (!email || !amount || !firstName || !lastName) {
      alert('All fields are required')
      return false
    }

    // Additional validation logic can be added

    return true
  }

  const payWithPaystack = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    let handler = window.PaystackPop.setup({
      key: 'pk_test_xxxxxxxxxx', // Replace with your public key
      email: email,
      amount: amount * 100,
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      onClose: function () {
        alert('Window closed.')
      },
      callback: function (response) {
        let message = 'Payment complete! Reference: ' + response.reference
        alert(message)
      },
    })

    handler.openIframe()
  }

  return (
    <form
      id='paymentForm'
      className='max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md'>
      <div className='mb-4'>
        <label
          htmlFor='email-address'
          className='block text-gray-700 text-sm font-bold mb-2'>
          Email Address
        </label>
        <input
          type='email'
          id='email-address'
          className='w-full p-2 border border-gray-300 rounded'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='amount'
          className='block text-gray-700 text-sm font-bold mb-2'>
          Amount
        </label>
        <input
          type='tel'
          id='amount'
          className='w-full p-2 border border-gray-300 rounded'
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='first-name'
          className='block text-gray-700 text-sm font-bold mb-2'>
          First Name
        </label>
        <input
          type='text'
          id='first-name'
          className='w-full p-2 border border-gray-300 rounded'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='last-name'
          className='block text-gray-700 text-sm font-bold mb-2'>
          Last Name
        </label>
        <input
          type='text'
          id='last-name'
          className='w-full p-2 border border-gray-300 rounded'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className='text-center'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Pay
        </button>
      </div>
    </form>
  )
}

export default PaymentForm
