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
      <Card className=' rounded-lg border-2 border-white'>
        <CardActionArea>
          <Link
            href={{
              pathname: 'product-info',
              query: queryParams,
            }}>
            <CardMedia
              component='img'
              className=' w-full h-72 hover:scale-105 transition-all'
              image={`https://hymcbwrcksuwhtfstztz.supabase.co/storage/v1/object/public/${uploadedImageUrls[0]}`}
              alt={alt}
            />

            <CardContent>
              <Typography
                className='font-Plus-Jakarta-Sans text-slate-700 pb-2'
                gutterBottom
                variant='h5'
                component='div'>
                {name}
              </Typography>
              <div className='flex justify-end'>
                <h6 className='my-auto bg-gray-100 rounded-md  px-2 font-Plus-Jakarta-Sans text-2xl font-medium md:text-1xl text-gray-800'>
                  ₦{Number(price).toLocaleString()}
                </h6>
              </div>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default ProductItem
