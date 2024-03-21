/** @format */

import Link from 'next/link'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { useDispatch } from 'react-redux'
import { setProductData } from '../../redux/actions'

const ProductItem = ({
  id,
  name,
  alt,
  uploaded_image_urls,
  size,
  price,
  color,
  linkSrc,
  description,
  buyLinkSrc,
  cartLinkSrc,
  stock,
}) => {
   const dispatch = useDispatch()

   const handleClick = () => {
     dispatch(
       setProductData({
         id,
         name,
         alt,
         uploaded_image_urls,
         size,
         price,
         color,
         linkSrc,
         description,
         buyLinkSrc,
         cartLinkSrc,
         stock,
       })
     )
  }
  
  return (
    <div>
      <Card onClick={handleClick} elevation={0}>
        <Link
          href={{
            pathname: 'product-info',
          }}>
          <CardActionArea>
            <CardMedia
              component='img'
              className='w-48 h-40  md:w-full lg:h-72 hover:scale-105 transition-all'
              image={uploaded_image_urls[0]}
              alt={alt}
            />
          </CardActionArea>
          <CardContent sx={{ pl: 0, pr: 0 }}>
            <p className='font-Plus-Jakarta-Sans text-base lg:text-xl text-slate-700 pb-2 uppercase'>
              {name}
            </p>
            <div className='flex justify-between gap-6'>
              <>
                <h6 className='my-auto font-Plus-Jakarta-Sans text-base lg:text-xl text-slate-700'>
                  ₦{Number(price).toLocaleString()}
                </h6>
              </>
              <>
                {stock === 'Out of Stock' && (
                  <p className='my-auto font-Plus-Jakarta-Sans text-sm lg:text-xl text-red-700 pb-2 uppercase'>
                    {stock}
                  </p>
                )}
              </>
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  )
}

export default ProductItem
