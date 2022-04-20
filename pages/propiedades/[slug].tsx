import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { getProperties, getPropertyBySlug } from '../../api/wp-api'
import {
  Property,
  RootQueryToPropertyConnection,
} from '../../generated/graphql'
import NumberFormat from 'react-number-format'
import Layout from '../components/Layout'
// import imgPlaceholder from '../../public/img-placeholder.svg'
import ProductSlider from '../components/ProductSlider'
import { useState } from 'react'

type Props = InferGetStaticPropsType<typeof getStaticProps>

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

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { data } = await getPropertyBySlug(context.params?.slug as string)

  return {
    props: {
      property: data.property as Property,
    },
    revalidate: 60,
  }
}

const Propiedad: NextPage<Props> = ({ property }) => {
  const mediaItems = property.attachedMedia?.nodes
  const propertyTypes = property.categories?.nodes || null
  const propertyType = Object.values(propertyTypes!)[0]?.name
  const propertyInfo = property.property_features
  const locations = property.locations?.nodes || undefined
  const propertyFeatures = property.features?.nodes || undefined

  const [featuresOpen, setfeaturesOpen] = useState(false)
  // property.locations?.nodes?.map((location) => location) || undefined

  // console.table(locations)
  return (
    <Layout>
      {/* {console.table(locations)} */}

      <div className='mb-24 mt-6 border-2 border-white bg-white/95 p-4 backdrop-blur-md'>
        <h1 className='font-sans text-2xl font-semibold tracking-tighter'>
          {property.title}
        </h1>
        <div className='sliderContainer mt-2 flex items-center justify-center overflow-x-hidden'>
          <ProductSlider key={property.slug} slides={mediaItems} />
        </div>

        <div className='mt-4 text-gray-800'>
          <div className='flex flex-1 items-center justify-between'>
            <div className='flex flex-col'>
              {propertyType && (
                <div className='text-right capitalize text-gray-800'>
                  {propertyType}
                  <span className='lowercase'> en</span>
                </div>
              )}
              <div className='flex'>
                {locations?.map((location) => (
                  <div key={location?.slug}>
                    {location?.parent?.node?.name && (
                      <span>{location.parent?.node?.name}</span>
                    )}
                    <span>{location?.name}</span>
                  </div>
                ))}
                <div></div>
                <div className='relative rounded-md border bg-white py-3 px-4 font-medium uppercase shadow-sm  '>
                  {property.property_info?.statustag}
                </div>
              </div>

              <div className='mt-4 grid grid-flow-col place-items-center justify-between gap-4 '>
                {propertyInfo?.bedrooms && (
                  <div className='flex items-center gap-2 text-lg text-gray-500'>
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
                    <span className='text-md font-medium text-gray-800'>
                      {propertyInfo.bedrooms}
                    </span>
                  </div>
                )}

                {propertyInfo?.bathrooms && (
                  <div className='flex items-center gap-2 text-lg text-gray-500'>
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
                    <span className='text-md font-medium text-gray-800'>
                      {propertyInfo.bathrooms}
                    </span>
                  </div>
                )}
                {propertyInfo?.housesize && (
                  <div className='flex items-center gap-1 text-lg text-gray-800'>
                    <span className='text-md font-medium text-gray-800'>
                      {propertyInfo.housesize}
                    </span>
                    <span className='text-gray-600'>
                      m<sup>2</sup>
                    </span>
                  </div>
                )}

                {propertyInfo?.yearbuilt && (
                  <div className='flex items-center gap-1 text-lg text-gray-800'>
                    <span className='text-gray-600'>año</span>
                    <span className=''>{propertyInfo.yearbuilt}</span>
                  </div>
                )}
              </div>
              <div
                className={`${
                  featuresOpen ? '' : ''
                } mt-4 rounded-lg border-2 border-gray-100 bg-gray-50 p-2 `}
              >
                <ul className='flex flex-1 list-inside list-none flex-wrap gap-4 p-2 capitalize'>
                  {propertyFeatures?.map((feature) => (
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
              {propertyInfo?.commentArea && (
                <div className='mt-4 text-lg font-normal'>
                  {propertyInfo.commentArea}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='fixed bottom-0 left-0 right-0 m-2 flex items-center justify-between rounded-lg border-2 border-white/90 bg-white/80 p-4 backdrop-blur md:hidden'>
          <div className='flex items-baseline '>
            <span className='text-4xl font-bold text-gray-900 '>
              <NumberFormat
                isNumericString={true}
                value={property.property_info?.price}
                displayType='text'
                thousandSeparator={true}
                prefix='€'
              />
            </span>
            <span className='mt-4 font-medium text-gray-800 '>
              {property.property_info?.statustag === 'En Alquiler' && '/mes'}
            </span>
          </div>
          <button className='rounded-md bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-white shadow shadow-green-700/50 hover:from-green-600'>
            Llamar
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Propiedad
