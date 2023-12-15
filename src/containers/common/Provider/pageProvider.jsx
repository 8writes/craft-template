"use client"
import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export function PageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
