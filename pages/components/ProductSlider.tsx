import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'
import { Thumb } from './ProductSliderThumb'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Shimmer from './Shimmer'


type PropType = {
   slides: []
}

const ProductSlider = ({ slides }: PropType) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
    },
    [embla, emblaThumbs]
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])


  return (
   <div className='flex flex-col w-full'>
      <div className="embla relative overflow-hidden m-0 block w-full rounded p-0 mb-4">
        <div className="embla__viewport aspect-w-3 aspect-h-2" ref={mainViewportRef}>
          <div className="embla__container flex gap-2">
            {slides.map((slide, index) => (
              <div className="embla__slide min-w-full" key={index}>
                <div className="embla__slide__inner rounded relative overflow-hidden aspect-w-3 aspect-h-2">
                  <Image
                    className="embla__slide__img relative block flex-[0_0_100%]"
                    src={slide['sourceUrl']}
                    alt={slide['title']}
                    layout='fill'
                    placeholder='blur'
                    blurDataURL={Shimmer}
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="embla embla--thumb relative overflow-hidden m-0 block w-full rounded p-0 mb-4">
        <div className="embla__viewport aspect-w-3 aspect-h-2" ref={thumbViewportRef}>
          <div className="embla__container embla__container--thumb flex gap-1">
           {slides && slides.map((slide, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={slide['sourceUrl']}
                imgTitle={slide['title']}
                key={index}
              />
           ))}
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSlider
