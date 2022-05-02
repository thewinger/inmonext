import { getCategories, getLocations } from '../api/wp-api'
import { Location, RootQueryToCategoryConnection } from '../generated/graphql'
import Layout from './components/Layout'
import { useRouter } from 'next/router'
import SearchCard from './components/SearchCard'

type HomeProps = {
  categoriesData: RootQueryToCategoryConnection
}
// var statustag = {
//   "en-venta": "En Venta",
//   "en-alquiler": "En Alquiler",
//   "obra-nueva": "Obra Nueva",
// }

const Home = ({ categoriesData }: HomeProps) => {
  const { query } = useRouter()

  const initialValues = {
    optionsOperacion: [
      {
        item: 'Todos',
        value: '',
      },
      {
        item: 'En Venta',
        value: 'En Venta',
      },
      {
        item: 'En Alquiler',
        value: 'En Alquiler',
      },
      {
        item: 'Obra Nueva',
        value: 'Obra Nueva',
      },
    ],
  }

  return (
    <Layout>
      <SearchCard categoriesData={categoriesData} />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  // const { data: locationsData } = await getLocations();
  const { data } = await getCategories()

  return {
    props: {
      // locationsQl: locationsData,
      categoriesData: data.categories,
    },
    revalidate: 60,
  }
}
