/** @format */

'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const DataContext = createContext()

export function DataProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('royeshoes').select()

        if (error) {
          console.log('An error occurred', error)
        }

        // Update the id field with sequential count and add image URL
        const updatedProducts = data.map((item) => ({
          ...item,
          image: item.uploadedImageUrl1,
        }))

        setProducts(updatedProducts)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()

    // Cleanup function to avoid memory leaks
    return () => {
      setProducts([])
    }
  }, [])

  return (
    <DataContext.Provider value={{ products }}>{children}</DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
