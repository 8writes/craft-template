/** @format */
'use client'

import { createContext, useContext, useState } from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [productData, setProductData] = useState(null)

  return (
    <ProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  return useContext(ProductContext)
}
