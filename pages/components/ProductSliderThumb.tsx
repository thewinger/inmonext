import Image from "next/image";
import { MouseEventHandler } from "react";

type PropType = {
  selected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  imgSrc: string;
  imgTitle: string;
};

export const Thumb = ({ selected, onClick, imgSrc, imgTitle }: PropType) => (
  <div
    className={`embla__slide embla__slide--thumb h-full w-1/5 shrink-0 rounded opacity-50 transition-opacity ${
      selected ? "is-selected border-2 border-green-500 opacity-100" : ""
    }`}
  >
    <button
      onClick={onClick}
      className="embla__slide__inner embla__slide__inner--thumb  relative h-full w-full "
      type="button"
    >
      <Image
        className="embla__slide__thumbnail  relative block rounded"
        src={imgSrc}
        alt={imgTitle}
        layout="fill"
        objectFit="cover"
        priority
      />
    </button>
  </div>
);
