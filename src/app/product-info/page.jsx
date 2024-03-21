/** @format */

import Template from '../template'
import { ProductSingle, SecondaryNav } from '@/components/UI'

const Page = () => {
  return (
    <Template showHeader={true} showFooter={true}>
      <section className='bg-white grid py-20'>
        <SecondaryNav />
        <div>
          <ProductSingle />
        </div>
      </section>
    </Template>
  )
}

export default Page
