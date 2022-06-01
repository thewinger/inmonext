import { InferGetStaticPropsType, NextPage } from 'next'
import { getSiteMeta } from '../api/wp-api'
import { GeneralSettings } from '../generated/graphql'
import Layout from './components/Layout'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ siteMeta }) => {
  return (
    <Layout>
      <h1>{siteMeta.title}</h1>
    </Layout>
  )
}

export default Home
export async function getStaticProps() {
  const siteMeta = await getSiteMeta()

  return {
    props: {
      siteMeta: siteMeta.data.generalSettings as GeneralSettings,
    },
  }
}
