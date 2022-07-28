import { getProperties, getPropertyBySlug } from '../../api/wp-api'
import {
  Property,
  RootQueryToPropertyConnection,
} from '../../generated/graphql'
import NumberFormat from 'react-number-format'
import Layout from '../../components/Layout'
import ProductSlider from '../../components/ProductSlider'
// import { useState } from 'react'

type Props = {
  property: Property
}

const Propiedad = ({ property }: Props) => {
  const mediaItems = property.attachedMedia?.nodes

  return (
    <Layout>
      <div className='mb-24 flex max-w-7xl flex-col gap-4 border-2 border-white/90 bg-white/90 py-4 text-slate-800 backdrop-blur-md'>
        <div className='flex flex-col md:flex-row md:items-start md:gap-2'>
          {property.property_info && (
            <div className='absolute top-6 left-8 z-10 shrink-0 rounded-md border bg-white/60 py-1 px-2 text-xs font-semibold uppercase text-green-900 shadow-sm backdrop-blur-md  '>
              {property.property_info.statustag}
            </div>
          )}
          <div className='sliderContainer flex grow items-center justify-center overflow-x-hidden'>
            <ProductSlider key={property.slug} slides={mediaItems as []} />
          </div>

          <div className='flex basis-5/12 flex-col gap-4 px-4 text-slate-900'>
            <h1 className='font-sans text-2xl font-semibold tracking-wide'>
              {property.title}
            </h1>
            <div className='hidden items-center gap-4 sm:flex '>
              {property.property_info && (
                <div className='xgrow flex items-baseline'>
                  <span className='text-xl font-bold text-slate-800 '>
                    <NumberFormat
                      isNumericString={true}
                      value={property.property_info?.price}
                      displayType='text'
                      thousandSeparator={true}
                      prefix='€'
                    />
                  </span>
                  {property.property_info?.statustag === 'En Alquiler' && (
                    <span className='font-medium text-slate-800 '>/mes</span>
                  )}
                </div>
              )}
              <button
                className={`${
                  property.property_info ? '' : 'grow '
                }rounded-md bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-white shadow shadow-green-700/50 hover:from-green-600`}
              >
                Contactar
              </button>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col sm:text-lg'>
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
                    {property.locations.nodes.map((location) => (
                      <div
                        className='capitalize text-slate-800'
                        key={location.slug}
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
            </div>

            <div className='flex justify-start gap-4'>
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
        </div>
        <div className='px-4'>
          {property.features && property.features.nodes && (
            <div
              className={`
              } rounded-lg border-2 border-slate-100 bg-slate-50 p-2 `}
            >
              <ul className='flex flex-1 list-inside list-none flex-wrap gap-4 p-2 capitalize'>
                {property.features.nodes.map((feature) => (
                  <li key={feature?.slug} className='flex items-center gap-1'>
                    <svg
                      className='h-3 w-3 fill-emerald-600 stroke-emerald-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                      />
                    </svg>
                    {feature?.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {property.property_features &&
            property.property_features.commentArea && (
              <div className='mb-4 text-lg font-normal'>
                {property.property_features.commentArea}
              </div>
            )}
        </div>

        <div className='fixed bottom-0 left-0 right-0 m-2 flex items-center justify-around rounded-lg border-2 border-white/90 bg-white/90 p-4 shadow-xl backdrop-blur sm:hidden md:hidden'>
          {property.property_info && (
            <div className='xgrow flex items-baseline'>
              <span className='text-4xl font-bold text-slate-900 '>
                <NumberFormat
                  isNumericString={true}
                  value={property.property_info?.price}
                  displayType='text'
                  thousandSeparator={true}
                  prefix='€'
                />
              </span>
              {property.property_info?.statustag === 'En Alquiler' && (
                <span className='mt-4 font-medium text-slate-800 '>/mes</span>
              )}
            </div>
          )}
          <button
            className={`${
              property.property_info ? '' : 'grow '
            }rounded-md bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-white shadow shadow-green-700/50 hover:from-green-600`}
          >
            Contactar
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Propiedad

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const { data } = await getPropertyBySlug(params.slug)

  return {
    props: {
      property: data.property as Property,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const { data } = await getProperties()

  const properties = data.properties as RootQueryToPropertyConnection

  const paths = properties?.nodes?.map((property) => ({
    params: {
      slug: property?.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
