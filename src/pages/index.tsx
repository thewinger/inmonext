import { useRouter } from "next/router";
import { getCategories, getLocations, getProperties } from "../api/wp-api";
import {
  Category,
  Location,
  Property,
  RootQueryToCategoryConnection,
  RootQueryToLocationConnection,
  RootQueryToPropertyConnection,
} from "../generated/graphql";
import SearchCard from "../components/SearchCard";
import Layout from "../components/Layout";
import PropertyCard from "../components/PropertyCard";
import CardSlider from "../components/CardSlider";
import useMediaQuery from "../utils/main";
import Link from "next/link";
import FeaturedSlider from "../components/FeaturedSlider";

type HomeProps = {
  categoriesData: RootQueryToCategoryConnection;
  locationData: RootQueryToLocationConnection;
  propertiesData: RootQueryToPropertyConnection;
};

const Home = ({ categoriesData, locationData, propertiesData }: HomeProps) => {
  const { query } = useRouter();

  const matches = useMediaQuery("(min-width: 1024px)");

  const locations: Location[] = locationData.nodes!;
  const tipoViviendas: Category[] = categoriesData.nodes!;
  const properties: Property[] = propertiesData.nodes!;

  const featured = properties
    .filter((property) => property.property_info?.featured === "Yes")
    .slice(0, 5);
  const alquiler = properties
    .filter((property) => property.property_info?.statustag === "En Alquiler")
    .slice(0, 4);
  const venta = properties
    .filter((property) => property.property_info?.statustag === "En Venta")
    .slice(0, 4);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-4">
        <div className="main-content order-2 w-full lg:max-w-xl">
          <div className="my-4">
            <h2 className="p-4 text-lg font-semibold uppercase tracking-wide text-slate-800 lg:px-0">
              Destacados
            </h2>
            {matches ? (
              <FeaturedSlider properties={featured} />
            ) : (
              <CardSlider properties={featured} />
            )}
          </div>
          <div className="my-4">
            <h2 className="p-4 text-lg font-semibold uppercase tracking-wide text-slate-800 lg:px-0">
              Últimos en venta
            </h2>
            {matches ? (
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {venta.map((property, i) => (
                  <Link key={i} href={`/propiedades/${property.slug}`}>
                    <a className="block">
                      <PropertyCard property={property}></PropertyCard>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <CardSlider properties={venta} />
            )}
          </div>
          <div className="my-4">
            <h2 className="p-4 text-lg font-semibold uppercase tracking-wide text-slate-800 lg:px-0">
              Últimos en alquiler
            </h2>
            {matches ? (
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {alquiler.map((property, i) => (
                  <Link key={i} href={`/propiedades/${property.slug}`}>
                    <a className="block">
                      <PropertyCard property={property}></PropertyCard>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <CardSlider properties={alquiler} />
            )}
          </div>
        </div>
        <div className="sidebar lg:w-xs order-1 lg:order-2">
          <div className="searchCard" />
          <SearchCard
            query={query}
            tipoViviendas={tipoViviendas}
            locations={locations}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const { data: locationData } = await getLocations();
  const { data: categoryData } = await getCategories();
  const { data: propertiesData } = await getProperties();

  return {
    props: {
      locationData: locationData.locations,
      categoriesData: categoryData.categories,
      propertiesData: propertiesData.properties,
    },
    revalidate: 60,
  };
}
