import { Form, Formik, FormikHelpers } from 'formik'
import {
  Location,
  Category,
} from '../../generated/graphql'
import Select from './Select'
import { toFormattedArray } from '../../api/utils'

interface ValueObject {
  name: string,
  value: string | number
}
interface Values {
  tipoOperaciones: ValueObject
  tipoViviendas: ValueObject
  locations: ValueObject
}

type SearchCardProps = {
  tipoViviendas?: Category[]
  locations: Location[]
}

const SearchCard = ({ tipoViviendas, locations }: SearchCardProps) => {
  const tipoOperaciones = ['En Venta', 'En Alquiler', 'Obra Nueva']

  // var estancias = ['1', '2', '3', '4', '5+']
  // var precio = []


  const emptyOption = { name: 'Todos', value: '' }

  var formattedOperaciones = toFormattedArray(tipoOperaciones)
  formattedOperaciones = [emptyOption, ...formattedOperaciones!]

    var formattedLocations = toFormattedArray(locations!)
    formattedLocations = [emptyOption, ...formattedLocations!]

    var formattedCategories = toFormattedArray(tipoViviendas!)
    formattedCategories = [emptyOption, ...formattedCategories!]

  const initialValues = {
    tipoOperaciones: formattedOperaciones[0],
    tipoViviendas: formattedCategories[0],
    locations: formattedLocations[0]
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
          {locations &&
            <Select
              label='Localización'
              name='locations'
              options={formattedLocations}
              emptyFirst
            />
          }
          {formattedOperaciones &&
            <Select
              label='Tipo de Operacion'
              name='tipoOperaciones'
              options={formattedOperaciones}
              emptyFirst
            />
          }
          {formattedCategories && (
            <Select
              label='Tipo de Vivienda'
              name='tipoViviendas'
              options={formattedCategories}
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
