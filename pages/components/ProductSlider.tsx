import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'
import { Thumb } from './ProductSliderThumb'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'


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
   <>
      <div className="embla relative overflow-hidden m-0 block w-full rounded p-0 mb-4">
        <div className="embla__viewport aspect-w-3 aspect-h-2" ref={mainViewportRef}>
          <div className="embla__container flex gap-2">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <Image
                    className="embla__slide__img"
                    src={slide['sourceUrl']}
                    alt={slide['title']}
                    layout='fill'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="embla embla--thumb">
        <div className="embla__viewport" ref={thumbViewportRef}>
          <div className="embla__container embla__container--thumb">
           {slides && slides.map((slide, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={slide['sourceUrl']}
                key={index}
              />
           ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSlider
