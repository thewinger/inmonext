import Image from "next/image";
import { MouseEventHandler } from "react";


type PropType = {
  selected: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
  imgSrc: string,
  imgTitle: string,
}

export const Thumb = ({ selected, onClick, imgSrc, imgTitle }: PropType) => (
  <div
    className={`embla__slide embla__slide--thumb ${
      selected ? "is-selected" : ""
    }`}
  >
    <button
      onClick={onClick}
      className="embla__slide__inner embla__slide__inner--thumb"
      type="button"
    >
      <Image className="embla__slide__thumbnail" src={imgSrc} alt={imgTitle} layout="fill" />
    </button>
  </div>
);
