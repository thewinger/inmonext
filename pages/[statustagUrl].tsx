import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "./components/Layout";

const TipoPage = (props) => {
  const router = useRouter();
  const query = router.query;
  let statustag = query.statustagUrl as string;

  var statustagDir = {
    "en-venta": "En Venta",
    "en-alquiler": "En Alquiler",
    "obra-nueva": "Obra Nueva",
  };
  console.log(typeof statustag);
  return (
    <Layout>
      <h1>{query.statustagUrl}</h1>
      {statustagDir[statustag as keyof ObjectType]}
    </Layout>
  );
};

export default TipoPage;

export async function getStaticPaths() {
  const paths = ["en-venta", "en-alquiler", "obra-nueva"];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
