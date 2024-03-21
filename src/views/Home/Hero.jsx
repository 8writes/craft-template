/* eslint-disable @next/next/no-img-element */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typography from "@mui/material/Typography";

const Hero = () => {
  const images = [
    {
      id: "1",
      alt: "No image available",
      src: "/product.jpg",
      price: "6,000",
      description: "Kids Shoe",
    },
    {
      id: "2",
      alt: "No image available",
      src: "/product-2.jpg",
      price: "6,000",
      description: "Kids Shoe",
    },
    {
      id: "3",
      alt: "No image available",
      src: "/product-3.jpg",
      price: "6,000",
      description: "Kids Shoe",
    },
  ];

  return (
    <>
      <section>
        <div className="flex justify-center my-10 md:my-5 ">
          <div className="grid gap-5 md:gap-10 max-w-7xl justify-items-center text-center py-5 md:py-5 px-5 md:px-10">
              <Carousel
              showArrows={true}
              emulateTouch={true}
              infiniteLoop={true}
              autoPlay={true}
              showThumbs={false}
              stopOnHover={false}
              interval={4000}
              className="border border-gray-200"
            >
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img className="max-h-96" src={image.src} alt={image.alt} />
                  <div className="absolute text-start top-40 left-10 md:inset-y-52 md:left-14 ">
                    <Typography variant="h2" className=" font-bold text-white">
                      {image.description}
                    </Typography>
                    <Typography
                      variant="h5"
                      className=" text-white"
                    >{`Price: ${image.price}`}</Typography>
                  </div>
                </div>
              ))}
            </Carousel> 
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
