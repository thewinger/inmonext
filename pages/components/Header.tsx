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
  const [menuOpen, setMenuOpen] = useState(true)

  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }

  const router = useRouter()

  return (
    <>
      <header className='relative flex flex-wrap justify-between items-start py-2 px-4 pr-3 rounded-lg bg-white/75 border-2 border-white shadow-xl '>
        <Link href='/'>
          <a className='w-48 h-12 relative'>
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
            menuOpen ? 'bg-emerald-600 text-white' : 'text-emerald-600'
          } inline-flex p-3 rounded ml-auto outline-none hover:bg-emerald-600 hover:text-white`}
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
          } absolute left-0 top-[4.5rem] w-full rounded-lg bg-white/95 border-2 border-white shadow-xl`}
        >
          <div className='w-full flex flex-col'>
            {headerNav.map((item, i) => (
              <Link key={i} href={item.href}>
                <a
                  className={`${
                    router.pathname == item.href ? 'bg-emerald-100' : ''
                  } p-4 text-emerald-900 font-medium text-lg rounded-md hover:text-white hover:bg-emerald-600`}
                >
                  {item.title}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
