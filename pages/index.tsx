import { InferGetStaticPropsType, NextPage } from 'next'
import { getLocations } from '../api/wp-api'
import { Location } from '../generated/graphql'
import Layout from './components/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ locations }) => {
  return (
    <Layout>
      <h1>{JSON.stringify(locations, null, 4)}</h1>
    </Layout>
  )
}

export default Home
export async function getStaticProps() {
  const locations = await getLocations()

  return {
    props: {
      locations: locations.data.locations as Location
    },
  }
}
