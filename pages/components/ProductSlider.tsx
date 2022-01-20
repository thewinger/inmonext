import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import React, {
  Children,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import ProductSliderControl from './ProductSliderControl'

type Props = {
  children?: React.ReactNode
}

const ProductSlider = ({ children }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const thumbsContainerRef = useRef<HTMLDivElement>(null)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    // slides: { perView: 1 },
    created: () => setIsMounted(true),
    slideChanged(s) {
      const slideNumber = s.track.details.rel
      setCurrentSlide(slideNumber)
    },
  })

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0

      // We set a threshold ( 10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the naigation. We prevent the
      // touchstart event in taht case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }

    const slider = sliderContainerRef.current!

    slider.addEventListener('touchstart', preventNavigation)

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', preventNavigation)
      }
    }
  }, [])

  // const onPrev = React.useCallback(() => slider.current?.prev(), [slider])
  // const onNext = React.useCallback(() => slider.current?.next(), [slider])

  return (
    <div
      ref={sliderContainerRef}
      className='relative w-full h-full select-none overflow-hidden slider-root'
    >
      <div
        ref={ref}
        className={`relative h-full transition-opacity duration-150  ${
          isMounted ? 'opacity-100' : ''
        } keen-slider`}
      >
        {/* {slider && <ProductSliderControl onPrev={onPrev} onNext={onNext} />} */}
        {Children.map(children, (child) => {
          // Add the keen-slider__slide className to children
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `aspect-[3/2] ${
                  child.props.className ? `${child.props.className} ` : ''
                }keen-slider__slide`,
              },
            }
          }
          return child
        })}
      </div>

      <div
        className='relative flex flex-wrap w-full h-full album bg-red-500/50'
        ref={thumbsContainerRef}
      >
        {slider &&
          Children.map(children, (child, idx) => {
            if (isValidElement(child)) {
              return {
                ...child,
                props: {
                  ...child.props,
                  className: `${
                    child.props.className
                  } overflow-hidden inline-block basis-1/3 cursor-pointer w-full aspect-[3/2] ${
                    currentSlide === idx ? 'border-2 border-red-500 ' : ''
                  }thumbnailItem`,
                  id: `thumb-${idx}`,
                  onClick: () => {
                    slider.current?.moveToIdx(idx)
                  },
                },
              }
            }
            return child
          })}
      </div>
    </div>
  )
}

export default ProductSlider
