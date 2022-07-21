import { Thumb } from './ProductSliderThumb'
import useEmblaCarousel from 'embla-carousel-react'
import PropertyCard from './PropertyCard'
import { Property } from '../generated/graphql'
import Link from 'next/link'

type PropType = {
  properties: Property[]
}

const CardSlider = ({ properties }: PropType) => {
  const [mainViewportRef] = useEmblaCarousel({
    align: 'center',
    skipSnaps: false,
  })

  return (
    <div className='flex w-full flex-col'>
      <div className='embla relative m-0 block w-full overflow-hidden rounded p-0'>
        <div className='embla__viewport pb-4' ref={mainViewportRef}>
          <div className='embla__container flex gap-4'>
            {properties.map((property, i) => (
              <Link key={i} href={`/propiedades/${property.slug}`}>
                <a className='block w-10/12 shrink-0'>
                  <PropertyCard property={property}></PropertyCard>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSlider
