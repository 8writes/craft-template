/** @format */

import Link from 'next/link'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { useSearchParams } from 'next/navigation'

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

  const queryParams = {
    id: id,
    name: name,
    alt: alt,
    uploaded_image_urls: uploaded_image_urls,
    size: size,
    price: price,
    color: color,
    linkSrc: linkSrc,
    description: description,
    buyLinkSrc: buyLinkSrc,
    cartLinkSrc: cartLinkSrc,
    stock: stock,
  }

  return (
    <div>
      <Card elevation={0}>
        <Link
          href={{
            pathname: 'product',
            query: queryParams,
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
