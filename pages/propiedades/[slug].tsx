import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { getProperties, getPropertyBySlug } from '../../api/wp-api'
import {
  Property,
  RootQueryToPropertyConnection,
} from '../../generated/graphql'
import Layout from '../components/Layout'

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
        <div>
          <div className='relative w-full max-w-3xl aspect-[3/2]'>
            {mediaItems && (
              <Image
                src={mediaItems[0]?.sourceUrl as string}
                alt={mediaItems[0]?.title as string}
                layout='fill'
                objectFit='cover'
              />
            )}
          </div>
          {/* {mediaItems?.map((item, i) => ( */}
          {/*   <div className='w-full aspect-[3/2] bg-red-500'> */}
          {/*     <Image */}
          {/*       key={i} */}
          {/*       src={item?.sourceUrl as string} */}
          {/*       alt={item?.title as string} */}
          {/*       layout='fill' */}
          {/*     /> */}
          {/*   </div> */}
          {/* ))} */}
        </div>
        <div>
          <h1>{property.title}</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Propiedad
