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

type HomeProps = {
  categoriesData: RootQueryToCategoryConnection;
  locationData: RootQueryToLocationConnection;
  propertiesData: RootQueryToPropertyConnection;
};

const Home = ({ categoriesData, locationData, propertiesData }: HomeProps) => {
  const { query } = useRouter();

  const locations: Location[] = locationData.nodes!;
  const tipoViviendas: Category[] = categoriesData.nodes!;
  const properties: Property[] = propertiesData.nodes!;

  const featured = properties
    .filter((property) => property.property_info?.featured === "Yes")
    .slice(0, 5);
  const alquiler = properties
    .filter((property) => property.property_info?.statustag === "En Alquiler")
    .slice(0, 5);
  const venta = properties
    .filter((property) => property.property_info?.statustag === "En Venta")
    .slice(0, 5);

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="main-content order-2 w-full">
          <div className="my-4">
            <h2 className="p-4 text-xl font-semibold text-slate-900/90">
              Destacados
            </h2>
            <div className="relative flex h-96 w-full snap-x snap-mandatory gap-6 overflow-x-auto ">
              <div className="shrink-0 snap-center">
                <PropertyCard></PropertyCard>
              </div>
              {featured.map((property) => (
                <div className="w-10/12 shrink-0 snap-center">
                  <PropertyCard property={property}></PropertyCard>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sidebar order-1">
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
