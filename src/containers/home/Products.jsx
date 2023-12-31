/** @format */

'use client'
/** @format */

// Imports
import React from 'react'
import Link from 'next/link'
import { ProductItem } from '@/components/UI'
import Typography from '@mui/material/Typography'
import { usePage } from '../common/Provider/pageProvider'
import { useData } from '../common/Provider/dataProvider'

const Products = () => {
  // States
  const { currentPage, setCurrentPage } = usePage()
  const { products } = useData() // Access products from the context

  const itemsPerPage = 9
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <section className=' md:px-10'>
        {products.length === 0 ? (
          <div className='text-center my-10'>
            <Typography variant='h4' className='text-gray-700'>
              {products ? <>Loading...</> : <>No products yet.</>}
            </Typography>
          </div>
        ) : (
          <div className='flex mx-auto justify-center gap-5 md:gap-20 flex-wrap '>
            {currentItems.map((product, index) => (
              <div key={index} className='flex-initial w-40 md:w-64 xl:w-80 '>
                <ProductItem {...product} />
              </div>
            ))}
          </div>
        )}
      </section>

      <div className='flex justify-center md:justify-end first-letter py-10 md:mx-40 md:px-40'>
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              <Link href='#'>
                <Typography
                  variant='h6'
                  className={
                    index + 1 === currentPage
                      ? 'border-2 border-slate-100 rounded-sm  font-bold  px-3 text-black'
                      : 'font-bold px-3 text-black'
                  }
                  gutterBottom>
                  {index + 1}
                </Typography>
              </Link>
            </button>
          )
        )}
      </div>
    </>
  )
}

export default Products
