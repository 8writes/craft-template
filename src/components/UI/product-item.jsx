/** @format */

import Link from 'next/link'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
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
              className='w-48 h-40  lg:w-full lg:h-72 hover:scale-105 transition-all'
              image={`https://hymcbwrcksuwhtfstztz.supabase.co/storage/v1/object/public/${uploadedImageUrls[0]}`}
              alt={alt}
            />
          </CardActionArea>
          <CardContent>
            <Typography
              className='font-Plus-Jakarta-Sans text-base lg:text-xl text-slate-700 pb-2'
              gutterBottom
              component='div'>
              {name}
            </Typography>
            <div className='flex justify-end'>
              <h6 className='my-auto  px-2 font-Plus-Jakarta-Sans text-base font-semibold lg:text-xl text-slate-700'>
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
