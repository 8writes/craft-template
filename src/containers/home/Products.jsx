/** @format */

'use client'
// Imports
import React, { useState } from 'react'
import Link from 'next/link'
import { ProductItem } from '@/components/UI'
import Typography from '@mui/material/Typography'
import { usePage } from '../common/Provider/pageProvider'
import { useData } from '../common/Provider/dataProvider'

const Products = () => {
  // States
  const { currentPage, setCurrentPage } = usePage()
  const { products } = useData()

  const [sortOption, setSortOption] = useState('newest')

  // Sorting options
  const sortFunctions = {
    newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    priceLow: (a, b) => a.price - b.price,
    priceHigh: (a, b) => b.price - a.price,
    availability: (a, b) => {
      // Use 'Stock' value directly for sorting
      if (a.stock === 'In Stock' && b.stock !== 'In Stock') return -1 // In Stock comes first
      if (a.stock !== 'In Stock' && b.stock === 'In Stock') return 1 // Out of Stock comes second
      return 0 // No change if both have the same availability status
    },
  }

  // Sort products based on the selected option
  const sortedProducts = [...products].sort(sortFunctions[sortOption])

  const itemsPerPage = 9
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {/* Sorting options */}
      <div className='flex justify-end  mb-10 mx-5 md:mx-24'>
        <label className='mr-2 font-semibold text-slate-700'>Sort by:</label>
        <select
          value={sortOption}
          className=' cursor-pointer'
          onChange={(e) => setSortOption(e.target.value)}>
          <option value='newest' className=' cursor-pointer border-none'>
            Newest
          </option>
          <option value='availability'>Availability</option>
          <option value='priceLow'>Price: Low to High</option>
          <option value='priceHigh'>Price: High to Low</option>
        </select>
      </div>

      <section className='px-1 md:px-10'>
        {!sortedProducts.length && (
          <div className='text-center my-10'>
            <Typography variant='h5' className='text-gray-700'>
              No products found
            </Typography>
          </div>
        )}
        {sortedProducts.length === 0 ? (
          <div className='text-center my-10'>
            <Typography variant='h4' className='text-gray-700'>
              Loading products...
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

      {/* Pagination */}
      <div className='flex justify-center md:justify-end first-letter py-10 md:mx-40 md:px-40'>
        {Array.from({
          length: Math.ceil(sortedProducts.length / itemsPerPage),
        }).map((_, index) => (
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
        ))}
      </div>
    </>
  )
}

export default Products
