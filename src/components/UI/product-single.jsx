/** @format */

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useCart } from '../../containers/common/Provider/cartProvider'
import { useSearchParams } from 'next/navigation'
import { ProductImages } from '.'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, Grid, Typography } from '@mui/material'

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

  const [success, setSuccess] = useState('')
  const [failed, setFailed] = useState('')

  // State for selected size and error message
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size)
    setErrorMessage('')
  }

  const isOutOfStock = stock === 'Out of Stock'
  
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
      setSuccess('Item added to cart')
    } else {
      setErrorMessage('Please select a size.')
    }
    // Reset success and failure after a delay
    setTimeout(() => {
      setSuccess('')
    }, 2000)
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
      {success && (
        <Grid
          item
          xs={7}
          sx={{ m: 3, position: 'fixed', top: 50, right: 0, right: 0, zIndex: 55 }}>
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
          sx={{ m: 3, position: 'fixed', top: 10, right: 0, zIndex: 55 }}>
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
      {/* Product details section */}
      <section id={id} className='flex flex-wrap gap-10 justify-center px-5'>
        {/* Product images */}
        <div className='flex max-w-sm md:w-5/12 md:max-w-xl my-5'>
          <ProductImages
            images={uploadedImageUrls.map((src, index) => ({ src, alt }))}
          />
        </div>
        {/* Product information */}
        <div className='flex-1 max-w-sm md:flex-initial'>
          <Paper
            elevation={0}
            className='grid gap-5 px-3 sm:px-10 md:py-5 lg:px-5 lg:py-5 lg:w-96'>
            {/* Product name */}
            <Typography
              sx={{ textTransform: 'uppercase' }}
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
                    className={`px-4 py-1 text-slate-800 uppercase ${
                      selectedSize === singleSize
                        ? ' border-2 border-green-500 '
                        : 'border-2 border-slate-300'
                    }`}
                    onClick={() => handleSizeClick(singleSize)}
                    disabled={isOutOfStock}>
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
              Stock:
              <div className='uppercase'>
                <span
                  style={{
                    color: stock === 'In Stock' ? 'green' : 'red',
                    fontWeight: '550',
                  }}>
                  {stock}
                </span>
              </div>
            </Typography>
            {/* Product price */}
            <Typography
              className='text-gray-800 px-1 '
              variant='h5'
              component='div'>
              ₦{Number(price).toLocaleString()}
            </Typography>
            {/* Buy Now and Add to Cart buttons */}
            <span className='flex gap-5'>
              <Button
                onClick={handleBuyNow}
                sx={{ borderRadius: '0px' }}
                size='medium'
                color='success'
                variant='outlined'
                disabled={isOutOfStock}>
                Buy Now
              </Button>
              <Button
                sx={{ borderRadius: '0px' }}
                onClick={handleAddToCart}
                href={cartLinkSrc}
                disabled={isAdded || isOutOfStock}
                size='medium'
                color='primary'
                variant='outlined'>
                {isAdded ? 'Added to cart' : 'Add to cart'}
              </Button>
            </span>
            {/* Product description */}
            <Typography variant='p' sx={{ my: '10px' }}>
              <span className='uppercase text-base font-medium'>
                Product Description:
              </span>{' '}
              <br />
              <Typography variant='body1'>{description}</Typography>
            </Typography>
          </Paper>
        </div>
      </section>
    </>
  )
}

export default ProductSingle
