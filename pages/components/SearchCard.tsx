import { Form, Formik, FormikHelpers } from "formik"
import { RootQueryToCategoryConnection } from "../../generated/graphql"
import Select from "./Select"

interface Values {
  tipoOperacion: string
}

type SearchCardProps = {
  categoriesData?: RootQueryToCategoryConnection
}

const SearchCard = ({categoriesData}: SearchCardProps) => {

  const tipoOperacion = ["En Venta", "En Alquiler", "Obra Nueva"]

  function extractValue(arr: [], prop: string) {
    // extract value from property
    let extractedValue = arr.map(item => item[prop])

    return extractedValue
  }

  var tipoVivienda: string[] = []

  if (categoriesData && categoriesData.nodes) {
    tipoVivienda = extractValue(categoriesData?.nodes as [], 'name')
    console.log(tipoVivienda)
  }




  var estancias = ["1", "2", "3", "4", "5+"];
  var precio = [];

  const initialValues = {
    tipoOperacion: tipoOperacion[0].value
  }





  return (
    <div className="bg-white">
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <Select label="Tipo de Operacion" name="tipoOperacion" placeholder="Seleccione una operacion…" options={tipoOperacion} emptyFirst/>
          if (tipoVivienda) {
            <Select label="Tipo de Vivienda" name="tipoVivienda" placeholder="Seleccione tipo de vivienda…" options={tipoVivienda} emptyFirst/>
        }
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default SearchCard
