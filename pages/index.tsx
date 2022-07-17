import { useRouter } from 'next/router'
import { getCategories, getLocations, getProperties } from '../api/wp-api'
import {
  Category,
  Location,
  RootQueryToCategoryConnection,
  RootQueryToLocationConnection,
  RootQueryToPropertyConnection,
} from '../generated/graphql'
import Layout from './components/Layout'
import SearchCard from './components/SearchCard'

type HomeProps = {
  categoriesData: RootQueryToCategoryConnection
  locationData: RootQueryToLocationConnection
  propertiesData: RootQueryToPropertyConnection
}

const Home = ({ categoriesData, locationData, propertiesData }: HomeProps) => {
  const { query } = useRouter()

  const locations: Location[] = locationData.nodes!
  const tipoViviendas: Category[] = categoriesData.nodes!

  return (
    <Layout>
      <div className='flex'>
        <div className='main-content'>

        </div>
        <div>
          <SearchCard query={query} tipoViviendas={tipoViviendas} locations={locations} />
        </div>
      </div>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const { data: locationData } = await getLocations()
  const { data: categoryData } = await getCategories()
  const { data: propertiesData } = await getProperties()


  return {
    props: {
      locationData: locationData.locations,
      categoriesData: categoryData.categories,
      propertiesData: propertiesData.properties,
    },
    revalidate: 60,
  }
}
