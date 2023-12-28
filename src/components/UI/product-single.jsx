/** @format */

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useCart } from '../../containers/common/Provider/cartProvider'
import { useSearchParams } from 'next/navigation'
import { ProductImages } from '.'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ProductSingle = () => {
  // Initialize Next.js router
  const router = useRouter()

  // Get URL search parameters
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const alt = searchParams.get('alt')
  const uploadedImageUrls = searchParams.getAll('uploadedImageUrls')
  const sizes = searchParams.getAll('size')
  const price = searchParams.get('price')
  const description = searchParams.get('description')
  const cartLinkSrc = searchParams.get('cartLinkSrc')
  const stock = searchParams.get('stock')

  // Cart context
  const { cartDispatch, addedState } = useCart()

  // Check if the product is already added to the cart
  const isAdded = addedState[id]

  // State for selected size and error message
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size)
    setErrorMessage('')
  }

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    if (!isAdded && selectedSize) {
      // Dispatch action to add the product to the cart
      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          id,
          price,
          name,
          size: selectedSize,
          uploadedImageUrl: uploadedImageUrls[0],
        },
      })
      // Update the added state
      addedState[id] = true
    } else {
      setErrorMessage('Please select a size.')
    }
  }

  // Handle buying the product
  const handleBuyNow = () => {
    if (!isAdded && selectedSize) {
      // Dispatch action to add the product to the cart
      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          id,
          price,
          name,
          size: selectedSize,
          uploadedImageUrl: uploadedImageUrls[0],
        },
      })
      // Update the added state
      addedState[id] = true
    } else {
      setErrorMessage('Please select a size.')
    }
    if (selectedSize) {
      // Redirect to the cart page
      router.push('/cart')
    }
  }

  return (
    <>
      {/* Product details section */}
      <section id={id} className='flex flex-wrap gap-10 justify-center px-5'>
        {/* Product images */}
        <div className='flex-1 xl:flex-initial lg:w-5/12 my-5'>
          <ProductImages
            images={uploadedImageUrls.map((src, index) => ({ src, alt }))}
          />
        </div>
        {/* Product information */}
        <div className=' my-auto flex-1  md:flex-initial'>
          <Paper
            elevation={3}
            className='grid gap-5 border-4 border-white px-3 py-5 sm:px-20 md:py-5 lg:px-5 lg:py-5 lg:w-96'>
            {/* Product name */}
            <Typography
              className='text-gray-800'
              gutterBottom
              variant='h5'
              component='div'>
              {name}
            </Typography>
            {/* Size selection */}
            <Typography
              variant='subtitle1'
              color='text.secondary'
              className='text-slate-700'>
              Size:
              <div className='flex flex-wrap gap-2'>
                {sizes.map((singleSize, index) => (
                  <button
                    key={index}
                    className={`p-2 border-2 border-slate-300 ${
                      selectedSize === singleSize ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => handleSizeClick(singleSize)}>
                    {singleSize}
                  </button>
                ))}
              </div>
            </Typography>
            {/* Error message for size selection */}
            {errorMessage && (
              <span className='text-red-500'>{errorMessage}</span>
            )}
            {/* Stock status */}
            <Typography
              variant='subtitle1'
              color='text.secondary'
              className='text-slate-700'>
              Stock:{' '}
              <span
                style={{
                  color: stock === 'In Stock' ? 'green' : 'red',
                  fontWeight: '550',
                }}>
                {stock}
              </span>
            </Typography>
            {/* Product price */}
            <Typography
              className='text-gray-800 rounded-sm px-1 bg-slate-200'
              variant='h5'
              component='div'>
              ₦{Number(price).toLocaleString()}
            </Typography>
            {/* Buy Now and Add to Cart buttons */}
            <span className='flex gap-5'>
              <Button
                onClick={handleBuyNow}
                size='medium'
                color='success'
                variant='outlined'>
                Buy Now
              </Button>
              <Button
                onClick={handleAddToCart}
                href={cartLinkSrc}
                disabled={isAdded}
                size='medium'
                color='primary'
                variant='outlined'>
                {isAdded ? 'Added to cart' : 'Add to cart'}
              </Button>
            </span>
            {/* Product description */}
            <Typography variant='p' className=' font-medium'>
              <span className='text-slate-700 text-lg'>
                Product Description:
              </span>{' '}
              <br />
              {description}
            </Typography>
          </Paper>
        </div>
      </section>
    </>
  )
}

export default ProductSingle
