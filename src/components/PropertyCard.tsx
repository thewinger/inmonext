import { Property } from '../generated/graphql'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

type Props = {
  property?: Property
}

const PropertyCard = ({ property }: Props) => {
  return (
    <>
      {property && (
        <div className='relative flex h-full w-full min-w-full flex-col gap-4 rounded-md border-2 border-white bg-white/90 p-4 text-slate-800 shadow-md backdrop-blur-md'>
          {property.attachedMedia && property.attachedMedia.nodes && (
            <div className='aspect-w-3 aspect-h-2 relative w-full'>
              <Image
                className='relative block rounded'
                src={property.attachedMedia.nodes[0].sourceUrl as string}
                alt={property.attachedMedia.nodes[0].title}
                layout='fill'
                objectFit='cover'
                priority
              />
            </div>
          )}
          {property.property_info && (
            <div className='absolute top-6 left-6 shrink-0 rounded-md border bg-white/60 py-1 px-2 text-xs font-semibold uppercase text-green-900 shadow-sm backdrop-blur-md  '>
              {property.property_info.statustag}
            </div>
          )}
          {property.property_info &&
            property.locations &&
            property.property_features && (
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between gap-4 sm:justify-start'>
                  {property.property_info && property.property_info.price && (
                    <h3 className='font-sans text-xl font-semibold tracking-wide text-green-700 '>
                      <div className='flex items-baseline'>
                        <span className='font-bold '>
                          <NumberFormat
                            isNumericString={true}
                            value={property.property_info?.price}
                            displayType='text'
                            thousandSeparator={true}
                            prefix='€'
                          />
                        </span>
                        {property.property_info.statustag === 'En Alquiler' && (
                          <span className='text-xs font-medium '>/mes</span>
                        )}
                      </div>
                    </h3>
                  )}
                </div>
                <div className='xsgap-2  flex flex-col'>
                  {property.categories && property.categories.nodes && (
                    <div className='flex items-center gap-2 text-lg text-slate-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                        />
                      </svg>
                      <span className='text-md font-medium capitalize text-slate-800'>
                        {property.categories.nodes[0].name}
                      </span>
                    </div>
                  )}

                  {property.locations && property.locations.nodes && (
                    <div className='flex items-center gap-2 text-lg text-slate-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      {property.locations.nodes.map((location,index) => (
                        <div
                          className='capitalize text-slate-800'
                          key={index}
                        >
                          {location!.ancestors && location!.ancestors.nodes && (
                            <span>{location!.ancestors.nodes[0].name} - </span>
                          )}
                          <span>{location!.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className='flex justify-around'>
                  {property.property_features &&
                    property.property_features.bedrooms && (
                      <div className='flex gap-1 text-lg text-slate-500 only:grow only:self-start'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 7v12m18-7v7M3 14c0-.552.895-1 2-1h14c1.105 0 2 .448 2 1v2c0 .552-.895 1-2 1H5c-1.105 0-2-.448-2-1v-2zm2-3.25c0-.414.249-.75.556-.75h3.888c.307 0 .556.336.556.75v1.5c0 .414-.249.75-.556.75H5.556C5.249 13 5 12.664 5 12.25v-1.5z'
                          />
                        </svg>
                        <span className='text-md font-medium text-slate-800'>
                          {property.property_features.bedrooms}
                        </span>
                      </div>
                    )}

                  {property.property_features &&
                    property.property_features.bathrooms && (
                      <div className='flex items-center gap-1 text-lg text-slate-500 only:grow only:self-start'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='m7 18-1 1M6 12V6c0-2 1-3 3-3v0l2 1h0M18 19v-1M4 13h16M4 13H3m1 0c0 3 2 5 3 5h10c1 0 3-2 3-5m0 0h1'
                          />
                        </svg>
                        <span className='text-md font-medium text-slate-800'>
                          {property.property_features.bathrooms}
                        </span>
                      </div>
                    )}
                  {property.property_features &&
                    property.property_features.housesize && (
                      <div className='flex gap-1 text-lg text-slate-800 only:grow only:self-start'>
                        <span className='text-md font-medium '>
                          {property.property_features.housesize}
                        </span>
                        <span className='xtext-sm text-slate-600 '>
                          m<sup className='font-features sups'>2</sup>
                        </span>
                      </div>
                    )}
                  {property.property_features &&
                    property.property_features.yearbuilt && (
                      <div className='flex gap-1 text-lg text-slate-800 only:grow only:self-start'>
                        <span className='text-slate-600'>año</span>
                        <span className=''>
                          {property.property_features.yearbuilt}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            )}
        </div>
      )}
    </>
  )
}

export default PropertyCard
