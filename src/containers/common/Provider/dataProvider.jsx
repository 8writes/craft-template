
/**'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
        //  ` https://craaft.onrender.com/v1/api/fetch?store_name_id=teststore_product_partition`,
          { withCredentials: true }
        )

        const { error, data } = response.data

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
}*/
