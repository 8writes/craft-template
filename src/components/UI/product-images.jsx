/* eslint-disable @next/next/no-img-element */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductImages = ({ images }) => {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      className='border border-gray-200 bg-white'>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={`https://hymcbwrcksuwhtfstztz.supabase.co/storage/v1/object/public/${image.src}`}
            alt={image.alt}
          />
        </div>
      ))}
    </Carousel>
  )
};

export default ProductImages;
