import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { getProperties, getPropertyBySlug } from '../../api/wp-api'
import {
  Property,
  RootQueryToPropertyConnection,
} from '../../generated/graphql'
import Layout from '../components/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Propiedad: NextPage<Props> = ({ property }) => {
  return (
    <Layout>
      <h1>{property.title}</h1>
    </Layout>
  )
}

export default Propiedad

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const { data } = await getPropertyBySlug(context.params?.slug as string)
  return {
    props: {
      property: data.property as Property,
    },
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

  return { paths, fallback: false }
}
