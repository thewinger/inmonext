import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/Logo_Inmogolf.png'
import { useState } from 'react'
import { useRouter } from 'next/router'

let headerNav = [
  { title: 'Inicio', href: '/' },
  { title: 'Venta', href: '/venta' },
  { title: 'Alquiler', href: '/alquiler' },
  { title: 'Obra Nueva', href: '/obra-nueva' },
  { title: 'Contacto', href: '/contacto' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }

  const router = useRouter()

  return (
    <header className='sticky top-0 z-50 flex w-full flex-wrap items-start justify-between border-b-2 border-gray-50 bg-white/80 py-2 px-4 pr-3 backdrop-blur-md '>
      <Link href='/'>
        <a className='relative h-12 w-48'>
          <span className='sr-only'>InmoGolf Bonalba home page</span>
          <Image
            src={logo}
            alt='InmoGolf Bonalba'
            layout='fill'
            objectFit='contain'
            objectPosition='center left'
            priority
          />
        </a>
      </Link>
      <button
        onClick={handleClick}
        className={`${
          menuOpen
            ? 'bg-gradient-to-b from-green-600 to-green-700 text-white'
            : 'text-green-600'
        } ml-auto inline-flex rounded from-green-600 to-green-700 p-3 outline-none hover:bg-gradient-to-b hover:text-white`}
      >
        {menuOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        )}
      </button>
      <nav
        className={`${
          menuOpen ? '' : 'hidden'
        } absolute left-0 top-[4.5rem] w-full rounded-lg border-2 border-white bg-white/95 shadow-xl backdrop-blur-md`}
      >
        <div className='flex w-full flex-col'>
          {headerNav.map((item, i) => (
            <Link key={i} href={item.href}>
              <a
                className={`${
                  router.pathname == item.href ? 'bg-green-100' : ''
                } rounded-md from-green-600 to-green-700 p-4 text-lg font-medium text-green-900 hover:bg-gradient-to-b hover:font-semibold hover:text-white `}
              >
                {item.title}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
