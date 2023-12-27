/** @format */

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useCart } from '../../containers/common/Provider/cartProvider'
import { useSearchParams } from 'next/navigation'
import { ProductImages } from '.'

const ProductSingle = () => {
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

  const { cartDispatch, addedState } = useCart()

  const isAdded = addedState[id]

 const handleAddToCart = () => {
   if (!isAdded) {
     cartDispatch({
       type: 'ADD_TO_CART',
       payload: { id, price, name, size, uploadedImageUrl1 },
     })
     addedState[id] = true
   }
 }

 const formatCartForWhatsApp = () => {
   return `${description} size:${sizes} - ₦${Number(price).toLocaleString()}\n`
 }

 const phoneNumber = '+2348155151818' // Replace with the desired phone number
 const message = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
   `
--//  SEND PAYMENT SLIP TO CONFIRM ORDER  //--

CHECKOUT MY CART:

${formatCartForWhatsApp()}

Total Price: ₦${Number(price).toLocaleString()}
OrderID: ${id}

--//  KINDLY MAKE PAYMENT TO: 9165911020, OPAY, ADEGOROYE ADEIGBE SIJUADE  //--
`
 )}`


  return (
    <>
      <section id={id} className='flex flex-wrap gap-10 justify-center px-5'>
        <div className='flex-1 xl:flex-initial lg:w-5/12 my-5'>
          <ProductImages
            images={uploadedImageUrls.map((src, index) => ({ src, alt }))}
          />
        </div>
        <div className=' my-auto flex-1  md:flex-initial'>
          <Paper
            elevation={3}
            className='grid gap-5 border-4 border-white px-3 py-5 sm:px-20 md:py-5 lg:px-5 lg:py-5 lg:w-80'>
            <Typography
              className='text-gray-800'
              gutterBottom
              variant='h5'
              component='div'>
              {name}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              className='text-slate-700'>
              Size:
              <div className='flex flex-wrap gap-2'>
                {sizes.map((singleSize, index) => (
                  <span key={index} className='p-2 border-2 border-slate-300'>
                    {singleSize}
                  </span>
                ))}
              </div>
            </Typography>
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
            <Typography
              className='text-gray-800 rounded-sm px-1 bg-slate-200'
              variant='h5'
              component='div'>
              ₦{Number(price).toLocaleString()}
            </Typography>
            <span className='flex gap-5'>
              <Button
                href={message}
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
