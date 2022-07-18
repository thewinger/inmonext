import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className='py-4'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
