import { Form, Formik, FormikHelpers, useFormikContext } from "formik"
import Select from "./Select"

interface Values {
  tipoOperacion: string
}

const SearchCard = () => {

  const tipoOperacion = [
    {
      item: "En Venta",
      value: "En Venta",
    },
    {
      item: "En Alquiler",
      value: "En Alquiler",
    },
    {
      item: "Obra Nueva",
      value: "Obra Nueva",
    },
  ]
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
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default SearchCard