/** @format */

import { CartProvider } from '@/containers/common/Provider/cartProvider'
import { PageProvider } from '@/containers/common/Provider/pageProvider'
import { DataProvider } from '@/containers/common/Provider/dataProvider'
import { SortProvider } from '@/containers/common/Provider/sortProvider'
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
