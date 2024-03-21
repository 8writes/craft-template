/** @format */

import { Footer, Header } from '@/common'

export default function Template({ showHeader, children, showFooter }) {
  return (
    <>
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </>
  )
}
