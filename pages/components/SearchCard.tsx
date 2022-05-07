import { Form, Formik, FormikHelpers } from 'formik'
import {
  RootQueryToCategoryConnection,
  RootQueryToLocationConnection,
} from '../../generated/graphql'
import Select from './Select'
import { plainObjectToArray } from '../../utils/index'

interface Values {
  tipoOperacion: string
  tipoVivienda: string
  location: string
}

type SearchCardProps = {
  categoriesData?: RootQueryToCategoryConnection
  locationData?: RootQueryToLocationConnection
}

const SearchCard = ({ categoriesData, locationData }: SearchCardProps) => {
  const tipoOperacion = ['En Venta', 'En Alquiler', 'Obra Nueva']

  var tipoVivienda: string[] = []

  if (categoriesData && categoriesData.nodes) {
    tipoVivienda = plainObjectToArray(categoriesData?.nodes as [], 'name')
  }

  // var location: string[] = []
  // if (locationData && locationData.nodes) {
  //   location = plainObjectToArray(locationData.nodes as [], 'name')
  //   console.log(`location: ${locationData}`)
  //   console.log(typeof locationData)
  // }

  var estancias = ['1', '2', '3', '4', '5+']
  var precio = []
  // var location = ['Bonalba', '-- Bahia Golf', 'Campello']

  const initialValues = {
    tipoOperacion: '',
    tipoVivienda: '',
    location: '',
  }

  return (
    <div className='rounded-md bg-white/75 p-4 shadow-md'>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
      >
        <Form className='relative flex flex-col gap-4'>
          <Select
            label='Localización'
            name='location'
            options={locationData!}
            emptyFirst
          />
          <Select
            label='Tipo de Operacion'
            name='tipoOperacion'
            options={tipoOperacion}
            emptyFirst
          />
          {tipoVivienda && (
            <Select
              label='Tipo de Vivienda'
              name='tipoVivienda'
              options={tipoVivienda}
              emptyFirst
            />
          )}
          <button
            className='rounded-md bg-green-600 px-4 py-2 font-semibold text-white'
            type='submit'
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default SearchCard
