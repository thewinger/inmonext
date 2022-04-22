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
    className={`embla__slide embla__slide--thumb w-1/5 basis-1/5 ${
      selected ? "is-selected" : ""
    }`}
  >
    <button
      onClick={onClick}
      className="embla__slide__inner embla__slide__inner--thumb block w-full rounded overflow-hidden relative h-full"
      type="button"
    >
      <Image className="embla__slide__thumbnail relative block min-w-full" src={imgSrc} alt={imgTitle} layout="fill" priority/>
    </button>
  </div>
);
