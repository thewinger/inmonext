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
      <div>
        <div className='relative w-full max-w-3xl aspect-[3/2]'>
          <ProductSlider key={property.slug}>
            {mediaItems?.map((image, i) => (
              <div key={image?.sourceUrl!} className=''>
                <Image
                  src={image?.sourceUrl!}
                  alt={image?.title || 'Property Image'}
                  layout='fill'
                  objectFit='cover'
                  priority={i === 0}
                  quality='85'
                />
              </div>
            ))}
          </ProductSlider>
          {/* {mediaItems && (
              <Image
                src={(mediaItems[0]?.sourceUrl as string) || imgPlaceholder}
                alt={(mediaItems[0]?.title as string) || 'Image not loaded'}
                layout='fill'
                objectFit='cover'
              />
            )} */}
        </div>
        <div>
          <h1>{property.title}</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Propiedad
