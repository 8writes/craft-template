/** @format */

import { CartProvider } from '@/containers/common/Provider/cartProvider'
import { PageProvider } from '@/containers/common/Provider/pageProvider'
import { DataProvider } from '@/containers/common/Provider/dataProvider'
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
          <html lang='en' className='scroll-smooth'>
            <body>{children}</body>
          </html>
        </CartProvider>
      </PageProvider>
    </DataProvider>
  )
}
