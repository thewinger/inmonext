import Image from "next/image";


export const Thumb = ({ selected, onClick, imgSrc, imgTitle }) => (
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
