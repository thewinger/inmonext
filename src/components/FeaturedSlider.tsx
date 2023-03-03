import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "../generated/graphql";
import Shimmer from "./Shimmer";

type PropType = {
  properties: Property[];
};

const FeaturedSlider = ({ properties }: PropType) => {
  console.log(`properties:`, properties);
  const [mainViewportRef] = useEmblaCarousel({
    align: "center",
    skipSnaps: false,
  });

  return (
    <div className="flex w-full flex-col">
      <div className="embla relative m-0 block w-full overflow-hidden rounded p-0">
        <div className="embla__viewport pb-4" ref={mainViewportRef}>
          <div className="embla__container flex gap-4">
            {properties.map((property, i) => (
              <Link key={i} href={`/propiedades/${property.slug}`}>
                <a className="">
                  {property &&
                    property.attachedMedia &&
                    property.attachedMedia.nodes && (
                      <Image
                        src={
                          property.attachedMedia.nodes[0].sourceUrl as string
                        }
                        title={property.attachedMedia.nodes[0].title as string}
                        layout="fill"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL={Shimmer}
                      />
                    )}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSlider;
