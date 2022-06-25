import { Form, Formik } from 'formik'
import {
  Location,
  Category,
} from '../../generated/graphql'
import Select from './Select'
// import { Options, toFormattedArray } from '../../api/utils'
import { ParsedUrlQuery } from 'querystring'
import router from 'next/router'
import { initQueries, toFormattedArray, postQueries } from '../../utils'

type SearchCardProps = {
  tipoViviendas: Category[]
  locations: Location[]
  query: ParsedUrlQuery
}


const SearchCard = ({ tipoViviendas, locations, query }: SearchCardProps) => {
  const tipoOperaciones = ['En Venta', 'En Alquiler', 'Obra Nueva']

  // var estancias = ['1', '2', '3', '4', '5+']
  // var precio = []


  const emptyOption = { name: 'Todos', value: '' }
  var formattedOperaciones = toFormattedArray(tipoOperaciones)
  formattedOperaciones = [emptyOption, ...formattedOperaciones!]

  var formattedLocalizaciones = toFormattedArray(locations!)
  formattedLocalizaciones = [emptyOption, ...formattedLocalizaciones!]

  var formattedViviendas = toFormattedArray(tipoViviendas!)
  formattedViviendas = [emptyOption, ...formattedViviendas!]

  let initTipoOperacion = initQueries(query, 'tipoOperacion', formattedOperaciones)
  let initTipoVivienda = initQueries(query, 'tipoVivienda', formattedViviendas)
  let initLocalilzacion = initQueries(query, 'localizacion', formattedLocalizaciones)

  const initialValues = {
    tipoOperacion: initTipoOperacion,
    tipoVivienda: initTipoVivienda,
    localizacion: initLocalilzacion
  }



  return (
    <div className='rounded-md bg-white/75 p-4 shadow-md'>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={( values ) => {
          // let valuesNames = Object.entries(values).map((val) => { val[1].name })
          //  values needs to be { input = value, input = value, input = value }
          router.push({
            query: {...values, page: 1
          })
          // setTimeout(() => {
          //
          //   Object.entries(values).map((val) => {
          //     console.log(val[1].name)
          //   })
          //   alert(JSON.stringify(values.name, null, 2))
          // }, 500)
        }}
      >
        <Form className='relative flex flex-col gap-4'>
          {locations &&
            <Select
              label='Localización'
              name='localizacion'
              options={formattedLocalizaciones}
            />
          }
          {formattedOperaciones &&
            <Select
              label='Tipo de Operacion'
              name='tipoOperacion'
              options={formattedOperaciones}
            />
          }
          {formattedViviendas && (
            <Select
              label='Tipo de Vivienda'
              name='tipoVivienda'
              options={formattedViviendas}
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
