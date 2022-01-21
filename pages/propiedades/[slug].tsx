import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { getProperties, getPropertyBySlug } from '../../api/wp-api'
import {
  Property,
  RootQueryToPropertyConnection,
} from '../../generated/graphql'
import Layout from '../components/Layout'
import imgPlaceholder from '../../public/img-placeholder.svg'
import ProductSlider from '../components/ProductSlider'

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
  const mediaItems = property.attachedMedia?.nodes || undefined

  return (
    <Layout>
      <div className='bg-white rounded-md mt-6 p-4'>
        <div className='flex items-center justify-center overflow-x-hidden sliderContainer'>
          <ProductSlider key={property.slug}>
            {mediaItems?.map((image, i) => (
              <div
                key={image?.sourceUrl!}
                className='text-center h-full relative'
              >
                <Image
                  src={image?.sourceUrl || imgPlaceholder}
                  alt={image?.title || 'Property Image'}
                  layout='fill'
                  objectFit='cover'
                  priority={i === 0}
                  quality='85'
                  className=''
                />
              </div>
            ))}
          </ProductSlider>
        </div>
        <div>
          <h1>{property.title}</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Propiedad
