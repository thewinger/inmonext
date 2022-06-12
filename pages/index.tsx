import { getCategories, getLocations } from '../api/wp-api'
import {
  Category,
  Location,
  RootQueryToCategoryConnection,
  RootQueryToLocationConnection,
} from '../generated/graphql'
import Layout from './components/Layout'
import { useRouter } from 'next/router'
import SearchCard from './components/SearchCard'

type HomeProps = {
  categoriesData: RootQueryToCategoryConnection
  locationData: RootQueryToLocationConnection
}

const Home = ({ categoriesData, locationData }: HomeProps) => {
  const { query } = useRouter()

  const locations: Location[] = locationData.nodes!
  const tipoViviendas: Category[] = categoriesData.nodes!

  return (
    <Layout>
      <SearchCard query={query} tipoViviendas={tipoViviendas} locations={locations} />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const { data: locationData } = await getLocations()
  const { data: categoryData } = await getCategories()

  return {
    props: {
      locationData: locationData.locations,
      categoriesData: categoryData.categories,
    },
    revalidate: 60,
  }
}
