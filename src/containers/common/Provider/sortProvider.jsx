/** @format */
'use client'
// Create a new file (e.g., SortContext.js)
import React, { createContext, useContext, useState } from 'react'

const SortContext = createContext()

export const SortProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState('newest')

  return (
    <SortContext.Provider value={{ sortOption, setSortOption }}>
      {children}
    </SortContext.Provider>
  )
}

export const useSort = () => {
  return useContext(SortContext)
}
