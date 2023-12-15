
import { ProductSingle, SecondaryNav } from "@/components/UI";

const ProductInfo = () => {
  return (
    <>
      <section className='bg-slate-800 grid py-24'>
        <SecondaryNav />
        <div>
          <ProductSingle />
        </div>
      </section>
    </>
  )
};

export default ProductInfo;
