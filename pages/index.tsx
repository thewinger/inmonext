import { getCategories, getLocations } from '../api/wp-api'
import {
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
// var statustag = {
//   "en-venta": "En Venta",
//   "en-alquiler": "En Alquiler",
//   "obra-nueva": "Obra Nueva",
// }

const Home = ({ categoriesData, locationData }: HomeProps) => {
  const { query } = useRouter()
  console.log(`query: ${query}`)

  return (
    <Layout>
      <SearchCard categoriesData={categoriesData} locationData={locationData} />
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
