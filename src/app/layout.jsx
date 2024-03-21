/** @format */

import { CartProvider } from '@/context/cartContext'
import { PageProvider } from '@/context/pageContext'
import { DataProvider } from '@/context/dataContext'
import { SortProvider } from '@/context/sortContext'
import './globals.css'

export const metadata = {
  title: '',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <DataProvider>
      <PageProvider>
          <CartProvider>
            <SortProvider>
              <html lang='en' className='scroll-smooth'>
                <body>{children}</body>
              </html>
            </SortProvider>
          </CartProvider>
      </PageProvider>
    </DataProvider>
  )
}
