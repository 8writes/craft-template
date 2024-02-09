/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ProductImages = ({ images }) => {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      swipeable={true}
      dynamicHeight={false}
      thumbWidth={60}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={`${image.src}`}
            alt={image.alt}
            style={{ maxHeight: '550px' }}
          />
        </div>
      ))}
    </Carousel>
  )
}

export default ProductImages
