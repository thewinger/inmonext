import { useRouter } from 'next/router'
import { getCategories, getLocations, getProperties } from '../api/wp-api'
import {
  Category,
  Location,
  RootQueryToCategoryConnection,
  RootQueryToLocationConnection,
  RootQueryToPropertyConnection,
} from '../generated/graphql'
import SearchCard from './components/SearchCard'
import PropertyCard from './components/Card'
import Layout from './components/Layout'
// import { GeneralSettings, RootQueryToPropertyConnection } from '../generated/graphql'
// import ProductSlider from './components/ProductSlider'

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
      <div className='flex flex-row'>
        <div className='main-content w-full mb-'>
        </div>
        <div className='sidebar'>
          <div className='searchCard' />
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

