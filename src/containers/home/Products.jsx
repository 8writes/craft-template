/** @format */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProductItem } from '@/components/UI'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Image from 'next/image'
import searchIcon from '../../../public/searchIcon.svg'

const Products = () => {
  // States
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('newest')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const subdomain = window.location.hostname.split('.')[0]
        const storeNameId = subdomain
        const response = await axios.get(
          `https://craaft.onrender.com/v1/api/fetch?store_name_id=${storeNameId}_product_partition`
        )
        const { error, data } = response.data
        if (error) {
          console.log('An error occurred', error)
        }
        const updatedProducts = data.map((item) => ({
          ...item,
          image: item.uploadedImageUrl1,
        }))
        setProducts(updatedProducts)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      setProducts([])
    }
  }, [])

  // Sorting options
  const sortFunctions = {
    newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    priceLow: (a, b) => a.price - b.price,
    priceHigh: (a, b) => b.price - a.price,
    availability: (a, b) => {
      if (a.stock === 'In Stock' && b.stock !== 'In Stock') return -1
      if (a.stock !== 'In Stock' && b.stock === 'In Stock') return 1
      return 0
    },
  }

  // Sort products based on the selected option
  const sortedProducts = [...products].sort(sortFunctions[sortOption])

  // Filter products based on search query
  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const itemsPerPage = 9
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      {/* Sorting options */}
      <div className='flex flex-wrap justify-end mb-10 mx-5 md:mx-16'>
        <span className='flex w-full md:w-1/4 gap-2 border-b mx-5 mb-5 md:mb-0 border-gray-500 '>
          <input
            type='text'
            className='outline-none bg-transparent font-semibold w-full text-base md:text-sm'
            placeholder='Search products'
            value={searchQuery}
            onChange={handleSearch}
          />
          <Image
            src={searchIcon}
            alt='Search icon'
            className='cursor-pointer'
            width={19}
            height={19}
          />
        </span>
        <label className='mr-2 font-semibold text-slate-700'>Filter:</label>
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

      <section className='px-1 md:px-10 my-auto'>
        {loading ? (
          <div className='text-center my-10'>
            <Typography variant='h5' className='text-gray-700'>
              Loading products...
            </Typography>
          </div>
        ) : !filteredProducts || filteredProducts.length === 0 ? (
          <div className='text-center my-10'>
            <Typography variant='h5' className='text-gray-700'>
              No products found
            </Typography>
          </div>
        ) : (
          <div className='flex mx-auto justify-center gap-5 md:gap-10 flex-wrap '>
            {currentItems.map((product, index) => (
              <div key={index} className='flex-initial w-40 md:w-64'>
                <ProductItem {...product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <div className='flex justify-center md:justify-end first-letter py-10 md:mx-40 md:px-40'>
        {Array.from({
          length: Math.ceil(filteredProducts.length / itemsPerPage),
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
    </div>
  )
}

export default Products
