/** @format */

import Link from 'next/link'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

const ProductItem = ({
  id,
  name,
  alt,
  uploadedImageUrls, 
  size,
  price,
  linkSrc,
  description,
  buyLinkSrc,
  cartLinkSrc,
  stock,
}) => {
  const queryParams = {
    id,
    name,
    alt,
   uploadedImageUrls,
    size,
    price,
    linkSrc,
    description,
    buyLinkSrc,
    cartLinkSrc,
    stock,
  }

  return (
    <div>
      <Card elevation={0}>
        <Link
          href={{
            pathname: 'product-info',
            query: queryParams,
          }}>
          <CardActionArea>
            <CardMedia
              component='img'
              className='w-48 h-40  md:w-full lg:h-72 hover:scale-105 transition-all'
              image={`https://hymcbwrcksuwhtfstztz.supabase.co/storage/v1/object/public/${uploadedImageUrls[0]}`}
              alt={alt}
            />
          </CardActionArea>
          <CardContent sx={{pl: 0}}>
            <p className='font-Plus-Jakarta-Sans text-base lg:text-xl text-slate-700 pb-2 uppercase'>
              {name}
            </p>
            <div>
              <h6 className='my-auto font-Plus-Jakarta-Sans text-base font-semibold lg:text-xl text-slate-700'>
                ₦{Number(price).toLocaleString()}
              </h6>
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  )
}

export default ProductItem
