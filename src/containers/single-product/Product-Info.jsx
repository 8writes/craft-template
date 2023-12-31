
import { ProductSingle, SecondaryNav } from "@/components/UI";

const ProductInfo = () => {
  return (
    <>
      <section className='bg-white grid py-24'>
        <SecondaryNav />
        <div>
          <ProductSingle />
        </div>
      </section>
    </>
  )
};

export default ProductInfo;
