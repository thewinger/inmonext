import { NextPage } from 'next'
import Layout from './components/Layout'

type Props = string

const Home: NextPage<Props> = () => {
  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  )
}

export default Home
