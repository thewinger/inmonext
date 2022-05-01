import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "./components/Layout";

const Venta = () => {
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

export default Venta;
