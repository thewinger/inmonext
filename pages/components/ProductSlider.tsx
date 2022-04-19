import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react'
import { Thumb } from './ProductSliderThumb'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'


type PropType = {
   slides: object
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
      <div className="embla">
        <div className="embla__viewport" ref={mainViewportRef}>
          <div className="embla__container">
            {slides &&
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <Image
                    className="embla__slide__img"
                    src={slide.sourceUrl}
                    alt={slide.title}
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
                imgSrc={slide.sourceUrl}
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
